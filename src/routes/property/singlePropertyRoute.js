const express = require('express')
const { propertyModel } = require('../../model/property');
const { tokenModel } = require('../../model/token');
const getSinglePropetyRoute = express.Router()

getSinglePropetyRoute.get('/get/:id', async (req, res) => {
    try {
        let select;
        (req.user && req.user.role && (req.user.role == 'Admin' || req.user.role == 'Owner' || req.user.role == 'Property Manager')) ? '' : select = '-lastTokenPrice';
        let getSingleProperty = await propertyModel.findById(req.params.id).select(select).lean()
        if (getSingleProperty && !getSingleProperty.is_deleted) {
            if (req.user && req.user.role && (req.user.role == 'Admin' || req.user.role == 'Owner' || req.user.role == 'Property Manager')) {
                let filters = { $and: [{ propertyId: getSingleProperty.propertyId }] }
                if (req.user.role == 'Admin') {
                    filters.$and.push({ blockchainAddress: req.user.blockchainAddress })
                }
                getSingleProperty.token = await tokenModel.aggregate([
                    { $match: filters },
                    {
                        $project: {
                            '_id': 1, 'tokenId': 1, 'blockchainAddress': 1, 'purchasePrice': 1, 'purchaseDate': 1, 'ownershipPercentage': 1
                        }
                    }
                ])
            }
            res.send(getSingleProperty)
        } else {
            throw { message: 'Property Not Found' }
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = getSinglePropetyRoute;