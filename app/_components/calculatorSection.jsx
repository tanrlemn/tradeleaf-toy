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
        align='center'
        justify='center'
        style={{ cursor: reset ? 'pointer' : 'default' }}
        borderBottom='0.5px solid var(--gray-mid)'
        w='100%'
        _hover={reset ? { bg: 'var(--gray-dark-alt)' } : ''}
        bg={bgColor}
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
          borderBottom={reset ? '' : '1px solid var(--gray-mid)'}
          w='100%'
          color={reset ? 'var(--gray-light)' : 'var(--black-blue-alt)'}
          fontSize='xs'
          textAlign='center'
          as='b'
          p='2'
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
                flexBasis={horizontal ? '100%' : 0}
                minW={horizontal ? 0 : '100%'}
                minH={horizontal ? '100%' : '13rem'}
                bg={item.itemBgColor}
                key={index}
                className={styles.itemWrap}>
                <Box maxW='11rem'>
                  <Text
                    lineHeight={1.2}
                    textAlign='center'
                    mb='0.5rem'
                    fontSize='lg'>
                    {item.label}
                  </Text>
                  {item.input === 'number' && (
                    <NumberInput
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
                        fontSize='1.7rem'
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
