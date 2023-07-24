const {connect2DB} = require('../db-config.js')
module.exports = {
    addUser: async (userData)=>{
    try {
        await client.connect();
        const db = client.db('metro');
        const collection = db.collection('auth_details');
        const res = await collection.insertOne(userData);
        return res
      } 
      catch (err){
        console.log(err)
      }
    }
}