import axiosInstance from './configs/axiosConfig';

const API_ROUTES = {
  USER_REGISTER: '/auth/register',
  USER_LOGIN: '/auth/login',
  GOOGLE_LOGIN: '/auth/google',
  ADMIN_LOGIN: "/auth/admin",
};

export const AuthAPI = {
  userRegister: async (userData) => {
    const response = await axiosInstance.post(
      API_ROUTES.USER_REGISTER,
      userData
    );
    return response.data;
  },
  userLogin: async (userData) => {
    const response = await axiosInstance.post(
      API_ROUTES.USER_LOGIN,
      userData
    );
    return response.data;
  },
  googleLogin: async (credential) => {
    const response = await axiosInstance.post(
      API_ROUTES.GOOGLE_LOGIN,
      { credential }
    );
    return response.data;
  },
  adminLogin: async (adminData) => {
    const response = await axiosInstance.post(
      API_ROUTES.ADMIN_LOGIN,
      adminData,
    );
    return response.data;
  },
};