const users = require("../models/collection")
const jwt=require("jsonwebtoken")

//register-account creation
register = (req, res) => {

    //destructing
    const { acno, psw, uname } = req.body
    //check user data in collection
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(400).json({
                message: "user already exist",
                status: false,
                statusCode: 400
            })
        }
        else {
            //create object for user
            let newUser = new users({
                acno,
                uname,
                psw,
                balance: 0,
                transactions: []
            })
            //save in db
            newUser.save()
            res.status(201).json({
                message: "account created successfully",
                status: true,
                statusCode: 201
            })

        }
    })

}

//login creation
login = (req, res) => {
    const { acno, psw } = req.body

    //check user data in collection
    users.findOne({ acno, psw }).then(user => {
        if (user) {

            //Token generation

            const token=jwt.sign({acno},"secretKey123")

            res.status(200).json({
                message: "login success",
                status: true,
                statusCode: 200,
                currentUser: user.uname,
                token
            })
        }
        else {
            res.status(400).json({
                message: "incorrect user account number or password",
                status: false,
                statusCode: 400
            })
        }
    })
}

//balance
getBalance = (req, res) => {
    //access acno from request params
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                message: user.balance,
                status: true,
                statusCode: 200,

            })
        }
        else {
            res.status(400).json({
                message: "User not exist",
                status: false,
                statusCode: 400
            })
        }
    })

}

//Money transfer

moneyTransfer = (req, res) => {
    //no params, sAcno is the sender accountnumber, rAcno is the recipient accountnumber
    const { sAcno, rAcno, psw, amount, date } = req.body

    //convert string to integer, in the form amount is stored in string
    var amnt = parseInt(amount)

    //check sender details
    users.findOne({ acno: sAcno, psw }).then(suser => {
        if (suser) {
            //check reciever details in db
            users.findOne({ acno: rAcno }).then(ruser => {
                if (ruser) {
                    //check amount in sender balance
                    if (amnt <= suser.balance) {

                        //update sender object
                        suser.balance = suser.balance - amnt
                        suser.transactions.push({ tacno: rAcno, amount: amnt, type: "DEBIT", date })
                        suser.save()

                        //update reciever object
                        ruser.balance = ruser.balance + amnt
                        ruser.transactions.push({ tacno: sAcno, amount: amnt, type: "CREDIT", date })
                        ruser.save()

                        res.status(200).json({
                            message: "TRANSACTION SUCCESSFULL!!!",
                            status: true,
                            statusCode: 200
                        })

                    }
                    else {
                        res.status(406).json({
                            message: "Insuffiecient balance",
                            status: false,
                            statusCode: 406
                        })
                    }
                }
                else {
                    res.status(404).json({
                        message: "Invalid credit credentials",
                        status: false,
                        statusCode: 404
                    })
                }
            })

        }
        else {
            res.status(404).json({
                message: "Invalid debit credentials",
                status: false,
                statusCode: 404
            })
        }
    })
}


//accountstatement
accountStatement = (req, res) => {
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                message: user.transactions,
                status: true,
                statusCode: 200,
            })
        }
        else {
            res.status(400).json({
                message: "User not exist",
                status: false,
                statusCode: 400
            })
        }
    })

}

//account delete

accountDelete=(req,res)=>{
    const {acno}=req.params
    users.deleteOne({acno}).then(data=>{
        if(data){
            res.status(200).json({
                message: "account deleted successfully",
                status: true,
                statusCode: 200,
            })
        }
       
    })
}

module.exports = { register, login, getBalance, moneyTransfer,accountStatement,accountDelete }