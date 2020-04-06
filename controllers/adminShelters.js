const Shelter = require('../models/Shelter'),
    Access = require('../utils/access'),
    jwt = require('jsonwebtoken');

require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET_KEY;


exports.addShelter = function (req, res) {
    Access.checkAccess(req.token, jwt_secret, function (err, decoded) {
        if (err)
        res.status(400).json(err);
        else {
            Shelter.create(req.body, function(err, newShelter) {
                if (err)
                    res.status(400).json(err);
                else
                    res.status(200).json(newShelter);
            });
        };
    });
};

exports.getShelters = function (req, res) {
    Access.checkAccess(req.token, jwt_secret, function (err, decoded) {
        if (err)
        res.status(400).json(err);
        else {
            Shelter.find({}, function(err, data) {
                if (err)
                    res.status(400).json(err);
                else
                    res.status(200).json(data);
            });
        };
    });
};

exports.updateShelter = function (req, res) {
    Access.checkAccess(req.token, jwt_secret, function (err, decoded) {
        if (err)
        res.status(400).json(err);
        else {
            Shelter.updateOne({_id: req.body.id}, { $set: req.body }, function(err, data) {
                if (err)
                    res.status(400).json(err);
                else
                    res.status(200).json(data);
            });
        };
    });
};

exports.deleteShelter = function (req, res) {
    Access.checkAccess(req.token, jwt_secret, function (err, decoded) {
        if (err)
        res.status(400).json(err);
        else {
            Shelter.deleteOne({_id: req.body.id}, function(err, data) {
                if (err)
                    res.status(400).json(err);
                else
                    res.status(200).json(data);
            });
        };
    });
};