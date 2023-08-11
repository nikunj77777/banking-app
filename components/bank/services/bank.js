class Bank {
    static bankId = 0
    static allBanks = []
    constructor(bankName) {
        this.bankId = Bank.bankId++
        this.bankName = bankName
        this.accountsInBank = []
    }
    static createBank(bankName) {
        try {
            let bankObj = new Bank(bankName)
            Bank.allBanks.push(bankObj)
            return bankObj
        } catch (error) {
            throw error
        }
    }
    static getAllBanks() {
        try {
            if (Bank.allBanks.length == 0) {
                throw new Error("Not Found")
            }
            return Bank.allBanks
        } catch (error) {
            throw error
        }
    }
    static getBankById(bankId) {
        try {
            // console.log("in id")
            let bankIndex = Bank.findBank(bankId)
            return Bank.allBanks[bankIndex]
        } catch (error) {
            throw error
        }
    }

    updateBankName(newValue) {
        return this.bankName = newValue
    }
    static updateBank(bankId, newValue) {
        try {
            let indexOfBank = Bank.findBank(bankId)
            Bank.allBanks[indexOfBank].updateBankName(newValue)
            return Bank.allBanks[indexOfBank]
        } catch (error) {
            throw error
        }
    }
    static findBank(bankID) {
        try {
            for (let index = 0; index < Bank.allBanks.length; index++) {
                if (bankID == Bank.allBanks[index].bankId) {
                    return index
                }
            }
            throw new NotFound("bank ID not found")
        }
        catch (error) {
            throw error
        }
    }
    static deleteBank(bankId) {
        try {
            let indexOfBank = Bank.findBank(bankId)
            Bank.allBanks.splice(indexOfBank, 1)
            return "Sucessfully deleted"
        } catch (error) {
            return error
        }
    }
}
module.exports = Bank