import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { UserAuth, getUserFromLocalStorage } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import { checkIfUserDocExists } from '../services/profiles-service';

export default function ProtectedRoute({ children }) {
  const { user, initializing } = UserAuth();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { userProfile } = useContext(UserContext);
  const currentUserId = getUserFromLocalStorage();
  const location = useLocation();

  useEffect(() => {
    const checkUserDoc = async () => {
      const userDocExists = await checkIfUserDocExists(currentUserId);
      setHasCompletedOnboarding(userDocExists);
      setIsLoading(false);
    };

    if (user) {
      checkUserDoc();
    }
  }, [user]);

  if (initializing || isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (
    !userProfile &&
    !hasCompletedOnboarding &&
    location.pathname !== '/dashboard'
  ) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
