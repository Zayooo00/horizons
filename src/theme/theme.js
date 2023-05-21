import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        color: 'white',
        bg: 'transparent',
      },
    },
  },

  palette: {
    primary: '#1a2023',
    secondary: '#1c1e1f',
    accent: '#d4af37',
  },

  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },

  components: {
    Input: {
      defaultProps: {
        focusBorderColor: '#294747',
      },
      variants: {
        outline: {
          field: {
            borderColor: 'grey',
          },
        },
        outlineOrange: {
          field: {
            bg: 'transparent',
            border: '1px solid grey',
            _hover: {
              border: '1px solid white',
            },
            _focus: {
              border: '2px solid #f47533',
            },
            transition: 'border-width 0.1s',
          },
        },
        outlineGreen: {
          field: {
            bg: 'transparent',
            border: '1px solid grey',
            _hover: {
              border: '1px solid white',
            },
            _focus: {
              border: '2px solid #d4e45d',
            },
            transition: 'border-width 0.1s',
          },
        },
      },
    },

    Textarea: {
      defaultProps: {
        focusBorderColor: '#294747',
      },
    },
  },
});

export default theme;
