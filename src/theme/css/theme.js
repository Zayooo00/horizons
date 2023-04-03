import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        color: 'white',
      },
    },
  },
  palette: {
    primary: '#1a2023',
    secondary: '#1c1e1f',
    accent: '#d4af37',
  },
  fonts: {
    heading: '\'Poppins\', sans-serif',
    body: '\'Poppins\', sans-serif',
  },
});
export default theme;
