import React from 'react';
import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import Pagination from "@/components/property/Pagination";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import ListingsFavourites from "@/components/guest/dashboard/favorites/ListingsFavourites";
import MetaData from "@/components/common/MetaData";
import Reservations from "@/components/dashboard/host/Reservations";

const metaInformation = {
  title: "My Favorites || Flapabay- Apartment Rental, Experiences and More!",
};

// Mock data - replace with actual data from your backend
const mockFavorites = [
  {
    id: '1',
    title: 'Luxury Beach House',
    location: 'Miami Beach, FL',
    rating: 4.8,
    imageUrl: '/images/properties/1.jpg'
  },
  {
    id: '2',
    title: 'Mountain View Cabin',
    location: 'Aspen, CO',
    rating: 4.9,
    imageUrl: '/images/properties/2.jpg'
  },
  // Add more mock data as needed
];

const DashboardMyFavourites = () => {
  const handleRemoveFavorite = (id) => {
    // Implement remove favorite functionality
    console.log('Removing favorite:', id);
  };

  return (
    <>
      <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DashboardHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* dashboard_content_wrapper */}
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row pb40">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="p-6 bg-white rounded-lg shadow-sm">
                    <h1 className="text-2xl font-semibold mb-6">My Favorites</h1>
                    <ListingsFavourites
                      favorites={mockFavorites}
                      onRemoveFavorite={handleRemoveFavorite}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* End .dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardMyFavourites;
