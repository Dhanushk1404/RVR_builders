// src/context/authContext.jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [admin, setAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem('adminToken');
    return storedAdmin ? storedAdmin : null;
  });

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const loginAdmin = (adminData) => {
    const { token } = adminData;
    localStorage.setItem('adminToken', token);
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        loginUser,
        logoutUser,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
