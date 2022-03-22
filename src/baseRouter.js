const express = require("express");
const baseRouter = express.Router();
const userListRouter = require('./routes/user/userListRouter')
const signInRouter = require('./routes/user/signInRouter');
const createUserRoute = require("./routes/user/createUserRoute");
const { verifyToken } = require("./midleware/jwtAuth");
const createPropertyRoute = require("./routes/property/createPropertyRouter");
const getListPropertyRoute = require("./routes/property/getListPropertyRoute");
const getSinglePropetyRoute = require("./routes/property/singlePropertyRoute");
const updatePropetyRoute = require("./routes/property/updatePropertyRoute");
const deletePropetyRoute = require("./routes/property/deletePropertyRoute");
const tokenListRouter = require("./routes/token/listTokenRoute");
const getSingletokenRoute = require("./routes/token/singleToken");
const transferTokenRoute = require("./routes/token/transferToken");
const deleteUserRoute = require("./routes/user/deleteUser");
const updateUserRoute = require("./routes/user/updateUser");
const transactionListRouter = require("./routes/transaction/listTransaction");
const createMasterRoute = require("./routes/master/createMaster");
const getListMasterRoute = require("./routes/master/getListMaster");

baseRouter.use(async (req, res, next) => {
    try {
        let headers = req.headers
        if (headers.authorization) {
            req.user = await verifyToken(headers.authorization)
        }
        next()
    } catch (error) {
        res.status(403).json("Token Expired");
    }
})

// user
baseRouter.use('/user', signInRouter)
baseRouter.use('/user', userListRouter)
baseRouter.use('/user', createUserRoute)
baseRouter.use('/user', deleteUserRoute)
baseRouter.use('/user', updateUserRoute)

// property
baseRouter.use('/property', createPropertyRoute)
baseRouter.use('/property', getListPropertyRoute)
baseRouter.use('/property', getSinglePropetyRoute)
baseRouter.use('/property', updatePropetyRoute)
baseRouter.use('/property', deletePropetyRoute)

// token
baseRouter.use('/token', tokenListRouter)
baseRouter.use('/token', getSingletokenRoute)
baseRouter.use('/token', transferTokenRoute)

// transaction
baseRouter.use('/transaction', transactionListRouter)

// master
baseRouter.use('/master', createMasterRoute)
baseRouter.use('/master', getListMasterRoute)

module.exports = baseRouter;