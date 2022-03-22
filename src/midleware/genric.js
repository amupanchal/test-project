exports.updateObject = async (oldObject, body) => {
    try {
        delete oldObject._id
        delete body._id
        let newUpdateObject = {
            ...oldObject,
            ...body
        }
        return newUpdateObject
    } catch (error) {
        throw error
    }
}