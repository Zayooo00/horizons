import React, { useState } from 'react';
import { Box, Textarea, Button, Spinner, Image, Flex } from '@chakra-ui/react';

import Headbar from '../components/Headbar';

const API_URL =
  'https://api-inference.huggingface.co/models/prompthero/openjourney';
const API_TOKEN = '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';

export default function ImageGenerationForm() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    const timestamp = Date.now();
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ inputs: input, timestamp }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate image');
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (
    <>
      <Headbar />
      <Box mt={20} as="form" onSubmit={handleSubmit}>
        <Flex mx={4} direction={{ base: 'column', md: 'row' }}>
          <Textarea
            name="input"
            color="white"
            _placeholder={{ color: 'gray' }}
            placeholder="Magnificent cat in a witch cat on the moon..."
            mb={{ base: 2, md: 0 }}
            minHeight={{ base: '100px', md: 'auto' }}
            maxHeight={{ base: '100px', md: '600px' }}
            resize="none"
            rows={1}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            overflow={{ base: 'auto', md: 'hidden' }}
          />
          <Button
            ml={{ base: 0, md: 2 }}
            w={{ base: 'full', md: 'auto' }}
            type="submit"
            bg={'#294747'}
            _hover={{
              bg: '#3b5655',
            }}
          >
            {loading ? <Spinner /> : 'Generate'}
          </Button>
        </Flex>
        {!loading && output && (
          <Flex justifyContent="center" mt={4} mx={4}>
            <Image src={output} alt="Generated image" maxW={'400px'} />
          </Flex>
        )}
      </Box>
    </>
  );
}
