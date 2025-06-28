// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const res = await axios.get('/api/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(res.data); // Includes bookings
  } catch (err) {
    console.error('AuthContext: Failed to load user');
    setUser(null);
  }
};

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (token) => {
    localStorage.setItem('token', token);
    await loadUser();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
