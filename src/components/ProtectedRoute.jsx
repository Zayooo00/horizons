import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { UserAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
