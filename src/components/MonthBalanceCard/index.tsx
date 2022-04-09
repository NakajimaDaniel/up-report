import { Container, Divider, Flex, Skeleton, Spacer, Text } from "@chakra-ui/react";
import { format } from "date-fns";

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

  const currentMonth = format(new Date(), "MMMM");
  const currentYear = format(new Date(), "yyyy");


  const transactionsFormatted = transactions?.map(val => (
    {
      dt: val.dt,
      description: val.description,
      category: val.category,
      type: val.type,
      value: Number(val.value),
      monthRegistered: format(val.dt, "MMMM"),
      yearRegistered: format(val.dt, "yyyy"),
    }
  ))

  const totalExpenseReduced = transactionsFormatted?.reduce((total, transaction) => {

    if (transaction.type == "Expense" && transaction.yearRegistered == currentYear && transaction.monthRegistered == currentMonth) {
      total += transaction.value;
    }
    return total;
  }, 0);

  const totalIncomeReduced = transactionsFormatted?.reduce((total, transaction) => {

    if (transaction.type == "Income" && transaction.yearRegistered == currentYear && transaction.monthRegistered == currentMonth) {
      total += transaction.value;
    }
    return total;
  }, 0);


  return (
    <Container w="100%" bg="#364154" borderRadius="10px" pl={6} pr={6} pt={6} >
      <Text fontWeight="semibold" fontSize={20} pb={4}>Month Balance ({currentMonth}.{currentYear})</Text>

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