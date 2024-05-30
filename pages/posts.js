import {
  Box,
  Container,
  Heading,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import BlogPost from '../components/blog-post'
import { getSortedPostsData } from '../lib/posts-util'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

// why the hell does this prop passed must match name returned in getstaticprops, this
// makes little sense. i'm probably misunderstanding
const BlogPage = ({ allPostsData }) => {
  return (
    <Container maxW="container.md">
      <Heading as="h1" mb={6} textAlign="center">
        Blog Posts
      </Heading>

      <Box borderRadius="lg" p={3} mb={6} align="center">
        Some of my ramblings on Computer Science, Philosophy and general life
        stuff
      </Box>

      <AnimatePresence>
        {allPostsData.map(post => (
          <BlogPost
            key={post.id}
            title={post.title}
            date={post.date}
            href={`/posts/${post.id}`}
          />
        ))}
      </AnimatePresence>
    </Container>
  )
}

export default BlogPage
