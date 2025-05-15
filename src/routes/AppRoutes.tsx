import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthGuard } from '@/guards/AuthGuard';
import DashboardLayout from '@/layouts/DashboardLayout';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import NotFound from '@/pages/not-found';
import { websiteRoutes } from '@/routes/websiteRoutes';
import Preloader from '@/components/common/Preloader';

// Layout components
const WebsiteLayoutWrapper = () => (
  <WebsiteLayout />
);

const DashboardLayoutWrapper = () => (
  <AuthGuard>
    <DashboardLayout />
  </AuthGuard>
);

// Route component mapping
const getRouteComponent = (key: string) => {
  const components: Record<string, React.LazyExoticComponent<React.FC>> = {
    // Auth Pages
    login: lazy(() => import('@/pages/auth/login/')),
    register: lazy(() => import('@/pages/auth/register')),

    // Guest Dashboard Pages
    guestDashboard: lazy(() => import('@/pages/(dashboard)/guest/Dashboard')),
    guestMessages: lazy(() => import('@/pages/(dashboard)/guest/Messages')),
    guestProfile: lazy(() => import('@/pages/(dashboard)/guest/Profile')),
    guestReviews: lazy(() => import('@/pages/(dashboard)/guest/Reviews')),
    guestTripDetails: lazy(() => import('@/pages/(dashboard)/guest/TripDetails')),
    guestTrips: lazy(() => import('@/pages/(dashboard)/guest/Trips')),
    guestWishlist: lazy(() => import('@/pages/(dashboard)/guest/Wishlist')),

    // Host Dashboard Pages
    hostDashboard: lazy(() => import('@/pages/(dashboard)/host/Index')), // Assuming Index.tsx is the main host dashboard
    hostAccount: lazy(() => import('@/pages/(dashboard)/host/Account')),
    hostCalendar: lazy(() => import('@/pages/(dashboard)/host/Calendar')),
    hostEarnings: lazy(() => import('@/pages/(dashboard)/host/Earnings')),
    hostExperiences: lazy(() => import('@/pages/(dashboard)/host/Experiences')),
    hostListings: lazy(() => import('@/pages/(dashboard)/host/Listings')),
    hostLoginSecurity: lazy(() => import('@/pages/(dashboard)/host/LoginSecurity')),
    hostNotifications: lazy(() => import('@/pages/(dashboard)/host/Notifications')),
    hostPayments: lazy(() => import('@/pages/(dashboard)/host/Payments')),
    hostPreferences: lazy(() => import('@/pages/(dashboard)/host/Preferences')),
    hostPrivacy: lazy(() => import('@/pages/(dashboard)/host/Privacy')),
    hostProfile: lazy(() => import('@/pages/(dashboard)/host/Profile')),
    hostPublicGuestProfile: lazy(() => import('@/pages/(dashboard)/host/PublicGuestProfile')),
    hostPublicHostProfile: lazy(() => import('@/pages/(dashboard)/host/PublicHostProfile')),
    hostReferrals: lazy(() => import('@/pages/(dashboard)/host/Referrals')),
    hostSettings: lazy(() => import('@/pages/(dashboard)/host/Settings')),
    hostTaxes: lazy(() => import('@/pages/(dashboard)/host/Taxes')),
    hostTravelWork: lazy(() => import('@/pages/(dashboard)/host/TravelWork')),
    
    // Common Dashboard Pages
    dashboardAddProperty: lazy(() => import('@/pages/(dashboard)/dashboard-add-property')), // Assuming this contains an index.tsx or similar default export

    // Help Center Pages
    cancellationOptions: lazy(() => import('@/pages/website/help-center/CancellationOptions')),
    faqs: lazy(() => import('@/pages/website/help-center/FAQs')),
    neighborhoodConcern: lazy(() => import('@/pages/website/help-center/NeighborhoodConcern')),
    privacyPolicy: lazy(() => import('@/pages/website/help-center/PrivacyPolicy')),
    supportedCountries: lazy(() => import('@/pages/website/help-center/SupportedCountries')),
    termsOfService: lazy(() => import('@/pages/website/help-center/TermsOfService')),
    careers: lazy(() => import('@/pages/website/help-center/Careers')),
    mediaRoom: lazy(() => import('@/pages/website/help-center/MediaRoom')),

    // Website Pages
    home: lazy(() => import('@/pages/website/landing/')),
    about: lazy(() => import('@/pages/website/about')),
    blog: lazy(() => import('@/pages/website/blog')),
    contact: lazy(() => import('@/pages/website/contact')),
    helpCenter: lazy(() => import('@/pages/website/help-center')),
    becomeHost: lazy(() => import('@/pages/website/experiences/BecomeHost')),
    compare: lazy(() => import('@/pages/website/compare')),
    experiences: lazy(() => import('@/pages/website/experiences')),
    
    gridDefault: lazy(() => import('@/pages/website/listings/(grid-view)/grid-default')),
    gridFull3Col: lazy(() => import('@/pages/website/listings/(grid-view)/grid-full-3-col')),
    gridFull4Col: lazy(() => import('@/pages/website/listings/(grid-view)/grid-full-4-col')),
    gridFull2Col: lazy(() => import('@/pages/website/listings/(grid-view)/grid-full-2-col')),
    gridFull1ColV1: lazy(() => import('@/pages/website/listings/(grid-view)/grid-full-1-col-v1')),
    gridFull1ColV2: lazy(() => import('@/pages/website/listings/(grid-view)/grid-full-1-col-v2')),
    bannerSearchV1: lazy(() => import('@/pages/website/listings/(grid-view)/banner-search-v1')),
    bannerSearchV2: lazy(() => import('@/pages/website/listings/(grid-view)/banner-search-v2')),
    listAllStyle: lazy(() => import('@/pages/website/listings/(list-view)/list-all-style')),
    listV1: lazy(() => import('@/pages/website/listings/(list-view)/list-v1')),
    headerMapStyle: lazy(() => import('@/pages/website/listings/(map-style)/header-map-style')),
    mapV1: lazy(() => import('@/pages/website/listings/(map-style)/map-v1')),
    mapV2: lazy(() => import('@/pages/website/listings/(map-style)/map-v2')),
    mapV3: lazy(() => import('@/pages/website/listings/(map-style)/map-v3')),
    mapV4: lazy(() => import('@/pages/website/listings/(map-style)/map-v4')),
    // singleV1: lazy(() => import('@/pages/website/property/(single-style)/single-v1')),
    // singleV2: lazy(() => import('@/pages/website/property/(single-style)/single-v2')),
    // singleV3: lazy(() => import('@/pages/website/property/(single-style)/single-v3')),
    // singleV4: lazy(() => import('@/pages/website/property/(single-style)/single-v4')),
    // singleV5: lazy(() => import('@/pages/website/property/(single-style)/single-v5')),
    // singleV6: lazy(() => import('@/pages/website/property/(single-style)/single-v6')),
    // singleV7: lazy(() => import('@/pages/website/property/(single-style)/single-v7')),
    // singleV8: lazy(() => import('@/pages/website/property/(single-style)/single-v8')),
    // singleV9: lazy(() => import('@/pages/website/property/(single-style)/single-v9')),
    // singleV10: lazy(() => import('@/pages/website/property/(single-style)/single-v10')),
  };

  return components[key] || NotFound;
};

export function AppRoutes() {
  return (
    <Suspense fallback={<Preloader />}>
      <Routes>
        {/* Public Website Routes including Auth */}
        <Route element={<WebsiteLayoutWrapper />}>
          {websiteRoutes.map((route) => (
            <Route 
              key={route.key} 
              path={route.path} 
              element={React.createElement(getRouteComponent(route.key))} 
            />
          ))}
          
          {/* Auth Routes within Website Layout */}
          <Route path="auth">
            <Route path="login" element={React.createElement(getRouteComponent('login'))} />
            <Route path="register" element={React.createElement(getRouteComponent('register'))} />
          </Route>
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayoutWrapper />}>
          {/* Guest Routes */}
          <Route path="guest">
            <Route index element={React.createElement(getRouteComponent('guestDashboard'))} />
            <Route path="messages" element={React.createElement(getRouteComponent('guestMessages'))} />
            <Route path="profile" element={React.createElement(getRouteComponent('guestProfile'))} />
            <Route path="reviews" element={React.createElement(getRouteComponent('guestReviews'))} />
            <Route path="trips" element={React.createElement(getRouteComponent('guestTrips'))} />
            <Route path="trips/:tripId" element={React.createElement(getRouteComponent('guestTripDetails'))} />
            <Route path="wishlist" element={React.createElement(getRouteComponent('guestWishlist'))} />
          </Route>

          {/* Host Routes */}
          <Route path="host">
            <Route index element={React.createElement(getRouteComponent('hostDashboard'))} />
            <Route path="account" element={React.createElement(getRouteComponent('hostAccount'))} />
            <Route path="calendar" element={React.createElement(getRouteComponent('hostCalendar'))} />
            <Route path="earnings" element={React.createElement(getRouteComponent('hostEarnings'))} />
            <Route path="experiences" element={React.createElement(getRouteComponent('hostExperiences'))} />
            <Route path="listings" element={React.createElement(getRouteComponent('hostListings'))} />
            <Route path="messages" element={React.createElement(getRouteComponent('guestMessages'))} />
            <Route path="login-security" element={React.createElement(getRouteComponent('hostLoginSecurity'))} />
            <Route path="notifications" element={React.createElement(getRouteComponent('hostNotifications'))} />
            <Route path="payments" element={React.createElement(getRouteComponent('hostPayments'))} />
            <Route path="preferences" element={React.createElement(getRouteComponent('hostPreferences'))} />
            <Route path="privacy" element={React.createElement(getRouteComponent('hostPrivacy'))} />
            <Route path="profile" element={React.createElement(getRouteComponent('hostProfile'))} />
            <Route path="public-guest-profile/:guestId" element={React.createElement(getRouteComponent('hostPublicGuestProfile'))} />
            <Route path="public-host-profile/:hostId" element={React.createElement(getRouteComponent('hostPublicHostProfile'))} />
            <Route path="referrals" element={React.createElement(getRouteComponent('hostReferrals'))} />
            <Route path="settings" element={React.createElement(getRouteComponent('hostSettings'))} />
            <Route path="taxes" element={React.createElement(getRouteComponent('hostTaxes'))} />
            <Route path="travel-work" element={React.createElement(getRouteComponent('hostTravelWork'))} />
          </Route>
          
          {/* Common Dashboard Routes */}
          <Route path="add-property" element={React.createElement(getRouteComponent('dashboardAddProperty'))} />
          {/* <Route path="my-profile" element={React.createElement(getRouteComponent('dashboardMyProfile'))} />
            <Route path="my-properties" element={React.createElement(getRouteComponent('dashboardMyProperties'))} />
            <Route path="my-package" element={React.createElement(getRouteComponent('dashboardMyPackage'))} />
            <Route path="message" element={React.createElement(getRouteComponent('dashboardMessage'))} />
            <Route path="guidebook" element={React.createElement(getRouteComponent('dashboardGuidebook'))} />
            <Route path="my-favourites" element={React.createElement(getRouteComponent('dashboardMyFavourites'))} />
            <Route path="reviews" element={React.createElement(getRouteComponent('dashboardReviews'))} />
            <Route path="saved-search" element={React.createElement(getRouteComponent('dashboardSavedSearch'))} />
            <Route path="host-reviews" element={React.createElement(getRouteComponent('dashboardHostReviews'))} />
            <Route path="host-experiences" element={React.createElement(getRouteComponent('dashboardHostExperiences'))} />
            <Route path="earnings" element={React.createElement(getRouteComponent('dashboardEarnings'))} />
            <Route path="calender" element={React.createElement(getRouteComponent('dashboardCalender'))} />
            <Route path="aihost" element={React.createElement(getRouteComponent('dashboardAIHost'))} /> */}
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
} 