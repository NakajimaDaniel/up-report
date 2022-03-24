import { Container, Flex, Spacer, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { format } from "date-fns";



interface Transaction {
  dt: number,
  description: string,
  category: string,
  type: string,
  value: string,
}

interface LatestExpensesCardProps {
  transactions: Transaction[];
}


export function LatestExpensesCard({ transactions }: LatestExpensesCardProps) {

  const allExpenseTransactions = transactions?.filter(val => {
    if (val.type == "Expense") return val.category
  })


  const newTransactionsList = allExpenseTransactions?.map(val => {
    return {
      dt: val.dt,
      description: val.description,
      category: val.category,
      value: Number(val.value).toFixed(2)
    }
  });


  return (
    <Container w="100%" bg="#364154" borderRadius="10px" pl={6} pr={6} pt={6}>
      <Text fontWeight="semibold" fontSize={19} pb={4}>Latest Expenses</Text>

      <Table mb={4}>
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Item</Th>
            <Th>Category</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>

        <Tbody>
          {transactions ? (
            newTransactionsList.map(val => {
              return (
                <Tr key={val.dt}>
                  <Td>{format(val.dt, "dd/MM/yyyy")}</Td>
                  <Td>{val.description}</Td>
                  <Td>{val.category}</Td>
                  <Td color="#EB4335">R$ -{val.value}</Td>
                </Tr>
              )
            })
          ) : (<Tr></Tr>)}
        </Tbody>
      </Table>


      <Text fontWeight="light" position="relative" bottom="0" right="0" fontSize={13}>Last update 21 Fev 2022 10:10:15</Text>

    </Container>
  )
}