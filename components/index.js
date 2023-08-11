const express = require('express')
const router = express()
const bankRouter = require('./bank')
const userRouter = require('./user')
const { urlNotFound } = require('../middleware/ErrorHandler')

router.use('/bank', bankRouter)
router.use('/user', userRouter)

// router.use(urlNotFound)
module.exports = router