const express = require('express')
const { checkPropertyAuth } = require('../../midleware/checkAuth')
const { updateObject } = require('../../midleware/genric')
const { propertyModel } = require('../../model/property')
const updatePropetyRoute = express.Router()

updatePropetyRoute.put('/update/:id', async (req, res) => {
    try {
        await checkPropertyAuth(req.user)
        let _id = req.params.id
        let body = req.body
        let getSingleProperty = await propertyModel.findById({ _id }).lean();
        if (getSingleProperty) {
            let updatedObjected = await updateObject(getSingleProperty, body)
            updatedObjected._id = _id
            let propertyupdate = await propertyModel.findByIdAndUpdate({ _id }, { $set: updatedObjected, new: true })
            if (propertyupdate) {
                res.send({ message: 'Property is updated ' })
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

module.exports = updatePropetyRoute;