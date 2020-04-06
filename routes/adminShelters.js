const express = require('express');

const { addShelter, getShelters, updateShelter, deleteShelter } = require('../controllers/adminShelters');

const router = express.Router();

router
    .route('/shelters')
    .post(addShelter)
    .get(getShelters)
    .put(updateShelter)
    .delete(deleteShelter);

module.exports = router;