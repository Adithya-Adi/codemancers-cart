/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
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

const Home = () => {
  const [products, setProducts] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [cartDetails, setCartDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    const getCartDetails = async () => {
      try {
        const getCartDetailsResponse = await CartAPI.getUserCart(loggedInUser._id);
        setCartDetails(getCartDetailsResponse.data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    getCartDetails();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const allProducts = await ProductAPI.getAllProducts();
      setProducts(allProducts.data);
      const category = new Set(allProducts.data.map(product => product.category));
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

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategory((prevSelected) =>
      checked ? [...prevSelected, value] : prevSelected.filter((category) => category !== value)
    );
  };

  const filteredProducts = products?.filter((product) => {
    const matchesSearchTerm = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
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
              mb={2}
            />
            <Box mb={2}>
              <Typography variant='subtitle1'>Category</Typography>
              {allCategory?.map((category, index) => (
                <FormControlLabel
                  control={<Checkbox color='primary' onChange={handleCategoryChange} value={category} />}
                  label={category}
                  key={index}
                />
              ))}
            </Box>
            <Grid container spacing={2} justifyContent="center">
              {filteredProducts.map((product) => (
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
