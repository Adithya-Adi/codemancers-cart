import { IOrderDataModel } from '../../pages/User/Checkout';
import axiosInstance from './configs/axiosConfig';

const API_ROUTES = {
  CREATE_ORDER: '/order',
  GET_ALL_ORDERS: '/order',
};

export const OrderAPI = {
  createOrder: async (orderData: IOrderDataModel) => {
    const response = await axiosInstance.post(
      API_ROUTES.CREATE_ORDER,
      orderData
    );
    return response.data;
  },
  getAllOrders: async () => {
    const response = await axiosInstance.get(
      API_ROUTES.GET_ALL_ORDERS
    );
    return response.data;
  },
};
