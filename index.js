require('dotenv').config();
const express = require('express');
const {connect2DB} = require('./db-config.js')
const cors = require('cors')
const ticketRouter = require('./routes/tickets.js')
const stationRouter = require('./routes/station.js')
const commonRouter = require('./routes/common.js')
const userRouter = require('./routes/user.js')
const authRouter = require('./routes/auth.js')
const adminRouter = require('./routes/admin.js')
const cardRouter = require('./routes/card.js')
console.log(process.env.PORT,"HERRRRRRRRRRRRRRRRRRRRRRR")
const app = express();

// console.log(client)

connect2DB();
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