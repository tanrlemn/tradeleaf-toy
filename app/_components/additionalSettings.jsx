'use client';

// styles
import styles from './calculator.module.css';

// hooks
import { useState, useEffect } from 'react';

// components
import {
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  Text,
  Box,
  Stack,
  VStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

export default function AdditionalSettings({
  items,
  calculator,
  setCalculator,
  setCalculate,
  calculate,
}) {
  const [targetReward, setTargetReward] = useState(0);

  useEffect(() => {
    if (items !== null) {
      if (targetReward === 0) {
        items.find((item) => {
          item.name === 'targetReward' &&
            setTargetReward(calculator[item.name]);
        });
      }
    }
    if (calculate) {
      setTargetReward(calculator.targetReward);
    }
  }, [calculator, items, calculate, targetReward]);

  return (
    <VStack
      minH='100%'
      justify='flex-start'
      align='flex-start'
      gap={0}>
      {items !== null && (
        <Stack
          gap={0}
          minH='100%'
          justify='flex-start'>
          {items.map((item, index) => {
            const value = {
              value: item.name === 'targetReward' ? targetReward : null,
              setValue: item.name === 'targetReward' ? setTargetReward : null,
            };
            const formatVal = (val) => {
              if (item.format === 'percent') return `${val}%`;
              if (item.format === 'currency') return `$${val}`;
              if (item.format === 'number')
                return new Intl.NumberFormat().format(val);
            };

            return (
              <Box
                mb='1rem'
                minW='100%'
                bg={item.itemBgColor}
                key={index}>
                <Box>
                  <Text
                    className={styles.itemLabel}
                    lineHeight={1.2}
                    mb='0.5rem'
                    fontSize='lg'>
                    {item.label}
                  </Text>

                  {item.input !== null && (
                    <Box>
                      <NumberInput
                        size={{ base: 'sm', md: 'md' }}
                        keepWithinRange={false}
                        clampValueOnBlur={false}
                        onChange={(val) => {
                          console.log(val);
                          setCalculator({ ...calculator, [item.name]: val });
                          setCalculate(true);
                          value.setValue(val);
                        }}
                        value={formatVal(value.value)}
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
                        min={item.min}
                        max={item.max !== null ? item.max : 100}
                        focusThumbOnChange={false}
                        value={value.value}
                        minW='100%'
                        step={item.step}
                        onChange={(val) => {
                          value.setValue(val);
                        }}
                        onChangeEnd={(val) => {
                          setCalculator({ ...calculator, [item.name]: val });
                          setCalculate(true);
                          value.setValue(val);
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
                </Box>
              </Box>
            );
          })}
        </Stack>
      )}
    </VStack>
  );
}
