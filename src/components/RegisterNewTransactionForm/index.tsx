import { Box, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Icon, Input, Select, Text, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import { Formik, Form, Field } from "formik";
import { useContext, useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "react-feather";
import { AuthContext } from "../../contexts/AuthContext";
import { useDimensions } from "../../hooks/useDimensions";
import { database, ref, set, push, getDatabase, get, child } from "../../services/firebase";

interface Transaction {
  dt: number;
  description: string;
  category: string;
  type: "Expense" | "Income" | undefined;
  value: string;
}


export function RegisterNewTransactionForm() {

  const { user } = useContext(AuthContext);
  const [newTransaction, setNewTransaction] = useState({} as Transaction);
  const [transactionType, setTransactionType] = useState<"Expense" | "Income">();
  const [categoryNames, setCategoryNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { width } = useDimensions();


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


  function ValidateValueFieldForm(value: number) {
    let error
    if (!value) {
      error = "Value is required"
    } else if (isNaN(value)) {
      error = "Only number is valid"
    }
    return error
  }


  async function handleSubmit(values: any, actions: any) {
    const db = database;

    setIsLoading(true);

    if (!user) {
      throw new Error('you must be logged in')
    }

    const transactionListRef = ref(db, `users/${user.uid}/transactions`);
    const newTransactionRef = push(transactionListRef);

    set(newTransactionRef, {
      dt: Number(format(new Date(), "T")),
      description: values.description,
      category: values.category,
      type: transactionType,
      value: values.value,
    })

    alert("Product/ transaction registered");

    actions.resetForm({
      values: {
        description: '', category: '', value: ''
      }
    })

    setIsLoading(false);

  }


  useEffect(() => {

    if (!user) {
      throw new Error('you must be logged in')
    }

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${user.uid}/categories`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const test = Object.entries(data).map(([key, value]) => { return value });

        const names = test.map((el: any) => el);
        setCategoryNames(names);

      }

    }).catch((error) => {
      console.error(error);
    })


  }, [])

  return (
    <VStack mr={width && width > 1180 ? ["200px"] : [0]} ml={width && width > 1180 ? ["200px"] : [0]} pb={10} alignItems="center">

      <Formik
        initialValues={{ description: '', category: '', value: '' }}

        onSubmit={(values, actions) => { handleSubmit(values, actions) }}

      >
        <Box w={width && width > 1180 ? "50%" : "100%"} bg="#364154" borderRadius="10px" pl={6} pr={6} pt={6}>
          <Form>
            <Field name="description" validate={ValidateDescriptionFieldForm}>
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.description && form.touched.description}>
                  <FormLabel>Product/Description</FormLabel>
                  <Input placeholder="Enter product name or description" id="description" {...field} />
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="category" validate={ValidateCategoryFieldForm}>
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.category && form.touched.category}>
                  <FormLabel>Category</FormLabel>
                  <Select placeholder='Select category' id="category" {...field}>
                    {categoryNames ?
                      categoryNames.map((val: any) => (
                        <option key={val.category}>{val.category}</option>
                      ))
                      :
                      (<option></option>)
                    }

                  </Select>
                  <FormErrorMessage>{form.errors.category}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="transactionType" validate={ValidateTransactionTypeFieldForm}>
              {({ form }: any) => (
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
                  {form.errors.transactionType ? <Text color="red.300" fontSize={"sm"} >{form.errors.transactionType}</Text> : ''}
                </FormControl>
              )}
            </Field>

            <Field name="value" validate={ValidateValueFieldForm} >
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.value && form.touched.value} mb={5}>
                  <FormLabel>Value</FormLabel>
                  <Input placeholder="Enter value" id="value"   {...field} />
                  <FormErrorMessage>{form.errors.value}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button type='submit' isLoading={isLoading} mb={5} >
              Submit
            </Button>

          </Form>
        </Box>
      </Formik>
    </VStack>
  )
}