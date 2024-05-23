import { IProductFormModel } from '../../components/Admin/ProductsForm';
import axiosInstance from './configs/axiosConfig';

const API_ROUTES = {
  CREATE_PRODUCT: '/product',
  GET_ALL_PRODUCTS: '/product',
  GET_PRODUCT_BY_ID: '/product/:id',
  UPDATE_PRODUCT: '/product/:id',
  DELETE_PRODUCT: '/product/:id',
};

export const ProductAPI = {
  createProduct: async (productData: IProductFormModel) => {
    const response = await axiosInstance.post(
      API_ROUTES.CREATE_PRODUCT,
      productData
    );
    return response.data;
  },
  getAllProducts: async () => {
    const response = await axiosInstance.get(
      API_ROUTES.GET_ALL_PRODUCTS
    );
    return response.data;
  },
  getProductById: async (productId: string | undefined) => {
    if(!productId) return;
    const response = await axiosInstance.get(
      API_ROUTES.GET_PRODUCT_BY_ID.replace(':id', productId)
    );
    return response.data;
  },
  updateProduct: async (productId: string, updatedProductData: IProductFormModel) => {
    const response = await axiosInstance.patch(
      API_ROUTES.UPDATE_PRODUCT.replace(':id', productId),
      updatedProductData
    );
    return response.data;
  },
  deleteProduct: async (productId: string | undefined) => {
    if(!productId) return;
    const response = await axiosInstance.delete(
      API_ROUTES.DELETE_PRODUCT.replace(':id', productId)
    );
    return response.data;
  },
};
