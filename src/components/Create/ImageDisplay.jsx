import {
  Box,
  Image,
  IconButton,
  SimpleGrid,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';
import { DownloadIcon, CloseIcon } from '@chakra-ui/icons';
import { BiShareAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function ImagesDisplay({
  images,
  onShare,
  setSelectedImage,
  inputValue,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const iconButtonSize = useBreakpointValue({ base: 'sm', md: 'sm', lg: 'md' });

  const handleOpenModal = (image) => {
    setImagePreview(image);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setImagePreview(null);
  };

  return (
    <>
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
              cursor="zoom-in"
              _hover={{
                transform: 'scale(0.95)',
              }}
              onClick={() => handleOpenModal(image)}
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
                onClick={(event) => {
                  event.stopPropagation();
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
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedImage(image);
                  onShare();
                }}
              />
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay>
          <ModalContent mx={2} mt="20dvh" bg={'#1c1e1f'}>
            <IconButton
              size="sm"
              bg="#181a1b"
              _hover={{
                bg: 'white',
                color: 'black',
              }}
              color="white"
              position="absolute"
              top={3}
              right={3}
              aria-label="Close modal"
              icon={<CloseIcon />}
              onClick={handleCloseModal}
            />
            <Image src={imagePreview} alt="Selected image" />
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}

ImagesDisplay.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onShare: PropTypes.func.isRequired,
  setSelectedImage: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};
