import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '@/layouts/DashboardLayout';
import HostDashboard from '@/components/dashboard/HostDashboard';
import Listings from '@/components/dashboard/host/Listings';
import Reservations from '@/components/dashboard/host/Reservations';
import Profile from '@/components/dashboard/host/Profile';
import DashboardExperiences from '@/components/dashboard/host/DashboardExperiences';
import DashboardHostReviews from '@/components/dashboard/host/DashboardHostReviews';
import DashboardAiHost from '@/components/dashboard/host/DashboardAiHost';
import DashboardMyProperties from '@/components/dashboard/host/DashboardMyProperties';
import DashboardAddProperty from '@/components/dashboard/host/DashboardAddProperty';
import NewHostingJourneyPage from '@/components/dashboard/host/NewHostingJourneyPage';
import SubmitExperiencePage from '@/components/dashboard/host/SubmitExperiencePage';

const HostRoutes = () => {
  return (
    <Route element={<DashboardLayout />}>
      {/* Main Dashboard */}
      <Route
        path="/host/dashboard"
        element={
          <ProtectedRoute requiredRole="host">
            <HostDashboard />
          </ProtectedRoute>
        }
      />

      {/* Listings and Properties */}
      <Route
        path="/host/listings"
        element={
          <ProtectedRoute requiredRole="host">
            <Listings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/host/properties"
        element={
          <ProtectedRoute requiredRole="host">
            <DashboardMyProperties />
          </ProtectedRoute>
        }
      />
      <Route
        path="/host/add-property"
        element={
          <ProtectedRoute requiredRole="host">
            <DashboardAddProperty />
          </ProtectedRoute>
        }
      />

      {/* Experiences */}
      <Route
        path="/host/experiences"
        element={
          <ProtectedRoute requiredRole="host">
            <DashboardExperiences />
          </ProtectedRoute>
        }
      />
      <Route
        path="/host/submit-experience"
        element={
          <ProtectedRoute requiredRole="host">
            <SubmitExperiencePage />
          </ProtectedRoute>
        }
      />

      {/* Reviews and AI Host */}
      <Route
        path="/host/reviews"
        element={
          <ProtectedRoute requiredRole="host">
            <DashboardHostReviews />
          </ProtectedRoute>
        }
      />
      <Route
        path="/host/ai-host"
        element={
          <ProtectedRoute requiredRole="host">
            <DashboardAiHost />
          </ProtectedRoute>
        }
      />

      {/* Bookings */}
      <Route
        path="/host/bookings"
        element={
          <ProtectedRoute requiredRole="host">
            <Reservations />
          </ProtectedRoute>
        }
      />

      {/* Profile and Settings */}
      <Route
        path="/host/profile"
        element={
          <ProtectedRoute requiredRole="host">
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/host/new-hosting-journey"
        element={
          <ProtectedRoute requiredRole="host">
            <NewHostingJourneyPage />
          </ProtectedRoute>
        }
      />
    </Route>
  );
};

export default HostRoutes; 