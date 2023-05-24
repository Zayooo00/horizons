import { HStack, Box, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

export default function HorizonsToast({ title }) {
  return (
    <HStack
      spacing={3}
      px={4}
      py={3}
      borderLeft="3px solid #38A169"
      roundedLeft="8px"
      bg="#313b40"
      color="white"
    >
      <Box w={4} bg="#294747" borderRadius="md" mr={3} />
      <CheckCircleIcon
        fontSize={20}
        color="#38A169"
        bg="white"
        rounded={'full'}
      />
      <Text fontWeight="medium">{title}</Text>
    </HStack>
  );
}

HorizonsToast.propTypes = {
  title: PropTypes.string.isRequired,
};
