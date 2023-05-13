import React, { useState, useEffect } from 'react';
import { Image } from '@chakra-ui/react';

import OnboardingModal from '../components/Dashboard/OnboardingModal';
import Headbar from '../components/Headbar';
import MasonryLayout from '../components/Dashboard/MasonryLayout';
import { checkIfUserDocExists } from '../services/profiles-service';
import { getUserFromLocalStorage } from '../context/AuthContext';

const images = [
  'https://i.pinimg.com/236x/39/a6/72/39a672cc7d190e967de4c1521ac87bd0.jpg',
  'https://i.pinimg.com/236x/98/36/00/9836004d4bc876dcd6191476e7c13666.jpg',
  'https://i.pinimg.com/236x/2c/46/e7/2c46e75a95f799104c09d8d3e5c2b438.jpg',
  'https://i.pinimg.com/236x/57/db/18/57db186c176a51d743bc09d2d70a72f2.jpg',
  'https://i.pinimg.com/236x/e7/9e/4d/e79e4d175aadf2b610f528ae8b153bd1.jpg',
  'https://i.pinimg.com/236x/d1/1c/42/d11c420f679440a87e531af0f0efc399.jpg',
  'https://i.pinimg.com/236x/d1/78/b7/d178b7833f21a277db0d6276524cb940.jpg',
  'https://i.pinimg.com/236x/ad/6d/9c/ad6d9cd47e816da4c1547259b88a00ae.jpg',
  'https://i.pinimg.com/236x/1d/a0/17/1da017feb14c6df3e51e7cf4625608f7.jpg',
  'https://i.pinimg.com/236x/ce/94/54/ce9454448491ab301aeabf57593bc30d.jpg',
  'https://i.pinimg.com/236x/cd/f3/2c/cdf32cbb7a51aab8f07a666d846b7a48.jpg',
  'https://i.pinimg.com/236x/3d/78/38/3d783820e005dfb21640e17b274f55f1.jpg',
  'https://i.pinimg.com/236x/32/04/c8/3204c8622615676539b4a6c42d68e68f.jpg',
];

export default function Dashboard() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const checkUserDoc = async () => {
      const currentUserId = getUserFromLocalStorage();
      const userDocExists = await checkIfUserDocExists(currentUserId);

      if (!userDocExists) {
        setShowOnboarding(true);
      }
    };

    checkUserDoc();
  }, []);

  return (
    <>
      {showOnboarding && <OnboardingModal />}
      <Headbar />
      <MasonryLayout>
        {images.map((src, index) => (
          <Image
            transition="filter 0.2s"
            _hover={{ filter: 'brightness(70%)' }}
            rounded={'1rem'}
            key={index}
            src={src}
            alt="image"
          />
        ))}
      </MasonryLayout>
    </>
  );
}
