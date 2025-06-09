import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { Link } from "react-router-dom";
import { useState } from "react";

const CreateListingStepFifteen = () => {
  const [selectedOption, setSelectedOption] = useState("any");

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
      <div className="flex flex-1 items-center justify-center  mt-20">
        <div className="max-w-lg">
          
          <h1 className="text-2xl font-medium mt-2">Choose who to welcome for your first reservation</h1>
          <p className="text-gray-500 mt-4">
            After your first guest, anyone can book your place.{" "}
            <a href="#" className=" text-black underline">
              Learn more
            </a>
          </p>

          <div className="pt-6">
            <div
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedOption === "any" ? "bg-[#FFC500] border-[#FFC500]" : "bg-white border-gray-200"
              }`}
              onClick={() => handleOptionSelect("any")}
            >
              <div className="flex items-center">
                
                <h3 className="font-semibold ml-2">Any Airbnb guest</h3>
              </div>
              <p className="text-gray-500 mt-2">
                Get reservations faster when you welcome anyone from the Airbnb community.
              </p>
            </div>

            <div
              className={`p-4 border rounded-lg mt-4 cursor-pointer ${
                selectedOption === "experienced" ? "bg-[#FFC500] border-[#FFC500]" : "bg-white border-gray-200"
              }`}
              onClick={() => handleOptionSelect("experienced")}
            >
              <div className="flex items-center">
               
                <h3 className="font-semibold ml-2">An experienced guest</h3>
              </div>
              <p className="text-gray-500 mt-2">
                For your first guest, welcome someone with a good track record on Airbnb who can offer tips for how to be a great host.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full left-0 fixed bottom-0 bg-white shadow-md flex flex-col">
        <div className="w-full h-1 bg-gray-300 rounded-full relative">
          <div
            className="absolute bg-[#FFC500] top-0 left-0 h-full rounded-full"
            style={{ width: "80%" }} // Adjust progress bar width as needed
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <Link to={"/create-listing-step-fourteen"}>
            <button className="flex items-center ml-4 underline font-medium">
               Back
            </button>
          </Link>
          <Link to={"/create-listing-step-sixteen"}>
            <button
              className={`mt-2 px-3 py-1 text-lg rounded-lg mb-2 mr-2 bg-[#FFC500] text-white flex items-center ${
                !selectedOption ? "bg-slate-400 cursor-not-allowed" : ""
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

export default CreateListingStepFifteen;