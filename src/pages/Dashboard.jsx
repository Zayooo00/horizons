import { useState, useEffect, useContext } from 'react';
import { Flex } from '@chakra-ui/react';

import OnboardingModal from '../components/Dashboard/OnboardingModal';
import Headbar from '../components/Headbar';
import MasonryLayout from '../components/Dashboard/MasonryLayout';
import Post from '../components/Dashboard/Post';
import HorizonsSpinner from '../components/HorizonsSpinner';
import InfoCard from '../components/InfoCard';
import { checkIfUserDocExists } from '../services/profiles-service';
import { getUserFromLocalStorage } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import { getAllPosts } from '../services/posts-service';

export default function Dashboard() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { setUserProfile } = useContext(UserContext);
  const currentUserId = getUserFromLocalStorage();
  const [posts, setPosts] = useState([]);
  const [isFetchingImages, setIsFetchingImages] = useState(true);

  useEffect(() => {
    const checkUserDoc = async () => {
      const userDocExists = await checkIfUserDocExists(currentUserId);

      if (!userDocExists) {
        setShowOnboarding(true);
      }
    };

    checkUserDoc();
  }, []);

  useEffect(() => {
    setIsFetchingImages(true);
    const fetchPosts = async () => {
      const posts = await getAllPosts();
      setPosts(posts);
      setIsFetchingImages(false);
    };

    fetchPosts();
  }, []);

  return (
    <>
      {showOnboarding && <OnboardingModal setUserProfile={setUserProfile} />}
      <Headbar />
      {isFetchingImages ? (
        <HorizonsSpinner />
      ) : posts.length === 0 ? (
        <Flex
          display={isFetchingImages ? 'none' : 'flex'}
          h="25dvh"
          align="center"
          justify="center"
          bg="whiteAlpha.100"
          mt="30dvh"
          mx={{ base: 4, lg: 0 }}
        >
          <InfoCard
            heading="No posts found *◠*"
            text="There are no posts to display at the moment."
          />
        </Flex>
      ) : (
        <MasonryLayout>
          {posts.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </MasonryLayout>
      )}
    </>
  );
}
