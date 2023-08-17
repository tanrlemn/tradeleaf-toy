'use client';

// styles
import styles from './calculator.module.css';

// images
import restart from '@/public/restart.png';

// hooks
import { useState, useEffect } from 'react';

// components
import Image from 'next/image';
import {
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  Text,
  Heading,
  Box,
  Stack,
  VStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

export default function CalculatorSection({
  label,
  items,
  calculator,
  setCalculator,
  bgColor,
  reset = false,
  horizontal = false,
  defaultCalculator,
  setCalculate,
  calculate,
}) {
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    if (items !== null && sliderValue === 0) {
      items.find((item) => {
        item.input === 'slider' && setSliderValue(calculator[item.name]);
      });
    }
    if (calculate) {
      setSliderValue(calculator.percentTransactions);
    }
  }, [calculator, items, sliderValue, calculate]);

  return (
    <VStack
      onClick={() => {
        if (reset) {
          setCalculator(defaultCalculator);
          setCalculate(true);
          setSliderValue(defaultCalculator.percentTransactions);
          console.log(defaultCalculator);
          console.log(sliderValue);
        }
      }}
      flex={1}
      minH='100%'
      gap={0}>
      <VStack
        flex={reset && 1}
        gap={{ base: '0', md: '' }}
        align='center'
        justify='center'
        style={{ cursor: reset ? 'pointer' : 'default' }}
        borderBottom='0.5px solid var(--gray-mid)'
        w='100%'
        _hover={reset ? { bg: 'var(--gray-dark-alt)' } : ''}
        bg={bgColor}
        pt={{ base: reset ? '1rem' : '0', md: '' }}
        className={styles.itemTitleWrap}>
        {reset && (
          <Image
            flex={1}
            src={restart}
            alt='reset'
            width={20}
            height={20}
          />
        )}
        <Text
          borderRight='1px solid var(--gray-mid)'
          borderBottom={reset ? '' : '0.5px solid var(--gray-mid)'}
          border={reset ? '' : '1px solid var(--gray-mid)'}
          w='100%'
          color={reset ? 'var(--gray-light)' : 'var(--black-blue-alt)'}
          size={{ sm: 'xs', md: 'xs' }}
          textAlign='center'
          as='b'
          p={{ base: '2', md: '2' }}
          className={styles.itemTitle}>
          {label}
        </Text>
      </VStack>

      {items !== null && (
        <Stack
          direction={horizontal ? 'row' : 'column'}
          flex={1}
          className={styles.itemsWrap}
          gap={0}
          minH='100%'
          justify='flex-start'>
          {items.map((item, index) => {
            return (
              <Box
                flex={1}
                minW={{ md: horizontal ? 0 : '100%' }}
                minH={{
                  sm: 'fit-content',
                  md: '',
                  lg: horizontal ? '100%' : '13rem',
                }}
                bg={item.itemBgColor}
                key={index}
                className={styles.itemWrap}>
                <Box maxW={{ base: '', md: '11rem' }}>
                  <Text
                    className={styles.itemLabel}
                    lineHeight={1.2}
                    textAlign='center'
                    mb='0.5rem'
                    fontSize='lg'>
                    {item.label}
                  </Text>
                  {item.input === 'number' && (
                    <NumberInput
                      size={{ base: 'sm', md: 'md' }}
                      onChange={(val) => {
                        setCalculator({
                          ...calculator,
                          [item.name]: Number(val),
                        });
                        setCalculate(true);
                      }}
                      defaultValue={calculator[item.name]}
                      min={item.min}
                      max={
                        item.max !== null ? item.max : Number.MAX_SAFE_INTEGER
                      }>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  )}
                  {item.input === 'slider' && (
                    <Box>
                      <NumberInput
                        size={{ base: 'sm', md: 'md' }}
                        keepWithinRange={false}
                        clampValueOnBlur={false}
                        onChange={(val) => {
                          setCalculator({ ...calculator, [item.name]: val });
                          setCalculate(true);
                          setSliderValue(val);
                        }}
                        value={`${sliderValue}%`}
                        defaultValue={calculator[item.name]}
                        min={item.min}
                        max={
                          item.max !== null ? item.max : Number.MAX_SAFE_INTEGER
                        }>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <Slider
                        focusThumbOnChange={false}
                        value={sliderValue}
                        minW='100%'
                        step={0.1}
                        onChange={(val) => setSliderValue(val)}
                        onChangeEnd={(val) => {
                          setCalculator({ ...calculator, [item.name]: val });
                          setCalculate(true);
                          setSliderValue(val);
                        }}
                        aria-label={item.name}
                        defaultValue={calculator[item.name]}>
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </Box>
                  )}
                  {item.input === null && (
                    <Box>
                      <Heading
                        fontSize={{ base: '1.3rem', md: '1.7rem' }}
                        value={calculator[item.name]}
                        textAlign='center'>
                        {`${calculator[item.name]}${
                          item.format === 'percent' ? '%' : ''
                        }`}
                      </Heading>
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })}
        </Stack>
      )}
    </VStack>
  );
}
