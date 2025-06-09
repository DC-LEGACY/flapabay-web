import { FaBed, FaCheckCircle, FaImages, FaTimes } from "react-icons/fa";

import { Link } from "react-router-dom";
import React from "react";

const CreateListingSteps = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {/* Fixed Header */}
      <header className="w-full fixed top-0 left-0 flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-black">
        <Link className="header-logo logo1" to="/">
                      <img
                       
                        src="/images/logo.svg"
                        alt="Header Logo"
                      />
                    </Link>
        </div>
        <button className="text-black text-sm flex items-center border border-gray-100 rounded-full px-3 py-2">
          Exit
        </button>
      </header>

      {/* Main Content */}
      <div className="flex  items-center justify-center flex-grow mt-20 px-6">
        <h1 className="text-4xl font-medium text-center w-[30%] mr-10">It’s easy to get started on FlapaBay</h1>
        
        <div className="mt-10 max-w-3xl w-full space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h2 className="text-lg font-semibold">1 Tell us about your place</h2>
              <p className="text-gray-600">Share some basic info, like where it is and how many guests can stay.</p>
            </div>
            <FaBed className="text-3xl text-black" />
          </div>
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h2 className="text-lg font-semibold">2 Make it stand out</h2>
              <p className="text-gray-600">Add 5 or more photos plus a title and description—we’ll help you out.</p>
            </div>
            <FaImages className="text-3xl text-black" />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">3 Finish up and publish</h2>
              <p className="text-gray-600">Choose a starting price, verify a few details, then publish your listing.</p>
            </div>
            <FaCheckCircle className="text-3xl text-black" />
          </div>
        </div>
      </div>
      
      {/* Bottom Step Progress & Button */}
      <div className="w-full left-0 fixed bottom-0 bg-white shadow-md flex flex-col items-end ">
        <div className="w-full h-1 bg-gray-300 rounded-full relative">
          <div className="absolute top-0 left-0 h-full  rounded-full"></div>
        </div>
        <Link to={"/create-listing-step-two"}>
        <button className="mt-2 px-3 py-2 bg-[#FFC500] text-white text-lg rounded-lg mb-2 mr-2">Get started</button>
        </Link>
      </div>
    </div>
  );
};

export default CreateListingSteps;