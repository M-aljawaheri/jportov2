import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import WorkItem from '../components/workitem'
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

const WorksPage = ({ allPostsData }) => {
  return (
    <Container maxW="container.md">
      <Heading
        as="h1"
        mb={6}
        my={6}
        textAlign="center"
        color={useColorModeValue('black', 'orchid')}
      >
        Works
      </Heading>

      <SimpleGrid columns={[1, null, 2]} spacing={10}>
        <AnimatePresence>
          {allPostsData
            .filter(post => post.hasOwnProperty('include_in_works'))
            .map(post => (
              <MotionBox
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <WorkItem
                  title={post.works_title}
                  imgSrc={`/images/works/${post.id}.jpeg`}
                  href={`/posts/${post.id}`}
                />
              </MotionBox>
            ))}
        </AnimatePresence>
      </SimpleGrid>
    </Container>
  )
}

export default WorksPage
