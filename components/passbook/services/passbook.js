const Account = require("../../account/services/account")
const User = require("../../user/services/user")

class PassBook{
    constructor(accountId,date, status, amount, balance){
        this.accountId=accountId
        this.date = date
        this.status = status
        this.amount = amount
        this.balance = balance
    }
    static getPassBook(userID,accountID){
        let indexOfUser = User.findUser(userID)
        let indexOfAccount = Account.findAccount(userID,accountID)
        return User.allUsers[indexOfUser].accounts[indexOfAccount].passBook
    }
}

module.exports=PassBook