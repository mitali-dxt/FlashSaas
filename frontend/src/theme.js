import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        margin: 0,
        bg: 'black', // Set the background color to black
        color: 'white', // Optional: Set text color to white for better contrast
        overflowX: 'hidden', // Hide horizontal scrollbar
        minHeight: '100vh',
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
        bg: 'black', // Set the background color to black
      },
      '#root': {
        minHeight: '100vh', // Ensure the root element covers the full height of the screen
        bg: 'black', // Set the background color to black for the root element
      },
    },
  },
});

export default theme;
