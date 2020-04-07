const mongoose = require('mongoose');
const geoCoder = require('../utils/geocoder');

let ShelterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String
    },
    email: {
        type: String,
        required: [true, 'Please add a email']
    },
    phone01: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    phone02: {
        type: String
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    logo: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    deleteRequest: {
        type: Boolean,
        default: false
    },
    adminValidate: {
        type: Boolean,
        default: false
    }
});

// Before saving, convert address to geoCode
ShelterSchema.pre('save', async function(next) {
    
    const loc = await geoCoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    };

    // Do not save address
    this.address = undefined;
    next();
});

module.exports = mongoose.model('Shelter', ShelterSchema);
