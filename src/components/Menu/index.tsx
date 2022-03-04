import { Container, VStack, Text, Flex, Image, Icon } from "@chakra-ui/react";
import { Home, Layout, PlusSquare } from 'react-feather';


export function Menu() {
  return (
    <Container position="fixed" top="20" w="100%" maxW={[190]} p={0} bg="#364154" borderRadius="17px"  >
      <VStack alignItems="left" >
        <Flex alignItems="center" w="100%" p={3} borderRadius="17px" bg="#3C485C" _hover={{ backgroundColor: "#3C485C", cursor: "pointer" }} sx={{ transition: '0.3s' }} >
          <Icon as={Home} pr={2} w={7} h={7} color="#46BCFF" />
          <Text fontWeight="semibold" color="#46BCFF">Home</Text>
        </Flex>

        <Flex alignItems="center" w="100%" p={3} borderRadius="17px" _hover={{ backgroundColor: "#3C485C", cursor: "pointer" }} sx={{ transition: '0.3s' }} >
          <Icon as={Layout} pr={2} w={7} h={7} />
          <Text fontWeight="semibold">Overview</Text>
        </Flex>


        <Flex alignItems="center" w="100%" p={3} borderRadius="17px" _hover={{ backgroundColor: "#3C485C", cursor: "pointer" }} sx={{ transition: '0.3s' }} >
          <Icon as={PlusSquare} pr={2} w={7} h={7} />
          <Text fontWeight="semibold" >Transaction</Text>
        </Flex>

      </VStack>
    </Container >
  )
}