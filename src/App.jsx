import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';

import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRoute from './components/AuthRoute';
import theme from './theme/theme';
import './theme/css/App.css';

import Start from './pages/Start';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import Profile from './pages/Profile';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box bg={theme.palette.primary}>
        <Router>
          <AuthContextProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <AuthRoute>
                    <Start />
                  </AuthRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <AuthRoute>
                    <Login />
                  </AuthRoute>
                }
              />
              <Route
                path="/sign-up"
                element={
                  <AuthRoute>
                    <SignUp />
                  </AuthRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <Create />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthContextProvider>
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;
