const { NotFound } = require("../../../error")
const bcrypt = require('bcrypt');
const db = require("../../../models");
const { Op } = require("sequelize");

class User {
    constructor(fullName, age, gender, password, isAdmin) {
        // this.Id = User.userId++
        this.fullName = fullName
        this.age = age
        this.gender = gender
        this.isAdmin = isAdmin
        this.password = password
        this.accounts = []
    }
    static async createAdmin(fullName, age, gender, password) {
        try {
            let hash = User.hashPassword(password)
            let userObj = new User(fullName, age, gender, password, true)
            userObj.password = await hash
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
    static async getUserById(userId) {
        // try {
        //     let userIndex = User.findUser(userId)
        //     return User.allUsers[userIndex]
        // } catch (error) {
        //     throw error
        // }
        try {
            let user = await db.user.findOne({include:{
                model: db.account,
                include: db.passbook
            },where: { id: userId } })
            return user
        } catch (error) {
            throw error
        }
    }
    static async getAllUser(age,isAdmin,fullName,gender) {
        try {
        let whereClause = {};
        if (typeof age !== 'undefined') {
            whereClause.age = { [Op.lte]: age };
        }
        if (typeof isAdmin !== 'undefined') {
            whereClause.isAdmin = { [Op.eq]: isAdmin };
        }
        if(typeof fullName!='undefined'){
            whereClause.fullName={[Op.eq]:fullName}
        }
        if(typeof gender !='undefined'){
            whereClause.gender={[Op.eq]:gender}
        }
        let user = await db.user.findAll({include:{
                model: db.account,
                include: db.passbook
            },where:whereClause})
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