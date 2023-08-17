'use client';

// styles
import styles from './calculator.module.css';

// hooks
import { useState, useEffect, useMemo } from 'react';

// components
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import CalculatorSection from './calculatorSection';

export default function Calculator() {
  const defaultCalculator = useMemo(
    () => ({
      businesses: 1,
      percentTransactions: 2.1,
      averageTransactionAmount: 13.65,
      numberTransactions: 172903,
      totalSpent: 0,
      activeUsers: 9092,
      cityDollarsDispersed: 0,
      cityDollarsSpent: 0,
      percentReinvested: 0,
      amountEarnedPerUser: 0,
      residualCityDollars: 0,
      flowerFund: {
        amountInvested: 0,
        percentToTradeLeaf: 0,
        amountToTradeLeaf: 0,
        amountForCommunity: 0,
      },
    }),
    []
  );

  const [calculator, setCalculator] = useState(null);
  const [calculate, setCalculate] = useState(false);

  useEffect(() => {
    const makeCalculations = () => {
      const formattedCurrency = (number) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(number);
      };
      const formattedNumber = (number) => {
        return new Intl.NumberFormat().format(number);
      };

      function mFormatter(num) {
        if (num > 999999999999)
          return '$' + (num / 1000000000000).toFixed(2) + 'T';
        if (num > 999999999) return '$' + (num / 1000000000).toFixed(2) + 'B';
        return (
          '$' + Math.sign(num) * (Math.abs(num) / 1000000).toFixed(2) + 'M'
        );
      }

      const percentTransactions = calculator.percentTransactions / 100;
      const averageTransactionAmount = calculator.averageTransactionAmount;
      const numberTransactions = calculator.numberTransactions;
      const totalSpent = averageTransactionAmount * numberTransactions;
      const activeUsers = calculator.activeUsers;
      const cityDollarsDispersed = totalSpent * percentTransactions;
      const cityDollarsSpent = cityDollarsDispersed;
      const percentReinvested = (cityDollarsDispersed / totalSpent) * 100;
      const amountEarnedPerUser = cityDollarsDispersed / activeUsers;
      const residualCityDollars = cityDollarsSpent - amountEarnedPerUser;

      setCalculator({
        ...calculator,
        totalSpent:
          totalSpent > 999999
            ? mFormatter(totalSpent)
            : formattedCurrency(totalSpent),
        cityDollarsDispersed:
          cityDollarsDispersed > 999999
            ? mFormatter(cityDollarsDispersed)
            : formattedCurrency(cityDollarsDispersed),
        cityDollarsSpent:
          cityDollarsSpent > 999999
            ? mFormatter(cityDollarsSpent)
            : formattedCurrency(cityDollarsSpent),
        percentReinvested: formattedNumber(percentReinvested),
        amountEarnedPerUser:
          amountEarnedPerUser > 999999
            ? mFormatter(amountEarnedPerUser)
            : formattedCurrency(amountEarnedPerUser),
        residualCityDollars:
          residualCityDollars > 999999
            ? mFormatter(residualCityDollars)
            : formattedCurrency(residualCityDollars),
      });
      localStorage.setItem('calculator', JSON.stringify(calculator));
    };

    if (calculator !== null && calculate) {
      makeCalculations();
      setCalculate(false);
    } else if (calculator === null) {
      if (localStorage.getItem('calculator') !== null) {
        setCalculator(JSON.parse(localStorage.getItem('calculator')));
      } else {
        setCalculator(defaultCalculator);
      }
      setCalculate(true);
    }
  }, [calculator, calculate, defaultCalculator]);

  return (
    <Flex
      className={styles.calculator}
      direction='row'
      align='center'
      justify='flex-start'>
      {calculator !== null && (
        <Grid
          h='100%'
          maxH={{ sm: '', md: '91vh', lg: '100%' }}
          w='100%'
          maxW='100vw'
          templateRows={{ sm: 'repeat(4, 1fr)', lg: '35px repeat(3, 1fr)' }}
          templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(8, 1fr)' }}>
          <GridItem
            minH='100%'
            rowSpan={{ sm: 1, md: 3, lg: 4 }}
            colSpan={{ sm: 2, md: 1, lg: 3 }}>
            <CalculatorSection
              label='tradeLeaf'
              items={[
                {
                  value: calculator.percentTransactions,
                  input: 'slider',
                  min: 0,
                  max: 100,
                  name: 'percentTransactions',
                  format: 'percent',
                  label: 'percent of transactions',
                },
                {
                  value: calculator.averageTransactionAmount,
                  input: 'number',
                  min: 0,
                  max: null,
                  name: 'averageTransactionAmount',
                  format: 'currency',
                  label: 'average transaction amount',
                },
                {
                  value: calculator.numberTransactions,
                  input: 'number',
                  min: 0,
                  max: null,
                  name: 'numberTransactions',
                  format: 'number',
                  label: 'number of transactions',
                },
              ]}
              bgColor='var(--green)'
              calculator={calculator}
              setCalculator={setCalculator}
              setCalculate={setCalculate}
              calculate={calculate}
            />
          </GridItem>
          <GridItem
            minH='100%'
            colSpan={{ md: 1, lg: 2 }}
            rowSpan={{ md: 1, lg: 2 }}>
            <CalculatorSection
              label='theCommunity'
              items={[
                {
                  value: calculator.totalSpent,
                  input: null,
                  name: 'totalSpent',
                  format: 'currency',
                  label: 'total amount spent by users',
                  itemBgColor: 'var(--orange-50)',
                },
              ]}
              calculator={calculator}
              bgColor='var(--orange)'
              setCalculator={setCalculator}
              setCalculate={setCalculate}
              calculate={calculate}
            />
          </GridItem>
          <GridItem
            minH='100%'
            colSpan={{ md: 1, lg: 2 }}
            rowSpan={{ md: 1, lg: 2 }}>
            <CalculatorSection
              label='theCommunity'
              items={[
                {
                  value: calculator.cityDollarsDispersed,
                  input: null,
                  name: 'cityDollarsDispersed',
                  format: 'currency',
                  label: 'cityDollars dispersed',
                  itemBgColor: 'var(--blue-50)',
                },
              ]}
              calculator={calculator}
              bgColor='var(--blue)'
              setCalculator={setCalculator}
              setCalculate={setCalculate}
              calculate={calculate}
            />
          </GridItem>
          <GridItem
            minH='100%'
            colSpan={{ sm: 2, md: 1, lg: 1 }}
            rowSpan={{ md: 1, lg: 2 }}>
            <CalculatorSection
              label='reset'
              items={null}
              calculator={calculator}
              bgColor='var(--black-blue-alt)'
              setCalculator={setCalculator}
              setCalculate={setCalculate}
              calculate={calculate}
              reset={true}
              defaultCalculator={defaultCalculator}
            />
          </GridItem>

          <GridItem
            minH='100%'
            colSpan={{ sm: 2, md: 2, lg: 5 }}
            rowSpan={{ md: 1, lg: 2 }}>
            <CalculatorSection
              label='impactLevel'
              items={[
                {
                  value: calculator.percentReinvested,
                  input: null,
                  name: 'percentReinvested',
                  format: 'percent',
                  label: 'percentage of revenue reinvested in the city',
                  itemBgColor: 'var(--teal-50)',
                },
                {
                  value: calculator.amountEarnedPerUser,
                  input: null,
                  name: 'amountEarnedPerUser',
                  format: 'currency',
                  label: 'average amount earned per user',
                  itemBgColor: 'var(--teal-50)',
                },
                {
                  value: calculator.residualCityDollars,
                  input: null,
                  name: 'residualCityDollars',
                  format: 'currency',
                  label: 'residual city dollars generated',
                  itemBgColor: 'var(--teal-50)',
                },
              ]}
              calculator={calculator}
              bgColor='var(--teal)'
              setCalculator={setCalculator}
              setCalculate={setCalculate}
              calculate={calculate}
              horizontal={true}
            />
          </GridItem>
        </Grid>
      )}
    </Flex>
  );
}
