import { AxiosError } from 'axios';
import api from './api';

export const signup = async (
  username: string,
  password: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await api.post(`/auth/register`, { username, password });
    return { success: true, message: res.data.message };
  } catch (error) {
    let message = 'Sign up failed';

    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        message = error.response?.data.message || 'User already exists';
      } else {
        const errors = error.response?.data?.errors;
        if (Array.isArray(errors) && errors.length > 0) {
          message = errors[0].msg;
        }
      }
    }
    return { success: false, message: message };
  }
};

export const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const res = await api.post(`/auth/login`, { username, password });
    const token = res.data.token;
    sessionStorage.setItem('token', token); // Store JWT in session storage
    return true;
  } catch (error) {
    console.error('Login failed', error);
    return false;
  }
};

export const logout = () => {
  sessionStorage.removeItem('token');
};

export const getToken = () => {
  return sessionStorage.getItem('token');
};
