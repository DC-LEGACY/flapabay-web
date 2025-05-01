import "aos/dist/aos.css";
import "@/scss/main.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import About from "@/pages/pages/about";
import AccountPage from "@/components/account-page";
import Agency from "./pages/property/(agents)/agency";
import AgencySingle from "./pages/property/(agents)/agency-single";
import AgentSingle from "./pages/property/(agents)/agent-single";
import Agents from "./pages/property/(agents)/agents";
import Aos from "aos";
import { AuthProvider } from "@/components/contexts/AuthContext";
import BannerSearchV1 from "./pages/listings/(grid-view)/banner-search-v1";
import BannerSearchV2 from "./pages/listings/(grid-view)/banner-search-v2";
import BecomeHost from "@/pages/experiences/BecomeHost";
import Blog from "@/pages/blog";
import BookingPage from "./components/booking-page";
import BottomNav from "./components/bottom-nav";
import CancellationOptions from "@/pages/help-center/CancellationOptions";
import Careers from "@/pages/help-center/Careers";
import Compare from "./pages/pages/compare";
import ConfirmAndPay from "./components/payment-page";
import ConfirmationModal from "./components/auth/ConfirmationModal";
import Contact from "@/pages/pages/contact";
import CreateListing from "./components/listingpage/create-listing";
import CreateListingComplete from "./components/listingpage/complete-listing";
import CreateListingStepEight from "./components/listingpage/create-listing-step-eight";
import CreateListingStepEighteen from "./components/listingpage/create-listing-step-eighteen";
import CreateListingStepEleven from "./components/listingpage/create-listing-step-eleven";
import CreateListingStepFifteen from "./components/listingpage/create-listing-step-fifteen";
import CreateListingStepFive from "./components/listingpage/create-listing-step-five";
import CreateListingStepFour from "./components/listingpage/create-listing-step-four";
import CreateListingStepFourteen from "./components/listingpage/create-listing-step-fourteen";
import CreateListingStepNine from "./components/listingpage/create-listing-step-nine";
import CreateListingStepSeven from "./components/listingpage/create-listing-step-seven";
import CreateListingStepSeventeen from "./components/listingpage/create-listing-step-seventeen";
import CreateListingStepSix from "./components/listingpage/create-listing-step-six";
import CreateListingStepSixteen from "./components/listingpage/create-listing-step-sixteen";
import CreateListingStepTen from "./components/listingpage/craete-listing-step-ten";
import CreateListingStepThirteen from "./components/listingpage/create-listing-thirteen";
import CreateListingStepThree from "./components/listingpage/create-listing-step-three";
import CreateListingStepTwelve from "./components/listingpage/create-listing-step-twelve";
import CreateListingStepTwo from "./components/listingpage/create-listing-step-two";
import CreateListingSteps from "./components/listingpage/create-listing-step-one";
import Dashboard from "./components/dashboard/host/Dashboard";
import DashboardAddProperty from "./pages/property/(dashboard)/dashboard-add-property";
import DashboardAiHost from "./pages/property/(dashboard)/dashboard-aihost";
import DashboardEarnings from "./pages/property/(dashboard)/dashboard-earnings";
import DashboardExperiences from "./pages/property/(dashboard)/dashboard-host-experiences";
import DashboardGuidebook from "./pages/property/(dashboard)/dashboard-guidebook";
import DashboardHome from "./pages/property/(dashboard)/dashboard-home";
import DashboardHostReviews from "./pages/property/(dashboard)/Dashboard-host-reviews";
import DashboardMessage from "./pages/property/(dashboard)/dashboard-message";
import DashboardMyFavourites from "./pages/property/(dashboard)/dashboard-my-favourites";
import DashboardMyPackage from "./pages/property/(dashboard)/dashboard-my-package";
import DashboardMyProfile from "./pages/property/(dashboard)/dashboard-my-profile";
import DashboardMyProperties from "./pages/property/(dashboard)/dashboard-my-properties";
import DashboardReviews from "./pages/property/(dashboard)/dashboard-reviews";
import DashboardSavedSearch from "./pages/property/(dashboard)/dashboard-saved-search";
import Dashboardcalender from "./pages/property/(dashboard)/dashboard-calender";
import DemoPage from "./components/experience-page/demo-page";
import ExperiencePage from "./components/experiences";
import FAQs from "@/pages/help-center/FAQs";
import GridDefault from "./pages/listings/(grid-view)/grid-default";
import GridFull1ColV1 from "./pages/listings/(grid-view)/grid-full-1-col-v1";
import GridFull1ColV2 from "./pages/listings/(grid-view)/grid-full-1-col-v2";
import GridFull2Col from "./pages/listings/(grid-view)/grid-full-2-col";
import GridFull3Col from "./pages/listings/(grid-view)/grid-full-3-col";
import GridFull4Col from "./pages/listings/(grid-view)/grid-full-4-col";
import HeaderMapStyle from "./pages/listings/(map-style)/header-map-style";
import HelpPage from "@/pages/help-center";
import HostDashboard from "./components/dashboard/HostDashboard";
import Invoice from "./pages/pages/invoice";
import ListV1 from "./pages/listings/(list-view)/list-v1";
import ListV1All from "./pages/listings/(list-view)/list-all-style";
import Listings from "./components/dashboard/host/Listings";
import Login from "./pages/pages/login";
import LoginModal from "./components/auth/LoginModal";
import Mainpage from "./pages";
import MapV1 from "./pages/listings/(map-style)/map-v1";
import MapV2 from "./pages/listings/(map-style)/map-v2";
import MapV3 from "./pages/listings/(map-style)/map-v3";
import MapV4 from "./pages/listings/(map-style)/map-v4";
import MediaRoom from "@/pages/help-center/MediaRoom";
import NeighborhoodConcern from "@/pages/help-center/NeighborhoodConcern";
import NewHostingJourneyPage from "./components/experience-page/first-step";
import NotFound from "@/pages/not-found";
import PrivacyPolicy from "@/pages/help-center/PrivacyPolicy";
import RecentlyViewed from "./components/wishlist-page-recently";
import Register from "./pages/register";
import ReservationPage from "./components/reservation-page";
import ScrollToTop from "@/components/common/ScrollTop";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import SignupModal from "./components/auth/SignupModal";
import SingleV1 from "./pages/property/(single-style)/single-v1";
import SingleV10 from "./pages/property/(single-style)/single-v10";
import SingleV2 from "./pages/property/(single-style)/single-v2";
import SingleV3 from "./pages/property/(single-style)/single-v3";
import SingleV4 from "./pages/property/(single-style)/single-v4";
import SingleV5 from "./pages/property/(single-style)/single-v5";
import SingleV6 from "./pages/property/(single-style)/single-v6";
import SingleV7 from "./pages/property/(single-style)/single-v7";
import SingleV8 from "./pages/property/(single-style)/single-v8";
import SingleV9 from "./pages/property/(single-style)/single-v9";
import Step1 from "./components/listingpage/create-listing-step-two";
import SubmitExperiencePage from "./components/experience-page/second-step-exp";
import SupportedCountries from "@/pages/help-center/SupportedCountries";
import TermsOfService from "@/pages/help-center/TermsOfService";
import { ThemeProvider } from "./components/contexts/ThemeContext";
import TripsPage from "./components/trip-page";
import Unsubscribe from "./components/common/wizards-modal/Unsubscribe";
import WishlistPage from "./components/wishlist-page";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { userAtom } from "./context/atom";

if (typeof window !== "undefined") {
  import("bootstrap");
}

function App() {
  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const queryClient = new QueryClient();

  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <div className="wrapper ovh">
              <BrowserRouter>
                <ScrollTopBehaviour />
                <Routes>
                  <Route path="/">
                    <Route index element={<Mainpage />} />

                    <Route path="experiences" element={<ExperiencePage />} />
                    <Route
                      path="/help/neighborhood"
                      element={<NeighborhoodConcern />}
                    />
                    <Route
                      path="/help/countries"
                      element={<SupportedCountries />}
                    />

                    <Route path="/help/countries"
                      element={<SupportedCountries />}
                    />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/help/faqs" element={<FAQs />} />
                    <Route path="/help/cancellation" element={<CancellationOptions />} />
                    <Route path="/media" element={<MediaRoom />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="flapabay-your-home" element={<BecomeHost />} />
                    <Route path="host-dashboard" element={<HostDashboard />} />
                    <Route
                      path="dashboard-host-dashboard"
                      element={<Dashboard />}
                    />
                    <Route
                      path="dashboard-host-listings"
                      element={<Listings />}
                    />
                    <Route
                      path="dashboard-host-Experiences"
                      element={<DashboardExperiences />}
                    />
                    <Route
                      path="dashboard-host-reviews"
                      element={<DashboardHostReviews />}
                    />
                    <Route
                      path="dashboard-host-aihost"
                      element={<DashboardAiHost />}
                    />

                    <Route path="grid-default" element={<GridDefault />} />
                    <Route path="grid-full-3-col" element={<GridFull3Col />} />
                    <Route path="grid-full-4-col" element={<GridFull4Col />} />
                    <Route path="grid-full-2-col" element={<GridFull2Col />} />
                    <Route
                      path="grid-full-1-col-v1"
                      element={<GridFull1ColV1 />}
                    />
                    <Route
                      path="grid-full-1-col-v2"
                      element={<GridFull1ColV2 />}
                    />
                    <Route
                      path="banner-search-v1"
                      element={<BannerSearchV1 />}
                    />
                    <Route
                      path="banner-search-v2"
                      element={<BannerSearchV2 />}
                    />
                    <Route path="list-all-style" element={<ListV1All />} />
                    <Route path="list-v1" element={<ListV1 />} />

                    <Route
                      path="header-map-style"
                      element={<HeaderMapStyle />}
                    />
                    <Route path="map-v1" element={<MapV1 />} />
                    <Route path="map-v2" element={<MapV2 />} />
                    <Route path="map-v3" element={<MapV3 />} />
                    <Route path="map-v4" element={<MapV4 />} />

                    <Route path="dashboard-home" element={<DashboardHome />} />
                    <Route
                      path="dashboard-message"
                      element={<DashboardMessage />}
                    />
                    <Route
                      path="dashboard-add-property"
                      element={<DashboardAddProperty />}
                    />
                    <Route
                      path="dashboard-my-properties"
                      element={<DashboardMyProperties />}
                    />
                    <Route
                      path="reservation-page"
                      element={<ReservationPage />}
                    />
                    <Route
                      path="dashboard-my-favourites"
                      element={<DashboardMyFavourites />}
                    />
                    <Route
                      path="dashboard-saved-search"
                      element={<DashboardSavedSearch />}
                    />
                    <Route
                      path="dashboard-reviews"
                      element={<DashboardReviews />}
                    />
                    <Route
                      path="dashboard-my-package"
                      element={<DashboardMyPackage />}
                    />
                    <Route
                      path="dashboard-my-profile"
                      element={<DashboardMyProfile />}
                    />
                    <Route
                      path="dashboard-calender"
                      element={<Dashboardcalender />}
                    />
                    <Route
                      path="dashboard-earnings"
                      element={<DashboardEarnings />}
                    />
                    <Route
                      path="dashboard-guidebook"
                      element={<DashboardGuidebook />}
                    />
                    <Route path="dashboard-experience" element={<DemoPage />} />
                    <Route
                      path="first-step-exp"
                      element={<NewHostingJourneyPage />}
                    />
                    <Route
                      path="second-step-exp"
                      element={<SubmitExperiencePage />}
                    />
                    <Route path="trip-page" element={<TripsPage />} />
                    <Route path="whishlist-page" element={<WishlistPage />} />
                    <Route
                      path="wishlist-page-recently"
                      element={<RecentlyViewed />}
                    />
                    <Route path="account-page" element={<AccountPage />} />
                    <Route path="payment-page" element={<ConfirmAndPay />} />
                    <Route path="/help-center" element={<HelpPage />} />

                    <Route path="agents" element={<Agents />} />
                    <Route path="agency" element={<Agency />} />
                    <Route
                      path="agency-single/:id"
                      element={<AgencySingle />}
                    />
                    <Route path="agent-single/:id" element={<AgentSingle />} />
                    <Route path="/blog" element={<Blog />} />
                    

                    <Route path="about" element={<About />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="not-found" element={<NotFound />} />
                    <Route path="invoice" element={<Invoice />} />

                    <Route path="create-listing" element={<CreateListing />} />
                    <Route
                      path="create-listing-steps"
                      element={<CreateListingSteps />}
                    />

                    <Route
                      path="create-listing-step-two"
                      element={<CreateListingStepTwo />}
                    />
                    <Route
                      path="create-listing-step-three"
                      element={<CreateListingStepThree />}
                    />
                    <Route
                      path="create-listing-step-four"
                      element={<CreateListingStepFour />}
                    />
                    <Route
                      path="create-listing-step-five"
                      element={<CreateListingStepFive />}
                    />
                    <Route
                      path="create-listing-step-six"
                      element={<CreateListingStepSix />}
                    />
                    <Route
                      path="create-listing-step-seven"
                      element={<CreateListingStepSeven />}
                    />
                    <Route
                      path="create-listing-step-eight"
                      element={<CreateListingStepEight />}
                    />
                    <Route
                      path="create-listing-step-nine"
                      element={<CreateListingStepNine />}
                    />
                    <Route
                      path="create-listing-step-ten"
                      element={<CreateListingStepTen />}
                    />
                    <Route
                      path="create-listing-step-eleven"
                      element={<CreateListingStepEleven />}
                    />
                    <Route
                      path="create-listing-step-twelve"
                      element={<CreateListingStepTwelve />}
                    />
                    <Route
                      path="create-listing-step-thirteen"
                      element={<CreateListingStepThirteen />}
                    />
                    <Route
                      path="create-listing-step-fourteen"
                      element={<CreateListingStepFourteen />}
                    />
                    <Route
                      path="create-listing-step-fifteen"
                      element={<CreateListingStepFifteen />}
                    />
                    <Route
                      path="create-listing-step-sixteen"
                      element={<CreateListingStepSixteen />}
                    />
                    <Route
                      path="create-listing-step-seventeen"
                      element={<CreateListingStepSeventeen />}
                    />
                    <Route
                      path="create-listing-step-eighteen"
                      element={<CreateListingStepEighteen />}
                    />
                    <Route
                      path="complete-listing"
                      element={<CreateListingComplete />}
                    />

                    <Route path="sign-up-here" element={<SignupModal />} />
                    <Route path="sign-in-here" element={<LoginModal />} />
                    <Route
                      path="confirmation-modal"
                      element={<ConfirmationModal />}
                    />

                    <Route path="single-v1/:id" element={<SingleV1 />} />
                    <Route path="booking-page/:id" element={<BookingPage />} />
                    <Route path="single-v2/:id" element={<SingleV2 />} />
                    <Route path="single-v3/:id" element={<SingleV3 />} />
                    <Route path="single-v4/:id" element={<SingleV4 />} />
                    <Route path="single-v5/:id" element={<SingleV5 />} />
                    <Route path="single-v6/:id" element={<SingleV6 />} />
                    <Route path="single-v7/:id" element={<SingleV7 />} />
                    <Route path="single-v8/:id" element={<SingleV8 />} />
                    <Route path="single-v9/:id" element={<SingleV9 />} />
                    <Route path="single-v10/:id" element={<SingleV10 />} />
                    <Route path="wizards" element={<Unsubscribe />} />

                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>

                <BottomNav />
              </BrowserRouter>
              <ScrollToTop />
            </div>
          </QueryClientProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
