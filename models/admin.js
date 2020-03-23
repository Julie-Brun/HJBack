const mongoose = require('mongoose');

let adminSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: 'You need to specify a name'
    },
    email: {
        type: 'string',
        required: 'You need to specify a email',
        unique: true
    },
    password: {
        type: 'string',
        required: 'You need to specify a password'
    }
});

module.exports = mongoose.model('Admin', adminSchema);