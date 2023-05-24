import { useState, useEffect } from 'react';
import {
  Grid,
  GridItem,
  Box,
  Image,
  Stack,
  Text,
  Button,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';

import { getCategoryByName } from '../../services/categories-service';

export default function CategoryImages() {
  const { categoryName } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    async function fetchCategory() {
      const category = await getCategoryByName(categoryName);
      setCategory(category);
    }
    fetchCategory();
  }, [categoryName]);

  if (!category) {
    return null;
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

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
          <Stack textAlign="center">
            <Text fontSize={{ base: 'lg', sm: '2xl', md: '4xl', lg: '5xl' }}>
              {category.categoryName}
            </Text>
          </Stack>
        </Box>
      </Box>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
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
                w="50dvw"
                h="30dvw"
                maxH={{ base: 150, md: 175, lg: 200, xl: 450 }}
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
                  <Text mx={2} flex={1}>
                    {image.prompt}
                  </Text>
                  <Button
                    bg="transparent"
                    _hover={{
                      bg: 'blackAlpha.500',
                    }}
                    onClick={() => handleCopy(image.prompt)}
                  >
                    <CopyIcon />
                  </Button>
                </Stack>
              </Box>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </>
  );
}