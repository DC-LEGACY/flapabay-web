import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '@/layouts/DashboardLayout';
import GuestDashboard from '@/components/dashboard/GuestDashboard';
import Trips from '@/components/dashboard/guest/Trips';
import Favorites from '@/components/dashboard/guest/Favorites';
import Profile from '@/components/dashboard/guest/Profile';
import TripsPage from '@/components/trip-page';
import WishlistPage from '@/components/wishlist-page';
import RecentlyViewed from '@/components/wishlist-page-recently';
import AccountPage from '@/components/account-page';
import ReservationPage from '@/components/reservation-page';
import ConfirmAndPay from '@/components/payment-page';

const GuestRoutes = () => {
  return (
    <Route element={<DashboardLayout />}>
      {/* Main Dashboard */}
      <Route
        path="/guest/dashboard"
        element={
          <ProtectedRoute requiredRole="guest">
            <GuestDashboard />
          </ProtectedRoute>
        }
      />

      {/* Bookings and Trips */}
      <Route
        path="/guest/bookings"
        element={
          <ProtectedRoute requiredRole="guest">
            <Trips />
          </ProtectedRoute>
        }
      />
      <Route
        path="/guest/trips"
        element={
          <ProtectedRoute requiredRole="guest">
            <TripsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/guest/reservation/:id"
        element={
          <ProtectedRoute requiredRole="guest">
            <ReservationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/guest/payment/:id"
        element={
          <ProtectedRoute requiredRole="guest">
            <ConfirmAndPay />
          </ProtectedRoute>
        }
      />

      {/* Favorites and Wishlist */}
      <Route
        path="/guest/favorites"
        element={
          <ProtectedRoute requiredRole="guest">
            <Favorites />
          </ProtectedRoute>
        }
      />
      <Route
        path="/guest/wishlist"
        element={
          <ProtectedRoute requiredRole="guest">
            <WishlistPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/guest/recently-viewed"
        element={
          <ProtectedRoute requiredRole="guest">
            <RecentlyViewed />
          </ProtectedRoute>
        }
      />

      {/* Account and Profile */}
      <Route
        path="/guest/profile"
        element={
          <ProtectedRoute requiredRole="guest">
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/guest/account"
        element={
          <ProtectedRoute requiredRole="guest">
            <AccountPage />
          </ProtectedRoute>
        }
      />
    </Route>
  );
};

export default GuestRoutes; 