import { Box, Container, Text, VStack } from "@chakra-ui/react";
import { AllExpensesPerMonthTable } from "../../../components/AllExpensesPerMonthTable";
import { Header } from "../../../components/Header";
import { Menu } from "../../../components/Menu";
import { MonthlyBalanceGraph } from "../../../components/MonthlyBalanceGraph";




export default function Overview() {
  return (
    <Container w="100%" maxW="100vw" >
      <Header />
      <Menu />

      <VStack mr="100px" ml="100px" pb={10} alignItems="center">
        <MonthlyBalanceGraph />
        <AllExpensesPerMonthTable />
      </VStack>

    </Container>
  )
}