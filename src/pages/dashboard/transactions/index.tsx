import { Box, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Icon, Input, Select, VStack } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useContext, useState } from "react";
import { ArrowDown, ArrowUp } from "react-feather";
import { Header } from "../../../components/Header";
import { Menu } from "../../../components/Menu";
import { AuthContext } from "../../../contexts/AuthContext";
import { database, ref, set, push } from "../../../services/firebase";


interface Transaction {
  dt: number;
  description: string;
  category: string;
  type: "Expense" | "Income";
  value: string;
}

interface UserData {
  userId: string;
  name: string;
  email: string;
  transaction: Transaction;
}


export default function Transactions() {


  const { user } = useContext(AuthContext);
  const [newTrasaction, setNewTrasaction] = useState({} as Transaction);
  const [transactionType, setTransactionType] = useState<"Expense" | "Income">();


  function getMonthName(monthNumber: number) {
    switch (monthNumber) {
      case 0: return "January";
      case 1: return "February";
      case 2: return "March";
      case 3: return "April";
      case 4: return "May";
      case 5: return "June";
      case 6: return "July";
      case 7: return "August";
      case 8: return "September";
      case 9: return "October";
      case 10: return "November";
      case 11: return "Dezember";
    }
  }

  async function writeUserData({ userId, name, email, transaction }: UserData) {
    const db = database;

    if (!user) {
      throw new Error('you must be logged in')
    }

    const monthName = getMonthName(new Date().getMonth());
    const year = new Date().getFullYear();

    await set(ref(db, 'users/' + userId), {
      userName: name,
      userEmail: email,
    });


    const transactionListRef = ref(db, `users/transactions/${year}/${monthName}`);
    const newTransactionRef = push(transactionListRef);
    set(newTransactionRef, {
      dt: Date.parse(new Date),
      description: newTrasaction.description,
      category: newTrasaction.category,
      type: newTrasaction.type,
      value: newTrasaction.value,
    })

  }


  function ValidateDescriptionFieldForm(value: string) {
    let error
    if (!value) {
      error = "Product/description required"
    }
    return error
  }

  function ValidateCategoryFieldForm(value: string) {
    let error
    if (!value) {
      error = "Category is required"
    }
    return error
  }
  function ValidateTransactionTypeFieldForm() {
    let error
    if (!transactionType) {
      error = "Transaction type is required"
    }
    return error
  }


  function ValidateValueFieldForm(value) {
    let error
    if (!value) {
      error = "Value is required"
    } else if (isNaN(value)) {
      error = "Only number is valid"
    }
    return error
  }



  return (
    <Container w="100%" maxW="100vw" >
      <Header />

      <Menu />

      <VStack mr="200px" ml="200px" pb={10} alignItems="center">

        <Formik
          initialValues={{ description: '', category: '', value: '' }}

          onSubmit={(values, actions) => {

            setNewTrasaction({ type: transactionType, dt: Date.parse(new Date), ...values });
            //writeUserData(user.uid, user.displayName, user.email, newTrasaction)
            console.log(newTrasaction);
          }}

        >
          <Box w="50%" bg="#364154" borderRadius="10px" pl={6} pr={6} pt={6}>
            <Form>
              <Field name="description" validate={ValidateDescriptionFieldForm}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.description && form.touched.description}>
                    <FormLabel>Product/Description</FormLabel>
                    <Input placeholder="Enter product name or description" id="description" {...field} />
                    <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="category" validate={ValidateCategoryFieldForm}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.category && form.touched.category}>
                    <FormLabel>Category</FormLabel>
                    <Select placeholder='Select category' id="category" {...field}>
                      <option>Personal Care</option>
                      <option>Electronics</option>
                    </Select>
                    <FormErrorMessage>{form.errors.category}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="transactionType" validate={ValidateTransactionTypeFieldForm}>
                {({ form }) => (
                  <FormControl isInvalid={form.errors.transactionType && form.touched.transactionType}>
                    <Flex pt={5} pb={5} w="100%" alignItems="center" justify="space-between">
                      <Flex
                        p={3}
                        bg="#3C485C"
                        maxW={130}
                        alignItems="center"
                        justify="center"
                        borderRadius={10}
                        border="1px"
                        borderColor={transactionType == "Expense" ? "#EB4335" : "#3C485C"}
                        w="100%"
                        _hover={{ borderColor: transactionType == "Expense" ? "#EB4335" : "#3C485C", cursor: "pointer" }}
                        as={Button}
                        onClick={() => setTransactionType('Expense')}
                      >
                        <Icon as={ArrowDown} w={7} h={7} color="#EB4335" />
                      </Flex>

                      <Flex
                        p={3}
                        bg="#3C485C"
                        maxW={130}
                        alignItems="center"
                        justify="center"
                        borderRadius={10}
                        border="1px"
                        w="100%"
                        borderColor={transactionType == "Income" ? "#5FF099" : "#3C485C"}
                        _hover={{ borderColor: transactionType == "Income" ? "#5FF099" : "#3C485C", cursor: "pointer" }}
                        as={Button}
                        onClick={() => setTransactionType('Income')}
                      >
                        <Icon as={ArrowUp} w={7} h={7} color="#5FF099" />
                      </Flex>
                    </Flex>
                    <FormErrorMessage>{form.errors.transactionType}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="value" validate={ValidateValueFieldForm} >
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.value && form.touched.value} mb={5}>
                    <FormLabel>Value</FormLabel>
                    <Input placeholder="Enter value" id="value"   {...field} />
                    <FormErrorMessage>{form.errors.value}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button type='submit' isLoading={false} mb={5} >
                Submit
              </Button>

            </Form>
          </Box>

        </Formik>

      </VStack>


    </Container >
  )
}