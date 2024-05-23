import {
  Box,
  CircularProgress
} from '@mui/material';
import React from 'react';

const Loading: React.FC = () => (
  <Box
    display='flex'
    alignItems='center'
    justifyContent='center'
    minHeight='100vh'
  >
    <CircularProgress />
  </Box>
);

export default Loading;