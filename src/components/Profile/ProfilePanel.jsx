import {
  Avatar,
  Button,
  Flex,
  Grid,
  Icon,
  Text,
  Center,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaPenFancy } from 'react-icons/fa';
import { RiLogoutBoxRLine } from 'react-icons/ri';

import { fetchUserProfile } from '../../services/profiles-service';
import { UserAuth, getUserFromLocalStorage } from '../../context/AuthContext';
import Headbar from '../Headbar';
import Card from './ProfileCards/Card';
import CardBody from './ProfileCards/CardBody';
import CardHeader from './ProfileCards/CardHeader';

export default function ProfilePanel() {
  const { colorMode } = useColorMode();
  const { logout } = UserAuth();
  const navigate = useNavigate();
  const headerColor = useColorModeValue('gray.700', 'white');
  const textColor = useColorModeValue('white', 'white');
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    location: '',
  });

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  useEffect(() => {
    const currentUserId = getUserFromLocalStorage();

    async function fetchData() {
      const userData = await fetchUserProfile(currentUserId);
      if (userData) {
        setProfileData(userData);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Headbar />
      <Center mx={4}>
        <Flex direction="column" width="160vh" minH="100vh" pt="120px">
          <Flex
            direction={{ base: 'column', sm: 'column', md: 'row' }}
            mb="24px"
            maxH="330px"
            justifyContent={{
              base: 'center',
              sm: 'center',
              md: 'space-between',
            }}
            align="center"
            backdropFilter="blur(21px)"
            boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
            bg="#4f8f8f"
            p="24px"
            borderRadius="20px"
          >
            <Flex
              align="center"
              mb={{ base: '10px', sm: '10px', md: '0px' }}
              direction={{ base: 'column', sm: 'column', md: 'row' }}
              w={{ base: '100%', sm: '100%' }}
              textAlign={{ base: 'center', sm: 'center', md: 'start' }}
            >
              <Avatar
                me={{ md: '22px' }}
                w="80px"
                h="80px"
                borderRadius="15px"
                bg="transparent"
                src={profileData.avatar}
              />
              <Flex direction="column" maxWidth="100%" my={{ sm: '14px' }}>
                <Text
                  fontSize={{ base: 'lg', sm: 'lg', lg: 'xl' }}
                  color="white"
                  fontWeight="bold"
                  ms={{ base: '8px', sm: '8px', md: '0px' }}
                >
                  {profileData.firstName} {profileData.lastName}
                </Text>
                <Text
                  mt={{ base: '10px', sm: '0px', md: '0px', lg: '0px' }}
                  fontSize={{ base: 'sm', sm: 'sm', md: 'md' }}
                  color="whiteAlpha.900"
                  fontWeight="semibold"
                >
                  @{profileData.username}
                </Text>
              </Flex>
            </Flex>
            <Flex
              direction={{ base: 'column', sm: 'column', lg: 'row' }}
              w={{ base: '100%', sm: '100%', md: '50%', lg: 'auto' }}
            >
              <Link to="/settings">
                <Button
                  w={{ base: '100%', sm: '100%', lg: '135px' }}
                  p="5px"
                  bg="transparent"
                  variant="no-effects"
                >
                  <Flex
                    align="center"
                    w={{ base: '100%', sm: '100%', lg: '135px' }}
                    bg={colorMode === 'dark' ? 'navy.900' : '#fff'}
                    borderRadius="8px"
                    justifyContent="center"
                    py="10px"
                    transition="transform 0.2s ease-in-out"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                  >
                    <Icon color={headerColor} as={FaPenFancy} me="6px" />
                    <Text fontSize="xs" color={headerColor} fontWeight="bold">
                      EDIT PROFILE
                    </Text>
                  </Flex>
                </Button>
              </Link>
              <Button p="5px" bg="transparent" variant="no-effects">
                <Flex
                  align="center"
                  w={{ base: '100%', sm: '100%', lg: '135px' }}
                  bg={colorMode === 'dark' ? 'navy.900' : '#fff'}
                  borderRadius="8px"
                  justifyContent="center"
                  py="10px"
                  transition="transform 0.2s ease-in-out"
                  _hover={{
                    transform: 'scale(1.05)',
                  }}
                  onClick={handleLogout}
                >
                  <Icon color={headerColor} as={RiLogoutBoxRLine} me="6px" />
                  <Text fontSize="xs" color={headerColor} fontWeight="bold">
                    LOGOUT
                  </Text>
                </Flex>
              </Button>
            </Flex>
          </Flex>
          <Grid
            templateColumns={{ sm: '1fr', xl: 'repeat(1, 1fr)' }}
            gap="22px"
          >
            <Card p="16px" bg="#2a2f38" rounded="2rem" mb="24px">
              <CardHeader p="12px 5px" mb="12px">
                <Text fontSize="lg" color={textColor} fontWeight="bold">
                  Profile Information
                </Text>
              </CardHeader>
              <CardBody px="5px">
                <Flex direction="column">
                  <Flex align="center" mb="18px">
                    <Text fontSize="md" color={textColor} me="10px">
                      First name:{' '}
                    </Text>
                    <Text fontSize="md" color="gray.400" fontWeight="400">
                      {profileData.firstName}
                    </Text>
                  </Flex>
                  <Flex align="center" mb="18px">
                    <Text fontSize="md" color={textColor} me="10px">
                      Last name:{' '}
                    </Text>
                    <Text fontSize="md" color="gray.400" fontWeight="400">
                      {profileData.lastName}
                    </Text>
                  </Flex>
                  <Flex align="center" mb="18px">
                    <Text fontSize="md" color={textColor} me="10px">
                      Username:{' '}
                    </Text>
                    <Text fontSize="md" color="gray.400" fontWeight="400">
                      {profileData.username}
                    </Text>
                  </Flex>
                  <Flex align="center" mb="18px">
                    <Text fontSize="md" color={textColor} me="10px">
                      Description:{' '}
                    </Text>
                    <Text fontSize="md" color="gray.400" fontWeight="400">
                      {profileData.description}
                    </Text>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </Grid>
          <Grid
            templateColumns={{ sm: '1fr', xl: 'repeat(1, 1fr)' }}
            gap="22px"
          >
            <Card p="16px" bg="#2a2f38" rounded="2rem" my="20px">
              <CardHeader p="12px 5px" mb="12px">
                <Text fontSize="lg" color={textColor} fontWeight="bold">
                  Gallery
                </Text>
              </CardHeader>
              <CardBody px="5px">
                <Flex direction="column"></Flex>
              </CardBody>
            </Card>
          </Grid>
        </Flex>
      </Center>
    </>
  );
}
