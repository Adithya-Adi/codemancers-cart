import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProductAPI } from '../../services/apis/productAPI';
import toast from 'react-hot-toast';

const ProductsView = () => {
  // states
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const allProducts = await ProductAPI.getAllProducts();
      setProducts(allProducts.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  const handleEdit = (productId) => {
    navigate(`/admin/products/${productId}`);
  };

  const handleDelete = async (productId) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (!confirmed) {
      return;
    }
    try {
      const deleteProductResponse = await ProductAPI.deleteProduct(productId);
      const updatedProducts = products.filter(product => product._id !== productId);
      setProducts(updatedProducts);
      toast.success(deleteProductResponse.message);
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };


  const handleAddProduct = () => {
    navigate('/admin/products');
  };

  return (
    <>
      {loading ?
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box> 
        :
        <>
          <Box display='flex' justifyContent='flex-end' mb={2}>
            <Button variant='contained' color='primary' onClick={handleAddProduct}>Add Product</Button>
          </Box>
          <TableContainer component={Paper} sx={{ padding: '16px' }}>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {products?.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <img src={product.image} alt={product.name} style={{ width: 50, height: 50 }} />
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <Button variant='contained' color='primary' onClick={() => handleEdit(product._id)} sx={{ marginRight: 3, width: '100px' }}>Edit</Button>
                      <Button variant='contained' color='error' onClick={() => handleDelete(product._id)} sx={{ width: '100px', marginTop: 2 }}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      }
    </>
  );
};

export default ProductsView;
