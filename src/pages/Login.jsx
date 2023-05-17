import { Stack } from '@chakra-ui/react';

import Navbar from '../components/Navbar';
import LoginForm from '../components/Login/LoginForm';
import BackgroundImage from '../components/BackgroundImage';
import login_bg from '../assets/images/login_bg.png';

export default function Login() {
  return (
    <>
      <Navbar />
      <Stack h={'100svh'} direction={{ base: 'column', md: 'row' }}>
        <LoginForm />
        <BackgroundImage image={login_bg} />
      </Stack>
    </>
  );
}
