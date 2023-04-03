import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from './theme/css/theme';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRouteRedirect from './components/ProtectedRouteRedirect';
import ProtectedRoute from './components/ProtectedRoute';

import Start from './pages/Start';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';

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
                  <ProtectedRouteRedirect>
                    <Start />
                  </ProtectedRouteRedirect>
                }
              />
              <Route
                path="/login"
                element={
                  <ProtectedRouteRedirect>
                    <Login />
                  </ProtectedRouteRedirect>
                }
              />
              <Route
                path="/sign-up"
                element={
                  <ProtectedRouteRedirect>
                    <SignUp />
                  </ProtectedRouteRedirect>
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
                    <Create/>
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
