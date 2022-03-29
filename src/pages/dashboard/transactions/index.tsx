import { Box, Container, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Header } from "../../../components/Header";
import { Menu } from "../../../components/Menu";
import { RegisterNewCategoryForm } from "../../../components/RegisterNewCategoryForm";
import { RegisterNewTransactionForm } from "../../../components/RegisterNewTransactionForm";


export default function Transactions() {


  const [selectRegisterOption, setSelectRegisterOption] = useState<"newTransaction" | "newCategory">("newTransaction");


  return (
    <Container w="100%" maxW="100vw" >
      <Header />

      <HStack justifyContent="center" pb={7}>
        <Box pr={3} _hover={{ cursor: 'pointer' }} onClick={() => setSelectRegisterOption("newTransaction")} >
          <Text color={selectRegisterOption == "newTransaction" ? "" : "#C1C1C1"}>Register New Transaction</Text>
          <Box sx={{ content: '""' }} w="100%" h="2px" bg={selectRegisterOption == "newTransaction" ? "#46BCFF" : "#C1C1C1"} />
        </Box>

        <Box pl={3} _hover={{ cursor: 'pointer' }} onClick={() => setSelectRegisterOption("newCategory")} >
          <Text color={selectRegisterOption == "newCategory" ? "" : "#C1C1C1"}>Register New Category</Text>
          <Box sx={{ content: '""' }} w="100%" h="2px" bg={selectRegisterOption == "newCategory" ? "#46BCFF" : "#C1C1C1"} />
        </Box>

      </HStack>
      {selectRegisterOption == "newTransaction" ?
        <RegisterNewTransactionForm /> : <RegisterNewCategoryForm />
      }

    </Container>
  )
}