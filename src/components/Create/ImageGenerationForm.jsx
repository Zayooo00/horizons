import { useState, useEffect } from 'react';
import { Box, Textarea, Button, Flex, Text, Spinner } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function ImageGenerationForm({
  onSubmit,
  isImageLoading,
  error,
}) {
  const [inputValue, setInputValue] = useState('');
  const [countdownValue, setCountdownValue] = useState(60);
  const ERROR_MODEL_LOADING =
    'Model prompthero/openjourney is currently loading';

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdownValue((prevValue) => prevValue - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <Box mt={20} as="form" onSubmit={handleSubmit}>
      <Flex mx={4} direction={{ base: 'column', md: 'row' }}>
        <Textarea
          name="input"
          color="white"
          border="1px solid grey"
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
              handleSubmit(event);
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
            bg: '#3f6a6a',
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
                ? `AI model is currently loading, estimated time: ${countdownValue}s`
                : 'Please try again in a moment...'
              : error}
          </Text>
        </Flex>
      )}
    </Box>
  );
}

ImageGenerationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isImageLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};
