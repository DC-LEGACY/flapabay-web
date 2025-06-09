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

const CreateListingStepThree = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Track selected option
  const options = [
    { label: "Home", icon: <FaHome className="w-6 h-6" /> },
    { label: "Apartment", icon: <FaBuilding className="w-6 h-6" /> },
    { label: "Burn", icon: <FaFire className="w-6 h-6" /> },
    { label: "Bed & breakfast", icon: <FaBed className="w-6 h-6" /> },
    { label: "Boat", icon: <FaShip className="w-6 h-6" /> },
    { label: "Calvin", icon: <FaUser className="w-6 h-6" /> },
    { label: "Camper/RV", icon: <FaCaravan className="w-6 h-6" /> },
    { label: "Casa particular", icon: <FaHouseUser className="w-6 h-6" /> },
    { label: "Castle", icon: <FaFortAwesome className="w-6 h-6" /> },
    { label: "Cave", icon: <FaMountain className="w-6 h-6" /> },
    { label: "Container", icon: <FaBox className="w-6 h-6" /> },
    { label: "Cyclade home", icon: <FaWater className="w-6 h-6" /> },
    { label: "Dammaso", icon: <FaIgloo className="w-6 h-6" /> },
    { label: "Dome", icon: <FaDungeon className="w-6 h-6" /> },
    { label: "Earth home", icon: <FaGlobeAmericas className="w-6 h-6" /> },
    { label: "Farm", icon: <FaTractor className="w-6 h-6" /> },
    { label: "Guesthouse", icon: <FaDoorOpen className="w-6 h-6" /> },
    { label: "Hotel", icon: <FaHotel className="w-6 h-6" /> },
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
      <div className="min-h-screen mt-24 p-6">
        <div className="max-w-4xl mx-auto p-8">
          {/* Page Title */}
          <h1 className="text-2xl font-medium pb-8">
            Which of these best describes your place?
          </h1>

          {/* Grid of Options with Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-8">
            {options.map((option, index) => (
              <div
                key={index}
                className={`border border-gray-100 p-4 rounded-lg cursor-pointer transition duration-300 flex flex-col items-center ${
                  selectedOption === option.label
                    ? "bg-[#FFC500]"
                    : "hover:bg-[#FFC500]"
                }`}
                onClick={() => setSelectedOption(option.label)} // Set selected option
              >
                <div className="">{option.icon}</div> {/* Icon */}
                <p className="text-black">{option.label}</p> {/* Label */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full left-0 fixed bottom-0 bg-white shadow-md flex flex-col">
        <div className="w-full h-1 bg-gray-300 rounded-full relative">
          <div
            className="absolute bg-[#FFC500] top-0 left-0 h-full rounded-full"
            style={{ width: "7%" }}
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <Link to={"/create-listing-step-two"}>
            <button className="flex items-center ml-4 underline font-medium">
              Back
            </button>
          </Link>
          <Link to={selectedOption ? "/create-listing-step-four" : "#"}>
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

export default CreateListingStepThree;