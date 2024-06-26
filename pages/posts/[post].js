import { getAllPostIds, getPostData } from '../../lib/posts-util'
import {
  Container,
  Button,
  Box,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Date from '../../components/date'
import { getGlobalLightStyle } from '../../lib/theme'
import { getGlobalDarkStyle } from '../../lib/theme'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MarkdownComponents from '../../lib/image-markdown-util'
import { ArrowLeftIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

const MotionBox = motion(Box)

export default function Post({ postData }) {
  const bgColor = useColorModeValue(getGlobalLightStyle(), getGlobalDarkStyle())
  const color = useColorModeValue('black', 'white')
  const dateColor = useColorModeValue('gray.600', 'gray.400')

  return (
    <Container maxW="container.sm">
      <Box align="left" my={2}>
        <NextLink href="/posts">
          <Button rightIcon={<ArrowLeftIcon />} colorScheme="teal"></Button>
        </NextLink>
      </Box>
      <MotionBox
        bg={bgColor}
        color={color}
        //        p={8}
        borderRadius="md"
        mx="auto"
        mt={10}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Head>
          <title>{postData.title}</title>
        </Head>
        <Text fontSize="sm" color={dateColor} mb={4}>
          <Date dateString={postData.date} />
        </Text>
        <Heading as="h1" mb={6} fontSize="4xl">
          {postData.title}
        </Heading>
        <Box lineHeight="tall" fontSize="lg" />
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={MarkdownComponents}
        >
          {postData.contentHtml}
        </ReactMarkdown>
      </MotionBox>
    </Container>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.post)
  return {
    props: {
      postData,
    },
  }
}
