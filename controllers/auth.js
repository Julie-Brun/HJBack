const Admin = require('../models/Admin'),
    Blacklist = require('../models/Blacklist'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');

require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET_KEY;

exports.login = function (req, res) {
    console.log(req.body);
    Admin.findOne({name : req.body.name}, function(err, admin) {
        if (admin) {
            bcrypt.compare(req.body.password, admin.password, function(err, result) {
                if (result) {
                    let token = jwt.sign({id: admin._id, isSuperAdmin: admin.isSuperAdmin}, jwt_secret, {expiresIn: '24h'});
                    res.status(200).json({auth: true, token: token, message: 'Welcome Admin !'});
                } else
                res.status(201).json({auth: false, message: 'Password not match'});
            });
        } else if (!admin) {
            res.status(201).json({auth: false, message: 'No Admin found'});
        } else {
            res.status(400).json({auth: false, message: err});
        };
    });
};

exports.logout = function (req, res) {
    if (req.token) {
        Blacklist.create({token: req.token}, function(err, result) {
            res.status(200).json('Logout successfully !');
        });
    };
};