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
  Image,
  Box,
  Spinner,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaPenFancy } from 'react-icons/fa';
import { RiLogoutBoxRLine } from 'react-icons/ri';

import { getUserById } from '../../services/profiles-service';
import { getUserPosts } from '../../services/posts-service';
import { UserAuth, getUserFromLocalStorage } from '../../context/AuthContext';
import Headbar from '../Headbar';
import InfoCard from '../InfoCard';
import Card from './ProfileCards/Card';
import CardBody from './ProfileCards/CardBody';
import CardHeader from './ProfileCards/CardHeader';
import StatsDisplay from './StatsDisplay';

export default function ProfilePanel() {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const headerColor = useColorModeValue('gray.700', 'white');
  const textColor = useColorModeValue('white', 'white');
  const { user, logout } = UserAuth();
  const [showDetailsId, setShowDetailsId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const [userProfile, setUserProfile] = useState({
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
      const userData = await getUserById(currentUserId);
      if (userData) {
        setUserProfile(userData);
      }
      const postsData = await getUserPosts(currentUserId);
      setUserPosts(postsData);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <Headbar />
      <Center mx={4}>
        <Flex direction="column" width="160vh" pt="120px">
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
                size="xl"
                borderRadius="15px"
                bg={userProfile?.avatar ? 'transparent' : 'teal.200'}
                src={userProfile.avatar}
                name={user.email}
              />
              <Flex
                direction="column"
                maxWidth="100%"
                mt={{ base: '8px', sm: '8px' }}
              >
                <Text
                  fontSize={{ base: 'lg', sm: 'lg', lg: 'xl' }}
                  color="white"
                  fontWeight="bold"
                  ms={{ base: '8px', sm: '8px', md: '0px' }}
                >
                  {userProfile.firstName} {userProfile.lastName}
                </Text>
                <Text
                  mt={{ base: '0px', sm: '0px', md: '0px', lg: '0px' }}
                  fontSize={{ base: 'sm', sm: 'sm', md: 'md' }}
                  color="whiteAlpha.900"
                  fontWeight="semibold"
                >
                  {userProfile?.username ? `@${userProfile.username}` : ''}
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
              <CardHeader p="12px 5px">
                <Text fontSize="lg" color={textColor} fontWeight="bold">
                  Profile Information
                </Text>
              </CardHeader>
              <CardBody px="5px">
                <Flex direction="column">
                  <Flex align="center" mb="18px">
                    <Text fontSize="md" color="gray.400" fontWeight="400">
                      {userProfile.description}
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
              <CardBody px={2}>
                {isLoading ? (
                  <Center h="10dvh">
                    <Spinner
                      thickness="3px"
                      speed="0.65s"
                      emptyColor="gray.700"
                      color="teal.500"
                      size="lg"
                    />
                  </Center>
                ) : userPosts.length === 0 ? (
                  <Flex
                    align="center"
                    justify="center"
                    my={4}
                    mx={{ base: 4, lg: 0 }}
                  >
                    <InfoCard text="You haven't created any posts yet. Move to create and share one!" />
                  </Flex>
                ) : (
                  <Grid
                    templateColumns={{
                      base: 'repeat(2, 1fr)',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                      lg: 'repeat(4, 1fr)',
                    }}
                    gap={6}
                  >
                    {userPosts.map((post) => (
                      <Link key={post.postId} to={`/post/${post.postId}`}>
                        <Box
                          position="relative"
                          onMouseEnter={() => setShowDetailsId(post.postId)}
                          onMouseLeave={() => setShowDetailsId(null)}
                        >
                          <Image h={322} objectFit="cover" src={post.image} />
                          {showDetailsId === post.postId && (
                            <Box
                              position="absolute"
                              top={0}
                              left={0}
                              right={0}
                              bottom={0}
                              bg="rgba(0, 0, 0, 0.5)"
                              color="white"
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <StatsDisplay
                                likeCount={post.likeCount || 0}
                                commentCount={post.commentCount || 0}
                              />
                            </Box>
                          )}
                        </Box>
                      </Link>
                    ))}
                  </Grid>
                )}
              </CardBody>
            </Card>
          </Grid>
        </Flex>
      </Center>
    </>
  );
}
