import { useState, useEffect } from 'react';
import {
  Box,
  Textarea,
  Button,
  Image,
  Flex,
  Text,
  IconButton,
  SimpleGrid,
  Spinner,
  useBreakpointValue,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { BiShareAlt } from 'react-icons/bi';

import Headbar from '../components/Headbar';
import LoadingBar from '../components/Create/LoadingBar';
import ShareModal from '../components/Create/ShareModal';

export default function ImageGenerationForm() {
  const iconButtonSize = useBreakpointValue({ base: 'sm', md: 'sm', lg: 'md' });
  const [countdownValue, setCountdownValue] = useState(90);
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  const ERROR_MODEL_LOADING =
    'Model prompthero/openjourney is currently loading';

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdownValue((prevValue) => prevValue - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (event, form) => {
    const input = form.elements.input.value;
    const timestamp = Date.now();
    event.preventDefault();
    setIsImageLoading(true);
    setError(null);

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
        const response = responses.find((response) => !response.ok);
        const errorData = await response.json();
        new Error(errorData.error);
      }

      const blobs = await Promise.all(
        responses.map((response) => response.blob())
      );
      setImages(blobs.map((blob) => URL.createObjectURL(blob)));
      setError(null);
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
            isLoading={isImageLoading}
            spinner={<Spinner speed="1s" size="md" />}
            fontSize="sm"
            fontWeight={200}
            h={'38px'}
            ml={{ base: 0, md: 2 }}
            w={{ base: 'full', md: 'auto' }}
            type="submit"
            bg={'#294747'}
            _hover={{
              bg: '#3b5655',
            }}
          >
            Generate
          </Button>
        </Flex>
        {error && (
          <Flex justifyContent="center" mt={4} mx={4}>
            <Text color={'red.600'}>
              {error === ERROR_MODEL_LOADING
                ? countdownValue > 0
                  ? `Model is currently loading, estimated time: ${countdownValue}s`
                  : 'Please wait...'
                : error}
            </Text>
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
            {images.map((image, index) => (
              <Box position="relative" key={index}>
                <Box
                  transition="transform 0.2s ease-in-out"
                  _hover={{
                    transform: 'scale(0.9)',
                  }}
                >
                  <Image src={image} alt="Generated image" maxW={'400px'} />
                  <IconButton
                    size={iconButtonSize}
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
                    size={iconButtonSize}
                    bg="white"
                    color="black"
                    position="absolute"
                    top={2}
                    right={{ base: 12, sm: 12, md: 12, lg: 14 }}
                    aria-label="Share image"
                    icon={<BiShareAlt />}
                    onClick={() => {
                      setSelectedImage(image);
                      handleShare();
                    }}
                  />
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={handleShareModalClose}
        image={selectedImage}
        prompt={inputValue}
      />
    </>
  );
}
