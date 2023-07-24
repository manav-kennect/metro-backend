const {addUser} = require('../controllers/user.js')
const userRouter = require('express').Router();

userRouter.post('/addUser',async (req,res,next)=>{
   const response =  await addUser(req.body)
   console.log(response,"ADD USER")
   res.json({ok:true,response:response})
})

module.exports = userRouter;