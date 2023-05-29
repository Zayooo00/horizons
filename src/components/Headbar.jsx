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
  Collapse,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { Link as Nav } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

import { UserAuth } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
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

function Overlay({ isOpen, onClose }) {
  return isOpen ? (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100%"
      h="100%"
      onClick={onClose}
    />
  ) : null;
}

export default function Headbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout, user } = UserAuth();
  const { userProfile: contextUserProfile } = useContext(UserContext);
  const [stateUserProfile, setStateUserProfile] = useState(null);

  useEffect(() => {
    getUserById(user.uid).then((data) => {
      setStateUserProfile(data);
    });
  }, [user.uid]);

  const handleLogout = async () => {
    await logout();
  };

  const userProfile = stateUserProfile || contextUserProfile;

  return (
    <>
      <Overlay isOpen={isOpen} onClose={onClose} />
      <Box bg="#294747" px={4} position="fixed" top="0" w="100%" zIndex="1">
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
                  bg={userProfile?.avatar ? 'transparent' : 'teal.500'}
                  size={'sm'}
                  src={userProfile?.avatar || ''}
                  name={user.email}
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
                        bg={userProfile?.avatar ? 'transparent' : 'teal.500'}
                        src={userProfile?.avatar || ''}
                        name={user.email}
                      />
                      <Flex ml={4} flexDirection="column" w="160px">
                        <Text fontSize="sm">
                          {userProfile?.username
                            ? `@${userProfile.username}`
                            : ''}
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
        <Collapse in={isOpen}>
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {links.map((link) => (
                <NavLink key={link.text} to={link.to}>
                  {link.text}
                </NavLink>
              ))}
            </Stack>
          </Box>
        </Collapse>
      </Box>
    </>
  );
}

NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

Overlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
