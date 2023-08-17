'use client';

// styles
import styles from './navbar.module.css';

// images
import logo from '@/public/logo.svg';

// components
import { HStack, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';

export default function Navbar() {
  return (
    <HStack
      borderBottom='1px solid var(--gray-mid)'
      p={{ base: '0.5rem', md: '1rem' }}
      justify='space-between'>
      <HStack>
        <Image
          src={logo}
          alt='logo'
          width={35}
          height={35}
        />
        <Heading
          as='h2'
          fontSize={{ base: '1rem', md: '1.8rem' }}
          fontWeight='800'>
          ivyFoundation
        </Heading>
      </HStack>
      <Heading
        as='h2'
        fontSize={{ base: '0', md: '1.4rem' }}
        display={{ base: 'none', md: 'block' }}
        fontWeight='600'>
        impactCalculator
      </Heading>
      <Text>toyVersion 1.0</Text>
    </HStack>
  );
}
