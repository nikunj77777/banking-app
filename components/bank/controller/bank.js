const { ValidationError } = require("../../../error")
const Bank = require("../services/bank")
const http = require('http-status-codes')

const getAllBanks = async (req, resp, next) => {
    try {
        let { offset, limit } = req.query
        if (offset && limit) {
            offset = parseInt(offset)
            limit = parseInt(limit)
            if (typeof offset != "number" || offset<0) {
                throw new ValidationError('Offset not valid')
            }
            if (typeof limit != "number" || limit<0) {
                throw new ValidationError('Limit not valid')
            }
            let allBanks = await Bank.getAllBanks(offset, limit)
            resp.status(201).send(allBanks)
        }
        let allBanks = await Bank.getAllBanks()
        resp.status(201).send(allBanks)

    } catch (error) {
        next(error)
    }

}
const createBank = async (req, resp, next) => {
    try {
        const name = req.body.bankName
        if (typeof name != "string") {
            throw new ValidationError('Name not valid')
        }
        const bankObj = await Bank.createBank(name)
        resp.status(http.StatusCodes.ACCEPTED).send(bankObj)
    } catch (error) {
        next(error)
    }
}
const getBankById = async (req, resp, next) => {
    try {
        let { id } = req.params
        id = parseInt(id)
        if (typeof id != "number") {
            throw new ValidationError("Bank ID not Valid")
        }
        let bankObj = await Bank.getBankById(id)
        resp.status(http.StatusCodes.ACCEPTED).send(bankObj)
    } catch (error) {
        next(error)
    }

}
const updateBank = async (req, resp, next) => {
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
        let bankObj = await Bank.updateBank(id, newValue)
        resp.status(http.StatusCodes.ACCEPTED).send(bankObj)
    } catch (error) {
        next(error)
    }
}
const deleteBank = async (req, resp, next) => {
    try {
        let { id } = req.params
        id = parseInt(id)
        if (typeof id != "number") {
            throw new ValidationError("Bank id not valid")
        }
        let msg = await Bank.deleteBank(id)
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