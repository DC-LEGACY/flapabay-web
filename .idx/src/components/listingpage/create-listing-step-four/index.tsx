import {
  FaBed,
  FaBox,
  FaBuilding,
  FaCaravan,
  FaDoorOpen,
  FaDungeon,
  FaFire,
  FaFortAwesome,
  FaGlobeAmericas,
  FaHome,
  FaHotel,
  FaHouseUser,
  FaIgloo,
  FaMountain,
  FaShip,
  FaTractor,
  FaUser,
  FaWater,
} from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const CreateListingStepFour = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Track selected option
  const options = [
    {
      label: "An entire place",
      description: "Quiet’s have the whole place to themselves.",
    },
    {
      label: "A room",
      description:
        "Quiet’s have their own room in a home, plus access to shared spaces.",
    },
    {
      label: "A shared room in a hostel",
      description:
        "Quiet’s sleep in a shared room in a professionally managed hostel with staff onsite 24/7.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full fixed top-0 bg-white left-0 flex justify-between items-center p-4 z-50">
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
      
      <div className="min-h-screen flex flex-col">
      {/* Header */}
      

      {/* Content */}
      <div className="min-h-screen mt-24 p-6">
        <div className="max-w-4xl mx-auto p-8">
          {/* Page Title */}
          <h1 className="text-2xl font-medium pb-8">
            What type of place will guests have?
          </h1>

          {/* List of Options */}
          <div className="space-y-4 pb-8">
            {options.map((option, index) => (
              <div
                key={index}
                className={`border border-gray-100 p-4 rounded-lg cursor-pointer transition duration-300 ${
                  selectedOption === option.label
                    ? "bg-[#FFC500]"
                    : "hover:bg-[#FFC500]"
                }`}
                onClick={() => setSelectedOption(option.label)} // Set selected option
              >
                <h2 className="text-lg font-semibold">{option.label}</h2>
                <p className="text-gray-600">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    
      
    </div>
      {/* Footer */}
      <div className="w-full left-0 fixed bottom-0 bg-white shadow-md flex flex-col">
        <div className="w-full h-1 bg-gray-300 rounded-full relative">
          <div
            className="absolute bg-[#FFC500] top-0 left-0 h-full rounded-full"
            style={{ width: "14%" }}
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <Link to={"/create-listing-step-three"}>
            <button className="flex items-center ml-4 underline font-medium">
              Back
            </button>
          </Link>
          <Link to={selectedOption ? "/create-listing-step-five" : "#"}>
            <button
              className={`mt-2 px-3 py-1 text-lg rounded-lg mb-2 mr-2 ${
                selectedOption
                  ? "bg-[#FFC500] text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!selectedOption} // Disable button if no option is selected
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateListingStepFour;