//server creation
//express
// 1. import express
require('dotenv').config()
const express=require('express')

//router import
const router=require('./routes/router')
const cors=require('cors')

//2. create server using express

const server=express()

//integrate frontend
server.use(cors())

//To convert all incoming json data to js data
server.use(express.json())

//router set
server.use(router)

//import connection.js
require('./db/connection')

//3. run the server
//port
const port=5000 || process.env.port

server.listen(port,()=>{
    console.log(`__Server is running on ${port}___`)
})

//api calls resolve  - port
// server.post('/register',(req,res)=>{
//     res.send("post method is working.....")
// })

// server.post('/login',(req,res)=>{
//     console.log((req.body.accno));
//     console.log(req.body.pass);
//     res.send("Login worked")
// })

// server.get('/getexc',(req,res)=>{
//     res.send("get worked")
// })