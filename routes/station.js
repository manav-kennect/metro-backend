const stationRouter = require('express').Router();
const {addStationDetails,ticketFareCalculator,getStationsDetails} = require('../controllers/station.js')
const {jwtVerify} = require('../middlewares/auth.js')
stationRouter.get('/station',(req,res,next) => {
    addStationDetails();
})

stationRouter.get('/station-list',async (req,res,next) => {
    try{
   const station_details = await getStationsDetails(req.query.city);
   if(station_details.length !== 0) {
    console.log("here")
    res.json({station_details:station_details})
   }
   else{
    res.json({'err':client})
   }
}
   catch(ddd) {
    console.log(ddd)
   }
})

stationRouter.get('/ticket-price/',async (req,res,next) => {
    console.log(Object.values(req.query).length,"QUERY")
    if(req.query.src && req.query.des) {
    const price = await ticketFareCalculator(req.query.src,req.query.des,req.query.city);
    console.log(price)
    res.json({ok:true,'ticketPrice':price.fare,via: price.via})}
    else {
        res.json({ok:false,'ticketPrice': "Unable to find price For this route"})
    }
})
module.exports= stationRouter;
