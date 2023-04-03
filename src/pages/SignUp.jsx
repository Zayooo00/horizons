import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from '@chakra-ui/react';
import React from 'react';
import Navbar from '../components/Navbar';

export default function Login() {
  return (
    <>
      <Navbar />
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex mt={{ base: '-81vh', sm: '-100vh', md: '0', xl: '0' }} flex={1}>
          <Image
            display={{ base: 'none', md: 'inline-flex' }}
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://lh5.googleusercontent.com/proxy/wGaBTSMgVvDb6wWarOv2LK47Ge2yg4IxwzYp2TbenpzluCVPM9gve5pEF71elaNNS8WBELQD57vY3DuJhHyiH1DzCjZUr1Y-4e9UKhYZGL9XgHIiyUZAMf9-3-6c0xty=w1920-h937'
            }
          />
        </Flex>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack rounded={'1rem'} spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'}>Create your account</Heading>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Confirm password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={6}>
              <Button
                bg={'#f47533'}
                _hover={{
                  bg: '#E4450E',
                }}
                color={'black'}
                variant={'solid'}
              >
                Sign up
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </>
  );
}
