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
import PropTypes from 'prop-types';

import { updatePost } from '../../services/posts-service';
import Validator from '../../helpers/Validator';
import { capitalizeFirstLetterAndLowercaseRest } from '../../helpers/Normalizer';

export default function EditModal({
  isOpen,
  onClose,
  post: initialPost,
  onUpdate,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validator = Validator.getInstance();
  const [isValid, setIsValid] = useState(false);
  const toast = useToast();
  const [post, setPost] = useState({
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (initialPost) {
      setPost({
        title: initialPost.title,
        description: initialPost.description,
      });
    }
  }, [initialPost]);

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

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await updatePost({ ...initialPost, ...post }, initialPost.postId);
      onUpdate({ ...initialPost, ...post });
      onClose();
      toast({
        title: 'Post updated',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }

    setIsSubmitting(false);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={2} mx={2} rounded={'1rem'} top={'10%'} bg={'#1c1e1f'}>
        <ModalHeader>Edit your post</ModalHeader>
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
                border="1px solid grey"
                isInvalid={errors.description}
                value={post.description}
                onChange={(event) => handleDescriptionChange(event)}
                onKeyPress={(event) => {
                  if (event.key === 'Enter' && post.title.trim() !== '') {
                    handleSubmit(event);
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
                bg: '#1a2e2e',
              }}
            >
              Confirm
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

EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
