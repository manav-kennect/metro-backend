const {addUser} = require('../controllers/user.js')
const userRouter = require('express').Router();

userRouter.post('/addUser',async (req,res,next)=>{
   try {
   const response =  await addUser(req.body)
   console.log(response,"ADD USER")
   res.json({ok:true,response:response})
   }
   catch(err) {
      res.json({ok:false, response:err})
   }
})

module.exports = userRouter;