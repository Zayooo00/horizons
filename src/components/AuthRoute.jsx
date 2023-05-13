import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { UserAuth } from '../context/AuthContext.js';

export default function AuthRoute({ children }) {
  const { user } = UserAuth();
  const location = useLocation();

  if (user && (location.pathname === '/' || location.pathname === '/login'|| location.pathname === '/signup')) {
    return <Navigate to="/dashboard" />;
  }
  return children;
}

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
