const {
  addProductController,
  updateProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
} = require('../controllers/productController');
const express = require('express');
const router = express.Router();

router.post('/', addProductController);
router.patch('/:id', updateProductController);
router.delete('/:id', deleteProductController);
router.get('/', getAllProductsController);
router.get('/:id', getProductByIdController);

module.exports = router;
