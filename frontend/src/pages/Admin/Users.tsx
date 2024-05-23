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
  const [users, setUsers] = useState<IUsers[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllUsers = async () : Promise<void> => {
    try {
      setLoading(true);
      const allUsers = await UserAPI.getAllUsers();
      setUsers(allUsers.data);
    } catch (error: any) {
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
              {users?.map((user: IUsers) => (
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

export interface IUsers {
  _id: string,
  fullName: string,
  email: string,
  phoneNumber: string,
  map?: any,
}
