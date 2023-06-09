import { Stack } from '@chakra-ui/react';

import Navbar from '../components/Navbar';
import BackgroundImage from '../components/BackgroundImage';
import SignUpForm from '../components/SignUp/SignUpForm';
import signup_bg from '../assets/images/signup_bg.png';

export default function SignUp() {
  return (
    <>
      <Navbar />
      <Stack h={'100svh'} direction={{ base: 'column', md: 'row' }}>
        <BackgroundImage image={signup_bg} />
        <SignUpForm />
      </Stack>
    </>
  );
}
