import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { UserAPI } from '../../services/apis/userAPI';

const Users = () => {
  //states
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const allUsers = await UserAPI.getAllUsers();
      setUsers(allUsers.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, [])

  return (
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
            <TableRow key={user.id}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Users;
