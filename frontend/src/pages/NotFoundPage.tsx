import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import notFoundImage from '../assets/notfound.jpg';

const NotFoundPage = () : ReactElement => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={notFoundImage} alt='404 Not Found' style={{ width: '100%', maxWidth: '700px', margin: 'auto' }} />
      <p><Button component={Link} to='/' variant='contained' color='primary'>Home--</Button></p>
    </div>
  );
}

export default NotFoundPage;
