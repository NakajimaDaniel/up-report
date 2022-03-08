import { Container, VStack, Text, Flex, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Home, Layout, PlusSquare } from 'react-feather';


export function Menu() {

  const router = useRouter();

  return (
    <Container position="fixed" top="20" w="100%" maxW={[190]} p={0} bg="#364154" borderRadius="17px"  >
      <VStack alignItems="left" >
        <Flex
          alignItems="center"
          w="100%"
          p={3}
          borderRadius="17px"
          bg={router.asPath === '/dashboard' ? "#3C485C" : 'none'}
          _hover={{ backgroundColor: "#3C485C", cursor: "pointer" }}
          sx={{ transition: '0.3s' }}
          onClick={() => { router.push('/dashboard') }}
        >
          <Icon as={Home} pr={2} w={7} h={7} color={router.asPath === '/dashboard' ? "#46BCFF" : 'none'} />
          <Text fontWeight="semibold" color={router.asPath === '/dashboard' ? "#46BCFF" : 'none'} >Home</Text>
        </Flex>

        <Flex
          alignItems="center"
          w="100%"
          p={3}
          borderRadius="17px"
          bg={router.asPath === '/dashboard/overview' ? "#3C485C" : 'none'}
          _hover={{ backgroundColor: "#3C485C", cursor: "pointer" }}
          sx={{ transition: '0.3s' }}
          onClick={() => { router.push('/dashboard/overview') }}
        >
          <Icon as={Layout} pr={2} w={7} h={7} color={router.asPath === '/dashboard/overview' ? "#46BCFF" : 'none'} />
          <Text fontWeight="semibold" color={router.asPath === '/dashboard/overview' ? "#46BCFF" : 'none'} >Overview</Text>
        </Flex>


        <Flex
          alignItems="center"
          w="100%"
          p={3}
          borderRadius="17px"
          _hover={{ backgroundColor: "#3C485C", cursor: "pointer" }}
          sx={{ transition: '0.3s' }}
        >
          <Icon as={PlusSquare} pr={2} w={7} h={7} />
          <Text fontWeight="semibold" >Transaction</Text>
        </Flex>

      </VStack>
    </Container >
  )
}