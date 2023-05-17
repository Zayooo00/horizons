/* eslint-disable react/prop-types */
// ImagesDisplay.js
import { Box, Image, IconButton, SimpleGrid } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { BiShareAlt } from 'react-icons/bi';

export default function ImagesDisplay({
  images,
  onShare,
  setSelectedImage,
  inputValue,
}) {
  return (
    <SimpleGrid
      columns={{ base: 2, md: 4 }}
      spacing={4}
      justifyContent="center"
      mt={8}
      mx={{ base: 4, sm: 4, md: 4, lg: 4, xl: 60 }}
    >
      {images.map((image, index) => (
        <Box position="relative" key={index}>
          <Box transition="transform 0.2s ease-in-out">
            <Image src={image} alt="Generated image" maxW={'400px'} />
            <IconButton
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
              bg="white"
              color="black"
              position="absolute"
              top={2}
              right={{ base: 12, sm: 12, md: 12, lg: 14 }}
              aria-label="Share image"
              icon={<BiShareAlt />}
              onClick={() => {
                setSelectedImage(image);
                onShare();
              }}
            />
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
}
