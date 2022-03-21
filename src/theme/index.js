import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c40027'
    },
    secondary: {
      main: '#FEF5ED'
    },
    white: {
      main: '#fff'
    }
  },
  shape: {
    borderRadius: 10
  },
  typography: {
    fontFamily: 'poppins'
  },
  card: {
    borderRadius: 10
  }
});

export default theme;
