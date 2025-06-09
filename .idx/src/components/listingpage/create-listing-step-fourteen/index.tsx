import { FiArrowLeft, FiArrowRight, FiBookOpen, FiZap } from "react-icons/fi";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const CreateListingStepFourteen = () => {
  const [imageVisible, setImageVisible] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full fixed top-0 left-0 flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-black">
          <Link className="header-logo logo1" to="/">
            <img src="/images/logo.svg" alt="Header Logo" />
          </Link>
        </div>
        <button className="text-sm flex items-center border border-gray-100 rounded-full px-3 py-2">
          Save & exit
        </button>
      </header>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center mt-20">
        <div className="max-w-lg">
        
          <h1 className="text-4xl font-medium mt-2">Pick your booking settings</h1>
          <p className="text-gray-500 mt-4">
            You can change this at any time. Learn more
          </p>

          <div className="pt-6">
            <div
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedOption === "approve" ? "bg-[#FFC500] border-[#FFC500]" : "bg-white border-gray-200"
              }`}
              onClick={() => handleOptionSelect("approve")}
            >
              <div className="flex items-center">
                <FiBookOpen className={`w-6 h-6 ${selectedOption === "approve" ? "text-black" : "text-black"}`} />
                <h3 className="font-semibold ml-2">Approve your first 5 bookings</h3>
              </div>
              <p className="text-gray-500 mt-2">
                Recommended. Don’t try reading your own books on yourself, know what to do faster,
                look up against our book automatically.
              </p>
            </div>

            <div
              className={`p-4 border rounded-lg mt-4 cursor-pointer ${
                selectedOption === "instant" ? "bg-[#FFC500] border-[#FFC500]" : "bg-white border-gray-200"
              }`}
              onClick={() => handleOptionSelect("instant")}
            >
              <div className="flex items-center">
                <FiZap className={`w-6 h-6 ${selectedOption === "instant" ? "text-black": "text-black"}`} />
                <h3 className="font-semibold ml-2">Use Instant Book</h3>
              </div>
              <p className="text-gray-500 mt-2">Let quiet book automatically.</p>
            </div>
          </div>
        </div>

        {/* Animated Image */}
        
      </div>

      {/* Footer */}
      <div className="w-full left-0 fixed bottom-0 bg-white shadow-md flex flex-col">
        <div className="w-full h-1 bg-gray-300 rounded-full relative">
          <div
            className="absolute bg-[#FFC500] top-0 left-0 h-full rounded-full"
            style={{ width: "70%" }} // Adjust progress bar width as needed
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <Link to={"/create-listing-step-thirteen"}>
            <button className="flex items-center ml-4 underline font-medium">
              Back
            </button>
          </Link>
          <Link to={"/create-listing-step-fifteen"}>
            <button
              className={`mt-2 px-3 py-1 text-lg rounded-lg mb-2 mr-2 bg-[#FFC500] text-white flex items-center ${
                !selectedOption ? " bg-slate-400 opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!selectedOption}
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateListingStepFourteen;