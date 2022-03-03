import { Box, Container, Flex, Image, Skeleton, SkeletonText, Spacer, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function Header() {

  const { user } = useContext(AuthContext);

  return (
    <Container w="100%" maxW="100vw" p={[5]}>
      <Flex align="center">
        <Text color="white" fontWeight="bold" fontSize="30px" textAlign="center">UpReport</Text>
        <Spacer />
        <Skeleton isLoaded={!!user} startColor='pink.500' endColor='orange.500'>
          <Image src="https://avatars.githubusercontent.com/u/59265044?v=4" width="40px" height="40px" mr={3} />
        </Skeleton>
        <Skeleton isLoaded={!!user} height='20px' startColor='pink.500' endColor='orange.500'>
          <Box w="150px" >{user?.displayName}</Box>
        </Skeleton>

      </Flex>
    </Container>
  )
} 