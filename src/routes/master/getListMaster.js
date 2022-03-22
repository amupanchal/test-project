const express = require('express')
const { masterModel } = require('../../model/master')
const getListMasterRoute = express.Router()

getListMasterRoute.post('/list', async (req, res) => {
    try {
        if (req.body && req.body.type) {
            let response = new masterModel.find(req.body).lean()
            if (response) {
                res.send({ data: response })
            } else {
                res.send({ message: 'Something is worng' })
            }
        } else {
            throw { message: "Please Enter a type" }
        }

    } catch (error) {
        res.send(error)
    }
})

module.exports = getListMasterRoute;