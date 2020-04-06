const express = require('express');
const { addShelter, getShelters, updateShelter } = require('../controllers/shelters');

const router = express.Router();

router
    .route('/shelters')
    .post(addShelter)
    .get(getShelters)
    .put(updateShelter);

module.exports = router;