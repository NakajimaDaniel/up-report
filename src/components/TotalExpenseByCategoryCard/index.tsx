import { Box, Container, Divider, Flex, Skeleton, Spacer, Text } from "@chakra-ui/react";
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

interface NewTransactionList {
  category: string,
  value: number,
}

interface TotalSumByCategory {
  category: string,
  value: string,
}

export function TotalExpenseByCategoryCard({ transactions }: MonthBalanceCardProps) {

  const [totalSumByCategory, setTotalSumByCategory] = useState<TotalSumByCategory[]>();

  const currentMonth = format(new Date(), "MMMM");
  const currentYear = new Date().getFullYear();

  function returnTotalSumByCategory(category: string, array: NewTransactionList[]) {
    return array.reduce((total, transaction) => {
      if (transaction.category == category) {
        total += transaction.value
      }
      return total
    }, 0)
  }

  useEffect(() => {
    if (transactions) {
      const newTransactionList = transactions.map(val => {
        return {
          dt: val.dt,
          description: val.description,
          category: val.category,
          type: val.type,
          value: val.value,
          month: format(val.dt, "MMMM")
        }
      })

      const allExpenseTransactions = newTransactionList.filter(val => {
        if (val.type == "Expense" && val.month === currentMonth) return val.category
      })

      const arrayOfCategories = allExpenseTransactions.map(val => { return val.category });

      const arrayOfCategoriesFiltered = arrayOfCategories.filter((item, position) => {
        return arrayOfCategories.indexOf(item) == position
      })


      const newTransactionsList = allExpenseTransactions.map(val => {
        return {
          category: val.category,
          value: Number(val.value)
        }
      });

      const totalSumByCategory = arrayOfCategoriesFiltered?.map(val => {
        return {
          category: val,
          value: returnTotalSumByCategory(val, newTransactionsList).toFixed(2),
        }
      })

      setTotalSumByCategory(totalSumByCategory);


    }
  }, [transactions])


  return (
    <Container w="100%" bg="#364154" borderRadius="10px" pl={6} pr={6} pt={6} >
      <Text fontWeight="semibold" fontSize={19} pb={4}>Total Expense by Category ({currentMonth}.{currentYear})</Text>

      <Skeleton isLoaded={!!transactions}>
        {totalSumByCategory ? (
          totalSumByCategory.map(val => {
            return (
              <Flex align="center" pb={4} key={val.category} >
                <Text fontWeight="medium" fontSize={16} >{val.category}</Text>
                <Spacer />
                <Text fontWeight="medium" fontSize={16} color="#EB4335" >R$ -{val.value}</Text>
              </Flex>
            )
          })
        ) : (<Container></Container>)}
      </Skeleton>


      <Text fontWeight="light" position="relative" bottom="0" right="0" fontSize={13}>Last update 21 Fev 2022 10:10:15</Text>
    </Container>
  )
}