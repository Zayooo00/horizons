import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

// eslint-disable-next-line react/prop-types
export default function ProtectedRouteRedirect({ children }) {
  const { user } = UserAuth();

  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return children;
}
