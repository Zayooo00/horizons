import { Image, Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function BackgroundImage({ image }) {
  return (
    <Flex flex={1}>
      <Image
        display={{ base: 'none', md: 'inline-flex' }}
        alt={'Login Image'}
        objectFit={'cover'}
        src={image}
      />
    </Flex>
  );
}

BackgroundImage.propTypes = {
  image: PropTypes.string.isRequired,
};
