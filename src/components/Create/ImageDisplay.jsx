import {
  Box,
  Image,
  IconButton,
  SimpleGrid,
  useBreakpointValue,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { BiShareAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';

export default function ImagesDisplay({
  images,
  onShare,
  setSelectedImage,
  inputValue,
}) {
  const iconButtonSize = useBreakpointValue({ base: 'sm', md: 'sm', lg: 'md' });

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
          <Box
            transition="transform 0.2s ease-in-out"
            _hover={{
              transform: 'scale(0.9)',
            }}
          >
            <Image src={image} alt="Generated image" maxW={'400px'} />
            <IconButton
              size={iconButtonSize}
              bg="#181a1b"
              _hover={{
                bg: 'white',
                color: 'black',
              }}
              color="white"
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
              bg="#181a1b"
              _hover={{
                bg: 'white',
                color: 'black',
              }}
              color="white"
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

ImagesDisplay.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onShare: PropTypes.func.isRequired,
  setSelectedImage: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};
