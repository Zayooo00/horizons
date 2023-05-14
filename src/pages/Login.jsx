import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Divider,
  Center,
  Text,
  Spinner,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { FcGoogle } from 'react-icons/fc';
import login from '../assets/images/login.png';
import { UserAuth } from '../context/AuthContext';

export default function Login() {
  const { signIn, googleSignIn } = UserAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const ERROR_INVALID_EMAIL = 'auth/invalid-email';
  const ERROR_WRONG_PASSWORD = 'auth/wrong-password';

  const handleGoogleSignIn = async () => {
    await googleSignIn();
  };

  const handleEmailSignIn = async (event) => {
    event.preventDefault();
    setIsAuthLoading(true);
    setAuthError('');
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
      }
      setIsAuthLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex
          mt={{ base: '60px', sm: '0' }}
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
            <form onSubmit={handleEmailSignIn}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </FormControl>
              <Stack spacing={6}>
                <Button
                  mt={4}
                  type="submit"
                  bg={'#D4E45D'}
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
                <Center>
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
                    <FcGoogle color="white" alt="Google Icon" />
                  </Button>
                </Center>
              </Stack>
            </form>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            display={{ base: 'none', md: 'inline-flex' }}
            alt={'Login Image'}
            objectFit={'cover'}
            src={login}
          />
        </Flex>
      </Stack>
    </>
  );
}
