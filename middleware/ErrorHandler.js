const BaseError = require("../error/BaseError")
const http = require('http-status-codes')

const errorMiddleware=(err,req,resp,next)=>{
    console.log(err)
    if(err instanceof BaseError){
        resp.status(err.httpsStatusCode).json({error:err.message})
        return
    }
    resp.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({error:err.message})
}

const urlNotFound=(req,resp,next)=>{
    resp.status(http.StatusCodes.NOT_FOUND).send({message : "Url not Found"})
}



module.exports={errorMiddleware,urlNotFound}