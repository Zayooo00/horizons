import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserAuth } from '../../context/AuthContext';
import Validator from '../../helpers/Validator';

export default function SignUpForm() {
  const validator = Validator.getInstance();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const ERROR_EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use';

  const handleSignUp = async (event) => {
    event.preventDefault();
    setIsAuthLoading(true);
    try {
      await createUser(email, password);
      navigate('/dashboard');
    } catch (e) {
      setAuthError(e.message);
      const errorCode = e.code;
      if (errorCode === ERROR_EMAIL_ALREADY_IN_USE) {
        setAuthError('Email is already in use.');
      } else if (!validator.passwordsMatch(password, confirmPassword)) {
        setAuthError('Passwords do not match');
      } else if (!validator.isStrongPassword(password)) {
        setAuthError('The password must be at least 6 characters.');
      } else if (!validator.isValidEmail(email)) {
        setAuthError('Invalid email address.');
      }
      setIsAuthLoading(false);
    }
  };

  return (
    <>
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
          <Heading fontSize={'2xl'}>Create your account</Heading>
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
              variant="outlineOrange"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              variant="outlineOrange"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Confirm password</FormLabel>
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              variant="outlineOrange"
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={'#f47533'}
              _hover={{
                bg: '#e4450e',
              }}
              color={'black'}
              variant={'solid'}
              type="submit"
              onClick={handleSignUp}
            >
              {isAuthLoading ? <Spinner size={'sm'} /> : 'Sign up'}
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
