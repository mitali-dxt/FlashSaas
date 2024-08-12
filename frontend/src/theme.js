import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'black', // Set the background color to black
        color: 'white', // Optional: Set text color to white for better contrast
      },
    },
  },
});

export default theme;
