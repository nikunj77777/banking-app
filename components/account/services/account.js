const { NotFound, ValidationError } = require("../../../error")
const Bank = require("../../bank/services/bank")
const PassBook = require("../../passbook/services/passbook")
const User = require("../../user/services/user")
const db = require("../../../models")

class Account {
    static accountId = 0
    constructor(bankID,userID,balance) {
        this.bankID=bankID
        this.userID=userID
        this.balance = balance
        this.passBook = []
    }
    static async createAccount(userId, bankId, balance) {
        // try {
        //     let accountObj = new Account(balance)
        //     let indexOfBank = Bank.findBank(bankId)
        //     let userIndex = User.findUser(userid)
        //     Bank.allBanks[indexOfBank].accountsInBank.push(accountObj)
        //     User.allUsers[userIndex].accounts.push(accountObj)
        //     return accountObj
        // } catch (error) {
        //     throw error
        // }
        try {
            let accObj = new Account(bankId,userId,balance)
            let rowBank = await db.account.create(accObj)
            return rowBank
        } catch (error) {
            throw error
        }
    }
    static getAllAccount(userid) {
        let userIndex = User.findUser(userid)
        return User.allUsers[userIndex].accounts
    }
    static findAccount(userID, accountId) {

        try {
            let indexOfUser = User.findUser(userID)
            for (let index = 0; index < User.allUsers[indexOfUser].accounts.length; index++) {
                if (accountId == User.allUsers[indexOfUser].accounts[index].id) {
                    return index
                }
            }
            throw new NotFound("Account ID not Found")
        } catch (error) {
            throw error
        }
    }
    static updateAccount(userID, accountID, parameter, newValue) {
        try {
            let indexOfUser = User.findUser(userID)
            let indexOfAccount = Account.findAccount(userID, accountID)
            switch (parameter) {
                case "balance":
                    User.allUsers[indexOfUser].accounts[indexOfAccount].balance = newValue
                    // Bank.allBanks[indexOfBank].accountsInBank[indexOfAccount].balance= newValue
                    return User.allUsers[indexOfUser].accounts
                default:
                    throw new ValidationError("not a valid parameter")
            }
        } catch (error) {
            throw error
        }
    }
    static deleteAccount(userID, bankID, accountID) {
        let indexOfUser = User.findUser(userID)
        let indexOfAccount = Account.findAccount(userID, accountID)
        let indexOfBank = Bank.findBank(bankID)

        User.allUsers[indexOfUser].accounts.splice(indexOfAccount, 1)
        Bank.allBanks[indexOfBank].accountsInBank.splice(indexOfAccount, 1)

        return "deleted successfully"
    }
    static deposit(userID, accountID, amount) {
        try {
            let indexOfUser = User.findUser(userID)
            let indexOfAccount = Account.findAccount(userID, accountID)
            User.allUsers[indexOfUser].accounts[indexOfAccount].balance += amount
            let passBookObj = new PassBook(new Date(), "credited", amount, User.allUsers[indexOfUser].accounts[indexOfAccount].balance)
            User.allUsers[indexOfUser].accounts[indexOfAccount].passBook.push(passBookObj)
            return User.allUsers[indexOfUser].accounts[indexOfAccount].balance
        } catch (error) {
            throw error
        }
    }
    static withdraw(userID, accountID, amount) {
        try {
            let indexOfUser = User.findUser(userID)
            let indexOfAccount = Account.findAccount(userID, accountID)
            User.allUsers[indexOfUser].accounts[indexOfAccount].balance -= amount
            let passBookObj = new PassBook(new Date(), "debited", amount, User.allUsers[indexOfUser].accounts[indexOfAccount].balance)
            User.allUsers[indexOfUser].accounts[indexOfAccount].passBook.push(passBookObj)
            return User.allUsers[indexOfUser].accounts[indexOfAccount].balance

        } catch (error) {
            throw error
        }
    }
    static findRecieverAccount(obj, accountID) {
        try {
            for (let index = 0; index < obj.accounts.length; index++) {
                if (accountID == obj.accounts[index].id) {
                    return index
                }
            }
            throw new NotFound("receiver account not found")
        } catch (error) {
            throw error
        }
    }
    static transfer(amount, fromAccountID, senderUserID, recieverUserID, recieverAccountID) {
        try {
            let indexOfReceiver = User.findUser(recieverUserID)
            let indexOfSender = User.findUser(senderUserID)
            let reciever = User.allUsers[indexOfReceiver]
            let sender = User.allUsers[indexOfSender]
            let indexOfReceiverAccount = Account.findRecieverAccount(reciever, recieverAccountID)
            let indexOfSenderAccount = Account.findRecieverAccount(sender, fromAccountID)
            // console.log("Info down ")
            // console.log(User.allUsers[indexOfSender].accounts[indexOfSenderAccount])
            let senderAccount = User.allUsers[indexOfReceiver].accounts[indexOfReceiverAccount]
            let receiverAccount = User.allUsers[indexOfSender].accounts[indexOfSenderAccount]
            if (senderAccount.balance >= amount) {
                senderAccount.balance -= amount;
                let senderPassBookObj = new PassBook(new Date(), "debited", amount, senderAccount.balance);
                senderAccount.passBook.push(senderPassBookObj);

                receiverAccount.balance += amount;
                let receiverPassBookObj = new PassBook(new Date(), "credited", amount, receiverAccount.balance);
                receiverAccount.passBook.push(receiverPassBookObj);

                return receiverAccount;
            } else {
                throw new Error("Insufficient balance for transfer");
            }
            // User.allUsers[indexOfSender].accounts[indexOfSenderAccount] .withdraw(senderUserID,fromAccountID,amount)
            // reciever.accounts[indexOfReceiverAccount].deposit(recieverUserID,recieverAccountID,amount)
        } catch (error) {
            throw error
        }
    }
    static getPassBook(userID, accountID) {
        try {
            let indexOfUser = User.findUser(userID)
            let indexOfAccount = Account.findAccount(userID, accountID)
            return User.allUsers[indexOfUser].accounts[indexOfAccount].passBook
        } catch (error) {
            throw error
        }
    }
}



module.exports = Account

