const jwt = require('jsonwebtoken')
const Unauthorized = require('../error/UnAuthorizedError')
const { NotFound } = require('../error')
require('dotenv').config()

class JWTMiddleware {
    constructor(userid, isAdmin) {
        this.userid = userid
        this.isAdmin = isAdmin
    }
    static sign(userid, isAdmin) {
        try {

            return jwt.sign(JSON.stringify(new JWTMiddleware(userid, isAdmin)), process.env.SECRET_KEY_FOR_AUTH)
        } catch (error) {
            throw error
        }
    }
    static verify(token) {
        try {
            let payload = jwt.verify(token, process.env.SECRET_KEY_FOR_AUTH)
            return payload
        }
        catch (error) {
            throw error
        }
    }
    static verifyWithCookie(req, resp, next) {
        try {
            const token = req.cookies[process.env.COOKIE_NAME_AUTH]
            if (!token) {
                throw new Unauthorized("Not Authorized")
            }
            return JWTMiddleware.verify(token)
        } catch (error) {
            next(error)
        }
    }
    static verifyAdminWithCookie(req, resp, next) {
        try {
            let payload = JWTMiddleware.verifyWithCookie(req, resp, next)
            if (!payload.isAdmin) {
                throw new Unauthorized("Not admin")
            }
            next()
        } catch (error) {
            next(error)
        }
    }
    static verifyUserWithCookie(req, resp, next) {
        try {
            let payload = JWTMiddleware.verifyWithCookie(req, resp, next)
            if (payload.isAdmin) {
                throw new Unauthorized("Not customer")
            }
            next()
        } catch (error) {
            next(error)
        }
    }
    static verifyUserId(req, resp, next) {
        try {
            let payload = JWTMiddleware.verifyWithCookie(req, resp, next)
            if (payload.userid != req.params.userid) {
                throw new Unauthorized("Id doesnt match")
            }
        } catch (error) {
            next(error)
        }
    }
    static verifyAdminWithHeader(req, resp, next) {
        try {

            const token = req.headers['authorization']
            if (!token) {
                throw new NotFound("Header not Found")
            }
           
            let tokenl = token.slice(7)

            let payload = JWTMiddleware.verify(tokenl)


            if (!payload.isAdmin) {
                throw new Unauthorized("Not an Admin")
            }
            next()
        } catch (error) {

        }
    }
}

module.exports = JWTMiddleware