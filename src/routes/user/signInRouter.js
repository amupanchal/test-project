const express = require('express')
const { genrateToken } = require('../../midleware/jwtAuth')
const { userModel } = require('../../model/user')
const signInRouter = express.Router()

signInRouter.post('/sign-in', async (req, res) => {
    try {
        let body = req.body
        let findUser = await userModel.findOne({ blockchainAddress: body.blockchainAddress })
        if (findUser) {
            const token = await genrateToken({ _id: findUser._id })
            res.json({ role: findUser.role, token: token })
        } else {
            let newUser = userModel({
                email: "",
                role: "Public",
                blockchainAddress: body.blockchainAddress
            })
            let response = await newUser.save()
            if (response) {
                const token = await genrateToken({ _id: response._id })
                res.json({ role: response.role, token: token })
            } else {
                res.send({ messsage: 'something is worong' })
            }
        }
    } catch (error) {
        res.send({ messsage: 'something is worong' })
    }
})

module.exports = signInRouter;