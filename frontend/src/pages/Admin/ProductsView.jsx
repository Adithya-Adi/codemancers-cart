import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductsView = () => {
  const navigate = useNavigate();

  const dummyProducts = [
    { id: 1, name: 'Product 1', description: 'Description of Product 1', price: 29.99, category: 'Category 1', image: 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png' },
    { id: 2, name: 'Product 2', description: 'Description of Product 2', price: 39.99, category: 'Category 2', image: 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png' },
    { id: 3, name: 'Product 3', description: 'Description of Product 3', price: 49.99, category: 'Category 3', image: 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png' },
    { id: 4, name: 'Product 4', description: 'Description of Product 4', price: 59.99, category: 'Category 1', image: 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png' },
    { id: 5, name: 'Product 5', description: 'Description of Product 5', price: 69.99, category: 'Category 2', image: 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png' },
  ];

  const handleEdit = (productId) => {
    navigate(`/admin/products/${productId}`);
  };

  const handleDelete = (productId) => {
    console.log(productId);
  };

  const handleAddProduct = () => {
    navigate('/admin/products');
  };

  return (
    <>
      <Box display='flex' justifyContent='flex-end' mb={2}>
        <Button variant='contained' color='primary' onClick={handleAddProduct}>Add Product</Button>
      </Box>
      <TableContainer component={Paper} sx={{ padding: '16px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img src={product.image} alt={product.name} style={{ width: 50, height: 50 }} />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Button variant='contained' color='primary' onClick={() => handleEdit(product.id)} sx={{ marginRight: 3 }}>Edit</Button>
                  <Button variant='contained' color='error' onClick={() => handleDelete(product.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductsView;
