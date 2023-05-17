import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Image,
  Text,
  Center,
  Flex,
  Avatar,
  Divider,
} from '@chakra-ui/react';

import { getPostById } from '../../services/posts-service';
import { getUserById } from '../../services/profiles-service';

export default function PostDetails() {
  const [post, setPost] = useState(null);
  const [authorProfile, setAuthorProfile] = useState('');
  const { id } = useParams();

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
    return <p>Loading...</p>;
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
              <Flex alignItems="center">
                <Avatar my={-2} size={'lg'} src={authorProfile?.avatar || ''} />
                <Box ml={4}>
                  <Text fontWeight={'bold'}>
                    {authorProfile?.firstName + ' ' + authorProfile?.lastName}
                  </Text>
                  <Text fontSize="sm" letterSpacing="wide">
                    @{authorProfile?.username}
                  </Text>
                </Box>
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
