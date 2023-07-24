const {MongoClient} = require('mongodb');

exports.connect2DB= function connect2DB() {
    const client = new MongoClient(process.env.DB_URL);
    try {
        // Connect to the MongoDB cluster
        return client;
 
    } catch (e) {
        console.error(e);
    }
}