import React, { createContext, useEffect, useState } from 'react';
import { API_PATHS } from '../utils/apiPaths';
import axiosInstance from '../utils/axiosInstance';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added for better UI feedback

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      setLoading(false);
      setError('No token found. Please log in.');
      return;
    }

    const fetchUser = async () => {
      try {
        console.log('Fetching user from:', API_PATHS.AUTH.GET_PROFILE);
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        console.log('Profile API Response:', response.data, 'Status:', response.status);
        setUser(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching user:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        // ... rest of error handling
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, loading, error, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;