import React, { useState, useEffect } from 'react';

import OnboardingModal from '../components/Dashboard/OnboardingModal';
import Headbar from '../components/Headbar';
import MasonryLayout from '../components/Dashboard/MasonryLayout';
import Post from '../components/Dashboard/Post';
import { checkIfUserDocExists } from '../services/profiles-service';
import { getUserFromLocalStorage } from '../context/AuthContext';
import { getAllPosts } from '../services/posts-service';

export default function Dashboard() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [posts, setPosts] = useState([]);

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

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getAllPosts();
      setPosts(posts);
    };

    fetchPosts();
  }, []);

  return (
    <>
      {showOnboarding && <OnboardingModal />}
      <Headbar />
      <MasonryLayout>
        {posts.map((post) => (
          <Post key={post.title} post={post} />
        ))}
      </MasonryLayout>
    </>
  );
}
