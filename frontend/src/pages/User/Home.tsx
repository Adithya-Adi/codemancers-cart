/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Container,
  CircularProgress,
} from '@mui/material';
import ProductCard from '../../components/User/ProductCard';
import { ProductAPI } from '../../services/apis/productAPI';
import { CartAPI } from '../../services/apis/cartAPI';
import { IResponse } from '../../utils/helpers';
import { IProductModel, ICartDetailsModel } from '../../utils/helpers';

const Home = () => {
  const [products, setProducts] = useState<IProductModel[]>([]);
  const [allCategory, setAllCategory] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [cartDetails, setCartDetails] = useState<ICartDetailsModel | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

  useEffect(() => {
    const getCartDetails = async () => {
      try {
        const getCartDetailsResponse: IResponse = await CartAPI.getUserCart(loggedInUser._id);
        setCartDetails(getCartDetailsResponse.data);
      } catch (error: any) {
        console.error('Error:', error.message);
      }
    };
    getCartDetails();
  }, []);

  const getAllProducts = async (): Promise<void> => {
    try {
      setLoading(true);
      const allProducts: IResponse = await ProductAPI.getAllProducts();
      setProducts(allProducts.data);
      const category : Set<string> = new Set(allProducts.data.map((product: IProductModel) => product.category));
      setAllCategory(Array.from(category));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) : void => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = event.target;
    setSelectedCategory((prevSelected) =>
      checked ? [...prevSelected, value] : prevSelected.filter((category) => category !== value)
    );
  };

  const filteredProducts = products?.filter((product)=> {
    const matchesSearchTerm : boolean = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory : boolean =
      selectedCategory.length === 0 || selectedCategory.includes(product.category);
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <>
      {loading ?
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
        :
        <Container maxWidth="lg">
          <Typography variant='h6' gutterBottom>
            {`Hello ${loggedInUser.email}!`}
          </Typography>
          <Box p={2}>
            <TextField
              placeholder='Search products...'
              value={searchTerm}
              onChange={handleSearchTermChange}
              fullWidth
              variant='outlined'
              margin='normal'
              sx={{marginBottom: 2}}
            />
            <Box mb={2}>
              <Typography variant='subtitle1'>Category</Typography>
              {allCategory?.map((category: string, index: number) => (
                <FormControlLabel
                  control={<Checkbox color='primary' onChange={handleCategoryChange} value={category} />}
                  label={category}
                  key={index}
                />
              ))}
            </Box>
            <Grid container spacing={2} justifyContent="center">
              {filteredProducts.map((product: IProductModel) => (
                <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} cartDetails={cartDetails} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      }
    </>
  );
};

export default Home;
