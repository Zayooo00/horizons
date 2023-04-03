import React from 'react';
import { UserAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { logout, user } = UserAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
  <div>Dashboard</div>
  <div>{user.email}</div>
  <button onClick={handleLogout}>LOGOUT</button>
  </>
  );
}
