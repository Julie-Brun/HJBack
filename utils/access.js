const jwt = require('jsonwebtoken');
const Blacklist = require('../models/Blacklist');

exports.checkAccess = function (token, jwt_secret, callback) {
    jwt.verify(token, jwt_secret, function (err, decoded) {
        if (err) 
        callback (err, decoded);
        else {
            Blacklist.findOne({token: token}, function (err, blacklisted) {
                if (blacklisted)
                callback ('Token blacklisted !', decoded);
                else 
                callback (null, decoded);
            });
        };
    });
};