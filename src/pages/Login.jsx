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
} from '@chakra-ui/react';
import React from 'react';
import Navbar from '../components/Navbar';
import { FcGoogle } from 'react-icons/fc';
import login from '../assets/images/login.png'

export default function Login() {
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
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={6}>
              <Button
                bg={'#D4E45D'}
                _hover={{
                  bg: '#9aaa1d',
                }}
                color={'black'}
                variant={'solid'}
              >
                Log in
              </Button>
            </Stack>
            <Stack>
              <Center>
                <Divider w={'25%'} />
                <Text m={2}>Or continue with:</Text>
                <Divider w={'25%'} />
              </Center>
              <Center>
                <Button rounded={'2rem'} w={'full'} bg={'white'}>
                  <FcGoogle color="white" alt="Google Icon" />
                </Button>
              </Center>
            </Stack>
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
