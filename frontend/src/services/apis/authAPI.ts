import { ILoginModel } from '../../pages/User/Login';
import { IRegisterModel } from '../../pages/User/Register';
import axiosInstance from './configs/axiosConfig';

const API_ROUTES = {
  USER_REGISTER: '/auth/register',
  USER_LOGIN: '/auth/login',
  GOOGLE_LOGIN: '/auth/google',
  ADMIN_LOGIN: "/auth/admin",
};

export const AuthAPI = {
  userRegister: async (userData: IRegisterModel) => {
    const response = await axiosInstance.post(
      API_ROUTES.USER_REGISTER,
      userData
    );
    return response.data;
  },
  userLogin: async (userData: ILoginModel) => {
    const response = await axiosInstance.post(
      API_ROUTES.USER_LOGIN,
      userData
    );
    return response.data;
  },
  googleLogin: async (credential: string) => {
    const response = await axiosInstance.post(
      API_ROUTES.GOOGLE_LOGIN,
      { credential }
    );
    return response.data;
  },
  adminLogin: async (adminData: ILoginModel) => {
    const response = await axiosInstance.post(
      API_ROUTES.ADMIN_LOGIN,
      adminData,
    );
    return response.data;
  },
};