const Admin = require('../models/Admin'),
    Access = require('../utils/access'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');

require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET_KEY;

exports.addAdmin = function (req, res) {
    Access.checkAccess(req.token, jwt_secret, function (err, decoded) {
        if (err)
        res.status(400).json(err);
        else {
            if (decoded.isSuperAdmin) {
                let hash = bcrypt.hashSync(req.body.password, 10);
                req.body.password = hash;
                Admin.create(req.body, function(err, newAdmin) {
                    if (err)
                        res.status(400).json(err);
                    else
                        res.status(200).json(newAdmin);
                });
            } else {
                res.status(400).json(err);
            };
        };
    });
};

exports.getAdmins = function (req, res) {
    Access.checkAccess(req.token, jwt_secret, function (err, decoded) {
        if (err)
        res.status(400).json(err);
        else {
            if (decoded.isSuperAdmin) {
                Admin.find({}, function(err, data) {
                    if (err)
                        res.status(400).json(err);
                    else
                        res.status(200).json(data);
                });
            } else {
                res.status(400).json(err);
            };
        };
    });
};

exports.getAdmin = function (req, res) {
    Access.checkAccess(req.token, jwt_secret, function (err, decoded) {
        if (err)
        res.status(400).json(err);
        else {
            if (decoded.isSuperAdmin) {
                Admin.findOne({_id: req.body.id}, function(err, data) {
                    if (err)
                        res.status(400).json(err);
                    else
                        res.status(200).json(data);
                });
            } else {
                res.status(400).json(err);
            };
        };
    });
};

exports.updateAdmin = function (req, res) {
    Access.checkAccess(req.token, jwt_secret, function (err, decoded) {
        if (err)
        res.status(400).json(err);
        else {
            if (decoded.isSuperAdmin) {
                Admin.updateOne({_id: req.body.id}, { $set: req.body }, function(err, data) {
                    if (err)
                        res.status(400).json(err);
                    else
                        res.status(200).json(data);
                });
            } else {
                res.status(400).json(err);
            };
        };
    });
};

exports.deleteAdmin = function (req, res) {
    Access.checkAccess(req.token, jwt_secret, function (err, decoded) {
        if (err)
        res.status(400).json(err);
        else {
            if (decoded.isSuperAdmin) {
                Admin.deleteOne({_id: req.body.id}, function(err, data) {
                    if (err)
                        res.status(400).json(err);
                    else
                        res.status(200).json(data);
                });
            } else {
                res.status(400).json(err);
            };
        };
    });
};