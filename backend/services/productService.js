const { ApiError, uploadImageToCloudinary } = require('../utils/helpers');
const Product = require('../models/Product');

const addProduct = async (productData) => {
  const { image, title, description, price, category } = productData;
  if (!image || !title || !description || !price || !category) {
    throw new ApiError(404, 'Incomplete Product Data');
  }
  const imageUrl = await uploadImageToCloudinary(image);
  const product = new Product({
    ...productData,
    image: imageUrl,
  });
  await product.save();
  return {
    status: 201,
    message: 'Product Created',
    data: product,
  };
};

const updateProduct = async (productId, updatedProductData) => {
  if (Object.keys(updatedProductData).length === 0) {
    throw new ApiError(400, 'Incomplete Product Data');
  }
  if (updatedProductData.image) {
    const imageUrl = await uploadImageToCloudinary(updatedProductData.image);
    updatedProductData.image = imageUrl;
  }
  const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });
  if (!updatedProduct) {
    throw new ApiError(404, 'Product not found');
  }
  return {
    status: 200,
    message: 'Product Updated',
    data: updatedProduct,
  };
};

const deleteProduct = async (productId) => {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  if (!deletedProduct) {
    throw new ApiError(404, 'Product not found');
  }
  return {
    status: 200,
    message: 'Product Deleted',
    data: deletedProduct,
  };
};

const getAllProducts = async () => {
  const products = await Product.find();
  if (products.length === 0) {
    throw new ApiError(404, 'Products not found');
  }
  return {
    status: 200,
    message: 'Products Retrieved',
    data: products,
  };
};

const getProductById = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  return {
    status: 200,
    message: 'Product Retrieved',
    data: product,
  };
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
};
