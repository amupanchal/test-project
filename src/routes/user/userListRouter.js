const express = require('express');
const { checkUserAuth } = require('../../midleware/checkAuth');
const { userModel } = require('../../model/user');
const userListRouter = express.Router()

userListRouter.post('/list', async (req, res) => {
    try {
        await checkUserAuth(req.user)
        let response = await userModel.find({ "is_active": true }).sort({ createdAt: -1 })
        if (response) {
            res.send({ data: response })
        } else {
            res.send({ message: 'Something is worng' })
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = userListRouter;