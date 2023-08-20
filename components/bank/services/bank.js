const db = require("../../../models")

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
    static async getAllBanks() {
        // try {
        //     if (Bank.allBanks.length == 0) {
        //         throw new Error("Not Found")
        //     }
        //     return Bank.allBanks
        // } catch (error) {
        //     throw error
        // }
        try {
            let bank = await db.bank.findAll({include:db.account})
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
            let bank = await db.bank.findOne({where: { id: bankId } },{include: db.account})
            console.log(bank)
            return bank
        } catch (error) {
            throw error
        }
    }

    // updateBankName(newValue) {
    //     return this.bankName = newValue
    // }
    
    static async updateBank(bankId, newValue) {
        // try {
        //     let indexOfBank = Bank.findBank(bankId)
        //     Bank.allBanks[indexOfBank].updateBankName(newValue)
        //     return Bank.allBanks[indexOfBank]
        // } catch (error) {
        //     throw error
        // }

        try {
            let bank = await db.bank.update({bankName   :newValue},{where:{id:bankId}})
            return bank
        } catch (error) {
            throw error
        }
    }
    // static findBank(bankID) {
    //     try {
    //         for (let index = 0; index < Bank.allBanks.length; index++) {
    //             if (bankID == Bank.allBanks[index].bankId) {
    //                 return index
    //             }
    //         }
    //         throw new NotFound("bank ID not found")
    //     }
    //     catch (error) {
    //         throw error
    //     }
    // }
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

// SELECT "bank"."id", "bank"."bank_name" AS "bankName", "bank"."created_at" AS "createdAt", "bank"."updated_at" AS "updatedAt", "bank"."deleted_at" AS "deletedAt", "accounts"."id" AS "accounts.id", "accounts"."bank_id" AS "accounts.bankId", "accounts"."user_id" AS "accounts.userId", "accounts"."balance" AS "accounts.balance", "accounts"."created_at" AS "accounts.createdAt", "accounts"."updated_at" AS "accounts.updatedAt", "accounts"."deleted_at" AS "accounts.deletedAt" FROM "banks" AS "bank" LEFT OUTER JOIN "accounts" AS "accounts" ON "bank"."id" = "accounts"."bank_id" AND ("accounts"."deleted_at" IS NULL) WHERE ("bank"."deleted_at" IS NULL);