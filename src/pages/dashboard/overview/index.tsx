import { Box, Container, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AllExpensesPerMonthTable } from "../../../components/AllExpensesPerMonthTable";
import { Header } from "../../../components/Header";
import { Menu } from "../../../components/Menu";
import { MonthlyBalanceGraph } from "../../../components/MonthlyBalanceGraph";
import { AuthContext } from "../../../contexts/AuthContext";
import { useDimensions } from "../../../hooks/useDimensions";
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
  const { width } = useDimensions();

  useEffect(() => {
    if (user) {
      const dbRef = ref(getDatabase());

      get(child(dbRef, `users/${user.uid}/transactions`)).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const result = Object.entries(data).map(([key, value]) => { return value });
          setListOfTransactions(result);
        }
      })
    }
  }, [user]);


  return (
    <Container w="100%" maxW="100vw" >
      <Header />

      <VStack mr={width && width > 1180 ? ["100px"] : [0]} ml={width && width > 1180 ? ["100px"] : [0]} pb={10} alignItems="center">
        <MonthlyBalanceGraph transactions={listOfTransactions} />
        <AllExpensesPerMonthTable transactions={listOfTransactions} />
      </VStack>

    </Container>
  )
}