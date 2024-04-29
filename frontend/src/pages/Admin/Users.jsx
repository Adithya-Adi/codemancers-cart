import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box
} from '@mui/material';
import { UserAPI } from '../../services/apis/userAPI';

const Users = () => {
  //states
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const allUsers = await UserAPI.getAllUsers();
      setUsers(allUsers.data);
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, [])

  return (
    <>
      {loading ?
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
        :

        <TableContainer component={Paper} >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </>
  );
};

export default Users;
