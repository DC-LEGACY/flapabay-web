import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { Link } from "react-router-dom";
import { useState } from "react";

const CreateListingStepSeventeen = () => {
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);

  const handleDiscountToggle = (discount) => {
    if (selectedDiscounts.includes(discount)) {
      setSelectedDiscounts(selectedDiscounts.filter((d) => d !== discount));
    } else {
      setSelectedDiscounts([...selectedDiscounts, discount]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full fixed top-0 left-0 flex justify-between items-center bg-white p-4">
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
      <div className="flex  items-center justify-around  mt-24">
        <div className="max-w-lg">
          
          <h1 className="text-2xl font-medium pt-2">Add discounts</h1>
          <p className="text-gray-500">
            Help your place stand out to get booked faster and earn your first reviews.
          </p>

          <div className="pt-6 pb-16">
            <div
              className={`p-3 border rounded-lg cursor-pointer ${
                selectedDiscounts.includes("newListing") ? "bg-[#FFC500] border-[#FFC500]" : "bg-white border-gray-200"
              }`}
              onClick={() => handleDiscountToggle("newListing")}
            >
              <h3 className="font-semibold">20% New listing promotion</h3>
              <p className="text-gray-500 mt-2">
                Offer 20% off your first booking.
              </p>
            </div>

            <div
              className={`p-3 border rounded-lg mt-3 cursor-pointer ${
                selectedDiscounts.includes("lastMinute") ? "bg-[#FFC500] border-[#FFC500]" : "bg-white border-gray-200"
              }`}
              onClick={() => handleDiscountToggle("lastMinute")}
            >
              <h3 className="font-semibold">10% Last-minute discount</h3>
              <p className="text-gray-500 mt-2">
                For stays booked 7 days or less before arrival.
              </p>
            </div>

            <div
              className={`p-3 border rounded-lg mt-3 cursor-pointer ${
                selectedDiscounts.includes("weekly") ? "bg-[#FFC500] border-[#FFC500]" : "bg-white border-gray-200"
              }`}
              onClick={() => handleDiscountToggle("weekly")}
            >
              <h3 className="font-semibold">10% Weekly discount</h3>
              <p className="text-gray-500 mt-2">
                For stays of 7 nights or more.
              </p>
            </div>

            <div
              className={`p-3 border rounded-lg mt-3 cursor-pointer ${
                selectedDiscounts.includes("monthly") ? "bg-[#FFC500] border-[#FFC500]" : "bg-white border-gray-200"
              }`}
              onClick={() => handleDiscountToggle("monthly")}
            >
              <h3 className="font-semibold">20% Monthly discount</h3>
              <p className="text-gray-500 mt-2">
                For stays of 28 nights or more.
              </p>
            </div>

            <p className="text-gray-500 mt-4 italic">
              On your discount, all the updates are last made.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full left-0 fixed bottom-0 bg-white shadow-md flex flex-col">
        <div className="w-full h-1 bg-gray-300 rounded-full relative">
          <div
            className="absolute bg-[#FFC500] top-0 left-0 h-full rounded-full"
            style={{ width: "93%" }} // Adjust progress bar width as needed
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <Link to={"/create-listing-step-sixteen"}>
            <button className="flex items-center ml-4 underline font-medium">
               Back
            </button>
          </Link>
          <Link to={"/create-listing-step-eighteen"}>
            <button className="mt-2 px-3 py-1 text-lg rounded-lg mb-2 mr-2 bg-[#FFC500] text-white flex items-center">
              Next 
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateListingStepSeventeen;