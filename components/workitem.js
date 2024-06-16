import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import Image from 'next/image'

const MotionBox = motion(Box)

const WorkItem = ({ title, imgSrc, href }) => {
  const hoverBg = useColorModeValue('gray.200', 'gray.600')

  return (
    <NextLink href={href} passHref>
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
        borderColor={useColorModeValue('gray.400', 'gray.700')}
        borderRadius="md"
        mb={4}
      >
        <Box mb={2}>
          <Image
            src={imgSrc}
            alt={title}
            width={500}
            height={300}
            layout="responsive"
            objectFit="cover"
          />
        </Box>
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>
      </MotionBox>
    </NextLink>
  )
}

export default WorkItem
