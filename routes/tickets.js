const ticketRouter = require('express').Router();
const {addTicketsDetails,getTicketDetailsByUser,updateTicketDetails} = require('../controllers/tickets.js')
const {jwtVerify} = require('../middlewares/auth.js')

ticketRouter.post('/tickets',async (req,res,next) => {
  try {
    const result = await addTicketsDetails(req.body)
    console.log(result,"ADD TICKES")
    res.json({ok:true,result:result})
    // var instance = new Razorpay({
    //     key_id: 'rzp_test_92eFbocTnB8nWt',
    //     key_secret: 'I6nniSFsiGn9pIW3qTGCJ98A',
    // });

    // const order = instance.orders.create({
    //     amount: 50000,
    //     currency: "INR",
    //     receipt: "receipt#1",
    //     notes: {
    //       key1: "value3",
    //       key2: "value2"
    //     }
    //   })
  }
  catch(err) {
    res.json({ok: false})
  }
    })

  ticketRouter.get('/tickets',jwtVerify,async (req,res,next)=>{
    try{
    const result = await getTicketDetailsByUser(req.query.user)
    res.json({ok:true, result:result})
    }
    catch(err) {
      res.json({ok:false,err:err})
    }
  })

  ticketRouter.put('/tickets/admin',jwtVerify,async (req,res,next)=>{
    try{

      if(req.user.role === "admin") {
    const result = await updateTicketDetails(req.body.ticket_id)
    res.json(result)
      }
      else {
        res.json({ok:false,result:"Unauthorized"})
      }
    }
    catch(err) {
      res.json({ok:false,err:err})
    }
  })

    module.exports = ticketRouter
