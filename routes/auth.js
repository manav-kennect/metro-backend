const authRouter = require('express').Router();
const {addStationDetails,ticketFareCalculator,getStationsDetails} = require('../controllers/station.js')
const {issueToken} = require('../controllers/auth.js')


// authRouter.get('/station',(req,res,next) => {
//     addStationDetails();
// })
authRouter.post('/login',async (req,res,next)=>{
    console.log("auth router")
    if (!!req.body) {
        res.json(await issueToken(req.body));
    } else {
        res.json({'error':"Missing Params"})
    }
})

module.exports = authRouter;

