import {
  Container,
  Box,
  Heading,
  Image,
  useColorModeValue,
} from '@chakra-ui/react'
import Section from '../components/section'
import Paragraph from '../components/paragraph'

const Page = () => {
  return (
    <Container>
      <Box
        borderRadius="lg"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        p={3}
        mb={6}
        align="center"
      >
        Hello, I'm a full-stack & systems developer based in Qatar.
      </Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Mohammed Al-Jawaheri
          </Heading>

          <p> Digital scholar ( Developer, Academic, Hobbyist ) </p>
          <p> Teaching Assistant @ CMU-Q </p>
        </Box>

        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          align="center"
        >
          <Image
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            maxWidth="100px"
            display="inline-block"
            borderRadius="full"
            src="/images/personal.jpeg"
            alt="Profile Image"
          />
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Work
        </Heading>
        <Paragraph>
          I am a freelancer, Teaching Assistant and researcher @ Carnegiemellon
          University. I have worked in the Qatar and Pittsburgh campuses. I have
          a passion for all things systems: Operating systems, Database systems,
          Compiler development and Computer Graphics
        </Paragraph>
      </Section>
    </Container>
  )
}

export default Page
