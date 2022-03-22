const express = require('express')
const { masterModel } = require('../../model/master')
const createMasterRoute = express.Router()

createMasterRoute.post('/create', async (req, res) => {
    try {
        let newMaster = new masterModel(req.body)
        let response = await newMaster.save()
        if (response) {
            res.send({ message: 'Master  added' })
        } else {
            res.send({ message: 'Something is worng' })
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = createMasterRoute;