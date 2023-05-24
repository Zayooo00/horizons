import { useState, useRef, useEffect } from 'react';
import {
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Button,
  Stack,
  Image,
  HStack,
  FormErrorMessage,
  FormErrorIcon,
  Box,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { updateUserInfo, getUserById } from '../../services/profiles-service';
import { getUserFromLocalStorage } from '../../context/AuthContext';
import Validator from '../../helpers/Validator';
import {
  capitalizeFirstLetterAndLowercaseRest,
  capitalizeFirstLetterOnly,
  convertToLowercase,
} from '../../helpers/Normalizer';

export default function SettingsForm() {
  const currentUserId = getUserFromLocalStorage();
  const [isAvatarUpdated, setIsAvatarUpdated] = useState(false);
  const validator = Validator.getInstance();
  const navigate = useNavigate();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    username: '',
    description: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    description: '',
    avatar: '',
  });
  const fileInputRef = useRef();

  useEffect(() => {
    async function fetchUserProfile() {
      const userProfile = await getUserById(currentUserId);
      setProfile(userProfile);
      setAvatar(userProfile.avatar);
    }
    fetchUserProfile();
  }, [currentUserId]);

  useEffect(() => {
    const isFormValid = () => {
      return (
        profile.firstName &&
        profile.lastName &&
        profile.username &&
        profile.description &&
        avatar &&
        !Object.values(errors).some((error) => error.length > 0)
      );
    };
    setIsValid(isFormValid());
  }, [
    profile.firstName,
    profile.lastName,
    profile.username,
    profile.description,
    avatar,
    errors,
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    let downloadURL;

    if (avatar && isAvatarUpdated) {
      const storage = getStorage();
      const storageRef = ref(storage, `avatars/${currentUserId}`);
      const response = await fetch(avatar);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob);
      downloadURL = await getDownloadURL(storageRef);
    } else {
      downloadURL = avatar;
    }

    updateUserInfo(currentUserId, { ...profile, avatar: downloadURL });
    setIsSubmitting(false);
    navigate('/profile');
    toast({
      title: 'Profile updated.',
      description: 'Your profile has been successfully updated.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  function handleFirstNameChange(event) {
    const { value } = event.target;

    if (!validator.validateTextOnly(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: 'First name can only contain letters',
      }));
    } else if (!validator.validateMaxLength(value, 30)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: 'First name cannot be longer than 30 characters',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, firstName: '' }));
    }

    const normalizedFirstName = capitalizeFirstLetterAndLowercaseRest(value);
    setProfile((prevProfile) => ({
      ...prevProfile,
      firstName: normalizedFirstName,
    }));
  }

  function handleLastNameChange(event) {
    const { value } = event.target;

    if (!validator.validateTextOnly(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: 'Last name can only contain letters',
      }));
    } else if (!validator.validateMaxLength(value, 30)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: 'Last name cannot be longer than 30 characters',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, lastName: '' }));
    }

    const normalizedLastName = capitalizeFirstLetterAndLowercaseRest(value);
    setProfile((prevProfile) => ({
      ...prevProfile,
      lastName: normalizedLastName,
    }));
  }

  async function handleUsernameChange(event) {
    const { value } = event.target;
    let newError = '';

    if (!validator.validateTextAndNumbersOnly(value)) {
      newError = 'Username can only contain letters and numbers';
    } else if (!validator.validateMaxLength(value, 15)) {
      newError = 'Username cannot be longer than 15 characters';
    } else if (value && !validator.validateNotOnlyNumbers(value)) {
      newError = 'Username cannot contain only numbers';
    }

    setErrors((prevErrors) => ({ ...prevErrors, username: newError }));

    const decapizalizedString = convertToLowercase(value);
    setProfile((prevProfile) => ({
      ...prevProfile,
      username: decapizalizedString,
    }));
  }

  async function handleAvatarChange(event) {
    const avatar = event.target.files[0];
    const reader = new FileReader();

    if (
      !validator.validateFileType(avatar, [
        'image/jpeg',
        'image/png',
        'image/gif',
      ])
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        avatar: 'Avatar must be a JPEG, PNG, or GIF image',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, avatar: '' }));

      reader.onload = (e) => {
        setAvatar(e.target.result);
        setIsAvatarUpdated(true);
      };

      reader.readAsDataURL(avatar);
    }
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

    const normalizedDescription = capitalizeFirstLetterOnly(value);
    setProfile((prevProfile) => ({
      ...prevProfile,
      description: normalizedDescription,
    }));
  }

  return (
    <>
      <Flex justifyContent="center" alignItems="center" minHeight="100dvh">
        <Box
          w={{ base: '95%', md: '80%', lg: '50%', xl: '40%' }}
          p={4}
          mx={2}
          rounded={'1rem'}
          bg={'#282c2e'}
        >
          <Heading p={4} fontSize="2xl" mt={-2} mb={4}>
            Update your profile information.
          </Heading>
          <HStack spacing={4} alignItems="flex-start">
            <FormControl
              isRequired
              w="sm"
              id="firstName"
              isInvalid={errors.firstName}
            >
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                value={profile.firstName}
                onChange={(event) => handleFirstNameChange(event)}
              />
              {errors.firstName && (
                <FormErrorMessage>
                  <FormErrorIcon />
                  {errors.firstName}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isRequired
              w="sm"
              id="lastName"
              isInvalid={errors.lastName}
            >
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                value={profile.lastName}
                onChange={(event) => handleLastNameChange(event)}
              />
              {errors.lastName && (
                <FormErrorMessage>
                  <FormErrorIcon />
                  {errors.lastName}
                </FormErrorMessage>
              )}
            </FormControl>
          </HStack>
          <HStack spacing={4} alignItems="flex-start">
            <FormControl isRequired id="username" isInvalid={errors.username}>
              <FormLabel mt={2}>Username</FormLabel>
              <Input
                type="text"
                value={profile.username}
                onChange={(event) => handleUsernameChange(event)}
              />{' '}
              {errors.username && (
                <FormErrorMessage>
                  <FormErrorIcon />
                  {errors.username}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired id="avatar" isInvalid={errors.avatar}>
              <FormLabel mt={2}>Avatar</FormLabel>
              <Input
                type="file"
                onChange={(event) => handleAvatarChange(event)}
                ref={fileInputRef}
                hidden
              />
              <HStack alignItems="center" h={10}>
                <Button
                  size="xs"
                  color={'black'}
                  onClick={() => {
                    fileInputRef.current.click();
                  }}
                >
                  {isAvatarUpdated ? 'Uploaded!' : 'Change'}
                </Button>
                {errors.avatar && (
                  <FormErrorMessage>
                    <FormErrorIcon />
                    {errors.avatar}
                  </FormErrorMessage>
                )}
                {avatar && (
                  <Image src={avatar} boxSize="50px" borderRadius="full" />
                )}
              </HStack>
            </FormControl>
          </HStack>
          <FormControl
            isRequired
            id="description"
            isInvalid={errors.description}
          >
            <FormLabel mt={2}>Description</FormLabel>
            <Textarea
              value={profile.description}
              onChange={(event) => handleDescriptionChange(event)}
              _placeholder={{ color: 'gray' }}
              borderColor="gray"
              placeholder="Say something about youself."
              size="sm"
            />
            {errors.description && (
              <FormErrorMessage>
                <FormErrorIcon />
                {errors.description}
              </FormErrorMessage>
            )}
          </FormControl>
          <Stack spacing={10} mt={3}>
            <Button
              onClick={handleSubmit}
              isLoading={isSubmitting}
              isDisabled={!isValid}
              color="white"
              bg="#294747"
              size="md"
              _hover={{
                bg: '#3f6a6a',
              }}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Flex>
    </>
  );
}
