import { createRoot } from 'react-dom/client';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';

import TodoList from './TodoList';
import Login from './Login';
import Signup from './SignUp';
import React from 'react';

function App() {
  const isAuthenticated = () => {
    return true;
  };

  const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute> <TodoList /> </PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
