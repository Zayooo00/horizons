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

  const authError_EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use';

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setIsAuthLoading(true);
    setAuthError('');
    if (!validator.passwordsMatch(password, confirmPassword)) {
      setAuthError('Passwords do not match');
      return;
    }
    if (!validator.isStrongPassword(password)) {
      setAuthError('The password must be at least 6 characters.');
      return;
    }
    if (!validator.isValidEmail(email)) {
      setAuthError('Invalid email address.');
      return;
    }
    try {
      await createUser(email, password);
      navigate('/dashboard');
    } catch (e) {
      setAuthError(e.message);
      const errorCode = e.code;
      if (errorCode === authError_EMAIL_ALREADY_IN_USE) {
        setAuthError('Email is already in use.');
      }
      setIsAuthLoading(false);
    }
  };

  return (
    <>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack rounded={'1rem'} spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Create your account</Heading>
          {authError && (
            <Text fontSize="sm" color="red" mt={8}>
              {authError}
            </Text>
          )}
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={handleEmailChange} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Confirm password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={'#f47533'}
              _hover={{
                bg: '#E4450E',
              }}
              color={'black'}
              variant={'solid'}
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
