import { Link } from "react-router-dom";
import React from "react";

const NewHostingJourneyPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white  z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link className="header-logo logo1" to="/">
                      <img src="/images/logo.svg" alt="Header Logo" />
                    </Link>

          {/* Exit Button */}
          <Link to={"/dashboard-experience"} className="text-gray-600 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-20 flex flex-col md:flex-row items-center pb-10">
        {/* Left Side: Photo */}
        <div className="w-full md:w-1/2">
          <img
            src="https://img.freepik.com/premium-photo/delicious-sweet-shu-cake-with-cream-nuts_73989-37006.jpg" // Replace with your photo path
            alt="Hosting Journey"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 md:pl-8 pt-6 md:mt-0">
          <h1 className="text-2xl font-bold pb-6">
            A new hosting journey starts here
          </h1>
          <p className="text-lg text-gray-700 pb-4">
            Submit your experience and it will be reviewed to make sure it meets
            the standards and requirements. Many factors go into whether an
            experience is approved. If your experience is approved, you'll be
            able to start hosting.
          </p>
          <Link to="/second-step-exp">
            <button className="bg-[#ffc500] text-white  px-7 py-2 rounded-full font-semibold hover:bg-[#e0b000] transition-colors">
              Let's go!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewHostingJourneyPage;