import { Container, Divider, Flex, Skeleton, Spacer, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface Transaction {
  dt: number,
  description: string,
  category: string,
  type: string,
  value: string,
}

interface MonthBalanceCardProps {
  transactions: Transaction[] | undefined;
}

interface TotalBalance {
  value: string,
  type: string,
}


export function MonthBalanceCard({ transactions }: MonthBalanceCardProps) {

  const [totalExpense, setTotalExpense] = useState<string>();
  const [totalIncome, setTotalIncome] = useState<string>();
  const [totalBalance, setTotalBalance] = useState<TotalBalance>();

  const currentMonth = format(new Date(), "MMMM");
  const currentYear = format(new Date(), "yyyy");

  useEffect(() => {
    if (transactions) {
      const transactionsFormatted = transactions.map(val => (
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


      const totalExpenseReduced = transactionsFormatted.reduce((total, transaction) => {

        if (transaction.type == "Expense" && transaction.yearRegistered == currentYear && transaction.monthRegistered == currentMonth) {
          total += transaction.value;
        }
        return total;
      }, 0);

      const totalIncomeReduced = transactionsFormatted.reduce((total, transaction) => {

        if (transaction.type == "Income" && transaction.yearRegistered == currentYear && transaction.monthRegistered == currentMonth) {
          total += transaction.value;
        }
        return total;
      }, 0);

      setTotalExpense(totalExpenseReduced.toFixed(2));
      setTotalIncome(totalIncomeReduced.toFixed(2));


      setTotalBalance({
        value: (Math.round((totalIncomeReduced - totalExpenseReduced) * 100) / 100).toFixed(2),
        type: totalExpenseReduced > totalIncomeReduced ? "negative" : "positive",
      })

    }
  }, [transactions])



  return (
    <Container w="100%" bg="#364154" borderRadius="10px" pl={6} pr={6} pt={6} >
      <Text fontWeight="semibold" fontSize={20} pb={4}>Month Balance ({currentMonth}.{currentYear})</Text>

      <Flex align="center" >
        <Text fontWeight="medium" fontSize={30} color="#5FF099" >R$</Text>
        <Spacer />
        <Skeleton isLoaded={!!transactions} >
          {totalIncome ? (<Text fontWeight="medium" fontSize={30} color="#5FF099" >{totalIncome}</Text>) : (<Container>0</Container>)}
        </Skeleton>
      </Flex>

      <Flex align="center" >
        <Text fontWeight="medium" fontSize={30} color="#EB4335" >R$</Text>
        <Spacer />
        <Skeleton isLoaded={!!transactions} >
          {totalExpense ? (<Text fontWeight="medium" fontSize={30} color="#EB4335" >-{totalExpense}</Text>) : (<Container>0</Container>)}
        </Skeleton>
      </Flex>

      <Divider orientation='horizontal' />

      <Flex align="center" pb={4}>
        <Text fontWeight="medium" fontSize={30} color="#5FF099" >R$</Text>
        <Spacer />
        <Skeleton isLoaded={!!transactions} >
          <Text fontWeight="medium" fontSize={30} color={totalBalance?.type == "negative" ? "#EB4335" : "#5FF099"} >
            {totalBalance?.value}
          </Text>
        </Skeleton>
      </Flex>


      <Text fontWeight="light" position="relative" bottom="0" right="0" fontSize={13}>Last update 21 Fev 2022 10:10:15</Text>
    </Container>
  )
}