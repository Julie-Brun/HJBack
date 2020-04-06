const express = require('express');

const { addAdmin, getAdmins, updateAdmin, deleteAdmin } = require('../controllers/admin');

const router = express.Router();

router
    .route('/admin')
    .post(addAdmin)
    .get(getAdmins)
    .put(updateAdmin)
    .delete(deleteAdmin);

module.exports = router;