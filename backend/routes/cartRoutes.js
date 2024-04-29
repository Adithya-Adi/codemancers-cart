const {
  addToCartController,
  removeItemFromCartController,
  updateCartController,
  getUserCartController,
  clearUserCartController,
} = require('../controllers/cartController');
const express = require('express');
const { authenticateUser } = require('../middlewares/auth');
const router = express.Router();

router.post('/:userId/:productId', authenticateUser, addToCartController);
router.delete('/:userId/:productId', authenticateUser, removeItemFromCartController);
router.patch('/:userId', authenticateUser, updateCartController);
router.get('/:userId', authenticateUser, getUserCartController);
router.delete('/:userId', authenticateUser, clearUserCartController);

module.exports = router;
