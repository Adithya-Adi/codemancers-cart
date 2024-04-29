const {
  createOrder,
  getAllOrders,
} = require('../services/orderService');

const createOrderController = async (req, res, next) => {
  try {
    const orderData = req.body;
    const createOrderResponse = await createOrder(orderData);
    res.status(createOrderResponse.status).json({
      success: true,
      message: createOrderResponse.message,
      data: createOrderResponse.data,
    });
  } catch (error) {
    next(error);
  }
};

const getAllOrdersController = async (_req, res, next) => {
  try {
    const getAllOrdersResponse = await getAllOrders();
    res.status(getAllOrdersResponse.status).json({
      success: true,
      message: getAllOrdersResponse.message,
      data: getAllOrdersResponse.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrderController,
  getAllOrdersController,
};
