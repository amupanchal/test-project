const jwt = require('jsonwebtoken')
const { userModel } = require('../model/user')
let secretKey = 'pocSecrete'

exports.genrateToken = async (userInfo) => {
    try {
        let token = jwt.sign(userInfo, secretKey, { expiresIn: '1h' })
        return token
    } catch (error) {
        throw error
    }
}


exports.verifyToken = async (token) => {
    try {
        if (token) {
            let decodeToken = jwt.verify(token, secretKey)
            let getUser = await userModel.findById(decodeToken._id)
            return { _id: getUser._id, role: getUser.role, blockchainAddress: getUser.blockchainAddress }
        } else {
            throw { code: 503, message: 'Please Provide a authorization token' }
        }
    } catch (error) {
        throw error
    }
}