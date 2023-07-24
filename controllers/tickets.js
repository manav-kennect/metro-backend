const moment = require("moment");



exports.addTicketsDetails = async (ticketData)=> {
    try {
        await client.connect();
        const db = client.db('metro');
        const collection = db.collection('tickets');    
        const added_tickets =   await collection.insertOne(ticketData);

        return added_tickets
      } 
      catch (err){
        console.log(err)
      }
      
}

exports.updateTicketDetails = async (ticket_id) => {
    try {
        await client.connect();
        const db = client.db('metro');
        const collection = db.collection('tickets');
        const created_at = moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
        const valid_upto = moment().add(5, 'minutes').format("dddd, MMMM Do YYYY, h:mm:ss a");
        const ticket =   await collection.updateOne({'ticket_id': ticket_id},{$set:{created_at:created_at,valid_upto: valid_upto}});
        console.log(ticket);
        return {ok:true,result:ticket};
      } 
      catch (err){
        console.log(err)
        return {ok:fasle,result:"Cannot Update Ticket"}
      }
}

exports.getTicketDetails = async (ticket_id) => {
    try {
        await client.connect();
        const db = client.db('metro');
        const collection = db.collection('tickets');
        const ticket =   await collection.findOne({'ticket_id': ticket_id},{'projection': {
        source:1,
        destination: 1,
        source_id: 1,
        destination_id: 1,
        created_at: 1,
        valid_upto: 1,
        ticket_id: 1,
        userid: 1,
        status: 1}})
      console.log(ticket,"YOJOJIJIUIHUHUHUHUHUhj")
        return {ok:true,result:ticket};
      } 
      catch (err){
        console.log(err)
        return {ok:false,result:"Unable to Find ticket"};
      }
      finally {
        client.close();
      }
}

exports.getTicketDetailsByUser = async (user) => {
  try {
      await client.connect();
      const db = client.db('metro');
      const collection = db.collection('tickets');
      // const ticket =   await collection.findOne({'userid': user},{'projection': {
      //   source:1,
      //   destination: 1,
      //   userid: 1,
      //   status: 1}})
      // console.log(ticket,user,"YOJOJIJIUIHUHUHUHUHUhj")
      const ticket = await collection.find({'userid': user}).toArray()
      console.log(ticket)
      return ticket;
    } 
    catch (err){
      console.log(err)
      return []
    }
    
}


