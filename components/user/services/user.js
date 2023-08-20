const { NotFound } = require("../../../error")
const bcrypt = require('bcrypt');
const db = require("../../../models")

class User {
    static userId = 0
    static allUsers = []
    constructor(fullName, age, gender, password, isAdmin) {
        this.Id = User.userId++
        this.fullName = fullName
        this.age = age
        this.gender = gender
        this.isAdmin = isAdmin
        this.password = password
        this.accounts = []
    }
    static async createAdmin(fullName, age, gender, password) {
        try {
            // let hash = User.hashPassword(password)
            let userObj = new User(fullName, age, gender, password, true)
            // userObj.password = await hash
            let rowBank = await db.user.create(userObj)
            return rowBank
        }
        catch (error) {
            throw error
        }
    }
    static async createUser(fullName, age, gender, password) {
        try {
            // let hash = User.hashPassword(password)
            let userObj = new User(fullName, age, gender, password, false)
            // userObj.password = await hash
            let rowBank = await db.user.create(userObj)
            return rowBank
        } catch (error) {
            throw error
        }
    }

    static hashPassword(password) {
        try {
            let hash = bcrypt.hash(password, 12)
            return hash
        } catch (error) {
            throw error
        }
    }

    static comparePassword(password, hash) {
        try {
            let cmp = bcrypt.compare(password, hash)
            return cmp
        } catch (error) {

        }
    }
    getId() {
        return this.Id
    }
    getAccount() {
        return this.accounts
    }
    static findUser(userId) {
        try {
            for (let index = 0; index < User.allUsers.length; index++) {
                if (userId == User.allUsers[index].Id) {
                    return index
                }
            }
            throw new NotFound("User ID not found")
        }
        catch (error) {
            throw error
        }
    }
    static async getUserById(userId) {
        // try {
        //     let userIndex = User.findUser(userId)
        //     return User.allUsers[userIndex]
        // } catch (error) {
        //     throw error
        // }
        try {
            let user = await db.user.findOne({where: { id: userId } },{include: db.account})
            return user
        } catch (error) {
            throw error
        }
    }
    static async getAllUser() {
        // try {
        //     return User.allUsers
        // } catch (error) {
        //     return error
        // }

        try {
            let user = await db.user.findAll({include:db.account})
            return user
        } catch (error) {
            throw error
        }
    }
    static async updateUser(ID, parameter, newValue) {
        try {
            let user
            switch (parameter) {
                case "fullName":
                    user = await db.user.update({fullName:newValue},{where:{id:ID}})
                    return user
                case "gender":
                    user = await db.user.update({gender:newValue},{where:{id:ID}})
                    return user
                case "age":
                    user = await db.user.update({age:newValue},{where:{id:ID}})
                    return user
                default:
                    throw new ValidationError("Not a Valid Parameter")
            }
        }
        catch (error) {
            throw error
        }
    }
    static async deleteUser(userId) {
        // try {
        //     if (typeof userId != "number") {
        //         throw new ValidationError("user ID not valid")
        //     }
        //     let indexOfUser = this.findUser(userId)
        //     User.allUsers.splice(indexOfUser, 1)
        //     return "deleted succesfully"
        // } catch (error) {
        //     return error
        // }
        try {
            try {
                let user = await db.user.destroy({
                    where: { id: userId }
                })
                return "Succcesfully Deleted"
            } catch (error) {
                return error 
            }
        } catch (error) {
            
        }
    }
}

module.exports = User