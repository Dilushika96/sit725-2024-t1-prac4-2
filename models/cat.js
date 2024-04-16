let client = require('../dbConnection');

function postCat(cat, callback) {
    client.connect((err) => {
        if (!err) {
            console.log('MongoDB connection connected')
        }
        const collection = client.db("card").collection('card'); 
        collection.insertOne(cat, callback);
    });
}

function getAllCats(callback) {
    client.connect((err) => {
        if (!err) {
            console.log('MongoDB connection')
        }
        const collection = client.db("card").collection('card'); 
        collection.find({}).toArray(callback);
    });
}

module.exports = { postCat, getAllCats }