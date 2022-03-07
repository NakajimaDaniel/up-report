import { Container, Flex, Spacer, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";


export function LatestExpensesCard() {
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
          <Tr>
            <Td>02/02/22</Td>
            <Td>Bluetooth Adapter</Td>
            <Td>Electronics</Td>
            <Td color="#EB4335">R$ -50,00</Td>
          </Tr>

          <Tr>
            <Td>02/02/22</Td>
            <Td>Toothbrush</Td>
            <Td>Personal Care</Td>
            <Td color="#EB4335">R$ -15,00</Td>
          </Tr>
        </Tbody>
      </Table>


      <Text fontWeight="light" position="relative" bottom="0" right="0" fontSize={13}>Last update 21 Fev 2022 10:10:15</Text>

    </Container>
  )
}