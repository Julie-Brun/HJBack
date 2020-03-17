// Déclarations des dépendances
const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    app = express(),
    jwt_secret = process.env.JWT_SECRET_KEY

require('dotenv').config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Initialisation de la connexion a la base de données
mongoose.connect('mongodb://localhost/hopesjourney', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

// Récuperation des models
let Shelter = require('./models/shelter');

// Déclarations des routes de notre application
app.route('/').get(function(req, res) {
    res.send('hello world !');
});

// Appel de tous les Shelters
app.route('/shelters').get(function(req, res){
    Shelter.find({}, function(err, data) {
        if (err) {
        res.send(err)
        } else {
        res.send(data);
        };
    });
});

// Appel des Shelters dans une région donnée
app.route('/shelters/:region').get(function(req, res){
    if (err)
            res.send(err)
    else {
        Shelter.find({_region: req.body.region}).populate('regionID').exec(function(err, data) {
            if (err)
                res.send(err);
            else
                res.send(data);        
        });
    }
});

// Appel des Shelters dans un département donné
app.route('/shelters/:dpt').get(function(req, res){
    if (err)
            res.send(err)
    else {
        Shelter.find({_dpt: req.body.dpt}).populate('dptID').exec(function(err, data) {
            if (err)
                res.send(err);
            else
                res.send(data);        
        });
    }
});

// Appel des Shelters dans une ville donnée
app.route('/shelters/:city').get(function(req, res){
    if (err)
            res.send(err)
    else {
        Shelter.find({_city: req.body.city}).populate('cityID').exec(function(err, data) {
            if (err)
                res.send(err);
            else
                res.send(data);        
        });
    }
});

// Appel des Shelters autour d'une position donnée
app.route('/shelters/local').get(function(req, res){
    if (err)
            res.send(err)
    else {
        Shelter.find({_local: req.body.local}).populate('localisation').exec(function(err, data) {
            if (err)
                res.send(err);
            else
                res.send(data);        
        });
    }
});

// Ajout d'un Shelter
app.route('/add').post(function(req, res){
    let shelter = new Shelter({
        name : req.body.name,
        adress : req.body.adress,
        city : req.body.city,
        dpt : req.body.dpt,
        region : req.body.region,
        email : req.body.email,
        phone01 : req.body.phone01,
        phone02 : req.body.phone02,
        description : req.body.description,
    });
    
    shelter.save(function(err, data) {
        console.log(err);
        if (err)
            res.send(err);
        else {
            res.send(data);
        };
    });
});

// Route Admin
app.route('/hj2admin').post(function(req, res) {
// Comment je set le username et le password ?
});

// Voir tous les Shelters
app.route('/hj2admin/shelters').get(function(req, res) {
    jwt.verify(req.headers["x-access-token"], jwt_secret, function(err, decoded) {
        if (err)
            res.send(err)
        else {
            Shelter.find({}, function(err, data) {
                if (err)
                    res.send(err);
                else
                    res.send(data);        
            });
        }
    });
});

// Validation d'un Shelter
app.route('/hj2admin/valid').post(function(req, res) {
    jwt.verify(req.headers["x-access-token"], jwt_secret, function(err, decoded) {
      
    });
});

// Update d'un Shelter
app.route('/hj2admin/update').put(function(req, res) {
    jwt.verify(req.headers["x-access-token"], jwt_secret, function(err, decoded) {
        if (err)
            res.send(err)
        else {
            Shelter.updateOne({_id: req.body.id}, { $set: {} }, function(err, data) {
                if (err)
                    res.send(err);
                else
                    res.send(data);
            });
        }
    });
});

// Suppression d'un Shelter
app.route('/hj2admin/delete').delete(function(req, res) {
    jwt.verify(req.headers["x-access-token"], jwt_secret, function(err, decoded) {
        if (err)
            res.send(err)
        else {
            Shelter.deleteOne({_id: req.body.id}, function(err, data) {
                if (err)
                    res.send(err);
                else
                    res.send(data);
            });
        };
    });
});

// Mise en écoute de notre application (sur le port 3000)
app.listen(3000);