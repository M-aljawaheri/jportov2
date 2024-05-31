// components/BlogPost.js
import {
  Box,
  Text,
  useColorModeValue,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import NextLink from 'next/link'

const MotionBox = motion(Box)

const BlogPost = ({ title, date, href }) => {
  const dateColor = useColorModeValue('gray.600', 'gray.400')
  const boxBorderColor = useColorModeValue('gray.400', undefined) // default is nice for dark mode
  const linkTextColor = useColorModeValue('', 'orchid')

  const hoverBg = useColorModeValue('teal.300', 'gray.600')

  return (
    <ChakraLink
      as={NextLink}
      href={href}
      color={linkTextColor}
      _hover={{ textDecoration: 'none' }}
    >
      <MotionBox
        sx={{
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: hoverBg,
          },
        }}
        whileHover={{ scale: 1.05 }}
        p={4}
        borderWidth={1}
        borderColor={boxBorderColor}
        borderRadius="md"
        mb={4}
      >
        <Text fontSize="sm" color={dateColor}>
          {date}
        </Text>
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>
      </MotionBox>
    </ChakraLink>
  )
}

export default BlogPost
