import React from 'react';
import { Outlet } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/feedback/tooltip';

const DashboardLayout = () => {
  return (
    <TooltipProvider>
      <Outlet />
    </TooltipProvider>
  );
};

export default DashboardLayout; 