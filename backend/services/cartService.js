const Cart = require('../models/Cart');
const { ApiError } = require('../utils/helpers');

const addToCart = async (userId, productId) => {
  if (!userId || !productId) {
    throw new ApiError(404, 'Incomplete Cart Data');
  }
  let cart = await Cart.findOne({ userId });
  if (cart) {
    cart.products.push({
      productId,
    });
  } else {
    cart = new Cart({
      userId,
      products: [{
        productId,
      }],
    });
  }
  await cart.save();
  return {
    status: 200,
    message: 'Added to Cart',
    data: cart,
  };
};

const removeItemFromCart = async (userId, productId) => {
  if (!userId || !productId) {
    throw new ApiError(400, 'User ID and Product ID are required');
  }
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new ApiError(404, 'Cart not found');
  }
  const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
  if (productIndex === -1) {
    throw new ApiError(404, 'Product not found');
  }
  cart.products.splice(productIndex, 1);
  if (cart.products.length === 0) {
    await Cart.findOneAndDelete({ userId });
    return {
      status: 200,
      message: 'Item Removed',
    };
  } else {
    await cart.save();
    return {
      status: 200,
      message: 'Item Removed',
      data: cart,
    };
  }
};
const updateCart = async (userId, updatedCartData) => {
  const { productId, quantity } = updatedCartData;
  if (!userId || !productId || !quantity) {
    throw new ApiError(400, 'Incomplete Cart Data');
  }
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new ApiError(404, 'Cart not found');
  }
  const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
  if (productIndex !== -1) {
    cart.products[productIndex].quantity = quantity;
  } else {
    throw new ApiError(404, 'Product not found in the cart');
  }
  await cart.save();
  return {
    status: 200,
    message: 'Cart Updated',
    data: cart,
  };
};

const getUserCart = async (userId) => {
  if (!userId) {
    throw new ApiError(400, 'User ID is required');
  }
  const cart = await Cart.findOne({ userId }).populate('products.productId');
  if (!cart) {
    throw new ApiError(404, 'Cart not found');
  }
  let totalPrice = 0;
  let totalItems = 0;
  const cartItems = {
    userId: cart.userId,
    products: cart.products.map((item) => {
      const productPrice = item.productId.price * item.quantity;
      totalPrice += productPrice;
      totalItems += item.quantity;
      return {
        productId: item.productId._id,
        image: item.productId.image,
        title: item.productId.title,
        description: item.productId.description,
        price: item.productId.price,
        quantity: item.quantity,
        productPrice,
      };
    }),
  };
  cartItems.totalPrice = totalPrice;
  cartItems.totalItems = totalItems;
  return {
    status: 200,
    message: 'User Cart Retrieved',
    data: cartItems,
  };
};

const clearUserCart = async (userId) => {
  if (!userId) {
    throw new ApiError(400, 'User ID is required');
  }
  const cart = await Cart.findOneAndDelete({ userId });
  if (!cart) {
    throw new ApiError(404, 'Cart not found');
  }
  return {
    status: 200,
    message: 'User Cart Cleared',
  };
};

module.exports = {
  addToCart,
  removeItemFromCart,
  updateCart,
  getUserCart,
  clearUserCart,
};
