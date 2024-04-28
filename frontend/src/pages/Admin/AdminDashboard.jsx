import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@mui/material';

const AdminDashboard = () => {
  // Sample data
  const totalSales = 1234;
  const totalUsers = 567;
  const totalProducts = 89;

  return (
    <Box p={4}>
      <Typography variant='h4' gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Total Sales
              </Typography>
              <Typography variant='h4'>{totalSales}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Total Users
              </Typography>
              <Typography variant='h4'>{totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Total Products
              </Typography>
              <Typography variant='h4'>{totalProducts}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
