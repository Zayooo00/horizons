import React, { useEffect } from 'react';
import { Box, Progress, Center } from '@chakra-ui/react';

export default function LoadingBar() {
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 0.1);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <Center>
      <Box w={'60vw'} mt={8}>
        <Progress size="xs" colorScheme="green" value={progress} max={100} />
      </Box>
    </Center>
  );
}