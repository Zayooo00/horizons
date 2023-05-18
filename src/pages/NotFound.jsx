import {
  Card,
  CardBody,
  Flex,
  Stack,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RiHome2Line } from 'react-icons/ri';

export default function NotFound() {
  return (
    <Flex mt="25dvh" mx={4} align="center" justify="center">
      <Card bg="whiteAlpha.100" maxW={580}>
        <CardBody p={30}>
          <Stack
            direction={{ base: 'column', sm: 'row', md: 'row' }}
            align="center"
          >
            <Text
              fontSize="6xl"
              color="white"
              pr={{ base: 0, sm: 4 }}
              mb={{ base: -2, sm: 0 }}
            >
              404
            </Text>
            <Text color="white" textAlign={{ base: 'center', sm: 'left' }}>
              You happened to get lost in the mysterious image generator.
              Pressing home button will take you back to civilization.
            </Text>
            <Link to="/">
              <IconButton
                ml={{ base: 0, sm: 2 }}
                mt={{ base: 2, sm: 0 }}
                rounded={'1rem'}
                border="3px white solid"
                aria-label="Home"
                icon={<RiHome2Line />}
                colorScheme="white"
                fontSize="25px"
                boxSize="60px"
              />
            </Link>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  );
}
