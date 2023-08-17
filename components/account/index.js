const express = require('express')
const accountRouter = express.Router({ mergeParams: true })

// accountRouter.Rou
const { createAccount,getAllAccount,updateAccount,deleteAccount,deposit,withdraw,transfer, getPassBook} = require('./controller/account')
const passbookRouter = require('../passbook')
const JWTMiddleware = require('../../middleware/Authentication')
// accountRouter.use(JWTMiddleware.verifyUserWithCookie)
// accountRouter.use(JWTMiddleware.verifyUserId)

accountRouter.post('/', createAccount)
accountRouter.get('/', getAllAccount)
accountRouter.put('/', updateAccount)
accountRouter.delete('/', deleteAccount)

accountRouter.post('/:id/deposit',deposit)
accountRouter.post('/:id/withdraw',withdraw)
accountRouter.post('/:id/transfer',transfer)
accountRouter.get('/:id/passbook',getPassBook)

// accountRouter.use('/:accountid/passbook',passbookRouter)

module.exports = accountRouter 

