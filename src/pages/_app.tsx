import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthContextProvider } from '../contexts/AuthContext';

const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      body: {
        fontFamily: 'body',
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('white', 'gray.700')(props),
        lineHeight: 'base',
      },
    }),
  },
  fonts: {
    heading: 'DM Sans, sans-serif',
    body: 'DM Sans, sans-serif',
  },

})


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>UpReport</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
