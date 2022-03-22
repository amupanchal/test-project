exports.checkPropertyAuth = async (user) => {
    try {
        if (user.role == 'Admin' || user.role == 'Property Manager') {
            return true
        } else {
            throw { message: 'Unauthorized User' }
        }
    } catch (error) {
        throw error
    }
}

exports.checkUserAuth = async (user) => {
    try {
        if (user.role == 'Admin') {
            return true
        } else {
            throw { message: 'Unauthorized User' }
        }
    } catch (error) {
        throw error
    }
}

exports.checkTokenAuth = async (user) => {
    try {
        if (user.role == 'Admin' || user.role == 'Owner' || user.role == 'Property Manager') {
            return true
        } else {
            throw { message: 'Unauthorized User' }
        }
    } catch (error) {
        throw error
    }
}

exports.transferTokenAuth = async (singleToken, body, user) => {
    try {
        if (user.role == 'Owner' && singleToken.blockchainAddress != user.blockchainAddress) {
            throw { message: 'Unauthorized User' }
        } else if (user.role == 'Owner' && body.newOwnerBlockchainAddress == user.blockchainAddress) {
            throw { message: "Can't transfer self" }
        } else if ((user.role == 'Admin' || user.role == 'Property Manager') && (singleToken.blockchainAddress == body.blockchainAddress || singleToken.ownerId == body.ownerId)) {
            throw { message: "Already transfer token to this owner" }
        }
        else {
            return true
        }
    } catch (error) {
        throw error
    }
}