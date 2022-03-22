const express = require('express');
const { checkTokenAuth } = require('../../midleware/checkAuth');
const { transactionModel } = require('../../model/transaction');
const transactionListRouter = express.Router()

transactionListRouter.post('/list', async (req, res) => {
    try {
        await checkTokenAuth(req.user)
        let body = req.body
        let user = req.user
        let filter = { tokenId: body.tokenId }
        if (user.role == 'Owner') {
            filter = { $and: [{ toBlockchainAddress: user.toBlockchainAddress }, { tokenId: body.tokenId }] }
        }
        let response = await transactionModel.find(filter)
        if (response) {
            res.send({ data: response })
        } else {
            res.send({ message: 'Something is worng' })
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = transactionListRouter;