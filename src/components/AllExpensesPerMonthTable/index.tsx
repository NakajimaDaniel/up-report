import { Box, Container, Select, Table, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface Transaction {
  dt: number,
  description: string,
  category: string,
  type: string,
  value: string,
}

interface newTransaction extends Transaction {
  monthYear: string,
}

interface AllExpensesPerMonthTableProps {
  transactions: Transaction[];
}

export function AllExpensesPerMonthTable({ transactions }: AllExpensesPerMonthTableProps) {

  const [selectedMonthYear, setSelectedMonthYear] = useState<string>();
  const [selectedMonthYearTransactions, setSelectedMonthYearTransaction] = useState<newTransaction[]>();
  const [totalExpenseValue, setTotalExpenseValue] = useState<number>(0);
  const [totalIncomeValue, setTotalIncomeValue] = useState<number>(0);

  const newTransactionList = transactions?.map(val => {
    return {
      dt: val.dt,
      category: val.category,
      description: val.description,
      type: val.type,
      value: val.value,
      monthYear: format(val.dt, "MMMM/yy"),
    }
  });

  const listOfMonthYear = newTransactionList?.map(val => { return val.monthYear });

  const listOfMonthYearFiltered = listOfMonthYear?.filter((item, position) => {
    return listOfMonthYear.indexOf(item) == position
  })

  function selectMonthTransactions(selectedMonthYear: string, transactions: newTransaction[]) {
    const transactionList = transactions.filter(val => {
      if (val.monthYear == selectedMonthYear) {
        return val
      }
    })

    return transactionList
  }

  useEffect(() => {
    if (selectedMonthYear) {
      const newTransactionArray = selectMonthTransactions(selectedMonthYear, newTransactionList);
      setSelectedMonthYearTransaction(newTransactionArray);
    }

  }, [selectedMonthYear]);

  useEffect(() => {

    if (selectedMonthYearTransactions) {
      const allExpenses = selectedMonthYearTransactions.filter(val => { return val.type == "Expense" });
      const allIncomes = selectedMonthYearTransactions.filter(val => { return val.type == "Income" });

      const allExpensesFormatted = allExpenses.map(val => {
        return {
          value: Number(val.value)
        }
      })

      const allIncomesFormatted = allIncomes.map(val => {
        return {
          value: Number(val.value)
        }
      })

      const totalExpensesSum = allExpensesFormatted.reduce((total, transaction) => {
        return total = total + transaction.value
      }, 0)

      const totalIncomesSum = allIncomesFormatted.reduce((total, transaction) => {
        return total = total + transaction.value
      }, 0)

      setTotalIncomeValue(totalIncomesSum);
      setTotalExpenseValue(totalExpensesSum);
    }

  }, [selectedMonthYearTransactions]);


  return (
    <Container w="100%" bg="#364154" borderRadius="10px" pl={6} pr={6} pt={6}>
      <Text fontWeight="semibold" fontSize={19} pb={4}>All Expenses per Month </Text>

      <Select placeholder='Select option' mb={5} onClick={(e) => setSelectedMonthYear((e.target as HTMLButtonElement).value)} >
        {listOfMonthYearFiltered?.map(val => {
          return (
            <option key={val} value={val}>{val}</option>
          )
        })}
      </Select>

      <Box overflowX="auto" >
        <Table mb={4} colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Item</Th>
              <Th>Category</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>

          <Tbody>
            {selectedMonthYearTransactions?.map(val => {
              return (
                <Tr key={val.dt} >
                  <Td>{format(val.dt, "dd/MM/yy")}</Td>
                  <Td>{val.description}</Td>
                  <Td>{val.category}</Td>
                  <Td color={val.type == "Expense" ? "#EB4335" : "#5FF099"}>R$ {val.type == "Expense" ? "-" : ""} {Number(val.value)}</Td>
                </Tr>
              )
            })}

          </Tbody>

          <Tfoot>
            <Tr>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td
                color={totalExpenseValue > totalIncomeValue ? "#EB4335" : "#5FF099"}>
                R$ {totalIncomeValue - totalExpenseValue}
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </Box>

    </Container>
  )
}