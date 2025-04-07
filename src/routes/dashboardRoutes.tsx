import AddListing from "@/pages/dashboard/host/AddListing";
import MyBookings from "@/pages/dashboard/guest/MyBookings";
import MyListings from "@/pages/dashboard/host/MyListings";
import Profile from "@/pages/dashboard/guest/Profile";

export const guestDashboardRoutes = [
  { path: "/dashboard/home", element: <DashboardHome /> },
  { path: "/dashboard/message", element: <DashboardMessage /> },
  { path: "/dashboard/reviews", element: <DashboardReviews /> },
  { path: "/dashboard/my-favourites", element: <DashboardMyFavourites /> },
  { path: "/dashboard/my-profile", element: <DashboardMyProfile /> },
  { path: "/dashboard/saved-search", element: <DashboardSavedSearch /> },
  { path: "/dashboard/guidebook", element: <DashboardGuidebook /> },
  { path: "/dashboard/calender", element: <Dashboardcalender /> },
  { path: "/dashboard/earnings", element: <DashboardEarnings /> },
  { path: "/dashboard/my-package", element: <DashboardMyPackage /> },
];

export const hostDashboardRoutes = [
  { path: "/dashboard/host-dashboard", element: <Dashboard /> },
  { path: "/dashboard/my-properties", element: <DashboardMyProperties /> },
  { path: "/dashboard/add-property", element: <DashboardAddProperty /> },
  { path: "/dashboard/host/listings", element: <Listings /> },
  { path: "/dashboard/host/experiences", element: <DashboardExperiences /> },
  { path: "/dashboard/host/reviews", element: <DashboardHostReviews /> },
  { path: "/dashboard/host/aihost", element: <DashboardAiHost /> },
];
