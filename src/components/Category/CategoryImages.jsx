import { useState, useEffect } from 'react';
import {
  Grid,
  GridItem,
  Box,
  Image,
  Stack,
  Text,
  IconButton,
  Center,
  useToast,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';

import { getCategoryByName } from '../../services/categories-service';
import HorizonsToast from '../HorizonsToast';
import HorizonsSpinner from '../HorizonsSpinner';

export default function CategoryImages() {
  const [category, setCategory] = useState(null);
  const { categoryName } = useParams();
  const [areImagesLoading, setAreImagesLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      render: ({ onClose }) => (
        <HorizonsToast title="Copied to clipboard" onClose={onClose} />
      ),
      isClosable: true,
      duration: 2000,
    });
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setAreImagesLoading(true);
    async function fetchCategory() {
      const category = await getCategoryByName(categoryName);
      setCategory(category);
      setAreImagesLoading(false);
    }
    fetchCategory();
  }, [categoryName]);

  if (!category) {
    return null;
  }

  return (
    <>
      <Box position="relative" mt={'88px'} mb={6} mx={6}>
        <Image
          objectFit="cover"
          src={category.cover}
          alt={category.cover}
          w="full"
          h={{ base: 100, md: 175, lg: 250 }}
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="rgba(0,0,0,0.5)"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            position="absolute"
            top="50%"
            left={6}
            transform="translateY(-50%)"
          >
            <IconButton
              pl={2}
              fontSize={{ base: 18, sm: 24 }}
              boxSize={{ base: 6, sm: 10, md: 14 }}
              onClick={handleNavigateBack}
              leftIcon={<ArrowBackIcon />}
              aria-label="Previous page"
              rounded="full"
              bgColor="#294747"
              _hover={{
                bgColor: '#3f6a6a',
              }}
            />
          </Box>
          <Stack textAlign="center">
            <Text fontSize={{ base: '2xl', sm: '2xl', md: '4xl', lg: '5xl' }}>
              {category.categoryName}
            </Text>
          </Stack>
        </Box>
      </Box>
      {areImagesLoading && (
        <Center mt={-24}>
          <HorizonsSpinner />
        </Center>
      )}
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={6}
        mx={6}
        my={6}
      >
        {category?.images.map((image) => (
          <GridItem key={image.url}>
            <Box position="relative">
              <Image
                src={image.url}
                alt={image.prompt}
                objectFit="cover"
                w={{ base: '', sm: '50dvw' }}
                h={{ base: '', sm: '30dvw' }}
                maxH={{ base: 500, md: 175, lg: 200, xl: 450 }}
              />
              <Box
                border="1px solid grey"
                p={1}
                mt={2}
                boxShadow="md"
                borderRadius="md"
                mx="auto"
              >
                <Stack direction="row" alignItems="center">
                  <Text mx={2} flex={1} fontSize={'auto'}>
                    {image.prompt}
                  </Text>
                  <IconButton
                    bg="transparent"
                    _hover={{
                      bg: 'blackAlpha.500',
                    }}
                    onClick={() => handleCopy(image.prompt)}
                  >
                    <CopyIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </>
  );
}
