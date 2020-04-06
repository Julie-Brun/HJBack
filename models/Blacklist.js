const mongoose = require('mongoose');

let BlacklistSchema = new mongoose.Schema({
    token: {
        type: String
    }
}); 

module.exports = mongoose.model('Blacklist', BlacklistSchema);