import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import NotFound from '@/pages/not-found';

// Main Pages
const Mainpage = lazy(() => import('@/pages/landing'));
const About = lazy(() => import('@/pages/pages/about'));
const Contact = lazy(() => import('@/pages/pages/contact'));
const Blog = lazy(() => import('@/pages/blog'));
const Compare = lazy(() => import('@/pages/pages/compare'));

// Help Center Pages
const HelpPage = lazy(() => import('@/pages/help-center'));
const FAQs = lazy(() => import('@/pages/help-center/FAQs'));
const PrivacyPolicy = lazy(() => import('@/pages/help-center/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/pages/help-center/TermsOfService'));
const CancellationOptions = lazy(() => import('@/pages/help-center/CancellationOptions'));
const Careers = lazy(() => import('@/pages/help-center/Careers'));
const MediaRoom = lazy(() => import('@/pages/help-center/MediaRoom'));
const NeighborhoodConcern = lazy(() => import('@/pages/help-center/NeighborhoodConcern'));
const SupportedCountries = lazy(() => import('@/pages/help-center/SupportedCountries'));

// Experience Pages
const ExperiencePage = lazy(() => import('@/components/experiences'));
const BecomeHost = lazy(() => import('@/pages/experiences/BecomeHost'));

// Property Listing Pages
const GridDefault = lazy(() => import('@/pages/listings/(grid-view)/grid-default'));
const GridFull1ColV1 = lazy(() => import('@/pages/listings/(grid-view)/grid-full-1-col-v1'));
const GridFull1ColV2 = lazy(() => import('@/pages/listings/(grid-view)/grid-full-1-col-v2'));
const GridFull2Col = lazy(() => import('@/pages/listings/(grid-view)/grid-full-2-col'));
const GridFull3Col = lazy(() => import('@/pages/listings/(grid-view)/grid-full-3-col'));
const GridFull4Col = lazy(() => import('@/pages/listings/(grid-view)/grid-full-4-col'));
const ListV1 = lazy(() => import('@/pages/listings/(list-view)/list-v1'));
const ListV1All = lazy(() => import('@/pages/listings/(list-view)/list-all-style'));

// Map Style Pages
const HeaderMapStyle = lazy(() => import('@/pages/listings/(map-style)/header-map-style'));
const MapV1 = lazy(() => import('@/pages/listings/(map-style)/map-v1'));
const MapV2 = lazy(() => import('@/pages/listings/(map-style)/map-v2'));
const MapV3 = lazy(() => import('@/pages/listings/(map-style)/map-v3'));
const MapV4 = lazy(() => import('@/pages/listings/(map-style)/map-v4'));

// Property Single View Pages
const SingleV1 = lazy(() => import('@/pages/property/(single-style)/single-v1'));
const SingleV2 = lazy(() => import('@/pages/property/(single-style)/single-v2'));
const SingleV3 = lazy(() => import('@/pages/property/(single-style)/single-v3'));
const SingleV4 = lazy(() => import('@/pages/property/(single-style)/single-v4'));
const SingleV5 = lazy(() => import('@/pages/property/(single-style)/single-v5'));
const SingleV6 = lazy(() => import('@/pages/property/(single-style)/single-v6'));
const SingleV7 = lazy(() => import('@/pages/property/(single-style)/single-v7'));
const SingleV8 = lazy(() => import('@/pages/property/(single-style)/single-v8'));
const SingleV9 = lazy(() => import('@/pages/property/(single-style)/single-v9'));
const SingleV10 = lazy(() => import('@/pages/property/(single-style)/single-v10'));

// Agent/Agency Pages
const Agents = lazy(() => import('@/pages/property/(agents)/agents'));
const Agency = lazy(() => import('@/pages/property/(agents)/agency'));
const AgencySingle = lazy(() => import('@/pages/property/(agents)/agency-single'));
const AgentSingle = lazy(() => import('@/pages/property/(agents)/agent-single'));

export function WebsiteRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          {/* Main Pages */}
          <Route index element={<Mainpage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="compare" element={<Compare />} />

          {/* Help Center Pages */}
          <Route path="help-center" element={<HelpPage />} />
          <Route path="help/faqs" element={<FAQs />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
          <Route path="help/cancellation" element={<CancellationOptions />} />
          <Route path="careers" element={<Careers />} />
          <Route path="media" element={<MediaRoom />} />
          <Route path="help/neighborhood" element={<NeighborhoodConcern />} />
          <Route path="help/countries" element={<SupportedCountries />} />

          {/* Experience Pages */}
          <Route path="experiences" element={<ExperiencePage />} />
          <Route path="flapabay-your-home" element={<BecomeHost />} />

          {/* Property Listing Pages */}
          <Route path="grid-default" element={<GridDefault />} />
          <Route path="grid-full-1-col-v1" element={<GridFull1ColV1 />} />
          <Route path="grid-full-1-col-v2" element={<GridFull1ColV2 />} />
          <Route path="grid-full-2-col" element={<GridFull2Col />} />
          <Route path="grid-full-3-col" element={<GridFull3Col />} />
          <Route path="grid-full-4-col" element={<GridFull4Col />} />
          <Route path="list-v1" element={<ListV1 />} />
          <Route path="list-all-style" element={<ListV1All />} />

          {/* Map Style Pages */}
          <Route path="header-map-style" element={<HeaderMapStyle />} />
          <Route path="map-v1" element={<MapV1 />} />
          <Route path="map-v2" element={<MapV2 />} />
          <Route path="map-v3" element={<MapV3 />} />
          <Route path="map-v4" element={<MapV4 />} />

          {/* Property Single View Pages */}
          <Route path="single-v1/:id" element={<SingleV1 />} />
          <Route path="single-v2/:id" element={<SingleV2 />} />
          <Route path="single-v3/:id" element={<SingleV3 />} />
          <Route path="single-v4/:id" element={<SingleV4 />} />
          <Route path="single-v5/:id" element={<SingleV5 />} />
          <Route path="single-v6/:id" element={<SingleV6 />} />
          <Route path="single-v7/:id" element={<SingleV7 />} />
          <Route path="single-v8/:id" element={<SingleV8 />} />
          <Route path="single-v9/:id" element={<SingleV9 />} />
          <Route path="single-v10/:id" element={<SingleV10 />} />

          {/* Agent/Agency Pages */}
          <Route path="agents" element={<Agents />} />
          <Route path="agency" element={<Agency />} />
          <Route path="agency-single/:id" element={<AgencySingle />} />
          <Route path="agent-single/:id" element={<AgentSingle />} />

          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
} 