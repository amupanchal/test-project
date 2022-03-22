const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema(
    {
        propertyId: { type: String },
        linkToProperty: { type: String },
        propertyIdServiceProvider: { type: String },
        propertyInfo: { type: String },
        pacasoName: { type: String },
        //owner and transction info
        blockchainAddress: { type: String },
        ownerId: { type: String },
        ownershipPercentage: { type: String },
        tokenId: { type: String },
        identityServiceProvider: { type: String },
        purchasePrice: { type: String },
        purchaseDate: { type: Date },
        salePrice: { type: String },
        //Loan info
        loanAmount: { type: String },
        lender: { type: String },
        loanIntrestRate: { type: String },
        loanTerm: { type: String },
        loanType: { type: String },
        loanCurrency: { type: String },
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
)

exports.tokenModel = mongoose.model('token', tokenSchema)