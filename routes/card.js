const cardRouter = require('express').Router();
const {addCard,getCard,cardCheckIn,cardCheckOut} = require('../controllers/card.js')

cardRouter.post('/card',async (req,res,next)=>{
    console.log("INDIE POSTTTT")
    try {
   const response =  await addCard(req.body)
   if(response.acknowledged) {
   res.json({ok:true,result:req.body})
   }
}
catch(err) {
    res.json({ok:true,result: "Cannot add card"})
}
})

cardRouter.get('/card',async (req,res,next)=>{
    console.log("INSIDE CARDDD")
    try {
   const response =  await getCard(req.query.user)
   console.log(response)
   res.json({ok:true,result: response})
}
catch(err) {
    console.log(err)
    res.json({ok:false,result: "Cannot Find Card"})
}
})

cardRouter.post('/card/checkin',async (req,res,next)=>{
    try {
   const response =  await cardCheckIn(req.body.cardnumber,req.body.city)
   console.log(response)
   res.json(response)
}
catch(err) {
    console.log(err)
    res.json({ok:false,result: "Cannot Find Card"})
}
})

cardRouter.post('/card/checkout',async (req,res,next)=>{
    try {
   const response =  await cardCheckOut(req.body.cardnumber,req.body.city,req.body.destination)
   console.log(response)
   res.json(response)
}
catch(err) {
    console.log(err)
    res.json({ok:false,result: "Cannot Find Card"})
}
})
module.exports = cardRouter;