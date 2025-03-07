import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user'); // Get user details from local storage
  const user = userString ? JSON.parse(userString) : null; // Parse only if userString is not null

  if (!token || !user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />; // Redirect if the user's role is not allowed
  }

  return children;
};

export default RoleBasedRoute;