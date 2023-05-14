import React, { useState } from 'react';
import {
  Box,
  Textarea,
  Button,
  Spinner,
  Image,
  Flex,
  Text,
} from '@chakra-ui/react';

import Headbar from '../components/Headbar';

export default function ImageGenerationForm() {
  const [inputValue, setInputValue] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event, form) => {
    const input = form.elements.input.value;
    const timestamp = Date.now();
    event.preventDefault();
    setIsImageLoading(true);

    try {
      const response = await fetch(process.env.REACT_APP_HUGGINGFACE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_HUGGINGFACE_API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input, timestamp }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate the image :(');
      }

      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsImageLoading(false);
    }
  };

  return (
    <>
      <Headbar />
      <Box
        mt={20}
        as="form"
        onSubmit={(event) => handleSubmit(event, event.currentTarget)}
      >
        <Flex mx={4} direction={{ base: 'column', md: 'row' }}>
          <Textarea
            name="input"
            color="white"
            _placeholder={{ color: 'gray' }}
            placeholder="Magnificent cat in a witch cat on the moon..."
            mb={{ base: 2, md: 0 }}
            minHeight={{ base: '100px', md: 'auto' }}
            maxHeight={{ base: '100px', md: '600px' }}
            overflow={{ base: 'auto', md: 'hidden' }}
            resize="none"
            rows={1}
            onChange={(event) => setInputValue(event.target.value)}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            onKeyPress={(event) => {
              if (event.key === 'Enter' && inputValue.trim() !== '') {
                handleSubmit(event, event.currentTarget.form);
              }
            }}
          />
          <Button
            isDisabled={!inputValue || !inputValue.trim()}
            fontSize="sm"
            fontWeight={200}
            h={'38px'}
            mt={'00.5px'}
            ml={{ base: 0, md: 2 }}
            w={{ base: 'full', md: 'auto' }}
            type="submit"
            bg={'#294747'}
            _hover={{
              bg: '#3b5655',
            }}
          >
            {isImageLoading ? <Spinner speed="0.9s" /> : 'Generate'}
          </Button>
        </Flex>
        {error && (
          <Flex justifyContent="center" mt={4} mx={4}>
            <Text color={'red.600'}>{error}</Text>
          </Flex>
        )}
        {!isImageLoading && image && (
          <Flex justifyContent="center" mt={4} mx={4}>
            <Image src={image} alt="Generated image" maxW={'400px'} />
          </Flex>
        )}
      </Box>
    </>
  );
}
