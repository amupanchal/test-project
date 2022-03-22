const express = require('express')
const { checkTokenAuth, transferTokenAuth } = require('../../midleware/checkAuth')
const { updateObject } = require('../../midleware/genric')
const { propertyModel } = require('../../model/property')
const { tokenModel } = require('../../model/token')
const { userModel } = require('../../model/user')
const transferTokenRoute = express.Router()

transferTokenRoute.put('/transfer-token', async (req, res) => {
    try {
        await checkTokenAuth(req.user)
        let tokenId = req.body.tokenId
        let body = req.body
        let singleToken = await tokenModel.findById({ _id: body._id }).lean()
        if (singleToken) {
            await transferTokenAuth(singleToken, body, req.user)
            let _id = singleToken._id
            let newToken = {
                _id: _id,
                ownershipPercentage: body.ownershipPercentage,
                blockchainAddress: body.newOwnerBlockchainAddress,
                ownerId: body.ownerId,
                tokenId: tokenId,
                identityServiceProvider: body.identityServiceProvider,
                purchasePrice: body.purchasePrice,
                purchaseDate: body.purchaseDate,
                purchaseCurrency: body.purchaseCurrency,
                loanAmount: body.loanAmount || '',
                lender: body.lender || '',
                loanIntrestRate: body.loanIntrestRate || '',
                loanTerm: body.loanTerm || '',
                loanType: body.loanType || '',
                loanCurrency: body.loanCurrency || '',
            }
            let updatedTokenObject = await updateObject(singleToken, newToken)
            updatedTokenObject._id = _id
            let response = await tokenModel.findByIdAndUpdate({ _id }, { $set: updatedTokenObject, new: true })
            if (response) {
                let getOwnerDetails = await userModel.findOne({ blockchainAddress: body.newOwnerBlockchainAddress })
                await createTransaction(singleToken, body)
                await updatePropertyAndUser(singleToken, getOwnerDetails, newToken)
                res.send({ message: 'transfer token done' })
            } else {
                res.send({ message: 'Something is worng' })
            }
        } else {
            res.send({ message: 'token not found' })
        }
    } catch (error) {
        res.send(error)
    }
})


let createTransaction = async (singleToken, body) => {
    try {
        let transctionObject = {
            identityServiceProvider: body.identityServiceProvider,
            fromOwnerId: singleToken.ownerId || 'Admin',
            toOwnerId: body.ownerId,
            fromBlockchainAddress: singleToken.blokchainAddress,
            toBlockchainAddress: body.newOwnerBlockchainAddress,
            ownershipPercentage: body.ownershipPercentage,
            tokenId: body.tokenId,
            purchasePrice: body.purchasePrice,
            purchaseCurrency: body.purchaseCurrency,
            purchaseDate: body.purchaseDate
        }
        let newtransctionToken = new transactionModel(transctionObject)
        let transctionEntry = await newtransctionToken.save()
        if (transctionEntry) {
            return true
        }
    } catch (error) {
        throw error
    }
}

let updatePropertyAndUser = async (singleToken, getOwnerDetails, newToken) => {
    try {
        let getSingleProperty = await propertyModel.findOne({ propetyId: singleToken._id })
        getSingleProperty.lastTokenPrice = newToken.purchasePrice
        await propertyModel.findOneAndUpdate({ _id: getSingleProperty._id }, { $set: getSingleProperty, new: true })
        if (getOwnerDetails.role == "Public") {
            getOwnerDetails.role = "Owner"
            await userModel.findByIdAndUpdate({ _id: getOwnerDetails._id }, { $set: getOwnerDetails, new: true })
        }
        if (singleToken.ownerId.length && singleToken.blockchainAddress.length) {
            let getToken = await tokenModel.find({ ownerId: singleToken.ownerId })
            if (getToken.length < 1) {
                let getOlderOwner = await userModel.findOne({ blockchainAddress: singleToken.blockchainAddress })
                getOlderOwner.role = "Public"
                await userModel.findByIdAndUpdate({ _id: getOlderOwner.ownerId }, { $set: getOlderOwner, new: true })
            }
        }
        return true
    } catch (error) {
        throw error
    }
}
module.exports = transferTokenRoute;