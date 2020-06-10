// Déclarations des dépendances
const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    cors = require('cors'),
    bearerToken = require('express-bearer-token'),
    app = express(),

    shelters = require('./routes/shelters'),
    auth = require('./routes/auth'),
    adminShelters = require('./routes/adminShelters'),
    admin = require('./routes/admin');

require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET_KEY;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(bearerToken());
app.use(express.static(__dirname + '/uploads'));

// Initialisation de la connexion a la base de données
mongoose.connect('mongodb://localhost/hopesjourney', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

//Routes
app.use('/home', shelters);
app.use('/hj2auth', auth);
app.use('/hj2shel', adminShelters);
app.use('/hj2adm', admin);

// Mise en écoute de notre application (sur le port 3000)
app.listen(3050);