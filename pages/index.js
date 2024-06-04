import NextLink from 'next/link'
import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Button,
  Box,
  Heading,
  Image,
  useColorModeValue,
  Link,
  Text,
} from '@chakra-ui/react'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import { LINKEDIN_URL, GITHUB_URL, RESUME_PDF } from '../constants'
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai'

const Page = () => {
  const iconHoverColor = useColorModeValue('teal.500', 'teal.300')
  const iconTransition = 'all 0.3s ease'

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
          <Text fontSize="xs" as="i">
            {' '}
            mjawaheri02 &lt;AT&gt; gmail &lt;DOT&gt; com{' '}
          </Text>
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
          I am a freelancer, Teaching Assistant and researcher @Carnegiemellon
          University. I have a passion for all things systems: Operating
          systems, Database systems, Compiler development and Distributed
          systems with a special affinity for{' '}
          <Link as={NextLink} href="/posts/creating-opensource-culture">
            open-source software
          </Link>
          .
        </Paragraph>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={4}
          py={3}
        >
          <NextLink href={LINKEDIN_URL} isExternal>
            <Box
              as={AiFillLinkedin}
              size="40px"
              _hover={{ color: iconHoverColor, transform: 'scale(1.1)' }}
              transition={iconTransition}
            />
          </NextLink>

          <NextLink href={RESUME_PDF} passHref>
            <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
              My Resume
            </Button>
          </NextLink>

          <NextLink href={GITHUB_URL} isExternal>
            <Box
              as={AiFillGithub}
              size="40px"
              _hover={{ color: iconHoverColor, transform: 'scale(1.1)' }}
              transition={iconTransition}
            />
          </NextLink>
        </Box>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Bio
        </Heading>
        <BioSection>
          <BioYear>2021</BioYear>
          Worked on NS3 network simulations for University research projects.
        </BioSection>
        <BioSection>
          <BioYear>2023</BioYear>
          Graduated from Carnegiemellon University with a Bsc in Computer
          Science & a Concentration in Computer Systems
          <br />
          Full-Time Teaching Assistant @Carnegiemellon University in Qatar
        </BioSection>
        <BioSection>
          <BioYear>2024</BioYear>
          Intern w/ Nvidia mentors @{' '}
          <Link as={NextLink} href="/posts/working-with-openstack">
            Openstack
          </Link>
        </BioSection>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          I ❤️
        </Heading>
        <Paragraph>
          I love playing amateur & watching (not amateur) tennis. Love food,
          fitness, and family.
        </Paragraph>
      </Section>
    </Box>
  )
}

export default Page
