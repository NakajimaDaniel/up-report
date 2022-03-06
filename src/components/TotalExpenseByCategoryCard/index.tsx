import { Box, Container, Divider, Flex, Spacer, Text } from "@chakra-ui/react";



export function TotalExpenseByCategoryCard() {
  return (
    <Container w="100%" bg="#364154" borderRadius="10px" pl={6} pr={6} pt={6} >
      <Text fontWeight="semibold" fontSize={19} pb={4}>Total Expense by Category (Fev.2022)</Text>

      <Flex align="center" pb={4} >
        <Text fontWeight="medium" fontSize={16} >Electronics</Text>
        <Spacer />
        <Text fontWeight="medium" fontSize={16} color="#EB4335" >R$ -150,00</Text>
      </Flex>

      <Flex align="center" pb={4} >
        <Text fontWeight="medium" fontSize={16} >Food</Text>
        <Spacer />
        <Text fontWeight="medium" fontSize={16} color="#EB4335" >R$ -120,00</Text>
      </Flex>

      <Flex align="center" pb={4}>
        <Text fontWeight="medium" fontSize={16} >Personal Care</Text>
        <Spacer />
        <Text fontWeight="medium" fontSize={16} color="#EB4335" >R$ -55,00</Text>
      </Flex>

      <Flex align="center" pb={4}>
        <Text fontWeight="medium" fontSize={16} >Games</Text>
        <Spacer />
        <Text fontWeight="medium" fontSize={16} color="#EB4335" >R$ -299,00</Text>
      </Flex>



      <Text fontWeight="light" position="relative" bottom="0" right="0" fontSize={13}>Last update 21 Fev 2022 10:10:15</Text>
    </Container>
  )
}