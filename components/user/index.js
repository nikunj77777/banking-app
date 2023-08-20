const express = require('express')

const userRouter = express()

const { createUser,createAdmin,getAllUser,getUserById,updateUser,deleteUser,} = require('./controller/user')

const{login,logout}=require('./controller/login')

const accountRouter = require('../account/index')


const JWTMiddleware = require('../../middleware/Authentication')

userRouter.post('/login',login)
userRouter.post('/logout',logout)


// userRouter.get('/',JWTMiddleware.verifyAdminWithCookie, getAllUser)
// userRouter.get('/:id',JWTMiddleware.verifyAdminWithCookie,getUserById)
// userRouter.post('/',JWTMiddleware.verifyAdminWithCookie,createUser)
// userRouter.put('/:id',JWTMiddleware.verifyAdminWithCookie, updateUser)
// userRouter.delete('/:id',JWTMiddleware.verifyAdminWithCookie,deleteUser)

userRouter.post('/admin', createAdmin)
userRouter.post('/',createUser)
userRouter.get('/', getAllUser)
userRouter.get('/:id', getUserById)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id',deleteUser)




userRouter.use('/:userid/account',accountRouter)


module.exports = userRouter 