const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    identityServiceProvider: { type: String },
    fromOwnerId: { type: String },
    toOwnerId: { type: String },
    fromBlockchainAddress: { type: String },
    toBlockchainAddress: { type: String },
    ownershipPercentage: { type: String },
    tokenId: { type: String },
    purchasePrice: { type: String },
    purchaseCurrency: { type: String },
    purchaseDate: { type: Date },
    transactionStatus: { type: String, default: 'Approved' },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

exports.transactionModel = mongoose.model('transaction', transactionSchema);