import React, { useState, useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Button,
  Stack,
  IconButton,
  Image,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { uploadUserInfo } from '../../services/profiles-service';
import { getUserFromLocalStorage } from '../../context/AuthContext';

export default function OnboardingModal() {
  const currentUserId = getUserFromLocalStorage();
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const fileInputRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let downloadURL;

    if (avatar) {
      const storage = getStorage();
      const storageRef = ref(storage, `avatars/${currentUserId}`);
      const response = await fetch(avatar);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob);
      downloadURL = await getDownloadURL(storageRef);
    }
    uploadUserInfo(username, description, downloadURL, currentUserId);
    setIsOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);
      console.log(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent p={2} mx={2} rounded={'1rem'} top={'20%'} bg={'#1c1e1f'}>
        <ModalHeader>Welcome to Horizons!</ModalHeader>
        <ModalBody>
          <Text mt={-2} mb={4}>
            Fill up the additional info and let&apos;s get you started.
          </Text>
          <FormControl isRequired id="avatar">
            <FormLabel>Avatar</FormLabel>
            <Input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              ref={fileInputRef}
              hidden
            />
            {avatar ? (
              <Image src={avatar} boxSize="50px" borderRadius="full" />
            ) : (
              <IconButton
                icon={<AddIcon />}
                isRound
                size="lg"
                bg="transparent"
                border="1px solid white"
                onClick={() => {
                  fileInputRef.current.click();
                }}
              />
            )}
          </FormControl>
          <FormControl isRequired id="username">
            <FormLabel mt={2}>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormControl>
          <FormControl isRequired id="description">
            <FormLabel mt={2}>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              _placeholder={{ color: 'gray' }}
              borderColor="gray"
              placeholder="Say something about youself."
              size="sm"
            />
          </FormControl>
          <Stack spacing={10} mt={3}>
            <Button
              onClick={handleSubmit}
              color="black"
              size="md"
              _hover={{
                bg: 'yellow.500',
              }}
            >
              Submit
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
