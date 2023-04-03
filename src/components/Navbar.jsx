import * as React from 'react';
import { Link } from 'react-router-dom';
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

// eslint-disable-next-line react/prop-types
export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box position="absolute" top={0} left={0} right={0} zIndex={1}>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          px={4}
        >
          <a href="/">
            <Flex alignItems={'center'}>
              <Box>
                <Image w={'40px'} src={logo} />
              </Box>
              <Text
                ml={3}
                mb={'3px'}
                fontSize={'2xl'}
                letterSpacing={4}
                color={'white'}
              >
                HORIZONS
              </Text>
            </Flex>
          </a>
          <Flex alignItems={'center'}>
          <Link to="/login">
            <Button
              colorScheme="teal"
              mr={4}
              display={{ base: 'none', sm: 'inline-flex' }}
            >
              Log in
            </Button>
            </Link>
            <Link to="/signup">
            <Button
            background={'gray.700'}
              color="white"
              display={{ base: 'none', sm: 'inline-flex' }}
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
            />
          </Flex>
        </Flex>
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'full'}>
        <DrawerOverlay />
        <DrawerContent bg={'gray.900'}>
          <DrawerCloseButton mt={'10px'} color={'white'} />
          <DrawerHeader>
            <Flex>
              <Image w={'40px'} src={logo} />
              <Text
                ml={3}
                mb={1}
                fontSize={'2xl'}
                letterSpacing={4}
                color={'white'}
              >
                HORIZONS
              </Text>
            </Flex>
          </DrawerHeader>

          <DrawerBody mt={4}>
            <Link to="/login">
            <Button colorScheme="teal" w="100%" mb={4}>
              Log in
            </Button>
            </Link>
            <Link to="/signup">
            <Button colorScheme="teal" w="100%">
              Sign up
            </Button>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
