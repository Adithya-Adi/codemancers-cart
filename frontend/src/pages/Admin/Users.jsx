import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material';

const Users = () => {

  const [dummyUsers, setDummyUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phoneNumber: '9876543210', isActive: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phoneNumber: '8765432109', isActive: true },
    { id: 3, name: 'Michael Johnson', email: 'michael@example.com', phoneNumber: '7654321098', isActive: false },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', phoneNumber: '6543210987', isActive: true },
    { id: 5, name: 'David Wilson', email: 'david@example.com', phoneNumber: '54321 09876', isActive: false },
  ]);

  const toggleActivation = (userId) => {
    setDummyUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  return (
    <TableContainer component={Paper} sx={{ padding: '16px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>
                <Button
                  variant='contained'
                  color={user.isActive ? 'primary' : 'secondary'}
                  onClick={() => toggleActivation(user.id)}
                >
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Users;
