const express = require('express')
const http = require('http-status-codes')
const application = express()
const router = require('./components')
const { errorMiddleware, urlNotFound } = require('./middleware/ErrorHandler')
const Bank = require('./components/bank/services/bank')
const cookieParser = require('cookie-parser')
const User = require('./components/user/services/user')
application.use(express.json())
application.use(cookieParser())

application.use('/api/v1/bankingapp', router)
application.use(errorMiddleware)
application.use(urlNotFound)



application.listen(9000, () => {
    // User.createAdmin("Nikunj Gandhi",21,"Male","nikunj123")
    console.log("started at 9000");
})