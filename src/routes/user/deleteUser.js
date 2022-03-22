const express = require('express')
const { userModel } = require('../../model/user')
const deleteUserRoute = express.Router()

deleteUserRoute.delete('/delete/:id', async (req, res) => {
    try {
        await checkUserAuth(req.user)
        let _id = req.params.id
        let getSingleUser = await userModel.findOne({ _id })
        if (getSingleUser) {
            getSingleUser.is_active = false
            getSingleUser.is_deleted = true
            let updateUser = await userModel.findByIdAndUpdate({ _id: getSingleUser._id }, { $set: getSingleUser, new: true })
            if (updateUser) {
                res.send({ message: 'User is deleted' })
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

module.exports = deleteUserRoute;