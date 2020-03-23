const mongoose = require('mongoose');

let regionSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: 'You need to specify a name'
    },
    coordinates: {}
});

module.exports = mongoose.model('Region', regionSchema);