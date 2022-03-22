const express = require('express')
const { checkPropertyAuth } = require('../../midleware/checkAuth')
const { propertyModel } = require('../../model/property')
const { tokenModel } = require('../../model/token')
const createPropertyRoute = express.Router()

createPropertyRoute.post('/create', async (req, res) => {
    try {
        await checkPropertyAuth(req.user)
        let body = req.body
        let newProperty = new propertyModel(body)
        let response = await newProperty.save()
        if (response) {
            await createToken(body.propertyId, body)
            res.send({ message: 'Property is added' })
        } else {
            res.send({ message: 'Something is worng' })
        }
    } catch (error) {
        res.send(error)
    }
})

const createToken = async (propertyId, body) => {
    try {
        for (let i = 0; i < 8; i++) {
            const newToken = new tokenModel({
                propertyId: propertyId,
                linkToProperty: "",
                propertyIdServiceProvider: "",
                propertyInfo: body.propertyInfo,
                pacasoName: "",
                blockchainAddress: "",
                ownerId: "",
                ownershipPercentage: "12.5%",
                tokenId: "",
                identityServiceProvider: "",
                purchasePrice: 0,
                purchaseDate: "",
                salePrice: "",
                loanAmount: "",
                lender: "",
                loanIntrestRate: "",
                loanTerm: "",
                loanType: "",
                loanCurrency: ""
            })
            await newToken.save()
        }
        return true
    } catch (error) {
        throw error
    }
}

module.exports = createPropertyRoute;