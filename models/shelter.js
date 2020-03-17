const mongoose = require('mongoose');

let shelterSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: 'You need to specify a name'
    },
    adress: {
        type: 'string',
        required: 'You need to specify a adress'
    },
    cityID:[{}], //Lier infos carte ?
    dptID:[{}], //Lier infos carte ?
    regionID:[{}], //Lier infos carte ?
    email: {
        type: 'string',
        required: 'You need to specify a email'
    },
    phone01: {
        type: 'string',
        required: 'You need to specify a phone number'
    },
    phone02: {
        type: 'string'
    },
    description: {
        type: 'string',
        required: 'You need to describe the shelter'
    },
    adminValidate: {
        type: 'boolean',
        default: false
    }
});

module.exports = mongoose.model('Shelter', shelterSchema);
