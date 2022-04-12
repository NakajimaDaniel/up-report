import { Container, HStack, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { LatestExpensesCard } from "../../components/LatestExpensesCard";
import { MonthBalanceCard } from "../../components/MonthBalanceCard";
import { TotalExpenseByCategoryCard } from "../../components/TotalExpenseByCategoryCard";
import { AuthContext } from "../../contexts/AuthContext";
import { useDimensions } from "../../hooks/useDimensions";
import { ref, get, child, getDatabase } from "../../services/firebase";


interface Transaction {
  dt: number,
  description: string,
  category: string,
  type: string,
  value: string,
}

interface TransactionDbResponse {
  [key: string]: Transaction
}

export default function Dashboard() {

  const { user } = useContext(AuthContext);
  const { width } = useDimensions();

  const [listOfTransactions, setListOfTransactions] = useState<Transaction[]>();

  useEffect(() => {

    if (user) {
      const dbRef = ref(getDatabase());

      get(child(dbRef, `users/${user.uid}/transactions`)).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const result = Object.entries(data as TransactionDbResponse).map(([key, value]) => { return value });
          setListOfTransactions(result);
        }
      })
    }
  }, [user]);

  if (user) {
    return (
      <Container w="100%" maxW="100vw" >
        <Header />
        {width && width > 660 ? (
          <HStack mr={width && width > 1180 ? ["200px", "200px", "250px", "300px"] : [0]} ml={width && width > 1180 ? ["200px", "200px", "250px", "300px"] : [0]} pb={10} alignItems="center">
            <MonthBalanceCard transactions={listOfTransactions} />
            <TotalExpenseByCategoryCard transactions={listOfTransactions} />
          </HStack>
        ) : (
          <VStack mb={5}>
            <MonthBalanceCard transactions={listOfTransactions} />
            <TotalExpenseByCategoryCard transactions={listOfTransactions} />
          </VStack>
        )}
        <VStack mr={width && width > 1180 ? ["200px", "200px", "250px", "300px"] : [0]} ml={width && width > 1180 ? ["200px", "200px", "250px", "300px"] : [0]} pb={10} alignItems="center">
          <LatestExpensesCard transactions={listOfTransactions} />
        </VStack>
      </Container>
    )
  } else {
    return (<Container></Container>)
  }
}