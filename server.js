require('dotenv').config();
const express = require('express');
const {connect2DB} = require('./db-config.js')
const cors = require('cors')
const {ticketRouter} = require('./metro-backend/routes/tickets.js')
const {stationRouter} = require('./metro-backend/routes/station.js')
const {commonRouter} = require('./metro-backend/routes/common.js')
const {userRouter} = require('./metro-backend/routes/user.js')
const {authRouter} = require('./metro-backend/routes/auth.js')
const {adminRouter} = require('./metro-backend/routes/admin.js')
const {cardRouter} = require('./metro-backend/routes/card.js')
const app = express();
connect2DB();
// console.log(client)


app.use(cors())
app.use(express.json())

app.use('/api',ticketRouter)
app.use('/api',adminRouter)
app.use('/api',commonRouter)
app.use('/api',stationRouter)
app.use('/api',userRouter)
app.use('/api',authRouter)
app.use('/api',cardRouter)

app.get('/',(req,res)=>{
    res.send('<h1>The server started</h1>')
})

app.listen(process.env.PORT,()=>{
    console.log(`Server Started at Port ${process.env.PORT}`)
})