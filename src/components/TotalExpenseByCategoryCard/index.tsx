import { Box, Container, Divider, Flex, Skeleton, Spacer, Text } from "@chakra-ui/react";


interface Transaction {
  dt: number,
  description: string,
  category: string,
  type: string,
  value: string,
}

interface MonthBalanceCardProps {
  transactions: Transaction[];
}

export function TotalExpenseByCategoryCard({ transactions }: MonthBalanceCardProps) {

  const actualMonth = convertUnixToMonthName(Date.parse(new Date));
  const actualYear = new Date().getFullYear();

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

  const allExpenseTransactions = transactions?.filter(val => {
    if (val.type == "Expense") return val.category
  })

  const arrayOfCategories = allExpenseTransactions?.map(val => { return val.category });

  const arrayOfCategoriesFiltered = arrayOfCategories?.filter((item, position) => {
    return arrayOfCategories.indexOf(item) == position
  })


  const newTransactionsList = allExpenseTransactions?.map(val => {
    return {
      category: val.category,
      value: Number(val.value)
    }
  });

  function returnTotalSumByCategory(category: string) {
    return newTransactionsList?.reduce((total, transaction) => {
      if (transaction.category == category) {
        total += transaction.value
      }

      return total
    }, 0)

  }

  const totalSumByCategory = arrayOfCategoriesFiltered?.map(val => {
    return {
      category: val,
      value: returnTotalSumByCategory(val).toFixed(2),
    }
  })


  return (
    <Container w="100%" bg="#364154" borderRadius="10px" pl={6} pr={6} pt={6} >
      <Text fontWeight="semibold" fontSize={19} pb={4}>Total Expense by Category ({actualMonth}.{actualYear})</Text>

      <Skeleton isLoaded={!!transactions}>
        {transactions ? (
          totalSumByCategory.map(val => {
            return (
              <Flex align="center" pb={4} >
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