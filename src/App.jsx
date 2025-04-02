import Mainpage from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/common/ScrollTop";
import Aos from "aos";
import "aos/dist/aos.css";
import "@/scss/main.scss";
import { useEffect } from "react";
import Home_V2 from "./pages/homes/home-v2";
import Home_V3 from "./pages/homes/home-v3";
import Home_V4 from "./pages/homes/home-v4";
import Home_V5 from "./pages/homes/home-v5";
import Home_V6 from "./pages/homes/home-v6";
import Home_V7 from "./pages/homes/home-v7";
import Home_V8 from "./pages/homes/home-v8";
import Home_V9 from "./pages/homes/home-v9";
import Home_V10 from "./pages/homes/home-v10";
import BannerSearchV1 from "./pages/listings/(grid-view)/banner-search-v1";
import BannerSearchV2 from "./pages/listings/(grid-view)/banner-search-v2";
import GridDefault from "./pages/listings/(grid-view)/grid-default";
import GridFull1ColV1 from "./pages/listings/(grid-view)/grid-full-1-col-v1";
import GridFull1ColV2 from "./pages/listings/(grid-view)/grid-full-1-col-v2";
import GridFull2Col from "./pages/listings/(grid-view)/grid-full-2-col";
import GridFull3Col from "./pages/listings/(grid-view)/grid-full-3-col";
import GridFull4Col from "./pages/listings/(grid-view)/grid-full-4-col";

import ListV1All from "./pages/listings/(list-view)/list-all-style";
import HeaderMapStyle from "./pages/listings/(map-style)/header-map-style";
import MapV1 from "./pages/listings/(map-style)/map-v1";
import MapV2 from "./pages/listings/(map-style)/map-v2";
import MapV3 from "./pages/listings/(map-style)/map-v3";
import MapV4 from "./pages/listings/(map-style)/map-v4";
import DashboardHome from "./pages/property/(dashboard)/dashboard-home";
import DashboardAddProperty from "./pages/property/(dashboard)/dashboard-add-property";
import DashboardMessage from "./pages/property/(dashboard)/dashboard-message";
import DashboardMyFavourites from "./pages/property/(dashboard)/dashboard-my-favourites";
import DashboardMyPackage from "./pages/property/(dashboard)/dashboard-my-package";
import DashboardMyProfile from "./pages/property/(dashboard)/dashboard-my-profile";
import DashboardMyProperties from "./pages/property/(dashboard)/dashboard-my-properties";
import DashboardReviews from "./pages/property/(dashboard)/dashboard-reviews";
import DashboardSavedSearch from "./pages/property/(dashboard)/dashboard-saved-search";
import Agents from "./pages/property/(agents)/agents";
import Agency from "./pages/property/(agents)/agency";
import BlogV1 from "./pages/blogs/blog-list-v1";
import BlogV2 from "./pages/blogs/blog-list-v2";
import BlogV3 from "./pages/blogs/blog-list-v3";
import About from "./pages/pages/about";
import Compare from "./pages/pages/compare";
import Contact from "./pages/pages/contact";
import Faq from "./pages/pages/faq";
import Invoice from "./pages/pages/invoice";
import Login from "./pages/pages/login";
import PricingPlan from "./pages/pages/pricing";
import Register from "./pages/register";
import NotFound from "./pages/not-found";
import BlogSingle from "./pages/blogs/blogs";
import SingleV1 from "./pages/property/(single-style)/single-v1";
import SingleV2 from "./pages/property/(single-style)/single-v2";
import SingleV3 from "./pages/property/(single-style)/single-v3";
import SingleV4 from "./pages/property/(single-style)/single-v4";
import SingleV5 from "./pages/property/(single-style)/single-v5";
import SingleV6 from "./pages/property/(single-style)/single-v6";
import SingleV7 from "./pages/property/(single-style)/single-v7";
import SingleV8 from "./pages/property/(single-style)/single-v8";
import SingleV9 from "./pages/property/(single-style)/single-v9";
import SingleV10 from "./pages/property/(single-style)/single-v10";
import AgentSingle from "./pages/property/(agents)/agent-single";
import AgencySingle from "./pages/property/(agents)/agency-single";
import ListV1 from "./pages/listings/(list-view)/list-v1";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import Unsubscribe from "./components/common/wizards-modal/Unsubscribe";
import Dashboardcalender from "./pages/property/(dashboard)/dashboard-calender";
import DashboardEarnings from "./pages/property/(dashboard)/dashboard-earnings";
import DashboardGuidebook from "./pages/property/(dashboard)/dashboard-guidebook";
import CreateListing from "./components/listingpage/create-listing";
import CreateListingSteps from "./components/listingpage/create-listing-step-one";
import Step1 from "./components/listingpage/create-listing-step-two";
import CreateListingStepTwo from "./components/listingpage/create-listing-step-two";
import CreateListingStepThree from "./components/listingpage/create-listing-step-three";
import CreateListingStepFour from "./components/listingpage/create-listing-step-four";
import CreateListingStepFive from "./components/listingpage/create-listing-step-five";
import CreateListingStepSix from "./components/listingpage/create-listing-step-six";
import CreateListingStepSeven from "./components/listingpage/create-listing-step-seven";
import CreateListingStepEight from "./components/listingpage/create-listing-step-eight";
import CreateListingStepNine from "./components/listingpage/create-listing-step-nine";
import CreateListingStepTen from "./components/listingpage/craete-listing-step-ten";
import CreateListingStepEleven from "./components/listingpage/create-listing-step-eleven";
import CreateListingStepTwelve from "./components/listingpage/create-listing-step-twelve";
import CreateListingStepThirteen from "./components/listingpage/create-listing-thirteen";
import CreateListingStepFourteen from "./components/listingpage/create-listing-step-fourteen";
import CreateListingStepFifteen from "./components/listingpage/create-listing-step-fifteen";
import CreateListingStepSixteen from "./components/listingpage/create-listing-step-sixteen";
import CreateListingStepSeventeen from "./components/listingpage/create-listing-step-seventeen";
import CreateListingStepEighteen from "./components/listingpage/create-listing-step-eighteen";
import CreateListingComplete from "./components/listingpage/complete-listing";
import SignupModal from "./components/auth/SignupModal";
import LoginModal from "./components/auth/LoginModal";
import ConfirmationModal from "./components/auth/ConfirmationModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DemoPage from "./components/experience-page/demo-page";
import NewHostingJourneyPage from "./components/experience-page/first-step";
import SubmitExperiencePage from "./components/experience-page/second-step-exp";
import TripsPage from "./components/trip-page";
import WishlistPage from "./components/wishlist-page";
import RecentlyViewed from "./components/wishlist-page-recently";
import AccountPage from "./components/account-page";
import BookingPage from "./components/booking-page";
import ConfirmAndPay from "./components/payment-page";
import ReservationPage from "./components/reservation-page";
import HelpPage from "./components/help-center";
import BottomNav from "./components/bottom-nav";

import { useSetAtom } from "jotai";
import { userAtom } from "./context/atom";
import ExperiencePage from "./components/experiences";
import BecomeHost from "./components/experiences/BecomeHost";
import HostDashboard from "./components/dashboard/HostDashboard";
import { AuthProvider } from "./components/contexts/AuthContext";
import { ThemeProvider } from "./components/contexts/ThemeContext";
import Dashboard from "./components/dashboard/host/Dashboard";
import Listings from "./components/dashboard/host/Listings";
import DashboardExperiences from "./pages/property/(dashboard)/dashboard-host-experiences";
import DashboardHostReviews from "./pages/property/(dashboard)/Dashboard-host-reviews";
import DashboardAiHost from "./pages/property/(dashboard)/dashboard-aihost";






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
              <Route path="home-v2" element={<Home_V2 />} />
              <Route path="home-v3" element={<Home_V3 />} />
              <Route path="home-v4" element={<Home_V4 />} />
              <Route path="home-v5" element={<Home_V5 />} />
              <Route path="home-v6" element={<Home_V6 />} />
              <Route path="home-v7" element={<Home_V7 />} />
              <Route path="home-v8" element={<Home_V8 />} />
              <Route path="home-v9" element={<Home_V9 />} />
              <Route path="home-v10" element={<Home_V10 />} />
              <Route path="experiences" element={<ExperiencePage />} />
              <Route path="flapabay-your-home" element={<BecomeHost />} />
              <Route path="host-dashboard" element={<HostDashboard />} />
              <Route path="dashboard-host-dashboard" element={<Dashboard />} />
              <Route path="dashboard-host-listings" element={<Listings />} />
              <Route path="dashboard-host-Experiences" element={<DashboardExperiences />} />
              <Route path="dashboard-host-reviews" element={<DashboardHostReviews />} />
              <Route path="dashboard-host-aihost" element={<DashboardAiHost />} />
              
              

              <Route path="grid-default" element={<GridDefault />} />
              <Route path="grid-full-3-col" element={<GridFull3Col />} />
              <Route path="grid-full-4-col" element={<GridFull4Col />} />
              <Route path="grid-full-2-col" element={<GridFull2Col />} />
              <Route path="grid-full-1-col-v1" element={<GridFull1ColV1 />} />
              <Route path="grid-full-1-col-v2" element={<GridFull1ColV2 />} />
              <Route path="banner-search-v1" element={<BannerSearchV1 />} />
              <Route path="banner-search-v2" element={<BannerSearchV2 />} />
              <Route path="list-all-style" element={<ListV1All />} />
              <Route path="list-v1" element={<ListV1 />} />

              <Route path="header-map-style" element={<HeaderMapStyle />} />
              <Route path="map-v1" element={<MapV1 />} />
              <Route path="map-v2" element={<MapV2 />} />
              <Route path="map-v3" element={<MapV3 />} />
              <Route path="map-v4" element={<MapV4 />} />

              <Route path="dashboard-home" element={<DashboardHome />} />
              <Route path="dashboard-message" element={<DashboardMessage />} />
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
              <Route path="dashboard-reviews" element={<DashboardReviews />} />
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
                element={<Dashboardcalender/>}
              />
              <Route
                path="dashboard-earnings"
                element={<DashboardEarnings/>}
              />
              <Route
                path="dashboard-guidebook"
                element={<DashboardGuidebook/>}
              />
              <Route
                path="dashboard-experience"
                element={<DemoPage/>}
              />
              <Route
                path="first-step-exp"
                element={<NewHostingJourneyPage/>}
              />
              <Route
                path="second-step-exp"
                element={<SubmitExperiencePage/>}
              />
              <Route
                path="trip-page"
                element={<TripsPage/>}
              />
              <Route
                path="whishlist-page"
                element={<WishlistPage/>}
              />
              <Route
                path="wishlist-page-recently"
                element={<RecentlyViewed/>}
              />
              <Route
                path="account-page"
                element={<AccountPage/>}
              />
              <Route
                path="payment-page"
                element={<ConfirmAndPay/>}
              />
              <Route
                path="help-center"
                element={<HelpPage/>}
              />

              <Route path="agents" element={<Agents />} />
              <Route path="agency" element={<Agency />} />
              <Route path="agency-single/:id" element={<AgencySingle />} />
              <Route path="agent-single/:id" element={<AgentSingle />} />

              <Route path="blog-list-v1" element={<BlogV1 />} />
              <Route path="blog-list-v2" element={<BlogV2 />} />
              <Route path="blog-list-v3" element={<BlogV3 />} />
              <Route path="blogs/:id" element={<BlogSingle />} />

              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="compare" element={<Compare />} />
              <Route path="pricing" element={<PricingPlan />} />
              <Route path="faq" element={<Faq />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="not-found" element={<NotFound />} />
              <Route path="invoice" element={<Invoice />} />

              <Route path="create-listing" element={<CreateListing/>} />
              <Route path="create-listing-steps" element={<CreateListingSteps/>} />
              
              <Route path="create-listing-step-two" element={<CreateListingStepTwo/>} />
              <Route path="create-listing-step-three" element={<CreateListingStepThree/>} />
              <Route path="create-listing-step-four" element={<CreateListingStepFour/>} />
              <Route path="create-listing-step-five" element={<CreateListingStepFive/>} />
              <Route path="create-listing-step-six" element={<CreateListingStepSix/>} />
              <Route path="create-listing-step-seven" element={<CreateListingStepSeven/>} />
              <Route path="create-listing-step-eight" element={<CreateListingStepEight/>} />
              <Route path="create-listing-step-nine" element={<CreateListingStepNine/>} />
              <Route path="create-listing-step-ten" element={<CreateListingStepTen/>} />
              <Route path="create-listing-step-eleven" element={<CreateListingStepEleven/>} />
              <Route path="create-listing-step-twelve" element={<CreateListingStepTwelve/>} />
              <Route path="create-listing-step-thirteen" element={<CreateListingStepThirteen/>} />
              <Route path="create-listing-step-fourteen" element={<CreateListingStepFourteen/>} />
              <Route path="create-listing-step-fifteen" element={<CreateListingStepFifteen/>} />
              <Route path="create-listing-step-sixteen" element={<CreateListingStepSixteen/>} />
              <Route path="create-listing-step-seventeen" element={<CreateListingStepSeventeen/>} />
              <Route path="create-listing-step-eighteen" element={<CreateListingStepEighteen/>} />
              <Route path="complete-listing" element={<CreateListingComplete/>} />



              <Route path="sign-up-here" element={<SignupModal/>} />
              <Route path="sign-in-here" element={<LoginModal/>} />
              <Route path="confirmation-modal" element={<ConfirmationModal/>} />

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
              <Route path="wizards" element={<Unsubscribe/>} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>

           <BottomNav/>


        
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
