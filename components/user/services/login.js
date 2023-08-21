const Unauthorized = require("../../../error/UnAuthorizedError")
const JWTMiddleware = require("../../../middleware/Authentication")
const db = require("../../../models")
const User = require("./user")

const  login = async(userid, passwordd) => {
    try {
        let user = await db.user.findOne({where:{id:userid}})
        if(!await User.comparePassword(passwordd,user.password)){
            throw new Unauthorized("Password Does not Match")
        }
        return JWTMiddleware.sign(userid, user.isAdmin)
    } catch (error) {
        throw error
    }
}


module.exports = { login }
























// const JWTMiddleware = require("../../../middleware/Authentication")

// const login = (userID, password) => {
//     try {
//         //check for user
//         //findUSer by userid
//         //FounduserPassword == password
//         const isAdmin = true
//         //craete token
//         return JWTMiddleware.sign(userID, isAdmin)
//     } catch (error) {
//         throw error
//     }
// }
// module.exports = { login }