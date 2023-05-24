import { useState, useEffect } from 'react';
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
  FormErrorMessage,
  FormErrorIcon,
  useToast,
} from '@chakra-ui/react';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import HorizonsToast from '../HorizonsToast';
import { getUserFromLocalStorage } from '../../context/AuthContext';
import { createPost } from '../../services/posts-service';
import Validator from '../../helpers/Validator';
import { capitalizeFirstLetterAndLowercaseRest } from '../../helpers/Normalizer';

export default function ShareModal({ isOpen, onClose, image, prompt }) {
  const currentUserId = getUserFromLocalStorage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validator = Validator.getInstance();
  const [isValid, setIsValid] = useState(false);
  const toast = useToast();
  const [post, setPost] = useState({
    title: '',
    author: currentUserId,
    postId: uuidv4(),
    description: '',
    image: image,
    prompt: prompt,
  });
  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    const isFormValid = () => {
      return (
        post.title &&
        (!post.description || !errors.description) &&
        !errors.title
      );
    };
    setIsValid(isFormValid());
  }, [post.title, post.description, errors]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const storage = getStorage();
    const response = await fetch(image);
    const imageData = await response.blob();
    const storageRef = ref(storage, `images/${post.postId}`);

    await uploadBytes(storageRef, imageData);

    const downloadURL = await getDownloadURL(storageRef);

    setPost((prevPost) => ({
      ...prevPost,
      image: downloadURL,
    }));
    createPost({ ...post, image: downloadURL, prompt: prompt }, post.postId);
    setIsSubmitting(false);
    onClose();

    toast({
      render: ({ onClose }) => (
        <HorizonsToast
          title="Image has been shared successfully"
          onClose={onClose}
        />
      ),
      isClosable: true,
      duration: 2000,
    });

    setPost({
      title: '',
      author: currentUserId,
      postId: uuidv4(),
      description: '',
      image: image,
      prompt: prompt,
    });
  };

  function handleTitleChange(event) {
    const { value } = event.target;

    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: 'Title cannot only contain empty spaces',
      }));
    } else if (!validator.validateTextSpacesAndNumbersOnly(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: 'Title can only contain letters',
      }));
    } else if (!validator.validateMaxLength(value, 30)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: 'Title cannot be longer than 30 characters',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, title: '' }));
    }

    const normalizedTitle = capitalizeFirstLetterAndLowercaseRest(value);
    setPost((prevPost) => ({
      ...prevPost,
      title: normalizedTitle,
    }));
  }

  function handleDescriptionChange(event) {
    const { value } = event.target;

    if (value && value.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: 'Description section cannot contain only space characters',
      }));
    } else if (!validator.validateMaxLength(value, 255)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: 'Description section cannot be longer than 255 characters',
      }));
    } else if (value && !validator.validateNotOnlyNumbers(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description:
          'Description section cannot contain only numbers or only spaces and numbers',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, description: '' }));
    }

    setPost((prevPost) => ({
      ...prevPost,
      description: value,
    }));
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={2} mx={2} rounded={'1rem'} top={'10%'} bg={'#1c1e1f'}>
        <ModalHeader>Share your amazing image!</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl id="title" isRequired isInvalid={errors.title}>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                name="title"
                isInvalid={errors.title}
                value={post.title}
                onChange={(event) => handleTitleChange(event)}
              />
              {errors.title && (
                <FormErrorMessage>
                  <FormErrorIcon />
                  {errors.title}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="description" mt={4} isInvalid={errors.description}>
              <FormLabel>Description</FormLabel>
              <Textarea
                type="text"
                name="description"
                isInvalid={errors.description}
                value={post.description}
                onChange={(event) => handleDescriptionChange(event)}
                onKeyPress={(event) => {
                  if (event.key === 'Enter' && post.title.trim() !== '') {
                    handleSubmit(event, event.currentTarget.form);
                  }
                }}
              />
              {errors.description && (
                <FormErrorMessage>
                  <FormErrorIcon />
                  {errors.description}
                </FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isSubmitting}
              isDisabled={!isValid}
              w={'50%'}
              type="submit"
              mr={3}
              color="white"
              bg="#294747"
              size="md"
              _hover={{
                bg: '#3f6a6a',
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
  image: PropTypes.string,
  prompt: PropTypes.string.isRequired,
};
