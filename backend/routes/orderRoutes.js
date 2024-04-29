const {
  createOrderController,
  getAllOrdersController,
} = require('../controllers/orderController');
const { authenticateAdmin, authenticateUser } = require('../middlewares/auth');
const express = require('express');
const router = express.Router();

router.post('/', authenticateUser, createOrderController);
router.get('/', authenticateAdmin, getAllOrdersController);

module.exports = router;
