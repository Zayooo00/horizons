import { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Image, Text, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { getAllCategories } from '../../services/categories-service';
import categories_bg from '../../assets/images/categories_bg.jpg';
import { formatLinkPath } from '../../helpers/Normalizer';

export default function DiscoverCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getAllCategories();
      setCategories(categories);
    }
    fetchCategories();
  }, []);

  return (
    <>
      <Box position="relative" mt={'88px'} mb={6} mx={6}>
        <Image
          objectFit="cover"
          src={categories_bg}
          alt="Inspire Yourself"
          w="full"
          h={{ base: 100, md: 175, lg: 250 }}
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="rgba(0,0,0,0.2)"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Stack textAlign="center">
            <Text fontSize={{ base: 'lg', sm: '2xl', md: '4xl', lg: '5xl' }}>
              Inspire Yourself
            </Text>
            <Text fontSize={{ base: 12, sm: 'sm', md: 'lg', lg: 'xl' }}>
              We&apos;ve prepared some categories for you to discover!
            </Text>
          </Stack>
        </Box>
      </Box>
      <Grid
        templateColumns={{
          base: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={6}
        mx={6}
        mb={6}
      >
        {categories.map((category) => (
          <GridItem key={category.categoryName}>
            <Link to={`/category/${formatLinkPath(category.categoryName)}`}>
              <Box
                position="relative"
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bg: 'rgba(0,0,0,0)',
                  transition: 'background-color 0.2s',
                }}
                _hover={{
                  _before: {
                    bg: 'rgba(0,0,0,0.5)',
                  },
                }}
              >
                <Image
                  src={category.cover}
                  alt={category.categoryName}
                  objectFit="cover"
                  w="50dvw"
                  h="30dvw"
                  maxH={{ base: 150, md: 175, lg: 200, xl: 250 }}
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
                  <Text
                    fontSize={{
                      base: 'lg',
                      sm: 'xl',
                      md: 'xl',
                      lg: 'xl',
                      xl: '2xl',
                    }}
                  >
                    {category.categoryName}
                  </Text>
                </Box>
              </Box>
            </Link>
          </GridItem>
        ))}
      </Grid>
    </>
  );
}
