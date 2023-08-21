const db = require("../../../models")
const { Op } = require("sequelize");

class Bank {
    static bankId = 0
    static allBanks = []
    constructor(bankName) {
        this.bankId = Bank.bankId++
        this.bankName = bankName
        this.accountsInBank = []
    }
    static async createBank(bankName) {
        // try {
        //     let bankObj = new Bank(bankName)
        //     Bank.allBanks.push(bankObj)
        //     return bankObj
        // } catch (error) {
        //     throw error
        // }
        try {
            let bankObj = new Bank(bankName)
            let rowBank = await db.bank.create(bankObj)
            return rowBank
        } catch (error) {
            throw error
        }

    }
    static async getAllBanks(offset = 0, limit = 5) {
        // try {
        //     if (Bank.allBanks.length == 0) {
        //         throw new Error("Not Found")
        //     }
        //     return Bank.allBanks
        // } catch (error) {
        //     throw error
        // }
        try {
            let bank = await db.bank.findAndCountAll({
                limit: limit, offset: offset, include: {
                    model: db.account,
                    include: db.passbook
                }
            })
            return bank
        } catch (error) {
            throw error
        }
    }
    static async getBankById(bankId) {
        // try {
        //     // console.log("in id")
        //     let bankIndex = Bank.findBank(bankId)
        //     return Bank.allBanks[bankIndex]
        // } catch (error) {
        //     throw error
        // }
        try {
            let bank = await db.bank.findOne({
                include: {
                    model: db.account,
                    include: db.passbook
                }, where: { id: bankId }
            })
            return bank
        } catch (error) {
            throw error
        }
    }
    static async updateBank(bankId, newValue) {
        // try {
        //     let indexOfBank = Bank.findBank(bankId)
        //     Bank.allBanks[indexOfBank].updateBankName(newValue)
        //     return Bank.allBanks[indexOfBank]
        // } catch (error) {
        //     throw error
        // }

        try {
            let bank = await db.bank.update({ bankName: newValue }, { where: { id: bankId } })
            return bank
        } catch (error) {
            throw error
        }
    }
    static async deleteBank(bankId) {
        // try {
        //     let indexOfBank = Bank.findBank(bankId)
        //     Bank.allBanks.splice(indexOfBank, 1)
        //     return "Sucessfully deleted"
        // } catch (error) {
        //     return error
        // }

        try {
            let bank = await db.bank.destroy({
                where: { id: bankId }
            })
            return "Succcesfully Deleted"
        } catch (error) {
            return error
        }
    }
}
module.exports = Bank

