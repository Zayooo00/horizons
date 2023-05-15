import React, { useState } from 'react';
import { Image, Box, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function Post({ post }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Box
      key={post.title}
      position="relative"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <Image rounded={'1rem'} src={post.image} alt="image" />
      {showDetails && (
        <Box
          rounded={'1rem'}
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.5)"
          color="white"
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          alignItems="flex-start"
        >
          <Box w={'90%'} isTruncated fontSize="lg" ml={4}>
            {post.title}
          </Box>
          <Text w={'90%'} isTruncated fontSize="sm" ml={4} mb={4}>
            {post.prompt}
          </Text>
        </Box>
      )}
    </Box>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
  }).isRequired,
};