const Unauthorized = require("../../../error/UnAuthorizedError")
const JWTMiddleware = require("../../../middleware/Authentication")
const User = require("./user")

const  login = async(userid, passwordd) => {
    try {
        let userIndex = User.findUser(userid)
        if(!await User.comparePassword(passwordd,User.allUsers[userIndex].password)){
            throw new Unauthorized("Password Does not Match")
        }
        return JWTMiddleware.sign(userid, User.allUsers[userIndex].isAdmin)
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