import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const ProductsForm = ({ productId }) => {
  const { id } = useParams();
  const isEditMode = !!productId;

  const [formData, setFormData] = useState({
    image: '',
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const [selectedImageName, setSelectedImageName] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const existingProductData = { name: 'Existing Product', description: 'Existing Description', price: '50', category: 'Existing Category', image: 'existing_image_url.jpg' };
      setFormData(existingProductData);
    }
  }, [id, isEditMode]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: URL.createObjectURL(file),
      }));
      setSelectedImageName(file.name);
    }
  };

  const handleSubmit = () => {
    console.log('Form data:', formData);
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
        <Button variant='contained' component='span' color='primary' mb={2}>Upload Image</Button>
      </label>
      {selectedImageName && (
        <Typography variant='subtitle1' mb={2}>{selectedImageName}</Typography>
      )}
      <TextField
        name='name'
        label='Name'
        variant='outlined'
        fullWidth
        margin='normal'
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        name='description'
        label='Description'
        variant='outlined'
        fullWidth
        multiline
        rows={4}
        margin='normal'
        value={formData.description}
        onChange={handleChange}
      />
      <TextField
        name='price'
        label='Price'
        variant='outlined'
        fullWidth
        type='number'
        margin='normal'
        value={formData.price}
        onChange={handleChange}
      />
      <TextField
        name='category'
        label='Category'
        variant='outlined'
        fullWidth
        margin='normal'
        value={formData.category}
        onChange={handleChange}
      />
      <Box mt={2}>
        <Button variant='contained' color='primary' onClick={handleSubmit}>{isEditMode ? 'Save' : 'Add Product'}</Button>
      </Box>
    </>
  );
};

export default ProductsForm;
