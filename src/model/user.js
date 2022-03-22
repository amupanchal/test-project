const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        blockchainAddress: { type: String },
        email: { type: String },
        role: { type: String },
        is_active: { type: Boolean, default: true },
        is_deleted: { type: Boolean, default: false },
    }, {
    timestamps: true
}
)

exports.userModel = mongoose.model('User', userSchema)