require('dotenv').config()
const express=require('express')

const cors=require('cors')

const router=require('./Routers/router')

 require('./DB/connections')

const server=express()

server.use(cors())

server.use(express.json()) 


server.use('/uploads', express.static('uploads'))

  server.use(router)


const PORT=5000 || process.env


server.listen(PORT, ()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})

server.get('/',(req,res)=>{
    res.send(`project fair running succesfuly and ready to accept request`)
})

// // post request
// pfserver.post('/',(req,res)=>{
//     res.send(`post request`)
// })





