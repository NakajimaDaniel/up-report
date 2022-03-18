import { Box, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Icon, Input, Select, Text, VStack } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useContext, useState } from "react";
import { ArrowDown, ArrowUp } from "react-feather";
import { AuthContext } from "../../contexts/AuthContext";
import { database, ref, set, push, onValue } from "../../services/firebase";

interface Category {
  category: string;
}

export function RegisterNewCategoryForm() {

  const { user } = useContext(AuthContext);

  const [newCategory, setNewCategory] = useState({} as Category);
  const [isCategoryAlreadyExist, setIsCategoryAlreadyExist] = useState(false);

  async function RegisterNewCategoryOnFirebase(category: string) {
    const db = database;

    if (!user) {
      throw new Error('you must be logged in')
    }




    const starCountRef = ref(db, `users/categories`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const test = Object.entries(data).map(([key, value]) => { return value })

      const found = test.find(element => element.category === newCategory.category)

      if (found) {
        setIsCategoryAlreadyExist(true);
      }
    });

    // await set(ref(db, 'users/' + user.uid), {
    //   userName: user.displayName,
    //   userEmail: user.email,
    // });

    // const categoryListRef = ref(db, `users/categories`);
    // const newCategoryListRef = push(categoryListRef);
    // set(newCategoryListRef, {
    //   category,
    // })



  }


  function ValidateCategoryNameInput(value: string) {
    let error

    if (!value) {
      error = "Category name required"
    }
    return error
  }

  return (
    <VStack mr="200px" ml="200px" pb={10} alignItems="center">

      <Formik
        initialValues={{ category: '' }}

        onSubmit={(values, actions) => {
          setNewCategory(values);
          RegisterNewCategoryOnFirebase(values['category']);
          if (isCategoryAlreadyExist) {
            actions.setFieldError("category", "Category already exist");
          }
        }}

      >
        <Box w="50%" bg="#364154" borderRadius="10px" pl={6} pr={6} pt={6}>
          <Form>

            <Field name="category" validate={ValidateCategoryNameInput}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.category && form.touched.category} mb={5}>
                  <FormLabel>Register new category</FormLabel>
                  <Input placeholder="Enter category name ..." id="description" {...field} />
                  <FormErrorMessage>{form.errors.category}</FormErrorMessage>
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
  )
}