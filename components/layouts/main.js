import Head from 'next/head'
import Navbar from '../navbar.js'
import { Box, Container } from '@chakra-ui/react'
import BackgroundEffects from '../background-effects.js'

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8} position="relative">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Mohammed Al-Jawaheri - Homepage</title>
      </Head>

      <Navbar path={router.asPath} />

      {/* Add the canvas outside the container */}
      <canvas
        id="effectsCanvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      ></canvas>

      <BackgroundEffects />

      <Container maxW="container.md" pt={14} position="relative" zIndex={0}>
        {children}
      </Container>
    </Box>
  )
}

export default Main
