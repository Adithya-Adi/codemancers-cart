const {
  createOrderController,
  getAllOrdersController,
} = require('../controllers/orderController');
const express = require('express');
const router = express.Router();

router.post('/', createOrderController);
router.get('/', getAllOrdersController);

module.exports = router;
