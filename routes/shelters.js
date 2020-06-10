const express = require('express'),
    multer = require('multer'),
    upload = multer({ dest: 'uploads/' });
    
const { addShelter, getShelters, getShelter, updateShelter } = require('../controllers/shelters');

const router = express.Router();

router
    .route('/trouver')
    .get(getShelters)

router
    .route('/trouver/infos')
    .get(getShelter);

router
    .route('/trouver/update')
    .put(upload.single('media'), updateShelter);

router
    .route('/trouver/ajouter')
    .post(upload.single('media'), addShelter);

module.exports = router;