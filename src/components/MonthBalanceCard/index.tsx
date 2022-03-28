import { Box, Container, Divider, Flex, Skeleton, Spacer, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface User {
  uid: string,
  displayName: string | null,
  email: string | null,
  photoURL: string,
}

interface Transaction {
  dt: number,
  description: string,
  category: string,
  type: string,
  value: string,
}

interface MonthBalanceCardProps {
  user: User;
  transactions: Transaction[];
}


export function MonthBalanceCard({ user, transactions }: MonthBalanceCardProps) {

  const actualMonth = convertUnixToMonthName(Date.parse(new Date));
  const actualYear = new Date().getFullYear();

  const actualDateAndTime = new Date().toUTCString();


  function convertUnixToMonthName(unixtimestamp: number) {

    const unixTimestampConverted = new Date(unixtimestamp);

    const monthNumber = unixTimestampConverted.getMonth();

    switch (monthNumber) {
      case 0: return "January";
      case 1: return "February";
      case 2: return "March";
      case 3: return "April";
      case 4: return "May";
      case 5: return "June";
      case 6: return "July";
      case 7: return "August";
      case 8: return "September";
      case 9: return "October";
      case 10: return "November";
      case 11: return "Dezember";
    }
  }

  function convertUnixToYear(unixtimestamp: number) {
    const unixTimestampConverted = new Date(unixtimestamp);

    return unixTimestampConverted.getFullYear();
  }

  const transactionsFormatted = transactions?.map(val => (
    {
      dt: val.dt,
      description: val.description,
      category: val.category,
      type: val.type,
      value: Number(val.value),
      monthRegistered: convertUnixToMonthName(val.dt),
      yearRegistered: convertUnixToYear(val.dt),
    }
  ))

  const totalExpenseReduced = transactionsFormatted?.reduce((total, transaction) => {

    if (transaction.type == "Expense" && transaction.yearRegistered == actualYear && transaction.monthRegistered == actualMonth) {
      total += transaction.value;
    }
    return total;
  }, 0);

  const totalIncomeReduced = transactionsFormatted?.reduce((total, transaction) => {

    if (transaction.type == "Income" && transaction.yearRegistered == actualYear && transaction.monthRegistered == actualMonth) {
      total += transaction.value;
    }
    return total;
  }, 0);


  return (
    <Container w="100%" bg="#364154" borderRadius="10px" pl={6} pr={6} pt={6} >
      <Text fontWeight="semibold" fontSize={20} pb={4}>Month Balance ({actualMonth}.{actualYear})</Text>

      <Flex align="center" >
        <Text fontWeight="medium" fontSize={30} color="#5FF099" >R$</Text>
        <Spacer />
        <Skeleton isLoaded={!!transactionsFormatted} >
          {transactions ? (<Text fontWeight="medium" fontSize={30} color="#5FF099" >{totalIncomeReduced.toFixed(2)}</Text>) : (<Container>0</Container>)}
        </Skeleton>
      </Flex>

      <Flex align="center" >
        <Text fontWeight="medium" fontSize={30} color="#EB4335" >R$</Text>
        <Spacer />
        <Skeleton isLoaded={!!transactionsFormatted} >
          {transactions ? (<Text fontWeight="medium" fontSize={30} color="#EB4335" >-{totalExpenseReduced.toFixed(2)}</Text>) : (<Container>0</Container>)}
        </Skeleton>
      </Flex>

      <Divider orientation='horizontal' />

      <Flex align="center" pb={4}>
        <Text fontWeight="medium" fontSize={30} color="#5FF099" >R$</Text>
        <Spacer />
        <Skeleton isLoaded={!!transactions} >
          <Text fontWeight="medium" fontSize={30} color={totalExpenseReduced > totalIncomeReduced ? "#EB4335" : "#5FF099"} >
            {(Math.round((totalIncomeReduced - totalExpenseReduced) * 100) / 100).toFixed(2)}
          </Text>
        </Skeleton>
      </Flex>


      <Text fontWeight="light" position="relative" bottom="0" right="0" fontSize={13}>Last update 21 Fev 2022 10:10:15</Text>
    </Container>
  )
}