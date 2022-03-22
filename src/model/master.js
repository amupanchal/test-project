const mongoose = require('mongoose')

const masterSchema = mongoose.Schema(
    {
        parent_name: { type: String, required: false },
        display_name: { type: String, required: true },
        parent_id: { type: String, required: false },
    }, {
    timestamps: true
}
)

exports.masterModel = mongoose.model('Master', masterSchema)