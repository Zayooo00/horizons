import { Stack } from '@chakra-ui/react';

import Navbar from '../components/Navbar';
import NavFooter from '../components/NavFooter';
import LoginForm from '../components/Login/LoginForm';
import BackgroundImage from '../components/BackgroundImage';
import login_bg from '../assets/images/login_bg.png';

export default function Login() {
  return (
    <>
      <Navbar />
      <Stack direction={{ base: 'column', md: 'row' }}>
        <LoginForm />
        <BackgroundImage image={login_bg} />
        <NavFooter />
      </Stack>
    </>
  );
}
