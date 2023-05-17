import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Image,
  Text,
  Center,
  Flex,
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

import { getPostById, deletePost } from '../../services/posts-service';
import { getUserById } from '../../services/profiles-service';
import { getUserFromLocalStorage } from '../../context/AuthContext';
import HorizonsSpinner from '../HorizonsSpinner';

export default function PostDetails() {
  const [post, setPost] = useState('');
  const [authorProfile, setAuthorProfile] = useState('');
  const currentUserId = getUserFromLocalStorage();
  const toast = useToast();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeletePost = async () => {
    await deletePost(post.postId);
    toast({
      title: 'Post deleted',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    navigate(-1);
  };
  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPostById(id);
      setPost(post);
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchAuthorProfile = async () => {
      const profile = await getUserById(post.author);
      setAuthorProfile(profile);
    };

    if (post) {
      fetchAuthorProfile();
    }
  }, [post]);

  if (!post) {
    return <HorizonsSpinner />;
  }

  return (
    <Box mt={{ base: 20, md: 24 }} mb={4} mx={4}>
      <Center>
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          bg="#313536"
          rounded={'2rem'}
          shadow="xl"
          maxW={1260}
        >
          <Box p={6} maxW={600}>
            <Image rounded={'1rem'} src={post.image} alt={post.title} />
          </Box>
          <Box p={{ base: 8, md: 6 }} mt={{ base: -8, md: 8 }} mr={4}>
            <Box
              fontWeight="semibold"
              fontSize={{ base: 'lg', md: '3xl' }}
              lineHeight="tight"
              letterSpacing="wide"
              color="teal.600"
              mb={1}
            >
              {post.title}
            </Box>
            <Box>{post.description}</Box>
            <Box mt={6}>
              <Flex alignItems="center" justifyContent="space-between">
                <Flex alignItems="center" flexGrow={1}>
                  <Avatar
                    my={-2}
                    size={'lg'}
                    src={authorProfile?.avatar || ''}
                  />
                  <Box ml={4}>
                    <Text fontWeight={'bold'}>
                      {authorProfile?.firstName + ' ' + authorProfile?.lastName}
                    </Text>
                    <Text fontSize="sm" letterSpacing="wide">
                      @{authorProfile?.username}
                    </Text>
                  </Box>
                </Flex>
                {currentUserId === post.author && (
                  <Menu isLazy>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<FiMoreVertical />}
                      bg="transparent"
                      _hover={{
                        bg: 'transparent',
                      }}
                      size="lg"
                    />
                    <MenuList bg={'#1c1e1f'}>
                      <MenuItem
                        color={'red'}
                        bg={'#1c1e1f'}
                        onClick={handleDeletePost}
                        _hover={{
                          bg: '#313537',
                        }}
                      >
                        <Box
                          color={'red'}
                          boxSize={5}
                          as={AiOutlineDelete}
                          mb={0.5}
                          mr={2}
                        />
                        Delete
                      </MenuItem>
                      <MenuItem
                        mb={2}
                        bg={'#1c1e1f'}
                        _hover={{
                          bg: '#313537',
                        }}
                      >
                        <Box boxSize={5} as={AiOutlineEdit} mr={2} />
                        Edit
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        mt={2}
                        bg={'#1c1e1f'}
                        _hover={{
                          bg: '#313537',
                        }}
                      >
                        Cancel
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )}
              </Flex>
            </Box>
            <Divider mt={6} />
            <Box
              w="75vw"
              maxW={{ base: 400, md: 280 }}
              d="flex"
              mt={4}
              alignItems="center"
            >
              <Text mb={2} fontSize={'sm'}>
                Prompt used to generate the image
              </Text>
              <Text maxW={400} fontSize={'xs'}>
                {post.prompt}
              </Text>
            </Box>
          </Box>
        </Flex>
      </Center>
    </Box>
  );
}
