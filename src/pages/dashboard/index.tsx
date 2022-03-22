import { Container, HStack, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { LatestExpensesCard } from "../../components/LatestExpensesCard";
import { Menu } from "../../components/Menu";
import { MonthBalanceCard } from "../../components/MonthBalanceCard";
import { TotalExpenseByCategoryCard } from "../../components/TotalExpenseByCategoryCard";
import { AuthContext } from "../../contexts/AuthContext";
import { ref, get, child, getDatabase } from "../../services/firebase";


interface Transaction {
  dt: number,
  description: string,
  category: string,
  type: string,
  value: string,
}

export default function Dashboard() {

  const { user } = useContext(AuthContext);

  const [listOfTransactions, setListOfTransactions] = useState<Transaction[]>();

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/transactions`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const result = Object.entries(data).map(([key, value]) => { return value });
        setListOfTransactions(result);
      }
    })
  }, [])


  return (
    <Container w="100%" maxW="100vw" >
      <Header />

      <Menu />

      <HStack mr="200px" ml="200px" pb={10} alignItems="center">
        <MonthBalanceCard user={user} transactions={listOfTransactions} />
        <TotalExpenseByCategoryCard />
      </HStack>

      <VStack mr="200px" ml="200px" pb={10} alignItems="center">
        <LatestExpensesCard />
      </VStack>


    </Container>
  )
}