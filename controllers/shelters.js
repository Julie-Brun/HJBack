const Shelter = require('../models/Shelter');
const geoCoder = require('../utils/geocoder');

exports.addShelter = function (req, res) {
    Shelter.create(req.body, function(err, newShelter) {
        console.log(newShelter);
        
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

exports.updateShelter = function (req, res) {
    Shelter.updateOne({_id: req.body.id}, { $set: req.body, adminValidate: false }, function(err, data) {
        if (err)
            res.status(400).json(err);
        else {
            const loc = geoCoder.geocode(data.address);
            console.log(loc);
            
            // data.location = {
            //     type: 'Point',
            //     coordinates: [loc[0].longitude, loc[0].latitude],
            //     formattedAddress: loc[0].formattedAddress
            // };
            res.status(200).json(data);
        };
    });
};