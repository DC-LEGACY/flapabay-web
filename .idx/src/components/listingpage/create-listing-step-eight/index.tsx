import {
  FaBath,
  FaBell,
  FaCouch,
  FaDumbbell,
  FaFire,
  FaFireExtinguisher,
  FaFirstAid,
  FaGuitar,
  FaLaptop,
  FaParking,
  FaShower,
  FaSkiing,
  FaSnowflake,
  FaSwimmingPool,
  FaTableTennis,
  FaTv,
  FaUmbrellaBeach,
  FaUtensils,
  FaWifi,
} from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import React, { useState } from "react";
import { atom, useAtom } from "jotai";

import { Link } from "react-router-dom";

const guestFavorites = [
  { name: "Wifi", icon: <FaWifi /> },
  { name: "TV", icon: <FaTv /> },
  { name: "Kitchen", icon: <FaUtensils /> },
  { name: "Washer", icon: <FaBath /> },
  { name: "Free Parking", icon: <FaParking /> },
  { name: "Air Conditioning", icon: <FaSnowflake /> },
  { name: "Dedicated Workspace", icon: <FaLaptop /> },
];

const standoutAmenities = [
  { name: "Pool", icon: <FaSwimmingPool /> },
  { name: "Hot Tub", icon: <FaBath /> },
  { name: "Patio", icon: <FaCouch /> },
  { name: "BBQ Grill", icon: <FaFire /> },
  { name: "Outdoor Dining", icon: <FaUtensils /> },
  { name: "Fire Pit", icon: <FaFire /> },
  { name: "Pool Table", icon: <FaTableTennis /> },
  { name: "Piano", icon: <FaGuitar /> },
  { name: "Exercise Equipment", icon: <FaDumbbell /> },
  { name: "Lake Access", icon: <FaUmbrellaBeach /> },
  { name: "Beach Access", icon: <FaUmbrellaBeach /> },
  { name: "Ski-in/Ski-out", icon: <FaSkiing /> },
  { name: "Outdoor Shower", icon: <FaShower /> },
];

const safetyItems = [
  { name: "Smoke Alarm", icon: <FaBell /> },
  { name: "First Aid Kit", icon: <FaFirstAid /> },
  { name: "Fire Extinguisher", icon: <FaFireExtinguisher /> },
  { name: "Carbon Monoxide Alarm", icon: <FaBell /> },
];

// Define atoms
const guestsAtom = atom(1);
const bedroomsAtom = atom(1);
const bedsAtom = atom(1);
const bathroomsAtom = atom(1);

const CreateListingStepEight = () => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

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

      <div className="min-h-screen mt-24 flex flex-col items-center p-6 pb-20">
        <div className="">
          <h1 className="text-2xl font-medium">
            Tell guests what your place has to offer
          </h1>
          <p className="text-gray-500 pb-6">
            You can add more amenities after you publish your listing.
          </p>
        </div>
        {/* Guest Favorites */}
        <div className="w-full max-w-md">
          <h2 className="text-lg font-medium pb-3">
            What about these guest favorites?
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {guestFavorites.map((item) => (
              <button
                key={item.name}
                onClick={() => toggleAmenity(item.name)}
                className={`flex flex-col items-center justify-center gap-2 p-4 border rounded-lg text-sm transition
                ${
                  selectedAmenities.includes(item.name)
                    ? "bg-[#FFC500] text-white"
                    : "border-gray-300 hover:bg-gray-200"
                }`}
              >
                {item.icon} {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Standout Amenities */}
        <div className="w-full max-w-md pt-8">
          <h2 className="text-lg font-semibold mb-3">
            Do you have any standout amenities?
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {standoutAmenities.map((item) => (
              <button
                key={item.name}
                onClick={() => toggleAmenity(item.name)}
                className={`flex flex-col items-center justify-center gap-2 p-4 border rounded-lg text-sm transition
                ${
                  selectedAmenities.includes(item.name)
                    ? "bg-[#FFC500] text-white"
                    : "border-gray-300 hover:bg-gray-200"
                }`}
              >
                {item.icon} {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Safety Items */}
        <div className="w-full max-w-md pt-8">
          <h2 className="text-lg font-semibold mb-3">
            Do you have any of these safety items?
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {safetyItems.map((item) => (
              <button
                key={item.name}
                onClick={() => toggleAmenity(item.name)}
                className={`flex flex-col items-center justify-center gap-2 p-4 border rounded-lg text-sm transition
                ${
                  selectedAmenities.includes(item.name)
                    ? "bg-[#FFC500] text-white"
                    : "border-gray-300 hover:bg-gray-200"
                }`}
              >
                {item.icon} {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
      </div>
      {/* Footer */}
      <div className="w-full left-0 fixed bottom-0 bg-white shadow-md flex flex-col">
        <div className="w-full h-1 bg-gray-300 rounded-full relative">
          <div
            className="absolute bg-[#FFC500] top-0 left-0 h-full rounded-full"
            style={{ width: "35%" }} // Adjust progress bar width as needed
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <Link to={"/create-listing-step-seven"}>
            <button className="flex items-center ml-4 underline font-medium">
              Back
            </button>
          </Link>
          <Link to={"/create-listing-step-nine"}>
            <button
              className={`mt-2 px-3 py-1 text-lg rounded-lg mb-2 mr-2  text-white
                ${
                  selectedAmenities.length > 0
                    ? "bg-[#FFC500] "
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              disabled={selectedAmenities.length === 0}
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateListingStepEight;
