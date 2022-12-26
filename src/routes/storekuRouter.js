const express = require('express');
const verifyToken = require('../middleware/auth');
const {
  createStoreku, getAllStoreku, getStoreku, uploadImg, editStoreku, deleteStoreku, getSemuaStoreku,
} = require('../controller/storekuController');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.route('/').post(verifyToken, uploadImg, asyncHandler(createStoreku));
router.route('/').get(asyncHandler(getAllStoreku));
router.route('/admin').get(verifyToken, asyncHandler(getSemuaStoreku));
router.route('/:id').get(asyncHandler(getStoreku));
router.route('/:id').put(verifyToken, uploadImg, asyncHandler(editStoreku));
router.route('/:id').delete(verifyToken, asyncHandler(deleteStoreku));

module.exports = router;
