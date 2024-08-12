import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        margin: 0,
        bg: 'black', // Set the background color to black
        color: 'white', // Optional: Set text color to white for better contrast
        overflowX: 'hidden', // Hide horizontal scrollbar
      },
      '*::-webkit-scrollbar': {
        display: 'none', // Hide scrollbar in WebKit browsers
      },
      '::-webkit-scrollbar': {
        display: 'none', // Hide scrollbar in WebKit browsers
      },
      'body': {
        scrollbarWidth: 'none', // Firefox scrollbar width
        msOverflowStyle: 'none', // Internet Explorer and Edge scrollbar style
      },
    },
  },
});

export default theme;
