import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Text,
} from '@chakra-ui/react';
import { Link as Nav } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

import { UserAuth } from '../context/AuthContext';
import { getUserById } from '../services/profiles-service';
import logo from '../assets/images/logo.png';

const links = [
  { text: 'Dashboard', to: '/dashboard' },
  { text: 'Discover', to: '/discover' },
  { text: 'Create', to: '/create' },
];

const NavLink = ({ children, to }) => (
  <Link
    as={Nav}
    to={to}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('#233433'),
    }}
  >
    {children}
  </Link>
);

export default function Headbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userProfile, setUserProfile] = useState(null);
  const { logout, user } = UserAuth();

  useEffect(() => {
    getUserById(user.uid).then((data) => {
      setUserProfile(data);
    });
  }, [user.uid]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <Box bg={'#294747'} px={4} position="fixed" top="0" w="100%" zIndex="1">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            bg={'transparent'}
            _hover={{
              bg: '#233433',
            }}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              {' '}
              <Nav to="/dashboard">
                <Flex alignItems={'center'}>
                  <Box>
                    <Image w={'34px'} src={logo} />
                  </Box>
                </Flex>
              </Nav>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {links.map((link) => (
                <NavLink key={link.text} to={link.to}>
                  {link.text}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  bg={'transparent'}
                  size={'sm'}
                  src={userProfile?.avatar || ''}
                />
              </MenuButton>
              <MenuList bg="#233433" w={'273px'} p={1}>
                <Box>
                  <Text fontSize="xs" ml={4} my={2}>
                    Currently logged as
                  </Text>
                  <Nav to="/profile">
                    <Flex
                      p={4}
                      _hover={{
                        bg: '#192424',
                      }}
                      alignItems="center"
                    >
                      <Avatar
                        my={-2}
                        size={'lg'}
                        src={userProfile?.avatar || ''}
                      />
                      <Flex ml={4} flexDirection="column">
                        <Text fontSize="sm">
                          @{userProfile?.username || ''}
                        </Text>
                        <Text fontSize="xs" color={'#a6a6a6'}>
                          {user.email}
                        </Text>
                      </Flex>
                    </Flex>
                  </Nav>
                </Box>
                <Nav to="/profile">
                  <MenuItem
                    fontSize="sm"
                    bg="#233433"
                    _hover={{
                      bg: '#192424',
                    }}
                  >
                    Profile
                  </MenuItem>
                </Nav>
                <Nav to="/settings">
                  <MenuItem
                    fontSize="sm"
                    bg="#233433"
                    _hover={{
                      bg: '#192424',
                    }}
                  >
                    Settings
                  </MenuItem>
                </Nav>
                <MenuDivider />
                <MenuItem
                  fontSize="sm"
                  onClick={handleLogout}
                  bg="#233433"
                  _hover={{
                    bg: '#192424',
                  }}
                >
                  Log out
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {links.map((link) => (
                <NavLink key={link.text} to={link.to}>
                  {link.text}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};
