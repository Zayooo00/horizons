import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Image,
  Text,
  IconButton,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import logo from '../assets/images/logo.png';

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  return (
    <>
      <Box position="absolute" top={0} left={0} right={0} zIndex={2}>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          px={4}
        >
          <Link to="/">
            <Flex alignItems={'center'}>
              <Box>
                <Image w={'40px'} src={logo} />
              </Box>
              <Text
                ml={3}
                mb={'1px'}
                fontSize={'2xl'}
                letterSpacing={4}
                color={'white'}
              >
                HORIZONS
              </Text>
            </Flex>
          </Link>
          <Flex alignItems={'center'}>
            <Link to="/login">
              <Button
                fontWeight={'light'}
                background={'transparent'}
                transition="transform 0.2s ease-in-out"
                _hover={{
                  bg: 'transparent',
                  transform: 'scale(1.05)',
                }}
                mr={4}
                display={{ base: 'none', sm: 'inline-flex' }}
                border={location.pathname === '/login' ? '1px' : 'none'}
              >
                Log in
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button
                fontWeight={'light'}
                background={'transparent'}
                transition="transform 0.2s ease-in-out"
                _hover={{
                  bg: 'transparent',
                  transform: 'scale(1.05)',
                }}
                color="white"
                display={{ base: 'none', sm: 'inline-flex' }}
                border={location.pathname === '/sign-up' ? '1px' : 'none'}
              >
                Sign up
              </Button>
            </Link>
            <IconButton
              _hover={{
                bg: 'transparent',
              }}
              background={'transparent'}
              color={'white'}
              size={'lg'}
              icon={<HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ sm: 'none' }}
              onClick={onOpen}
              ml={4}
              mb={'3px'}
            />
          </Flex>
        </Flex>
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
        <DrawerOverlay />
        <DrawerContent bg={'gray.900'}>
          <DrawerCloseButton mt={'11px'} color={'white'} />
          <DrawerHeader>
            <Link to="/">
              <Flex>
                <Image w={'40px'} src={logo} />
                <Text
                  ml={3}
                  mt={'3px'}
                  fontSize={'2xl'}
                  letterSpacing={4}
                  color={'white'}
                >
                  HORIZONS
                </Text>
              </Flex>
            </Link>
          </DrawerHeader>
          <DrawerBody mt={4}>
            <Link to="/login">
              <Button
                fontWeight={'bold'}
                bg="#d4e45d"
                color="black"
                w="100%"
                mb={4}
                transition="transform 0.2s ease-in-out"
                _hover={{
                  transform: 'scale(0.95)',
                }}
              >
                Log in
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button
                fontWeight={'bold'}
                bg="#f47533"
                color="black"
                w="100%"
                transition="transform 0.2s ease-in-out"
                _hover={{
                  transform: 'scale(0.95)',
                }}
              >
                Sign up
              </Button>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
