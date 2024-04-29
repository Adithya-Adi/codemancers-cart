const {
  registerUserController,
  loginUserController,
  adminLoginController,
} = require('../controllers/authController');
const express = require('express');
const router = express.Router();

router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.post('/admin', adminLoginController);

module.exports = router;
