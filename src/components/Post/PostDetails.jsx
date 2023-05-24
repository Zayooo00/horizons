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
import { ArrowBackIcon } from '@chakra-ui/icons';
import { FiMoreVertical } from 'react-icons/fi';
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSend,
  AiFillHeart,
  AiOutlineHeart,
} from 'react-icons/ai';
import PropTypes from 'prop-types';

import { getUserFromLocalStorage } from '../../context/AuthContext';
import HorizonsSpinner from '../HorizonsSpinner';
import TimeSinceComment from './TimeSinceComment';
import { fetchPostComments, addComment } from '../../services/comments-service';
import { getPostById, deletePost } from '../../services/posts-service';
import { getUserById } from '../../services/profiles-service';
import {
  addLike,
  removeLike,
  hasUserLikedPost,
  getLikeCount,
} from '../../services/likes-service';

export default function PostDetails({ onEdit, post: updatedPost }) {
  const [post, setPost] = useState('');
  const [users, setUsers] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [authorProfile, setAuthorProfile] = useState('');
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [newCommentText, setNewCommentText] = useState('');
  const currentUserId = getUserFromLocalStorage();
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleAddComment = async () => {
    await addComment(id, currentUserId, newCommentText);
    setNewCommentText('');
    const comments = await fetchPostComments(id);
    setComments(comments);

    const userData = await getUserById(currentUserId);
    setUsers((prevUsers) => ({ ...prevUsers, [currentUserId]: userData }));
  };

  const handleLikeClick = async () => {
    if (liked) {
      await removeLike(post.postId, currentUserId);
      setLiked(false);
    } else {
      await addLike(post.postId, currentUserId);
      setLiked(true);
    }

    const count = await getLikeCount([post.postId]);
    setLikeCount(count);
  };

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
    const fetchData = async () => {
      const post = await getPostById(id);
      setPost(post);

      const profile = await getUserById(post.author);
      setAuthorProfile(profile);

      const currentUserData = await getUserById(currentUserId);
      setCurrentUser(currentUserData);

      const comments = await fetchPostComments(id);
      setComments(comments);

      const users = {};
      for (const comment of comments) {
        const userData = await getUserById(comment.author);
        users[comment.author] = userData;
      }
      setUsers(users);

      const isLiked = await hasUserLikedPost(post.postId, currentUserId);
      setLiked(isLiked);

      const count = await getLikeCount([post.postId]);
      setLikeCount(count);
    };

    if (id && currentUserId) {
      fetchData();
    }
  }, [id, currentUserId]);

  useEffect(() => {
    if (updatedPost) {
      setPost(updatedPost);
    }
  }, [updatedPost]);

  if (!post) {
    return <HorizonsSpinner />;
  }

  return (
    <Box mt={{ base: 20, lg: 24 }} mb={4} mx={4}>
      <Center>
        <Box position="absolute" top={7} left={6} transform="translateY(-50%)">
          <IconButton
            pl={2}
            fontSize={{ base: 18, sm: 24 }}
            boxSize={{ base: 6, sm: 10, md: 14 }}
            rounded="full"
            onClick={handleNavigateBack}
            leftIcon={<ArrowBackIcon />}
            aria-label="Previous page"
            bgColor="#294747"
          />
        </Box>
        <Flex
          flexDirection={{ base: 'column', lg: 'row' }}
          bg="#313536"
          rounded={'2rem'}
          shadow="xl"
          maxW={1260}
        >
          <Box pr={{ base: 0, lg: 6 }} maxW={600}>
            <Image
              objectFit="cover"
              maxH={{ base: 600, lg: 725 }}
              roundedTop={{ base: '2rem', lg: '0rem' }}
              roundedTopLeft={{ base: '2rem', lg: '2rem' }}
              roundedBottomLeft={{ base: '0rem', lg: '2rem' }}
              src={post.image}
              alt={post.title}
            />
          </Box>
          <Box
            p={{ base: 4, sm: 6, md: 8, lg: 6 }}
            mr={{ base: 0, lg: 4 }}
            w={{ base: 'auto', lg: 400 }}
          >
            <Flex justifyContent="space-between" alignItems="center">
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
              <Flex
                pr="10px"
                rounded="1rem"
                alignItems="center"
                bg="whiteAlpha.300"
              >
                <IconButton
                  aria-label="Like post"
                  fontSize={{ base: 18, lg: 22 }}
                  mr={-1}
                  icon={
                    liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />
                  }
                  transition="transform 0.2s ease-in-out"
                  bg="transparent"
                  _hover={{
                    bg: 'transparent',
                    transform: 'scale(1.2)',
                  }}
                  onClick={handleLikeClick}
                />
                <Text fontSize={{ base: '14px', lg: '16px' }} fontWeight="bold">
                  {likeCount}
                </Text>
              </Flex>
            </Flex>
            <Box mt={2}>{post.description}</Box>
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
                      transition="transform 0.2s ease-in-out"
                      _hover={{
                        bg: 'transparent',
                        transform: 'scale(1.4)',
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
              <Box mt={2} maxH="280px" overflowY="auto">
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
                  <Text my={4}>No comments yet. Be the first to add one!</Text>
                )}
              </Box>
              <Divider mt={4} />
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
                        icon={<AiOutlineSend />}
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
