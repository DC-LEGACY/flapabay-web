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

    // Dashboard Pages
    dashboardHome: lazy(() => import('@/pages/(dashboard)/dashboard-home')),
    dashboardMyProfile: lazy(() => import('@/pages/(dashboard)/dashboard-my-profile')),
    dashboardMyProperties: lazy(() => import('@/pages/(dashboard)/dashboard-my-properties')),
    dashboardAddProperty: lazy(() => import('@/pages/(dashboard)/dashboard-add-property')),
    dashboardMyPackage: lazy(() => import('@/pages/(dashboard)/dashboard-my-package')),
    dashboardMessage: lazy(() => import('@/pages/(dashboard)/dashboard-message')),
    dashboardGuidebook: lazy(() => import('@/pages/(dashboard)/dashboard-guidebook')),
    dashboardMyFavourites: lazy(() => import('@/pages/(dashboard)/dashboard-my-favourites')),
    dashboardReviews: lazy(() => import('@/pages/(dashboard)/dashboard-reviews')),
    dashboardSavedSearch: lazy(() => import('@/pages/(dashboard)/dashboard-saved-search')),
    dashboardHostReviews: lazy(() => import('@/pages/(dashboard)/Dashboard-host-reviews')),
    dashboardHostExperiences: lazy(() => import('@/pages/(dashboard)/dashboard-host-experiences')),
    dashboardEarnings: lazy(() => import('@/pages/(dashboard)/dashboard-earnings')),
    dashboardCalender: lazy(() => import('@/pages/(dashboard)/dashboard-calender')),
    dashboardAIHost: lazy(() => import('@/pages/(dashboard)/dashboard-aihost')),
    cancellationOptions: lazy(() => import('@/pages/website/help-center/CancellationOptions')),
    // Help Center Pages
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
        <Route element={<DashboardLayoutWrapper />}>
          <Route path="/dashboard">
            <Route index element={React.createElement(getRouteComponent('dashboardHome'))} />
            <Route path="my-profile" element={React.createElement(getRouteComponent('dashboardMyProfile'))} />
            <Route path="my-properties" element={React.createElement(getRouteComponent('dashboardMyProperties'))} />
            <Route path="add-property" element={React.createElement(getRouteComponent('dashboardAddProperty'))} />
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
            <Route path="aihost" element={React.createElement(getRouteComponent('dashboardAIHost'))} />
          </Route>
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
} 