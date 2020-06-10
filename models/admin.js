const mongoose = require('mongoose');

let AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    isSuperAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Admin', AdminSchema);