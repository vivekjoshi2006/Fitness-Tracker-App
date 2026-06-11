import React, { createContext, useState, useEffect, useContext } from 'react';
import { apiRequest } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await apiRequest('/auth/me');
          setUser(userData);
        } catch (error) {
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkUserSession();
  }, []);

  const login = async (email, password) => {
    const data = await apiRequest('/auth/login', 'POST', { email, password });
    localStorage.setItem('token', data.token);
    setUser({
      _id: data._id,
      name: data.name,
      email: data.email,
      isOnboarded: data.isOnboarded,
      age: data.age,
      weight: data.weight,
      height: data.height,
      goal: data.goal,
      dailyCalorieIntakeGoal: data.dailyCalorieIntakeGoal,
      dailyCalorieBurnGoal: data.dailyCalorieBurnGoal
    });
    return data;
  };

  const register = async (name, email, password) => {
    const data = await apiRequest('/auth/register', 'POST', { name, email, password });
    localStorage.setItem('token', data.token);
    setUser({
      _id: data._id,
      name: data.name,
      email: data.email,
      isOnboarded: data.isOnboarded
    });
    return data;
  };

  const onboard = async (onboardData) => {
    const updatedUser = await apiRequest('/users/onboard', 'PUT', onboardData);
    setUser(updatedUser);
    return updatedUser;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, onboard, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);