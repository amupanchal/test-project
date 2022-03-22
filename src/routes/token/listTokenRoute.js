const express = require('express');
const { checkTokenAuth } = require('../../midleware/checkAuth');
const { tokenModel } = require('../../model/token');
const tokenListRouter = express.Router()

tokenListRouter.post('/list', async (req, res) => {
    try {
        await checkTokenAuth(req.user)
        let body = req.body
        let user = req.user
        let filter = { propertyId: body.propertyId }
        if (user.role == 'Owner') {
            filter = { blockchainAddress: user.blockchainAddress }
        }
        let response = await tokenModel.find(filter)
        if (response) {
            res.send({ data: response })
        } else {
            res.send({ message: 'Something is worng' })
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = tokenListRouter;