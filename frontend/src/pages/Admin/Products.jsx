import { Typography, Box, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import ProductsForm from '../../components/Admin/ProductsForm';

const Products = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Box display='flex' alignItems='center' mb={2}>
        <IconButton onClick={handleBack}>
          <ArrowBack />
        </IconButton>
        <Typography variant='h4' ml={1} mb={0}>{id ? 'Edit Product' : 'Add Product'}</Typography>
      </Box>
      <ProductsForm productId={id} />
    </Box>
  );
};

export default Products;
