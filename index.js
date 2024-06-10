// 1) import dotenv
require('dotenv').config()
// import express
const express=require('express')

// import cors
const cors=require('cors')

// import router
const router=require('./Routers/router')

// import connection.js file
 require('./DB/connections')

// create server
const server=express()

// use of cors in server
server.use(cors())

//returns a middleware that only parses json-javascript object
server.use(express.json()) 

// use of router by server
  server.use(router)


// server use uploads folder
// first arg-the way in whic other applicaions should use this folder
// sec arg-export that folder-express folder
// pfserver.use('/uploads',express.static('./uploads'))

// customize the port-by default -3000
const PORT=5000 || process.env

// to run  server

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





