
const { ValidationError } = require("../../../error")
const Bank = require("../services/bank")
const http = require('http-status-codes')

const getAllBanks = (req, resp,next) => {
    try {
        let allBanks = Bank.getAllBanks()
        resp.status(201).send(allBanks)
    } catch (error) {
        next(error)
    }

}
const createBank = (req, resp,next) => {
    try {
        const name = req.body.bankName
        if (typeof name != "string") {

            throw new ValidationError('Name not valid')
        }
        const bankObj = Bank.createBank(name)
        resp.status(201).send(bankObj)

    } catch (error) {
        next(error)
    }
}
const getBankById = (req, resp,next) => {
    try {
        let { id } = req.params
        id = parseInt(id)
        // console.log("controller", id);
        if (typeof id != "number") {
            throw new ValidationError("Bank ID not Valid")
        }
        let bankObj = Bank.getBankById(id)
        // console.log(bankObj);
        resp.status(http.StatusCodes.ACCEPTED).send(bankObj)

    } catch (error) {
        if (!error.httpsStatusCode) {
            // console.log(error);
            resp.status(500).send(error.message)
            return
        }
        console.log(error.specificMessage)
        resp.status(error.httpsStatusCode).send(error.message)

    }

}
const updateBank = (req, resp,next) => {
    try {
        let { id } = req.params
        id = parseInt(id)
        if (typeof id != "number") {
            throw new ValidationError("Bank Id not Valid")
        }
        let { newValue } = req.body
        if (typeof newValue != "string") {
            throw new ValidationError("Value is not Valid")
        }
        let bankObj = Bank.updateBank(id, newValue)
        resp.status(http.StatusCodes.ACCEPTED).send(bankObj)
    } catch (error) {
        next(error)
    }
}
const deleteBank = (req, resp,next) => {
    try {
        let { id } = req.params
        id = parseInt(id)
        if (typeof id != "number") {
            throw new ValidationError("Bank id not valid")
        }
        let msg = Bank.deleteBank(id)
        resp.status(http.StatusCodes.OK).send(msg)
    } catch (error) {
        console.error(error)
        next(error)
    }
}
module.exports = {
    getAllBanks,
    getBankById,
    createBank,
    updateBank,
    deleteBank
}