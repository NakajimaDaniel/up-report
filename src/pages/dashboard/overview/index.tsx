import { Box, Container, Text, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AllExpensesPerMonthTable } from "../../../components/AllExpensesPerMonthTable";
import { Header } from "../../../components/Header";
import { Menu } from "../../../components/Menu";
import { MonthlyBalanceGraph } from "../../../components/MonthlyBalanceGraph";
import { AuthContext } from "../../../contexts/AuthContext";
import { get, ref, getDatabase, child } from '../../../services/firebase';


interface Transaction {
  dt: number,
  description: string,
  category: string,
  type: string,
  value: string,
}


export default function Overview() {


  const [listOfTransactions, setListOfTransactions] = useState<Transaction[]>();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${user?.uid}/transactions`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const result = Object.entries(data).map(([key, value]) => { return value });
        setListOfTransactions(result);
      }
    })
  }, []);


  return (
    <Container w="100%" maxW="100vw" >
      <Header />

      <VStack mr="100px" ml="100px" pb={10} alignItems="center">
        <MonthlyBalanceGraph transactions={listOfTransactions} />
        <AllExpensesPerMonthTable transactions={listOfTransactions} />
      </VStack>

    </Container>
  )
}