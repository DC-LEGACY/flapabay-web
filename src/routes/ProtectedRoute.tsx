import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'guest' | 'host';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You might want to use your Preloader component here
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // TODO: Implement role-based access control when you have the backend ready
  // if (requiredRole && user.role !== requiredRole) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return <>{children}</>;
};

export default ProtectedRoute; 