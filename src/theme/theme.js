
// import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';



// export const theme = extendTheme({
//   styles: {
//     global: () => ({
//       body: {
//         fontFamily: 'body',
//         color: mode('gray.800', 'whiteAlpha.900'),
//         bg: mode('white', 'gray.700'),
//         lineHeight: 'base',
//       },
//     }),
//   },
//   fonts: {
//     heading: 'DM Sans, sans-serif',
//     body: 'DM Sans, sans-serif',
//   },
//   config: {
//     initialColorMode: 'dark',
//     useSystemColorMode: true
//   }

// })


import { extendTheme } from '@chakra-ui/react'

const styles = {
  global: () => ({
    body: {
      // color: mode('gray.800', 'whiteAlpha.900'),
      bg: 'gray.700',
      lineHeight: 'base',
    }
  })
}

const fonts = {
  heading: 'DM Sans, sans-serif',
  body: 'DM Sans, sans-serif',
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}


export const theme = extendTheme({ config, fonts, styles })