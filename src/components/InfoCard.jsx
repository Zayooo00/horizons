import React from 'react';
import { Card, Center, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function InfoCard({ heading, text }) {
  return (
    <>
      <Card mx={4} p={5} bg="whiteAlpha.100" maxW={650}>
        <Center>
          <Text color="white" fontSize={20} fontWeight={900} mb={2}>
            {heading}
          </Text>
        </Center>
        <Center textAlign="center">
          <Text color="white">{text}</Text>
        </Center>
      </Card>
    </>
  );
}

InfoCard.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
