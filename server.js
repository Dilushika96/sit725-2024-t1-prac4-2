var express = require("express")
const { MongoClient, ServerApiVersion } = require('mongodb');
var app = express()
const uri = "mongodb+srv://Dilushika:dilu123@cluster0.euqiwxn.mongodb.net/";
var port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Create a MongoClient with a MongoClientOptions object to set the Stable API version 
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function runDBConnection() {
    try {
        // Connect the client to the server (optional starting in v4.7) 
        await client.connect();
        collection = client.db('card').collection('card');
        console.log(collection);
    } catch (ex) {
        console.error(ex);
    }
}

function insertProjects(card, callback) {
    try {
        collection.insertOne(card, callback);
    } catch (ex) {
        console.error(ex);
    }
}

function getAllCats(callback) {
    try {
        collection.find({}).toArray(callback);
    } catch (ex) {
        console.error(ex);
    }
}



app.get('/', (req, res) => {
    res.render('index.html');
});
app.get('/api/cards', (req, res) => {
    getAllCats((err, result) => {
        if (!err) {
            res.json({ statusCode: 200, data: result, message: 'get all cards success' });
        }
    });
});

app.post('/api/cards', (req, res) => {
    console.log("New Project added", req.body)
    var newProject = req.body;
    insertProjects(newProject, (err, result) => {
        if (err) {
            res.json({ statusCode: 400, message: err })
        }
        else {
            res.json({ statusCode: 200, message: "Project Successfully added", data: result })
        }
    })
})



app.listen(port, () => {
    console.log("App running at http://localhost:" + port)
    runDBConnection();
})