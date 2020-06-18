const express = require('express'),
    multer = require('multer'),
    upload = multer({ dest: 'uploads/' });

const { addShelter, getShelters, updateShelter, deleteShelter } = require('../controllers/adminShelters');

const router = express.Router();

router
    .route('/shelters')
    .post(upload.single('logo'), addShelter)
    .get(getShelters)
    .put(upload.single('logo'), updateShelter)
    .delete(deleteShelter)

module.exports = router;