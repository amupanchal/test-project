const express = require('express')
const { checkUserAuth } = require('../../midleware/checkAuth')
const createUserRoute = express.Router()
const { userModel } = require('../../model/user')

createUserRoute.post('/create', async (req, res) => {
    try {
        await checkUserAuth(req.user)
        let body = req.body
        let newUser = new userModel(body)
        let response = await newUser.save()
        if (response) {
            res.send({ message: 'User added' })
        } else {
            res.send({ message: 'Something is worng' })
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = createUserRoute;