import { Box, Text, Image, Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function TipCard({ tip, exampleImage, prompt }) {
  return (
    <Box maxW="2xl" overflow="hidden" bg="#313536" mt={8} mb={8} mx={8}>
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Image
          src={exampleImage}
          alt={exampleImage}
          boxSize={{ base: '100%', md: '35%' }}
          maxH={{ base: 250, sm: 350, md: 500 }}
          objectFit={{ base: 'cover', md: 'contain' }}
        />
        <Box p={6}>
          <Box mt={{ base: 0, md: 8 }} d="flex" alignItems="baseline">
            <Text fontSize="xs" color="#a7a499">
              Tip
            </Text>
          </Box>
          <Text mb={2} fontSize="xs" color="#a7a499">
            {tip}
          </Text>
          <Text as="q" fontStyle="italic" fontSize="lg">
            {prompt}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

TipCard.propTypes = {
  tip: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
  exampleImage: PropTypes.string.isRequired,
};
