import { getAllPostIds, getPostData } from '../../lib/posts-util'
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Date from '../../components/date'
import { getGlobalLightStyle } from '../../lib/theme'
import { getGlobalDarkStyle } from '../../lib/theme'

const MotionBox = motion(Box)

export default function Post({ postData }) {
  const bgColor = useColorModeValue(getGlobalLightStyle(), getGlobalDarkStyle())
  const color = useColorModeValue('black', 'white')
  const dateColor = useColorModeValue('gray.600', 'gray.400')

  return (
    <MotionBox
      bg={bgColor}
      color={color}
      p={8}
      borderRadius="md"
      maxW="container.md"
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
      <Box
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        lineHeight="tall"
        fontSize="lg"
      />
    </MotionBox>
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
