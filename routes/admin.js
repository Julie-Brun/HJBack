const express = require('express');

const { addAdmin, getAdmins, getAdmin, updateAdmin, updatePasswordAdmin, deleteAdmin } = require('../controllers/admin');

const router = express.Router();

router
    .route('/admin')
    .post(addAdmin)
    .get(getAdmins)
    .put(updateAdmin)
    .delete(deleteAdmin);

router
    .route('/admin/password')
    .put(updatePasswordAdmin);

// router
//     .route('/getAdmin')
//     .get(getAdmin);

module.exports = router;