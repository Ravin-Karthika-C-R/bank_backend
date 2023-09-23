//The paths that the api server calls are set in here

const express=require('express')
const {register,login,getBalance,accountStatement, accountDelete}=require('../controllers/logic')
const { jwtMiddleware } = require('../middlewares/jwtMiddlewares')


//router object
const router=new express.Router()

//create ac -signup
router.post('/bankuser/create_acc',register)

//login
router.post('/bankuser/login',login)

//check balance
router.get('/bankuser/balance/:acno',jwtMiddleware,getBalance)

//money transfer
router.post('/bankuser/money-transfer',jwtMiddleware,moneyTransfer)

//account statement
router.get('/bankuser/account-statement/:acno',jwtMiddleware,accountStatement)


//delete account
router.delete('/bankuser/delete-account/:acno',jwtMiddleware,accountDelete)

//to connect the router with index.js  i.e export router

module.exports=router