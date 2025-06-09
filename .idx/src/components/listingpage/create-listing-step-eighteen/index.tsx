import { FiArrowLeft, FiCheck } from "react-icons/fi";

import { Link } from "react-router-dom";
import { useState } from "react";

const CreateListingStepEighteen = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionToggle = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full fixed top-0 left-0 bg-white flex justify-between items-center p-4">
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
      <div className="flex flex-1 items-center justify-around  mt-24 pb-16">
        <div className="max-w-lg">
          
          <h1 className="text-4xl font-medium mt-2">Share safety details</h1>
          <p className="text-gray-500 mt-4">
            Does your place have any of these?
          </p>

          <div className="pt-6">
            <div
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedOptions.includes("securityCameras") ? "bg-[#FFC500] border-[#FFC500]" : "bg-white border-gray-200"
              }`}
              onClick={() => handleOptionToggle("securityCameras")}
            >
              <div className="flex items-center">
                <FiCheck
                  className={`w-6 h-6 ${
                    selectedOptions.includes("securityCameras") ? "text-black" : "text-gray-500"
                  }`}
                />
                <h3 className="font-semibold ml-2">Security cameras present</h3>
              </div>
            </div>

            <div
              className={`p-4 border rounded-lg mt-4 cursor-pointer ${
                selectedOptions.includes("weapons") ? "bg-[#FFC500] border-[#FFC500]" : "bg-white border-gray-200"
              }`}
              onClick={() => handleOptionToggle("weapons")}
            >
              <div className="flex items-center">
                <FiCheck
                  className={`w-6 h-6 ${
                    selectedOptions.includes("weapons") ? "text-black" : "text-gray-500"
                  }`}
                />
                <h3 className="font-semibold ml-2">Weapons present</h3>
              </div>
            </div>

            <div
              className={`p-4 border rounded-lg mt-4 cursor-pointer ${
                selectedOptions.includes("dangerousAnimals") ? "bg-[#FFC500] border-[#FFC500]" : "bg-white border-gray-200"
              }`}
              onClick={() => handleOptionToggle("dangerousAnimals")}
            >
              <div className="flex items-center">
                <FiCheck
                  className={`w-6 h-6 ${
                    selectedOptions.includes("dangerousAnimals") ? "text-black" : "text-gray-500"
                  }`}
                />
                <h3 className="font-semibold ml-2">Dangerous animals present</h3>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <h3 className="font-semibold">Important things to know</h3>
            <p className="text-gray-500 mt-2">
              Security cameras that monitor outdoor spaces are allowed, but they must be disclosed. All options’ security cameras must be disclosed.
            </p>
            <p className="text-gray-500 mt-2">
              Be sure to comply with your local laws and review Airbnb’s anti-discrimination policy and guest and host fees.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full left-0 fixed bottom-0 bg-white shadow-md flex flex-col">
        <div className="w-full h-1 bg-gray-300 rounded-full relative">
          <div
            className="absolute bg-[#FFC500] top-0 left-0 h-full rounded-full"
            style={{ width: "97%" }} // Adjust progress bar width as needed
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <Link to={"/create-listing-step-seventeen"}>
            <button className="flex items-center ml-4 underline font-medium">
             Back
            </button>
          </Link>
          <Link to={"/complete-listing"}>
            <button className="mt-2 px-3 py-1 text-lg rounded-lg mb-2 mr-2 bg-[#FFC500] text-white flex items-center">
              Create listing
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateListingStepEighteen;