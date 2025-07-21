'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AuthTokenPayload } from '../types';
import { getToken, logout } from '../api/auth';
import { jwtDecode } from 'jwt-decode';

type AuthContextType = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string | null;
  id: number | null;
  loginUser: () => void;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode<AuthTokenPayload>(token);
        const now = Date.now() / 1000;

        if (decoded.exp < now) {
          logout(); // token expired
        } else {
          setIsLoggedIn(true);
          setIsAdmin(decoded.isAdmin === true);
          setUsername(decoded.username);
          setId(decoded.userId);
        }
      } catch (err) {
        console.error('Invalid token', err);
        logout();
      }
    }
  }, []);

  const loginUser = () => {
    const token = getToken();
    if (!token) return;

    try {
      const decoded = jwtDecode<AuthTokenPayload>(token);
      const now = Date.now() / 1000;

      if (decoded.exp > now) {
        setIsLoggedIn(true);
        setIsAdmin(decoded.isAdmin === true);
        setUsername(decoded.username);
        setId(decoded.userId);
      } else {
        logout();
      }
    } catch (err) {
      console.error('Invalid token on loginUser', err);
      logout();
    }
  };

  const logoutUser = () => {
    logout();
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUsername(null);
    setId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, username, id, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
