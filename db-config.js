const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://manav-kennect:manavkennect9@cluster0.yjuwt8o.mongodb.net/?retryWrites=true&w=majority";
exports.connect2DB= async function connect2DB() {
    
    try {
        global.client = new MongoClient(uri, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
          });

        await client.connect()
        // console.log(client)
 
    } catch (e) {
        console.error(e);
    }
}