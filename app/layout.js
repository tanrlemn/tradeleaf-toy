import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

import ChakraLayoutProvider from './styles/ChakraProvider';

export const metadata = {
  title: 'tradeLeaf toy',
  description: 'play with this to find out how the tradeLeaf system works',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ChakraLayoutProvider>{children}</ChakraLayoutProvider>
      </body>
    </html>
  );
}
