const {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} = require('../services/productService');

const addProductController = async (req, res, next) => {
  try {
    const productData = req.body;
    const addProductResponse = await addProduct(productData);
    res.status(addProductResponse.status).json({
      success: true,
      message: addProductResponse.message,
      data: addProductResponse.data,
    });
  } catch (error) {
    next(error);
  };
};

const updateProductController = async (req, res, next) => {
  try {
    const updatedProductData = req.body;
    const productId = req.params.id;
    const updateProductResponse = await updateProduct(productId, updatedProductData);
    res.status(updateProductResponse.status).json({
      success: true,
      message: updateProductResponse.message,
      data: updateProductResponse.data,
    });
  } catch (error) {
    next(error);
  };
};

const deleteProductController = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const deleteProductResponse = await deleteProduct(productId);
    res.status(deleteProductResponse.status).json({
      success: true,
      message: deleteProductResponse.message,
      data: deleteProductResponse.data,
    });
  } catch (error) {
    next(error);
  };
};

const getAllProductsController = async (_req, res, next) => {
  try {
    const getAllProductsResponse = await getAllProducts();
    res.status(getAllProductsResponse.status).json({
      success: true,
      message: getAllProductsResponse.message,
      data: getAllProductsResponse.data,
    });
  } catch (error) {
    next(error);
  };
};

const getProductByIdController = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const getProductByIdResponse = await getProductById(productId);
    res.status(getProductByIdResponse.status).json({
      success: true,
      message: getProductByIdResponse.message,
      data: getProductByIdResponse.data,
    });
  } catch (error) {
    next(error);
  };
};

module.exports = {
  addProductController,
  updateProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
};
