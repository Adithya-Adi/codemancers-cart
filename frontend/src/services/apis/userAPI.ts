import axiosInstance from './configs/axiosConfig';

const API_ROUTES = {
  GET_ALL_USERS: '/user',
};

export const UserAPI = {
  getAllUsers: async () => {
    const response = await axiosInstance.get(
      API_ROUTES.GET_ALL_USERS
    );
    return response.data;
  },
};
