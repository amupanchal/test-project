const express = require('express')
const { checkUserAuth } = require('../../midleware/checkAuth')
const { updateObject } = require('../../midleware/genric')
const { userModel } = require('../../model/user')
const updateUserRoute = express.Router()

updateUserRoute.put('/update/:id', async (req, res) => {
    try {
        await checkUserAuth(req.user)
        let _id = req.params.id
        let body = req.body
        let getSingleUser = await userModel.findById({ _id }).lean();
        if (getSingleUser) {
            let updatedObjected = await updateObject(getSingleUser, body)
            updatedObjected._id = _id
            let userUpdate = await propertyModel.findByIdAndUpdate({ _id }, { $set: updatedObjected, new: true })
            if (userUpdate) {
                res.send({ message: 'User updated ' })
            } else {
                res.send({ message: 'Something is worng' })
            }
        } else {
            res.send({ message: 'User not found' })
        }

    } catch (error) {
        res.send(error)
    }
})

module.exports = updateUserRoute;