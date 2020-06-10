const Shelter = require('../models/Shelter');
const geoCoder = require('../utils/geocoder');

exports.addShelter = function (req, res) {
    Shelter.create(req.body, function(err, newShelter) {        
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(newShelter);
    });
};

exports.getShelters = function (req, res) {
    Shelter.find({}, function(err, data) {
        if (err) 
            res.status(400).json(err);
        else 
            res.status(200).json(data);
    });
};

exports.getShelter = function (req, res) {
    Shelter.findOne({_id: req.query.id}, function(err, data) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(data);
    });
}

exports.updateShelter = async function (req, res) {
    const loc = await geoCoder.geocode(req.body.address);
    
    req.body.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    };
    
    Shelter.updateOne({_id: req.query.id}, { $set: req.body, adminValidate: false }, function(err, data) {
        if (err)
            res.status(400).json(err);
        else {
            res.status(200).json(data);
        };
    });
};