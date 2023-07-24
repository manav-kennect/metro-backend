const {connect2DB} = require('../db-config.js')
module.exports = {
    addUser: async (userData)=>{
    try {
      
        // await client.connect();
        // console.log(client)
        const db = await client.db('test');
        const collection = db.collection('auth_details');
        const res = await collection.insertOne(userData);
        return res
      } 
      catch (err){
        console.log(err)
      }
    }
}