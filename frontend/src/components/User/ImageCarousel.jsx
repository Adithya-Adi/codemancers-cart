import { useState, useEffect } from 'react';
import { IconButton, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import sliderImage1 from '../../assets/sliderImage1.jpg';
import sliderImage2 from '../../assets/sliderImage2.jpg';
import sliderImage3 from '../../assets/sliderImage3.jpg';
import { useMediaQuery } from '@mui/material';

const images = [
  sliderImage1,
  sliderImage2,
  sliderImage3,
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: isMobile ? '150px' : '500px',
      overflow: 'hidden'
    }}>
      <IconButton
        style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.5)', color: '#000' }}
        onClick={handlePrev}
      >
        <ArrowBackIcon />
      </IconButton>
      <Paper elevation={3} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
        <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
      </Paper>
      <IconButton
        style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.5)', color: '#000' }}
        onClick={handleNext}
      >
        <ArrowForwardIcon />
      </IconButton>
    </div>
  );
};

export default ImageCarousel;
