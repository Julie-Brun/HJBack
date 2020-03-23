const mongoose = require('mongoose');

let dptSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: 'You need to specify a name'
    },
    coordinates: {},
    regionID: {}
});

module.exports = mongoose.model('Dpt', dptSchema);