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
      monthlyRevenue: 19000,
      totalSpent: 0,
      activeUsers: 10,
      targetReward: 100,
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
    const setActiveUsers = (
      monthlyRevenue,
      percentTransactions,
      targetReward
    ) => {
      const activeUsers =
        (Number(monthlyRevenue) * Number(percentTransactions)) /
        Number(targetReward);

      setCalculator({
        ...calculator,
        activeUsers: Math.floor(Number(activeUsers)),
      });

      return Math.floor(Number(activeUsers));
    };

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
      const monthlyRevenue = calculator.monthlyRevenue;
      const totalSpent = Number(monthlyRevenue);
      const activeUsers = setActiveUsers(
        Number(totalSpent),
        Number(percentTransactions),
        Number(calculator.targetReward)
      );
      const cityDollarsDispersed = totalSpent * percentTransactions;
      const cityDollarsSpent = cityDollarsDispersed;

      const percentReinvested = (cityDollarsDispersed / totalSpent) * 100;
      const residualCityDollars = cityDollarsSpent * percentTransactions;

      setCalculator({
        ...calculator,
        totalSpent: totalSpent,
        cityDollarsDispersed: cityDollarsDispersed,
        cityDollarsSpent: cityDollarsSpent,
        monthlyRevenue: monthlyRevenue,
        percentReinvested: percentReinvested,
        activeUsers: Number(activeUsers),
        residualCityDollars: residualCityDollars,
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
                  step: 0.01,
                  name: 'percentTransactions',
                  format: 'percent',
                  label: 'percent of revenue donated by business',
                },
                {
                  value: calculator.monthlyRevenue,
                  input: 'number',
                  min: 0,
                  max: 1000000,
                  step: 0.01,
                  name: 'monthlyRevenue',
                  format: 'currency',
                  label: 'average monthly revenue for business',
                },
                {
                  value: calculator.targetReward,
                  input: 'number',
                  min: 0,
                  max: 2500,
                  step: 10,
                  name: 'targetReward',
                  format: 'currency',
                  label: 'target monthly reward per user',
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
                  label: 'total monthly business revenue generated',
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
                  label: 'city-restricted dollars generated',
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
                  label: 'percent of revenue reinvested in the city',
                  itemBgColor: 'var(--teal-50)',
                },
                {
                  value: calculator.activeUsers,
                  input: null,
                  name: 'activeUsers',
                  format: 'number',
                  label: 'maximum number of active users',
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
