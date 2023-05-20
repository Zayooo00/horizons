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
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { FiMoreVertical, FiSend } from 'react-icons/fi';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import PropTypes from 'prop-types';

import { getPostById, deletePost } from '../../services/posts-service';
import { getUserById } from '../../services/profiles-service';
import { getUserFromLocalStorage } from '../../context/AuthContext';
import HorizonsSpinner from '../HorizonsSpinner';
import TimeSinceComment from './TimeSinceComment';
import { fetchPostComments, addComment } from '../../services/comments-service';

export default function PostDetails({ onEdit, post: updatedPost }) {
  const [post, setPost] = useState('');
  const [users, setUsers] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [authorProfile, setAuthorProfile] = useState('');
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const currentUserId = getUserFromLocalStorage();
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

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
    if (updatedPost) {
      setPost(updatedPost);
    }
  }, [updatedPost]);

  useEffect(() => {
    const fetchAuthorProfile = async () => {
      const profile = await getUserById(post.author);
      setAuthorProfile(profile);
    };

    if (post) {
      fetchAuthorProfile();
    }
  }, [post]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUserData = await getUserById(currentUserId);
      setCurrentUser(currentUserData);
    };

    fetchCurrentUser();
  }, [currentUserId]);

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await fetchPostComments(id);
      setComments(comments);

      const users = {};
      for (const comment of comments) {
        const userData = await getUserById(comment.author);
        users[comment.author] = userData;
      }
      setUsers(users);
    };

    if (id) {
      fetchComments();
    }
  }, [id]);

  const handleAddComment = async () => {
    await addComment(id, currentUserId, newCommentText);
    setNewCommentText('');
    const comments = await fetchPostComments(id);
    setComments(comments);
  };

  if (!post) {
    return <HorizonsSpinner />;
  }

  return (
    <Box mt={{ base: 20, lg: 24 }} mb={4} mx={4}>
      <Center>
        <Flex
          flexDirection={{ base: 'column', lg: 'row' }}
          bg="#313536"
          rounded={'2rem'}
          shadow="xl"
          maxW={1260}
        >
          <Box pr={6} maxW={600}>
            <Image
              objectFit="cover"
              maxH={700}
              rounded={'1rem'}
              src={post.image}
              alt={post.title}
            />
          </Box>
          <Box p={{ base: 8, lg: 6 }} mt={{ base: -8, lg: 2 }} mr={4}>
            <Box
              fontWeight="semibold"
              fontSize={{ base: '2xl', lg: '3xl' }}
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
                      _active={{
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
                        onClick={() => onEdit(post)}
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
              maxW={{ base: 400, lg: 280 }}
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
            <Box mt={{ base: 8, lg: 14 }}>
              <Text fontSize="lg" fontWeight="bold">
                {comments.length === 0
                  ? 'Comments'
                  : comments.length === 1
                  ? '1 comment'
                  : comments.length + ' comments'}
              </Text>
              <Box mt={2} maxH="235px" overflowY="auto">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <Flex key={comment.timestamp} mt={4}>
                      <Avatar src={users[comment.author]?.avatar || ''} />
                      <Box mt={1} ml={2}>
                        <Flex
                          flexDirection="row"
                          wrap="wrap"
                          alignItems="center"
                        >
                          <Text fontWeight="bold">
                            @{users[comment.author]?.username}&nbsp;
                          </Text>
                          <Text mr={4}>{comment.text}</Text>
                        </Flex>
                        <TimeSinceComment timestamp={comment.timestamp} />
                      </Box>
                    </Flex>
                  ))
                ) : (
                  <Text mt={4}>No comments yet. Be the first to add one!</Text>
                )}
              </Box>
              <Divider mt={8} />
              <Flex mt={8} alignItems="flex-end">
                <Avatar src={currentUser?.avatar || ''} />
                <InputGroup ml={4} size="sm" rounded="full" alignSelf="center">
                  <Input
                    size="md"
                    rounded="full"
                    alignSelf="center"
                    placeholder="Add a comment..."
                    _placeholder={{ color: 'gray', fontSize: 14 }}
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && newCommentText.trim() !== '') {
                        handleAddComment();
                      }
                    }}
                  />
                  {newCommentText && (
                    <InputRightElement mt={1} mr={1}>
                      <IconButton
                        rounded="full"
                        aria-label="Add comment"
                        icon={<FiSend />}
                        bg="transparent"
                        _hover={{
                          bg: 'teal.500',
                        }}
                        onClick={() => handleAddComment()}
                      />
                    </InputRightElement>
                  )}
                </InputGroup>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Center>
    </Box>
  );
}

PostDetails.propTypes = {
  onEdit: PropTypes.func.isRequired,
  post: PropTypes.object,
};
