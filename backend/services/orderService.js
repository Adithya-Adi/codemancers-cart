const { ApiError } = require('../utils/helpers');
const Order = require('../models/Order');
const User = require('../models/User');
const orderEventEmitter = require('../subscribers/orderSubscription');

const createOrder = async (orderData) => {
  const { userId, products, totalPrice } = orderData;
  if (!userId || !products || products.length === 0 || !totalPrice) {
    throw new ApiError(404, 'Incomplete Product Data');
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User Doest exists');
  }
  const order = new Order(orderData);
  await order.save();
  orderEventEmitter.emit('orderCreated', {
    order,
    user,
  });
  return {
    status: 201,
    message: 'Order Created',
    data: order,
  };
};

const getAllOrders = async () => {
  const orders = await Order.find();
  return {
    status: 200,
    message: 'Orders Retrived',
    data: orders,
  };
};

module.exports = {
  createOrder,
  getAllOrders,
};
