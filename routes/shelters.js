const express = require('express');
const { getShelters, addShelter, updateShelter } = require('../controllers/shelters');

const router = express.Router();

router
    .route('/shelters')
    .get(getShelters)
    .post(addShelter)
    .put(updateShelter);

module.exports = router;