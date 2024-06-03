import NextLink from 'next/link'
import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Button,
  Container,
  Box,
  Heading,
  Image,
  useColorModeValue,
} from '@chakra-ui/react'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'

const Page = () => {
  return (
    <Box>
      <Box
        borderRadius="lg"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        p={3}
        mb={6}
        w="100%"
        align="center"
      >
        Hello, I'm a full-stack & systems developer based in Qatar.
      </Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title" minW={{ base: 'md' }}>
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
          Compiler development and Distributed systems with a special affinity
          for opensource software.
        </Paragraph>

        <Box align="center" my={4}>
          <NextLink href="/works">
            <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
              My Portfolio
            </Button>
          </NextLink>
        </Box>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Bio
        </Heading>
        <BioSection>
          <BioYear>2002</BioYear>
          Born in Doha, Qatar.
        </BioSection>
        <BioSection>
          <BioYear>2023</BioYear>
          Graduated from Carnegiemellon University with a Bsc in Computer
          Science & a Concentration in Computer Systems
        </BioSection>
        <BioSection>
          <BioYear>2024</BioYear>
          Intern @ Openstack working alongside Nvidia & Redhat developers
        </BioSection>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          I ❤️
        </Heading>
        <Paragraph>
          I love playing amateur & watching professional tennis. Love food,
        </Paragraph>
      </Section>
    </Box>
  )
}

export default Page
