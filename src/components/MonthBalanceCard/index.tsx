import { Box, Container, Divider, Flex, Spacer, Text } from "@chakra-ui/react";



export function MonthBalanceCard() {
  return (
    <Container w="100%" bg="#364154" borderRadius="10px" pl={6} pr={6} pt={6} >
      <Text fontWeight="semibold" fontSize={20} pb={4}>Month Balance (Fev.2022)</Text>

      <Flex align="center" >
        <Text fontWeight="medium" fontSize={30} color="#5FF099" >R$</Text>
        <Spacer />
        <Text fontWeight="medium" fontSize={30} color="#5FF099" >1.000,00</Text>
      </Flex>

      <Flex align="center" >
        <Text fontWeight="medium" fontSize={30} color="#EB4335" >R$</Text>
        <Spacer />
        <Text fontWeight="medium" fontSize={30} color="#EB4335" >-624,00</Text>
      </Flex>

      <Divider orientation='horizontal' />

      <Flex align="center" pb={4}>
        <Text fontWeight="medium" fontSize={30} color="#5FF099" >R$</Text>
        <Spacer />
        <Text fontWeight="medium" fontSize={30} color="#5FF099" >376,00</Text>
      </Flex>


      <Text fontWeight="light" position="relative" bottom="0" right="0" fontSize={13}>Last update 21 Fev 2022 10:10:15</Text>
    </Container>
  )
}