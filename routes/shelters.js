const express = require('express'),
    multer = require('multer'),
    upload = multer({ dest: 'uploads/' });
    
const { addShelter, getShelters, updateShelter } = require('../controllers/shelters');

const router = express.Router();

router
    .route('/shelters')
    .post(upload.single('media'), addShelter)
    .get(getShelters)
    .put(upload.single('media'), updateShelter);

module.exports = router;