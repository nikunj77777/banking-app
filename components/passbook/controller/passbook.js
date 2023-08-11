const PassBook = require("../services/passbook")

const getPassBook=(req,resp,next)=>{
        let{userid,accountid}=req.params
        userid=parseInt(userid)
        accountid=parseInt(userid)
        if (typeof userid != "number") {
            throw new ValidationError("USERID is not Valid")
        }
        if (typeof accountid != "number") {
            throw new ValidationError("ACC ID is not Valid")
        }
        let passbook = PassBook.getPassBook(userid,accountid)
        resp.status(201).send(passbook)
}

module.exports={getPassBook}