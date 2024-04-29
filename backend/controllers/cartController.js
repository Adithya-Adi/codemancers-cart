const {
  addToCart,
  removeItemFromCart,
  updateCart,
  getUserCart,
  clearUserCart,
} = require('../services/cartService');

const addToCartController = async (req, res, next) => {
  try {
    const { userId, productId } = req.params;

    const addToCartResponse = await addToCart(userId, productId);
    res.status(addToCartResponse.status).json({
      success: true,
      message: addToCartResponse.message,
      data: addToCartResponse.data,
    });
  } catch (error) {
    next(error);
  }
};

const removeItemFromCartController = async (req, res, next) => {
  try {
    const { userId, productId } = req.params;
    const removeItemFromCartResponse = await removeItemFromCart(userId, productId);
    res.status(removeItemFromCartResponse.status).json({
      success: true,
      message: removeItemFromCartResponse.message,
      data: removeItemFromCartResponse.data,
    });
  } catch (error) {
    next(error);
  }
};

const updateCartController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const updatedCartData = req.body;
    const updateCartResponse = await updateCart(userId, updatedCartData);
    res.status(updateCartResponse.status).json({
      success: true,
      message: updateCartResponse.message,
      data: updateCartResponse.data,
    });
  } catch (error) {
    next(error);
  }
};

const getUserCartController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const getUserCartResponse = await getUserCart(userId);
    res.status(getUserCartResponse.status).json({
      success: true,
      message: getUserCartResponse.message,
      data: getUserCartResponse.data,
    });
  } catch (error) {
    next(error);
  }
};

const clearUserCartController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const clearUserCartResponse = await clearUserCart(userId);
    res.status(clearUserCartResponse.status).json({
      success: true,
      message: clearUserCartResponse.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addToCartController,
  removeItemFromCartController,
  updateCartController,
  getUserCartController,
  clearUserCartController,
};
