const { ValidationError } = require("../../../error")
const Account = require("../services/account")
const http = require('http-status-codes')

const createAccount = async(req, resp, next) => {
    try {
        let { userid } = req.params
        userid = parseInt(userid)
        let { bankid, balance } = req.body
        if (typeof balance != "number") {
            throw new ValidationError("Balance is not Valid")
        }
        if (typeof bankid != "number") {
            throw new ValidationError("Balance is not Valid")
        }
        const accountObj = await Account.createAccount(userid, bankid, balance)
        resp.status(http.StatusCodes.ACCEPTED).send(accountObj)
    } catch (error) {
        next(error)
    }

}

const getAllAccount = async (req, resp, next) => {
    try {
        let { userid } = req.params
        userid = parseInt(userid)
        if (typeof userid != "number") {
            throw new ValidationError("Balance is not Valid")
        }
        let allAccount = await Account.getAllAccount(userid)
        resp.status(201).send(allAccount)
    } catch (error) {
        next(error)
    }
}

const getAccountById = async (req, resp, next) => {
    try {
        let { userid ,id } = req.params
        userid = parseInt(userid)
        id = parseInt(id)
        if (typeof userid != "number") {
            throw new ValidationError("Balance is not Valid")
        }
        if (typeof id != "number") {
            throw new ValidationError("Balance is not Valid")
        }
        let allAccount = await Account.getAccountById(userid,id)
        resp.status(201).send(allAccount)
    } catch (error) {
        next(error)
    }
}


const updateAccount = async (req, resp, next) => {
    try {
        let { userid ,id} = req.params
        userid = parseInt(userid)
        id = parseInt(id)
        let {parameter, newValue } = req.body
        if (typeof id != "number") {
            throw new ValidationError("Account Id is not Valid")
        }
        if (typeof newValue != "number") {
            throw new ValidationError("Value is not Valid")
        }
        const accountObj = await Account.updateAccount(userid, id, parameter, newValue)
        resp.status(http.StatusCodes.ACCEPTED).send(accountObj)
    } catch (error) {
        next(error)
    }
}

const deleteAccount = async(req, resp, next) => {
    try {
        let { userid ,id} = req.params
        userid = parseInt(userid)
        id = parseInt(id)
        let { bankid } = req.body
        if (typeof bankid != "number") {
            throw new ValidationError("Bank Id is not Valid")
        }
        const msg = await Account.deleteAccount(userid, bankid, id)
        resp.status(http.StatusCodes.ACCEPTED).send(msg)
    } catch (error) {
        next(error)
    }
}

const deposit = (req, resp, next) => {
    try {

        let { userid, id } = req.params
        userid = parseInt(userid)
        id = parseInt(id)
        let { amount } = req.body
        if (typeof id != "number") {
            throw new ValidationError("Account Id is not Valid")
        }
        if (typeof amount != "number") {
            throw new ValidationError("Amount is not Valid")
        }
        const balance = Account.deposit(userid, id, amount)
        resp.status(http.StatusCodes.ACCEPTED).send({ balance })
    } catch (error) {
        next(error)
    }
}

const withdraw = (req, resp, next) => {
    try {
        let { userid, id } = req.params
        userid = parseInt(userid)
        id = parseInt(id)
        let { amount } = req.body
        if (typeof id != "number") {
            throw new ValidationError("Account Id is not Valid")
        }
        if (typeof amount != "number") {
            throw new ValidationError("Amount is not Valid")
        }
        const balance = Account.withdraw(userid, id, amount)
        resp.status(http.StatusCodes.ACCEPTED).send({ balance })

    } catch (error) {
        next(error)
    }
}

const transfer = (req, resp, next) => {
    try {
        let { userid, id } = req.params
        userid = parseInt(userid)
        id = parseInt(id)
        let { amount, recieverID, recieverAccID } = req.body
        if (typeof id != "number") {
            throw new ValidationError("Account Id is not Valid")
        }
        if (typeof amount != "number") {
            throw new ValidationError("Amount is not Valid")
        }
        const recieverObj = Account.transfer(amount, id, userid, recieverID, recieverAccID)
        resp.status(http.StatusCodes.ACCEPTED).send({recieverObj})
    } catch (error) {
        next(error)
    }
}
const getPassBook=(req,resp,next)=>{
    let{userid,id}=req.params
    userid=parseInt(userid)
    id=parseInt(id)
    if (typeof userid != "number") {
        throw new ValidationError("USERID is not Valid")
    }
    if (typeof id != "number") {
        throw new ValidationError("ACC ID is not Valid")
    }
    let passbook = Account.getPassBook(userid,id)
    resp.status(201).send(passbook)
}



module.exports = {
    createAccount,
    getAllAccount,
    getAccountById,
    updateAccount,
    deleteAccount,
    deposit,
    withdraw,
    transfer,
    getPassBook
}