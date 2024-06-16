import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
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

const MotionBox = motion(Box)

// why the hell does this prop passed must match name returned in getstaticprops, this
// makes little sense. i'm probably misunderstanding
const BlogPage = ({ allPostsData }) => {
  return (
    <Container maxW="container.md">
      <Heading
        as="h1"
        mb={6}
        my={6}
        textAlign="center"
        color={useColorModeValue('', 'orchid')}
      >
        Blog Posts
      </Heading>

      <Box borderRadius="lg" p={3} mb={2} align="center">
        Some of my ramblings on Computer Science, Philosophy and general life
        stuff
      </Box>

      <AnimatePresence>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {allPostsData.map(post => (
            <BlogPost
              key={post.id}
              title={post.title}
              date={post.date}
              href={`/posts/${post.id}`}
            />
          ))}
        </MotionBox>
      </AnimatePresence>
    </Container>
  )
}

export default BlogPage
