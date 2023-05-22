import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { UserAuth } from '../context/AuthContext.js';

export default function AuthRoute({ children }) {
  const { user, initializing } = UserAuth();
  const location = useLocation();

  if (initializing) {
    return null;
  }

  if (
    user &&
    (location.pathname === '/' ||
      location.pathname === '/login' ||
      location.pathname === '/sign-up')
  ) {
    return <Navigate to="/dashboard" />;
  }
  return children;
}

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
