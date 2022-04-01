import { Box, Text, Center, Image } from '@chakra-ui/react';
import { roundToNearestMinutes } from 'date-fns/esm';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getAuth, onAuthStateChanged } from '../services/firebase';



export default function Home() {

  const { signInWithGoogle, user } = useContext(AuthContext);

  const router = useRouter();

  function handleLoginWithGoogleButton() {
    signInWithGoogle();
  }

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard")
      }
      unsubscribe();
    })
  }, [user])


  return (
    <Center h="100vh" maxW="100vw" w="100%" bg="#46BCFF">
      <Box>
        <Text color="white" fontWeight="bold" fontSize="30px" textAlign="center">UpReport</Text>
        <Text color="white" fontSize="15px" textAlign="center" pb="10"  >keep track on your expenses</Text>
        <Center w="270px" h="50px" bg="#EEEEEE" sx={{ borderRadius: '10px', 'transition': '0.3s' }} _hover={{ cursor: 'pointer', backgroundColor: '#e2e2e2' }} as="button" onClick={handleLoginWithGoogleButton}  >
          <Image src="google-icon.svg" />
          <Text color="#525252" pl="5" fontWeight="regular">Login with Google</Text>
        </Center>
      </Box>
    </Center>
  )

}
