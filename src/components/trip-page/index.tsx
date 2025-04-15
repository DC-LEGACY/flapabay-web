import DashboardHeader from "../common/DashboardHeader";
import { Link } from "react-router-dom";
import MobileMenu from "../common/mobile-menu";
import { useState } from "react";

export default function TripsPage() {
  // Dummy trip data (replace with real API data)
  const trips = [
    {
      title: "Guesthouse in Kecamatan Sidemen",
      date: "Jan 1 – 6, 2025",
      host: "Hosted by Cegeng Lestari Guesthouse",
      location: "Kecamatan Sidemen, Bali, Indonesia",
      image: "data:image/jpeg;base64,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", // Replace with actual image path
      upcoming: "In 2 months",
    },
  ];

  return (
    <>
      <DashboardHeader />
      <MobileMenu />
      <div className="max-w-6xl mx-auto sm:mt-2 md:mt-2 lg:mt-28 px-4">
        <h1 className="text-3xl font-bold">Trips</h1>

        {trips.length === 0 ? (
          // If no trips booked
          <div className="max-w-2xl mx-auto mt-8 text-center">
            <p className="text-lg font-semibold">No trips booked...yet!</p>
            <p className="text-gray-600 mt-2">
              Time to dust off your bags and start planning your next adventure.
            </p>
            <div className="pb-4 pt-4">
              <Link to={"/"}>
                <button className="px-6 py-2 border border-black font-medium rounded-lg text-black hover:bg-gray-100">
                  Start searching
                </button>
              </Link>
            </div>
            <p className="pt-10 text-gray-600">
              Can’t find your reservation here?{" "}
              <a href="#" className="text-black font-semibold underline">
                Visit the Help Center
              </a>
            </p>
          </div>
        ) : (
          // If trips exist, show upcoming reservations
          <>
            {/* Upcoming Reservations */}
            <h2 className="text-xl font-semibold pt-8">Upcoming reservations</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden mt-4 flex">
              {/* Left Section */}
              <div className="p-6 flex-1">
                <h3 className="text-lg font-semibold">{trips[0].title}</h3>
                <p className="text-gray-500">{trips[0].date}</p>
                <p className="text-black mt-2">{trips[0].host}</p>
                <p className="text-black">{trips[0].location}</p>
              </div>
              {/* Right Section (Image) */}
              <div className="w-1/3 relative">
                <img
                  src={trips[0].image}
                  alt="Trip"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 bg-white px-2 py-1 text-xs font-semibold rounded-full shadow">
                  {trips[0].upcoming}
                </span>
              </div>
            </div>

            {/* Experiences Section */}
            <h2 className="text-xl font-semibold pt-8">
              Experiences for your Kecamatan Sidemen trip
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-10 mt-4">
              {/* Dummy images for experiences */}

              <Link to={"/"}>
              <img
                src="https://photo-works.net/images/europe-landscape-photo-edited.jpg"
                alt="Experience 1"
                className="w-full h-48 object-cover rounded-lg"
              />
              </Link>
              <Link to={"/"}>
              <img
                src="https://photo-works.net/images/europe-landscape-photo-edited.jpg"
                alt="Experience 2"
                className="w-full h-48 object-cover rounded-lg"
              />
              </Link>
              <Link to={"/"}>
              <img
                src="https://photo-works.net/images/europe-landscape-photo-edited.jpg"
                alt="Experience 3"
                className="w-full h-48 object-cover rounded-lg"
              />
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
