import { useEffect, useState } from 'react';
import { Box, Progress, Center } from '@chakra-ui/react';

export default function LoadingBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 0.1);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <Center>
      <Box maxW="2xl" w={{ base: '562px', sm: '672px' }} mt={8} mx={8}>
        <Progress size="xs" colorScheme="green" value={progress} max={125} />
      </Box>
    </Center>
  );
}
