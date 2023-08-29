const { NotFound, ValidationError } = require("../../../error")
const Bank = require("../../bank/services/bank")
const PassBook = require("../../passbook/services/passbook")
const User = require("../../user/services/user")
const db = require("../../../models")
const { Op } = require("sequelize")

class Account {
    static accountId = 0
    constructor(bankID, userID, balance) {
        this.bankId = bankID
        this.userId = userID
        this.balance = balance
        this.passBook = []
    }
    static async createAccount(userId, bankId, balance) {
        let transaction = await db.sequelize.transaction()
        try {
            let accObj = new Account(bankId, userId, balance)
            let rowBank = await db.account.create(accObj,{transaction:transaction})
            transaction.commit()
            return rowBank
        } catch (error) {
            transaction.rollback()
            throw error
        }
    }
    static async getAllAccount(userid) {
        // let userIndex = User.findUser(userid)
        // return User.allUsers[userIndex].accounts
        let transaction = await db.sequelize.transaction()
        try {
            let accounts = await db.account.findAll({ include: db.passbook, where: { userId: userid } ,  transaction: transaction })
            transaction.commit()
            return accounts
        } catch (error) {
            transaction.rollback()
            throw error
        }
    }
    static async getAccountById(userid, accountid) {
        let transaction = await db.sequelize.transaction()
        try {
            let accounts = await db.account.findOne({ include: db.passbook }, { where: { userId: userid, id: accountid } ,  transaction: transaction } )
            transaction.commit()
            return accounts
        } catch (error) {
            transaction.rollback()
            throw error
        }
    }
    static async updateAccount(userID, accountID, parameter, newValue) {
        try {
            let account
            switch (parameter) {
                case "balance":
                    account = await db.account.update({ balance: newValue }, { where: { id: accountID, userId: userID } })
                    return account
                default:
                    throw new ValidationError("not a valid parameter")
            }
        } catch (error) {
            throw error
        }
    }
    static async deleteAccount(userID, bankID, accountID) {
        let transaction = await db.sequelize.transaction()
        try {
            let account = await db.account.destroy({
                where: { id: accountID, userId: userID, bankId: bankID }, transaction: transaction 
            })
            transaction.commit()
            return "Succcesfully Deleted"
        } catch (error) {
            transaction.rollback()
            return error
        }

    }
    static async deposit(userID, accountID, amount) {
        let transaction = await db.sequelize.transaction()
        try {
            let passBook = await Account.depositUtility(userID, accountID, amount, transaction) 
            await transaction.commit();
            return passBook

        } catch (error) {
            await transaction.rollback() 
            throw error
        }
    }
    static async depositUtility(userID,accountID,amount,transaction){
        try {
            let accounts = await db.account.findOne({ where: { userId: userID, id: accountID } },
                { transaction: transaction })
            let newAmount = (accounts.balance) + amount
            let account = await db.account.update({ balance: newAmount }, { where: { id: accountID, userId: userID } ,transaction: transaction})
            let passBookObj = new PassBook(accountID, new Date(), "credited", amount, newAmount)
            let passBook = await db.passbook.create(passBookObj, { transaction: transaction })
            return passBook
        } catch (error) {
            throw error
        }
    }
    static async withdrawUtility(userID, accountID, amount, transaction) {
        try {
            let accounts = await db.account.findOne({ where: { userId: userID, id: accountID } },
                { transaction: transaction })
            let newAmount = (accounts.balance) - amount
            let account = await db.account.update({ balance: newAmount }, {
                where: { id: accountID, userId: userID },
                transaction: transaction
            })
            let passBookObj = new PassBook(accountID, new Date(), "debited", amount, newAmount)
            let passBook = await db.passbook.create(passBookObj, { transaction: transaction })
            return passBook
        } catch (error) {
            throw error
        }
    }
    static async withdraw(userID, accountID, amount) {
        let transaction = await db.sequelize.transaction()
        try {
            let passBook = await Account.withdrawUtility(userID, accountID, amount, transaction)
            await transaction.commit();
            return passBook
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
    static async transfer(amount, fromAccountID, senderUserID, recieverUserID, recieverAccountID) {
        const transaction = await db.sequelize.transaction();
        try {
            Account.withdrawUtility(senderUserID, fromAccountID, amount, transaction)
            Account.depositUtility(recieverUserID, recieverAccountID, amount, transaction)
            await transaction.commit();
            return "Transfer Done Successfully"
        } catch (error) {
            await transaction.rollback();
            throw error
        }
    }
    static async getPassBook(accountID, fromDate, toDate, offset = 0, limit = 10) {
        try {
            const whereClause = {
                accountId: accountID
            };

            if (fromDate && toDate) {
                whereClause.date = {
                    [Op.between]: [fromDate, toDate]
                };
            }

            const passbook = await db.passbook.findAll({
                offset: offset,
                limit: limit,
                where: whereClause
            });

            return passbook;
        } catch (error) {
            throw error;
        }
    }

}
module.exports = Account

