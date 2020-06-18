const express = require('express'),
    path = require('path'),
    multer = require('multer'),
    // publicPath = path.resolve(__dirname, 'uploads'),
    storage = multer.diskStorage({ 
        destination: (req, file, cb) => { 
            cb(null, 'uploads') 
        }, 
        filename: (req, file, cb) => { 
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) 
        },
    }),
    fileFilter = (req, file, cb) => {
        // reject a file
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
    upload = multer({ 
        storage : storage,
        limits: {fileSize: 1000000, files:1},
        fileFilter: fileFilter
    });
        
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
    .put(upload.single('logo'), updateShelter);

router
    .route('/trouver/ajouter')
    .post(upload.single('logo'), addShelter);

module.exports = router;