import PropTypes from 'prop-types';
import { useState } from 'react';
import { Image, Flex } from '@chakra-ui/react';
import { Blurhash } from 'react-blurhash';

export default function BackgroundImage({ image, blurhash }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <Flex flex={1} display={{ base: 'none', md: 'inline-flex' }}>
        <Blurhash
          style={{ display: imageLoaded ? 'none' : 'inline' }}
          hash={blurhash}
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          resolutionX={64}
          resolutionY={64}
          punch={1}
        />
        <Image
          src={image}
          onLoad={() => setImageLoaded(true)}
          alt={'Background image'}
          objectFit={'cover'}
          style={{
            display: !imageLoaded ? 'none' : 'inline',
          }}
        />
      </Flex>
    </>
  );
}

BackgroundImage.propTypes = {
  image: PropTypes.string.isRequired,
  blurhash: PropTypes.string.isRequired,
};
