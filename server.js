var express = require("express")
var app = express()
var port = process.env.port || 3000;
let collection;
require('./dbConnection');
let router = require('./routers/router');

app.use(express.static(__dirname + '/'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/cards', router);

app.listen(port, () => {
    console.log("App running at http://localhost:" + port)
})