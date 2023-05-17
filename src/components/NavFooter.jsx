import { Flex, Divider, Center, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NavFooter() {
  return (
    <Flex
      display={{ base: 'flex', sm: 'none' }}
      justifyContent="space-between"
      alignItems="center"
      bg="black"
      px={'20vw'}
      py={1}
      position="fixed"
      bottom={0}
      left={0}
      right={0}
    >
      <Link to="/login">
        <Text fontSize={'sm'}>LOG IN</Text>
      </Link>
      <Center height="50px">
        <Divider orientation="vertical" color="white" />
      </Center>
      <Link to="/sign-up">
        {' '}
        <Text fontSize={'sm'}>SIGN UP</Text>
      </Link>
    </Flex>
  );
}
