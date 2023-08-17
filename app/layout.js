import './globals.css';
import { Manrope } from 'next/font/google';

const manrope = Manrope({ subsets: ['latin'] });

import ChakraLayoutProvider from './styles/ChakraProvider';
import Navbar from './navigation/navbar';

export const metadata = {
  title: 'tradeLeaf toy',
  description: 'play with this to find out how the tradeLeaf system works',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={manrope.className}>
        <ChakraLayoutProvider>
          <Navbar />
          {children}
        </ChakraLayoutProvider>
      </body>
    </html>
  );
}
