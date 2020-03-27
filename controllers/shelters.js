const Shelter = require('../models/Shelter');

exports.getShelters = function (req, res) {
    Shelter.find({}, function(err, data) {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(data);
        };
    });
};

exports.addShelter = function (req, res) {
    Shelter.create(req.body, function(err, newShelter) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(newShelter);
    });
};

exports.updateShelter = function (req, res) {
    Shelter.updateOne({_id: req.body.id}, { $set: req.body, adminValidate: false }, function(err, data) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(data);
    });
};