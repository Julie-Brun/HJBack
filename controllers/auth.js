const Admin = require('../models/Admin'),
    Access = require('../utils/access'),
    Blacklist = require('../models/Blacklist'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');

require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET_KEY;
    // jwt_superAdmin = process.env.JWT_SECRET_KEY_SUPERADMIN,
    // adminName = process.env.ADMIN_NAME,
    // adminPassword = process.env.ADMIN_PASSWORD;


// exports.register = function (req, res) {
//     Access.checkAccess(req.token, jwt_secret, function (err, decoded) {
//         if (err)
//         res.status(400).json(err);
//         else {
//             console.log(decoded.isSuperAdmin);
//             if (decoded.isSuperAdmin) {
//                 let hash = bcrypt.hashSync(req.body.password, 10);
//                 req.body.password = hash;
//                 Admin.create(req.body, function(err, newAdmin) {
//                     if (err)
//                         res.status(400).json(err);
//                     else
//                         res.status(200).json(newAdmin);
//                 });
//             } else {
//                 res.status(400).json(err);
//             };
//         };
//     });
// };

exports.login = function (req, res) {
    Admin.findOne({name : req.body.name}, function(err, admin) {
        if (admin) {
            bcrypt.compare(req.body.password, admin.password, function(err, result) {
                if (result) {
                    let token = jwt.sign({id: admin._id, isSuperAdmin: admin.isSuperAdmin}, jwt_secret, {expiresIn: '24h'});
                    res.status(200).json({auth: true, token: token, message: 'Welcome Admin !'});
                } else
                res.status(201).json({auth: false, message: 'Password not match'});
            });
        } else if (!admin) {
            res.status(201).json({auth: false, message: 'No Admin found'});
        } else {
            res.status(400).json({auth: false, message: err});
        };
    });
};

exports.logout = function (req, res) {
    if (req.token) {
        Blacklist.create({token: req.token}, function(err, result) {
            res.status(200).json('Logout successfully !');
        });
    };
};