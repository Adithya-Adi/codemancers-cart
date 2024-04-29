const {
  getAllUsersController,
} = require('../controllers/userController');
const express = require('express');
const { authenticateAdmin } = require('../middlewares/auth');
const router = express.Router();

router.get('/', authenticateAdmin, getAllUsersController);

module.exports = router;
