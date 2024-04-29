import axiosInstance from './configs/axiosConfig';

const API_ROUTES = {
  ADD_TO_CART: '/cart/:userId/:productId',
  REMOVE_FROM_CART: '/cart/:userId/:productId',
  UPDATE_CART: '/cart/:userId',
  GET_USER_CART: '/cart/:userId',
  CLEAR_USER_CART: '/cart/:userId',
};

export const CartAPI = {
  addToCart: async (userId, productId) => {
    const route = API_ROUTES.ADD_TO_CART.replace(':userId', userId).replace(':productId', productId);
    const response = await axiosInstance.post(route);
    return response.data;
  },
  removeFromCart: async (userId, productId) => {
    const route = API_ROUTES.REMOVE_FROM_CART.replace(':userId', userId).replace(':productId', productId);
    const response = await axiosInstance.delete(route);
    return response.data;
  },
  updateCart: async (userId, cartData) => {
    const route = API_ROUTES.UPDATE_CART.replace(':userId', userId);
    const response = await axiosInstance.patch(route, cartData);
    return response.data;
  },
  getUserCart: async (userId) => {
    const route = API_ROUTES.GET_USER_CART.replace(':userId', userId);
    const response = await axiosInstance.get(route);
    return response.data;
  },
  clearUserCart: async (userId) => {
    const route = API_ROUTES.CLEAR_USER_CART.replace(':userId', userId);
    const response = await axiosInstance.delete(route);
    return response.data;
  },
};
