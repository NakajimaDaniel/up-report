import { Box, Button, Container, Flex, Image, MenuButton, MenuItem, MenuList, Skeleton, Spacer, Text, Menu as ChakraMenu, Icon, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useDimensions } from "../../hooks/useDimensions";
import { Menu } from '../Menu';
import { Menu as FeatherMenu } from 'react-feather';
import Link from "next/link";
import { getAuth, signOut } from "../../services/firebase";
import { useRouter } from "next/router";

export function Header() {

  const { user } = useContext(AuthContext);
  const router = useRouter()

  const { width } = useDimensions();

  function handleLogout() {
    const auth = getAuth();

    signOut(auth).then(() => {
      // Sign-out successful.
      router.push("/")
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <Container w="100%" maxW="100vw" p={[5]}>

      {width && width > 1180 ? (

        <Flex align="center">
          <Menu />
          <Text color="white" fontWeight="bold" fontSize="30px" textAlign="center">UpReport</Text>
          <Spacer />

          <Skeleton isLoaded={!!user} startColor='pink.500' endColor='orange.500'>
            <Image src="https://avatars.githubusercontent.com/u/59265044?v=4" width="40px" height="40px" mr={3} />
          </Skeleton>
          <Skeleton isLoaded={!!user} height='20px' startColor='pink.500' endColor='orange.500'>
            <Box w="150px" >{user?.displayName}</Box>
          </Skeleton>
        </Flex>
      ) : (
        <Flex align="center" pl={5}>
          <Text color="white" fontWeight="bold" fontSize="30px" textAlign="center">UpReport</Text>
          <Spacer />
          <ChakraMenu>
            <MenuButton as={Button} >
              <Icon as={FeatherMenu} />
            </MenuButton>
            <MenuList>
              <Link href="/dashboard" >
                <MenuItem>
                  Home
                </MenuItem>
              </Link>
              <Link href="/dashboard/overview" >
                <MenuItem>
                  Overview
                </MenuItem>
              </Link>
              <Link href="/dashboard/transactions" >
                <MenuItem>
                  Transactions
                </MenuItem>
              </Link>
            </MenuList>
          </ChakraMenu>

          <Popover>
            <PopoverTrigger>
              <Skeleton isLoaded={!!user} startColor='pink.500' endColor='orange.500' _hover={{ cursor: "pointer" }} ml={5} >
                <Image src={user?.photoURL} width="40px" height="40px" mr={3} />
              </Skeleton>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Signed in as {user?.displayName}</PopoverHeader>
              <PopoverBody>
                <Button onClick={() => handleLogout()} >Sign out</Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>

        </Flex>

      )}
    </Container>
  )
} 