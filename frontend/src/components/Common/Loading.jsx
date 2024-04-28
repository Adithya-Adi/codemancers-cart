import {
  Box,
  CircularProgress
} from '@mui/material';

const Loading = () => (
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