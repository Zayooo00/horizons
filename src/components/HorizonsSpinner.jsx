import { Center, Spinner } from '@chakra-ui/react';

export default function HorizonsSpinner() {
  return (
    <Center h="40dvh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.700"
        color="teal.500"
        size="xl"
      />
    </Center>
  );
}
