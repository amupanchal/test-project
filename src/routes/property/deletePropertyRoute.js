const express = require('express')
const { checkPropertyAuth } = require('../../midleware/checkAuth')
const { propertyModel } = require('../../model/property')
const deletePropetyRoute = express.Router()

deletePropetyRoute.delete('/delete/:id', async (req, res) => {
    try {
        await checkPropertyAuth(req.user)
        let _id = req.params.id
        let getSingleProperty = await propertyModel.findOne({ _id })
        if (getSingleProperty) {
            getSingleProperty.is_active = false
            getSingleProperty.is_deleted = true
            let updateProperty = await propertyModel.findByIdAndUpdate({ _id: getSingleProperty._id }, { $set: getSingleProperty, new: true })
            if (updateProperty) {
                res.send({ message: 'Property is deleted' })
            } else {
                res.send({ message: 'Something is worng' })
            }
        } else {
            res.send({ message: 'Property not found' })
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = deletePropetyRoute;