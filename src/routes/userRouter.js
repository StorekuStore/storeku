const express = require('express');
const verifyToken = require('../middleware/auth');
const { login, logout } = require('../controller/userController');

const router = express.Router();
const upload = require('multer')();
const asyncHandler = require('../utils/asyncHandler');

router.route('/login').post(upload.any(), asyncHandler(login));
router.route('/logout').post(verifyToken, upload.any(), asyncHandler(logout));

module.exports = router;
