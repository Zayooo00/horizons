import { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import PropTypes from 'prop-types';

import { getUserFromLocalStorage } from '../../context/AuthContext';
import { createPost } from '../../services/posts-service';

export default function ShareModal({ isOpen, onClose, image, prompt }) {
  console.log('ShareModal image prop:', image);
  const currentUserId = getUserFromLocalStorage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: '',
    author: currentUserId,
    description: '',
    image: image,
    prompt: prompt,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const storage = getStorage();
    const response = await fetch(image);
    const imageData = await response.blob();
    const storageRef = ref(storage, `images/${post.title}`);

    await uploadBytes(storageRef, imageData);

    const downloadURL = await getDownloadURL(storageRef);

    setPost((prevPost) => ({
      ...prevPost,
      image: downloadURL,
    }));
    createPost({ ...post, image: downloadURL, prompt: prompt }, currentUserId);
    setIsSubmitting(false);
    onClose();
    setPost({
      title: '',
      author: currentUserId,
      description: '',
      image: image,
      prompt: prompt,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={2} mx={2} rounded={'1rem'} top={'10%'} bg={'#1c1e1f'}>
        <ModalHeader>Share your amazing image!</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                name="title"
                value={post.title}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="description" mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={post.description}
                onChange={handleChange}
                onKeyPress={(event) => {
                  if (event.key === 'Enter' && post.title.trim() !== '') {
                    handleSubmit(event, event.currentTarget.form);
                  }
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={isSubmitting}
              isDisabled={!post.title}
              w={'50%'}
              type="submit"
              mr={3}
              color="white"
              bg="#294747"
              size="md"
              _hover={{
                bg: '#1a2e2e',
              }}
            >
              Share
            </Button>
            <Button
              w={'50%'}
              onClick={onClose}
              color="black"
              bg="grey"
              size="md"
              _hover={{
                bg: '#323638',
                color: 'white',
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

ShareModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
};
