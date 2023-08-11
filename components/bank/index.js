const express = require('express')
const bankRouter = express()
const { getAllBanks,getBankById,createBank,updateBank,deleteBank} = require('./controller/bank')
const JWTMiddleware = require('../../middleware/Authentication')

bankRouter.use(JWTMiddleware.verifyAdminWithCookie)

bankRouter.get('/', JWTMiddleware.verifyAdminWithHeader,getAllBanks)
bankRouter.get('/:id', getBankById)
bankRouter.post('/', createBank)
bankRouter.put('/:id', updateBank)
bankRouter.delete('/:id', deleteBank)




module.exports = bankRouter