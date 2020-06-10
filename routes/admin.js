const express = require('express');

const { addAdmin, getAdmins, getAdmin, updateAdmin, deleteAdmin } = require('../controllers/admin');

const router = express.Router();

router
    .route('/admin')
    .post(addAdmin)
    .get(getAdmins)
    .put(updateAdmin)
    .delete(deleteAdmin);

router
    .route('/getAdmin')
    .get(getAdmin);

module.exports = router;