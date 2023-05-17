import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Divider,
  Center,
  Text,
  Spinner,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { UserAuth } from '../../context/AuthContext';

export default function LoginForm() {
  const { signIn, googleSignIn } = UserAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const ERROR_INVALID_EMAIL = 'auth/invalid-email';
  const ERROR_WRONG_PASSWORD = 'auth/wrong-password';
  const ERROR_USER_NOT_FOUND = 'auth/user-not-found';
  const ERROR_NETWORK_REQUEST_FAILED = 'network-request-failed';
  const ERROR_POPUP_CLOSED = 'auth/popup-closed-by-user';

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await googleSignIn();
    } catch (e) {
      setAuthError(e.message);
      const errorCode = e.code;
      if (errorCode === ERROR_POPUP_CLOSED) {
        setAuthError('Popup has been closed by the user.');
        setIsGoogleLoading(false);
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleEmailSignIn = async (event) => {
    event.preventDefault();
    setIsAuthLoading(true);
    try {
      await signIn(email, password);
      setIsAuthLoading(false);
    } catch (e) {
      setAuthError(e.message);
      const errorCode = e.code;
      if (
        errorCode === ERROR_INVALID_EMAIL ||
        errorCode === ERROR_WRONG_PASSWORD
      ) {
        setAuthError('The email address or password you entered is invalid.');
      } else if (errorCode === ERROR_USER_NOT_FOUND) {
        setAuthError('The email address you entered was not found.');
      } else if (errorCode === ERROR_NETWORK_REQUEST_FAILED) {
        setAuthError('No network, check your connection and try again.');
      }
      setIsAuthLoading(false);
    }
  };

  return (
    <Flex
      position={{ base: 'absolute', md: 'inherit' }}
      top={{ base: 28, md: 'auto' }}
      left={{ base: 0, md: 'auto' }}
      right={{ base: 0, md: 'auto' }}
      p={8}
      flex={1}
      align={'center'}
      justify={'center'}
    >
      <Stack spacing={4} w={'full'} maxW={'md'}>
        <Heading fontSize={'2xl'}>Log in to your account</Heading>
        {authError && (
          <Text fontSize="sm" color="red" mt={8}>
            {authError}
          </Text>
        )}
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            variant="outlineGreen"
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            variant="outlineGreen"
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            onClick={handleEmailSignIn}
            mt={4}
            type="submit"
            bg={'#d4e45d'}
            _hover={{
              bg: '#9aaa1d',
            }}
            color={'black'}
            variant={'solid'}
          >
            {isAuthLoading ? <Spinner size={'sm'} /> : 'Log in'}
          </Button>
        </Stack>
        <Stack>
          <Center mt={-2.5}>
            <Divider w={'25%'} />
            <Text m={2}>Or continue with:</Text>
            <Divider w={'25%'} />
          </Center>
          <Center>
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              rounded={'2rem'}
              w={'full'}
              bg={'white'}
            >
              {isGoogleLoading ? (
                <Spinner size="sm" color="black" />
              ) : (
                <FcGoogle color="white" alt="Google Icon" />
              )}
            </Button>
          </Center>
        </Stack>
      </Stack>
    </Flex>
  );
}
