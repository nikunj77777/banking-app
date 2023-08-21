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
}

module.exports=PassBook