import { createTheme } from '@mui/material/styles';

const theme: any = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontFamily: 'Poppins, sans-serif',
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
    },
    h3: {
      fontFamily: 'Poppins, sans-serif',
    },
    h4: {
      fontFamily: 'Poppins, sans-serif',
    },
    h5: {
      fontFamily: 'Poppins, sans-serif',
    },
    h6: {
      fontFamily: 'Poppins, sans-serif',
    },
  },
  palette: {
    primary: {
      main: '#754ffe',
      light: '#382189',
      dark: '#382189',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e60000',
      light: '#ff1919',
      dark: '#b30000',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#4f4f66',
      secondary: '#676780',
      disabled: '#a3a3b2',
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&:hover': {
            borderColor: '#4f8dff',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#754ffe',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#754ffe',
          textDecoration: 'underline',
          '&:hover': {
            textDecoration: 'none',
          },
        },
      },
    },
  },
});

export default theme;
