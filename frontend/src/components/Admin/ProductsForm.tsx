import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { convertToBase64, IResponse } from '../../utils/helpers';
import {
  validateImage,
  validateTitle,
  validateCategory,
  validateDescription,
  validatePrice,
  ErrorType,
} from '../../utils/validation';
import toast from 'react-hot-toast';
import { ProductAPI } from '../../services/apis/productAPI';

const ProductsForm: React.FC<IProductFormPropModel> = ({ productId }: IProductFormPropModel) => {
  // states
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<IProductFormModel>({
    image: '',
    title: '',
    description: '',
    price: 0,
    category: '',
  });

  const [validationErrors, setValidationErrors] = useState<IValidationModel>({
    image: '',
    title: '',
    description: '',
    price: '',
    category: '',
  });
  const [selectedImageName, setSelectedImageName] = useState<string>('');

  const id : string | undefined = useParams().id;
  const isEditMode: boolean = !!productId;

  const getProductById = async (productId: string | undefined) => {
    try {
      const product: IResponse = await ProductAPI.getProductById(productId);
      setFormData(product.data);
      setSelectedImageName(product.data.image);
    } catch (error: any) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    if (isEditMode) {
      getProductById(id);
    }
  }, [id, isEditMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      console.error('No files selected');
      return;
    }
    const file = files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
      setSelectedImageName(file.name);
    }
  };

  const handleValidate = () => {
    const imageErrors: ErrorType = validateImage(formData.image);
    const titleErrors: ErrorType = validateTitle(formData.title);
    const descriptionErrors: ErrorType = validateDescription(formData.description);
    const priceErrors: ErrorType = validatePrice(formData.price);
    const categoryErrors: ErrorType = validateCategory(formData.category);
    const errors: any = {
      ...imageErrors,
      ...titleErrors,
      ...descriptionErrors,
      ...priceErrors,
      ...categoryErrors,
    };
    setValidationErrors(errors);
    const hasErrors = Object.values(errors).some((error) => !!error);
    return hasErrors;
  }

  const handleProductSubmit = async (e: React.MouseEvent<HTMLElement>, action: string) => {
    e.preventDefault();
    if (handleValidate()) {
      return;
    }
    setLoading(true);
    try {
      if (formData.image instanceof File) {
        const imageBase64 = await convertToBase64(formData.image);
        formData.image = imageBase64;
      }
      let productResponse;
      if (action === 'add') {
        productResponse = await ProductAPI.createProduct(formData);
      } else if (action === 'edit') {
        productResponse = await ProductAPI.updateProduct(productId || '', formData);
      }
      toast.success(productResponse.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
      if (action === 'add') {
        setFormData({
          image: '',
          title: '',
          description: '',
          price: 0,
          category: '',
        });
        setSelectedImageName('');
      }
    }
  };

  return (
    <>
      <input
        type='file'
        accept='image/*'
        name='image'
        id='image'
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <label htmlFor='image'>
        <Button variant='contained' component='span' color='primary' sx={{marginBottom: 2}}>Upload Image</Button>
      </label>
      {selectedImageName && (
        <Typography variant='subtitle1' mb={2}>{selectedImageName}</Typography>
      )}
      <FormHelperText sx={{ color: 'red' }}>{validationErrors?.image}</FormHelperText>
      <TextField
        name='title'
        label='Title'
        variant='outlined'
        fullWidth
        margin='normal'
        value={formData.title}
        onChange={handleInputChange}
      />
      <FormHelperText sx={{ color: 'red' }}>{validationErrors?.title}</FormHelperText>
      <TextField
        name='description'
        label='Description'
        variant='outlined'
        fullWidth
        multiline
        rows={4}
        margin='normal'
        value={formData.description}
        onChange={handleInputChange}
      />
      <FormHelperText sx={{ color: 'red' }}>{validationErrors?.description}</FormHelperText>
      <TextField
        name='price'
        label='Price'
        variant='outlined'
        fullWidth
        type='number'
        margin='normal'
        value={formData.price}
        onChange={handleInputChange}
      />
      <FormHelperText sx={{ color: 'red' }}>{validationErrors?.price}</FormHelperText>
      <TextField
        name='category'
        label='Category'
        variant='outlined'
        fullWidth
        margin='normal'
        value={formData.category}
        onChange={handleInputChange}
      />
      <FormHelperText sx={{ color: 'red' }}>{validationErrors?.category}</FormHelperText>
      <Box mt={2}>
        <Button
          variant='contained'
          color='primary'
          onClick={(e) => isEditMode ? handleProductSubmit(e, 'edit') : handleProductSubmit(e, 'add')}
        >
          {loading ?
            <CircularProgress color="inherit" sx={{ color: '#fff' }} />
            :
            isEditMode ? 'Save' : 'Add Product'
          }
        </Button>
      </Box>
    </>
  );
};

export default ProductsForm;

export interface IProductFormPropModel {
  productId : string | undefined,
}

export interface IProductFormModel {
  _id?: string, 
  image: any,
  title: string,
  description: string,
  price: number ,
  category: string,
  filter?: any,
}

export interface IValidationModel {
  [key: string] : string,
}