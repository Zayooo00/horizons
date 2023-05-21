/* eslint-disable react/prop-types */
import { Text, Icon, Flex } from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

export default function LikesAndCommentsDisplay({ likeCount, commentCount }) {
  return (
    <Flex fontSize="lg" gap={8}>
      <Flex>
        <Icon mt="4px" mr="3px" as={AiFillHeart} />
        <Text> {likeCount}</Text>
      </Flex>
      <Flex>
        <Icon mt="4px" mr="4.5px" as={FaComment} />
        <Text> {commentCount}</Text>
      </Flex>
    </Flex>
  );
}
