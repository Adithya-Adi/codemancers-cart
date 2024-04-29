const {
  getAllUsersController,
} = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.get('/', getAllUsersController);

module.exports = router;
