import { Link } from "react-router-dom";
import { useState } from "react";

export default function ReservationPage() {
  return (
<>

<header className="w-full bg-white z-50 fixed shadow-sm top-0 left-0 flex justify-between items-center p-2 px-4">
        <div className="text-2xl font-bold text-black">
          <Link className="header-logo logo1" to="/">
            <img src="/images/logo.svg" alt="Header Logo" />
          </Link>
        </div>
        <Link to={"/payment-page"}>
        <button className="text-black text-sm flex items-center border border-gray-100 rounded-full px-3 py-2">
          Exit
        </button>
        </Link>
      </header>


    <div className="flex items-center justify-center min-h-screen  px-4">
      <div className="bg-white rounded-2xl  flex flex-col md:flex-row p-6 w-full max-w-4xl">
        
        {/* Left Section */}
        <div className="md:w-1/2 bg-white rounded-lg overflow-hidden shadow-md">
          <div className="relative w-full h-60 bg-gray-300 rounded-lg">
            {/* Custom Placeholder Image */}
            <img
              src="https://photo-works.net/images/europe-landscape-photo-edited.jpg"
              alt="Guesthouse"
              className="w-full h-full object-cover rounded-lg"
            />
            <span className="absolute top-2 left-2 bg-white px-2 py-1 text-xs font-semibold rounded-full shadow">
              Pending
            </span>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold">
              Guesthouse in Kecamatan Sidemen
            </h2>
            <p className="text-gray-500 text-sm">Jan 1 – 6, 2025</p>
            <div className="mt-2 text-black text-sm">
              <p>1 guest</p>
              <p className="font-semibold">$107.21 total</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 flex flex-col justify-center items-center text-center pt-4 px-6">
          <h2 className="text-2xl font-semibold">Your reservation is pending</h2>
          <p className="text-gray-500 mt-2">Your Host has 24 hours to confirm.</p>
          <Link to={"/"}>
          <button className="mt-4 bg-black text-white px-6 py-2 rounded-lg font-medium">
            Got it
          </button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
