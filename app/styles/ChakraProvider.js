'use client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '--bg-gray',
      },
    },
  },
});

export default function ChakraLayoutProvider({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
