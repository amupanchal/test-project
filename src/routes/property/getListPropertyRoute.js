const express = require('express')
const { propertyModel } = require('../../model/property')
const getListPropertyRoute = express.Router()

getListPropertyRoute.post('/list', async (req, res) => {
    try {
        let filters = { $and: [{ is_active: true }, { is_deleted: false }] }
        let sort = { createdAt: -1 }
        let body = req.body0
        let user = req.user
        let size = body.size || 10;
        let select;
        (user && user.role && (user.role == 'Admin' || user.role == 'Property Manager')) ? '' : select = '-lastTokenPrice'
        if (body && body.filters) {
            let bodyFilters = body.filters;
            (bodyFilters.state && bodyFilters.state.length) ? filters.$and.push({ state: bodyFilters.state }) : '';
            (bodyFilters.city && bodyFilters.city.length) ? filters.$and.push({ city: bodyFilters.city }) : '';
            if (body.sort) {
                if (Object.keys(body.sort).length) {
                    sort = body.sort
                }
            }
        }
        let response = await propertyModel.find(filters).skip((body.page * size || 0)).limit(size).sort(sort).select(select)
        if (response) {
            res.send({ data: response })
        } else {
            res.send({ message: 'Something is worng' })
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = getListPropertyRoute;