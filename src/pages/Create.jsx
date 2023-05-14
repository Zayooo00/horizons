import React, { useState } from 'react';
import {
  Box,
  Textarea,
  Button,
  Spinner,
  Image,
  Flex,
  Text,
  IconButton,
  SimpleGrid,
} from '@chakra-ui/react';
import { DownloadIcon, ExternalLinkIcon } from '@chakra-ui/icons';

import Headbar from '../components/Headbar';
import LoadingBar from '../components/Create/LoadingBar';
import ShareModal from '../components/Create/ShareModal';

export default function ImageGenerationForm() {
  const [inputValue, setInputValue] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  const handleSubmit = async (event, form) => {
    const input = form.elements.input.value;
    const timestamp = Date.now();
    event.preventDefault();
    setIsImageLoading(true);

    try {
      const responses = await Promise.all(
        Array(4)
          .fill()
          .map(() =>
            fetch(process.env.REACT_APP_HUGGINGFACE_API_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_HUGGINGFACE_API_TOKEN}`,
              },
              body: JSON.stringify({ inputs: input, timestamp }),
            })
          )
      );

      if (responses.some((response) => !response.ok)) {
        throw new Error('Failed to generate the images :(');
      }

      const blobs = await Promise.all(
        responses.map((response) => response.blob())
      );
      setImages(blobs.map((blob) => URL.createObjectURL(blob)));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsImageLoading(false);
    }
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleShareModalClose = () => {
    setIsShareModalOpen(false);
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
            placeholder="Magnificent cat in a witch hat on the moon..."
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
          <ShareModal
            isOpen={isShareModalOpen}
            onClose={handleShareModalClose}
            image={images[0]}
            prompt={inputValue}
          />
        </Flex>
        {error && (
          <Flex justifyContent="center" mt={4} mx={4}>
            <Text color={'red.600'}>{error}</Text>
          </Flex>
        )}
        {isImageLoading && <LoadingBar />}
        {!isImageLoading && images.length > 0 && (
          <SimpleGrid
            columns={{ base: 2, md: 4 }}
            spacing={4}
            justifyContent="center"
            mt={8}
            mx={{ base: 4, sm: 4, md: 4, lg: 4, xl: 60 }}
          >
            {images.map((image) => (
              <Box position="relative" key={image.id}>
                <Box
                  transition="transform 0.2s ease-in-out"
                  _hover={{
                    transform: 'scale(0.9)',
                  }}
                >
                  <Image src={image} alt="Generated image" maxW={'400px'} />
                  <IconButton
                    size="md"
                    bg="white"
                    color="black"
                    position="absolute"
                    top={2}
                    right={2}
                    aria-label="Download image"
                    icon={<DownloadIcon />}
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = image;
                      link.download = inputValue;
                      link.click();
                    }}
                  />
                  <IconButton
                    size="md"
                    bg="white"
                    color="black"
                    position="absolute"
                    top={2}
                    right={14}
                    aria-label="Share image"
                    icon={<ExternalLinkIcon />}
                    onClick={handleShare}
                  />
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </>
  );
}
