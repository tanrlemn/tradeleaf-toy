'use client';

// hooks
import { useRef } from 'react';

//components
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerFooter,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Input,
  DrawerHeader,
  useDisclosure,
} from '@chakra-ui/react';
import AdditionalSettings from './additionalSettings';

export default function SettingsDrawer({
  calculator,
  setCalculator,
  calculate,
  setCalculate,
  defaultCalculator,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Button
        mt='1rem'
        ref={btnRef}
        colorScheme='facebook'
        variant='outline'
        size='sm'
        onClick={onOpen}>
        additional settings
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader mt='2rem'>impactCalculator settings</DrawerHeader>

          <DrawerBody>
            <AdditionalSettings
              label='settings'
              items={[
                {
                  input: 'number',
                  min: 0,
                  max: 10000,
                  step: 1,
                  name: 'businesses',
                  format: 'number',
                  label: 'number of businesses',
                },
                {
                  input: 'number',
                  min: 0,
                  max: 1000000000,
                  step: 10,
                  name: 'activeUsers',
                  format: 'number',
                  label: 'number of active users',
                },
              ]}
              calculator={calculator}
              setCalculator={setCalculator}
              setCalculate={setCalculate}
              calculate={calculate}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant='outline'
              colorScheme='red'
              mr={3}
              onClick={() => {
                setCalculator(defaultCalculator);
                setCalculate(true);
              }}>
              reset all settings
            </Button>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={() => {
                onClose();
                setCalculate(true);
              }}>
              save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
