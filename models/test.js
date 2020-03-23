const mongoose = require('mongoose');

let testSchema = new mongoose.Schema({
    nom: {}
});

module.exports = mongoose.model('Test', testSchema);