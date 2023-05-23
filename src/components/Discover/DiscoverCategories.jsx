import { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Image, Text, Stack } from '@chakra-ui/react';

import { getAllCategories } from '../../services/categories-service';
import categories_bg from '../../assets/images/categories_bg.jpg';

export default function CategoryGrid() {
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
            <Text fontSize={{ base: 'md', md: '4xl', lg: '5xl' }}>
              Inspire Yourself
            </Text>
            <Text fontSize={{ base: 10, md: 'lg', lg: 'xl' }}>
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
            <Box position="relative">
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
                bg="rgba(0,0,0,0.2)"
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
          </GridItem>
        ))}
      </Grid>
    </>
  );
}
