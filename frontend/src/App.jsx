import { createRoot } from 'react-dom/client';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';

import TodoList from './TodoList';
import Login from './Login';
import Signup from './SignUp';
import React from 'react';

function App() {
  const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
      return <div>Loading...</div>;
    }

    return user ? children : <Navigate to="/login" />;
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute> <TodoList /> </PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
