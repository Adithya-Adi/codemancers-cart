import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
} from '@mui/material';
import ProductCard from '../../components/User/ProductCard';

const Home = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      name: `Men's Casual Shirt`,
      price: 29.99,
      rating: 4.5,
      image: 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png',
      category: 'Shirts',
      description: 'A comfortable and stylish casual shirt for men, suitable for everyday wear.'
    },
    {
      id: 2,
      name: `Men's Slim-fit Pants`,
      price: 39.99,
      rating: 4.8,
      image: 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png',
      category: 'Pants',
      description: 'Slim-fit pants designed for men, offering both style and comfort.'
    },
    {
      id: 3,
      name: `Women's Running Shoes`,
      price: 49.99,
      rating: 4.7,
      image: 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png',
      category: 'Shoes',
      description: 'Lightweight and breathable running shoes for women, perfect for daily workouts or running sessions.'
    },
    {
      id: 4,
      name: `Women's Floral Dress`,
      price: 59.99,
      rating: 4.3,
      image: 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png',
      category: 'Dresses',
      description: 'A beautiful floral dress for women, ideal for various occasions such as parties, weddings, or casual outings.'
    },
    {
      id: 5,
      name: `Men's Leather Belt`,
      price: 19.99,
      rating: 4.6,
      image: 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png',
      category: 'Accessories',
      description: 'High-quality leather belt for men, featuring a classic design suitable for both formal and casual attire.'
    },
    {
      id: 6,
      name: `Women's Denim Jacket`,
      price: 69.99,
      rating: 4.9,
      image: 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png',
      category: 'Jackets',
      description: 'Stylish denim jacket for women, perfect for layering and adding a trendy touch to any outfit.'
    },
  ];


  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategory((prevSelected) =>
      checked ? [...prevSelected, value] : prevSelected.filter((category) => category !== value)
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory.length === 0 || selectedCategory.includes(product.category);
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <>
      <Typography variant='h6' gutterBottom pl={8}>
        Hello adithyahebbar32@gmail.com!
      </Typography>
      <Box p={8}>
        <TextField
          placeholder='Search products...'
          value={searchTerm}
          onChange={handleSearchTermChange}
          fullWidth
          variant='outlined'
          margin='normal'
          mb={4}
        />
        <Box mb={4}>
          <Typography variant='subtitle1'>Category</Typography>
          <FormControlLabel
            control={<Checkbox color='primary' onChange={handleCategoryChange} value='Shirts' />}
            label='Shirts'
          />
          <FormControlLabel
            control={<Checkbox color='primary' onChange={handleCategoryChange} value='Pants' />}
            label='Pants'
          />
          <FormControlLabel
            control={<Checkbox color='primary' onChange={handleCategoryChange} value='Shoes' />}
            label='Shoes'
          />
        </Box>
        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Home;