const adminRouter = require('express').Router();
const {getTicketDetails,updateTicketDetails} = require('../controllers/tickets.js')



adminRouter.get('/admin/tickets',async (req,res,next)=>{
    try{
    const result = await getTicketDetails(req.query.tid)
    res.json(result)
    }
    catch(err) {
      res.json({ok:false,err:"err"})
    }
  })

  // adminRouter.post('/checkin',async (req,res,next)=>{
  //   try{
  //       console.log(req.body)
  //       const result = await checkInTicket(req.body.ticket_id,req.query.cs,req.body.source_id,req.body.created_at)
  //       res.json(result)
  //   }
  //   catch(err) {
  //     res.json({ok:false,err:err})
  //   }
  // })

  module.exports = adminRouter