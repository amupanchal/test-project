const mongoose = require('mongoose')

const porpertySchema = mongoose.Schema(
    {
        //basic_info 
        propertyId: String,
        propertyName: String,
        noOfTokens: Number,
        linkToProperty: String,
        propertyIdServiceProvider: String,
        companyManagingTheProperty: String,
        propertyInfo: String,
        pacasoName: String,
        photoUrl: String,
        //address_details
        houseNumber: String,
        street1: String,
        street2: String,
        city: String,
        state: String,
        zip: Number,
        county: String,
        //property_description
        pacasoMarket: String,
        area: String,
        beds: Number,
        parcelNumber: String,
        baths: Number,
        lastTokenPrice: { type: String, default: '0' },
        is_active: { type: Boolean, default: true },
        is_deleted: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
)

exports.propertyModel = mongoose.model('property', porpertySchema)