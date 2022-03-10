import { Container, Select, Table, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";



export function AllExpensesPerMonthTable() {
  return (
    <Container w="100%" bg="#364154" borderRadius="10px" pl={6} pr={6} pt={6}>
      <Text fontWeight="semibold" fontSize={19} pb={4}>All Expenses per Month </Text>

      <Select placeholder='Select option' pb={5}>
        <option value='option1'>January</option>
        <option value='option2'>February</option>
        <option value='option3'>March</option>
      </Select>

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
          <Tr>
            <Td>02/02/22</Td>
            <Td>Salary</Td>
            <Td></Td>
            <Td color="#5FF099">R$ 500,00</Td>
          </Tr>
        </Tbody>

        <Tfoot>
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td color="#5FF099">R$ 500,00</Td>
          </Tr>
        </Tfoot>
      </Table>

    </Container>
  )
}