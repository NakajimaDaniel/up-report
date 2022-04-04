import { Box, Container, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { Menu } from "../../../components/Menu";
import { RegisterNewCategoryForm } from "../../../components/RegisterNewCategoryForm";
import { RegisterNewTransactionForm } from "../../../components/RegisterNewTransactionForm";
import { AuthContext } from "../../../contexts/AuthContext";
import { useDimensions } from "../../../hooks/useDimensions";


export default function Transactions() {


  const [selectRegisterOption, setSelectRegisterOption] = useState<"newTransaction" | "newCategory">("newTransaction");
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { width } = useDimensions();

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [])

  if (user) {
    return (
      <Container w="100%" maxW="100vw" >
        <Header />

        <HStack justifyContent="center" pb={7}>
          <Box pr={3} _hover={{ cursor: 'pointer' }} onClick={() => setSelectRegisterOption("newTransaction")} >
            <Text color={selectRegisterOption == "newTransaction" ? "" : "#C1C1C1"} fontSize={width && width < 440 ? [14] : [17]} >Register New Transaction</Text>
            <Box sx={{ content: '""' }} w="100%" h="2px" bg={selectRegisterOption == "newTransaction" ? "#46BCFF" : "#C1C1C1"} />
          </Box>

          <Box pl={3} _hover={{ cursor: 'pointer' }} onClick={() => setSelectRegisterOption("newCategory")} >
            <Text color={selectRegisterOption == "newCategory" ? "" : "#C1C1C1"} fontSize={width && width < 440 ? [14] : [17]}>Register New Category</Text>
            <Box sx={{ content: '""' }} w="100%" h="2px" bg={selectRegisterOption == "newCategory" ? "#46BCFF" : "#C1C1C1"} />
          </Box>

        </HStack>
        {selectRegisterOption == "newTransaction" ?
          <RegisterNewTransactionForm /> : <RegisterNewCategoryForm />
        }

      </Container>
    )
  } else {
    return (<Container></Container>)
  }
}