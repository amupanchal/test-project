const express = require('express')
const { checkTokenAuth } = require('../../midleware/checkAuth')
const { tokenModel } = require('../../model/token')
const getSingletokenRoute = express.Router()

getSingletokenRoute.get('/get/:id', async (req, res) => {
    try {
        await checkTokenAuth(req.user)
        let _id = req.params.id
        let getSignleToken = await tokenModel.findOne({ _id })
        if (getSignleToken) {
            if (req.user.role == 'Admin') {
                if (getSignleToken.blockchainAddress != req.user.blockchainAddress) {
                    throw { message: "Unauthorized User" }
                }
            }
            res.send(getSignleToken)
        }
        else {
            res.send({ message: 'Token not found' })
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = getSingletokenRoute;