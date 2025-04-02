
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// This component acts as a wrapper/router for the dashboard
// It will redirect to the appropriate dashboard (guest or host)
const Dashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Default to guest dashboard if no specific dashboard is specified
    if (location.pathname === '/dashboard') {
      navigate('/dashboard/guest');
    }
  }, [navigate]);
  
  return <Outlet />;
};

export default Dashboard;
