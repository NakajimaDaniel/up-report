import { Box, Container, Flex, Grid, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { LatestExpensesCard } from "../../components/LatestExpensesCard";
import { Menu } from "../../components/Menu";
import { MonthBalanceCard } from "../../components/MonthBalanceCard";
import { TotalExpenseByCategoryCard } from "../../components/TotalExpenseByCategoryCard";


export default function Dashboard() {
  return (
    <Container w="100%" maxW="100vw" >
      <Header />

      <Menu />

      <HStack mr="200px" ml="200px" pb={10} alignItems="center">
        <MonthBalanceCard />
        <TotalExpenseByCategoryCard />
      </HStack>

      <VStack mr="200px" ml="200px" pb={10} alignItems="center">
        <LatestExpensesCard />
      </VStack>


    </Container>
  )
}