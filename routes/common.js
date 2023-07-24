const commonRouter = require('express').Router();
const {checkInTicket,checkOutTicket} = require('../controllers/common.js')

commonRouter.post('/checkin',async (req,res,next)=>{
    try{
        const result = await checkInTicket(req.body.ticket_id,req.query.cs,req.body.source_id,req.body.created_at)
        console.log(result,"HERE")
        res.json(result)
    }
    catch(err) {
      res.json({ok:false,err:err})
    }
  })

  commonRouter.post('/checkout',async (req,res,next)=>{
    try{
        console.log(req.body)
        const result = await checkOutTicket(req.body.ticket_id,req.query.cs,req.body.destination_id,req.body.source_id,req.body.created_at,req.body.city)
        res.json(result)
    }
    catch(err) {
      res.json({ok:false,err:err})
    }
  })

module.exports = commonRouter
