import {
  Box,
  Container,
  Heading,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import BlogPost from '../components/blog-post'

const posts = [
  {
    title: 'The Library of Babel',
    date: '2023-01-01',
    href: '/posts/library-of-babel',
  },
  {
    title: 'Working with Openstack',
    date: '2023-01-02',
    href: '/posts/openstack-opensource',
  },
  {
    title: 'So I was name-dropped in the CMU operating systems class..',
    date: '2023-01-02',
    href: '/posts/openstack-opensource',
  },
  // Add more posts as needed
]

const BlogPage = () => {
  const { toggleColorMode } = useColorMode()
  const pageBg = useColorModeValue('gray.50', 'gray.900')

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
        {posts.map(post => (
          <BlogPost
            key={post.title}
            title={post.title}
            date={post.date}
            href={post.href}
          />
        ))}
      </AnimatePresence>
    </Container>
  )
}

export default BlogPage
