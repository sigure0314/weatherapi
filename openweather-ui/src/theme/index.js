import { createTheme } from '@mui/material/styles';
import palette from './palette.js';
import typography from './typography.js';

const theme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8
        }
      }
    }
  }
});

export default theme;
