import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useDimensions } from "../../hooks/useDimensions";
import { database, ref, set, push, get, child, getDatabase, onValue } from "../../services/firebase";




export function RegisterNewCategoryForm() {

  const { user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const { width } = useDimensions();

  async function handleSubmit(values: any, actions: any) {
    const db = database;

    setIsLoading(true);

    if (!user) {
      throw new Error('you must be logged in')
    }
    /*
    await set(ref(db, 'users/' + user.uid), {
      userName: user.displayName,
      userEmail: user.email,
    }); */

    
    const dbRef = ref(getDatabase());
    
    get(child(dbRef, `users/${user.uid}/categories`)).then((snapshot) => {
      if (snapshot.exists()) {

        const data = snapshot.val();
        const entries = Object.entries(data).map(([key, value]) => { return value });
        const names = entries.map((el: any) => el.category)
        const isExists = (names.includes(values.category));

        if (isExists) {
          actions.setFieldError("category", "Category already exist");
        } else {
          const category = values.category;

          const categoryListRef = ref(db, `users/${user.uid}/categories`);
          const newCategoryListRef = push(categoryListRef);
          set(newCategoryListRef, {
            category,
          })

          alert("Category register successfully");

          actions.resetForm({
            values: {
              category: '',
            }
          })

        }

      } else  {
        
        const category = values.category;
        const categoryListRef = ref(db, `users/${user.uid}/categories`);
        const newCategoryListRef = push(categoryListRef);

        set(newCategoryListRef, {
          category,
        })
        alert("Category register successfully");

        actions.resetForm({
          values: {
            category: '',
          }
        }) 
      } 
    }).catch((error) => {
      console.error(error);
    })
    setIsLoading(false);  
    
    
  }
  



  function ValidateCategoryNameInput(value: string) {
    let error

    if (!value) {
      error = "Category name required"
    }
    return error
  }

  return (
    <VStack mr={width && width > 1180 ? ["200px"] : [0]} ml={width && width > 1180 ? ["200px"] : [0]} pb={10} alignItems="center">

      <Formik
        initialValues={{ category: '' }}
        onSubmit={(values, actions) => { handleSubmit(values, actions) }}

      >
        <Box w={width && width > 1180 ? "50%" : "100%"} bg="#364154" borderRadius="10px" pl={6} pr={6} pt={6}>
          <Form>

            <Field name="category" validate={ValidateCategoryNameInput}>
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.category && form.touched.category} mb={5}>
                  <FormLabel>Register new category</FormLabel>
                  <Input placeholder="Enter category name ..." id="description" {...field} />
                  <FormErrorMessage>{form.errors.category}</FormErrorMessage>
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