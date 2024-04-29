const {
  addProductController,
  updateProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
} = require('../controllers/productController');
const { authenticateAdmin, authenticateUser } = require('../middlewares/auth');
const express = require('express');
const router = express.Router();

router.post('/', authenticateAdmin, addProductController);
router.patch('/:id', authenticateAdmin, updateProductController);
router.delete('/:id', authenticateAdmin, deleteProductController);
router.get('/', authenticateUser, getAllProductsController);
router.get('/:id', authenticateUser, getProductByIdController);

module.exports = router;
