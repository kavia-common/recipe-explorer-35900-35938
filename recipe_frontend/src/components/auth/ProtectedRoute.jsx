import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

/**
 * PUBLIC_INTERFACE
 * ProtectedRoute restricts access based on auth state.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    const redirect = `/signin?return=${encodeURIComponent(location.pathname + location.search)}`;
    return <Navigate to={redirect} replace />;
  }
  return children;
}
