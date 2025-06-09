import { FaClone, FaHome, FaPlusSquare, FaTimes } from "react-icons/fa";

import { Link } from "react-router-dom";
import React from "react";

const CreateListing = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
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
      
      {/* Content */}
      <div className="mt-24 w-full max-w-3xl p-6">
        <h1 className="text-3xl font-bold">Welcome back, George</h1>
        
        {/* Finish Your Listing */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Finish your listing</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center p-4 border rounded-lg bg-white shadow-sm">
              <FaHome className="mr-3" /> Your House listing
            </div>
            <div className="flex items-center p-4 border rounded-lg bg-white shadow-sm">
              <FaHome className="mr-3" /> Your listing started December 16, 2024
            </div>
            <div className="flex items-center p-4 border rounded-lg bg-white shadow-sm">
              <FaHome className="mr-3" /> Your House listing
            </div>
            <a href="#" className=" underline">Show all</a>
          </div>
        </div>
        
        {/* Start a New Listing */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Start a new listing</h2> 
          <div className="mt-4 space-y-3">
          <Link to={"/create-listing-steps"} >     <div className="flex items-center p-4 border rounded-lg bg-white shadow-sm cursor-pointer">
              <FaPlusSquare className="mr-3" /> Create a new listing
            </div>
            </Link>
            <div className="flex items-center p-4 border rounded-lg bg-white shadow-sm cursor-pointer">
              <FaClone className="mr-3" /> Create from an existing listing
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
