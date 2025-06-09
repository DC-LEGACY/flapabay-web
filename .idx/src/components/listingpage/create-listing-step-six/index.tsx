import { FiMinus, FiPlus } from "react-icons/fi";
import { atom, useAtom } from "jotai";

import { Link } from "react-router-dom";
import React from "react";

// Define atoms
const guestsAtom = atom(1);
const bedroomsAtom = atom(1);
const bedsAtom = atom(1);
const bathroomsAtom = atom(1);

const CreateListingStepSix = () => {
  const [guests, setguests] = useAtom(guestsAtom);
  const [bedrooms, setBedrooms] = useAtom(bedroomsAtom);
  const [beds, setBeds] = useAtom(bedsAtom);
  const [bathrooms, setBathrooms] = useAtom(bathroomsAtom);

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => (value > 1 ? setter(value - 1) : null);

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
            Share some basics about your place
          </h1>
          <p className="text-gray-600 pb-8">
            You'll add more details later, like bed types.
          </p>

          {/* Guests Section */}
          <div className="space-y-6">
            {/* Bedrooms */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Guests</h2>
              <div className="flex items-center">
                <button
                  onClick={() => decrement(setguests, guests)}
                  className="p-2 border border-gray-100 rounded-full"
                >
                  <FiMinus />
                </button>
                <span className="mx-4">{guests}</span>
                <button
                  onClick={() => increment(setguests, guests)}
                  className="p-2 border border-gray-100 rounded-full"
                >
                  <FiPlus />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Bedrooms</h2>
              <div className="flex items-center">
                <button
                  onClick={() => decrement(setBedrooms, bedrooms)}
                  className="p-2 border border-gray-100 rounded-full"
                >
                  <FiMinus />
                </button>
                <span className="mx-4">{bedrooms}</span>
                <button
                  onClick={() => increment(setBedrooms, bedrooms)}
                  className="p-2 border border-gray-100 rounded-full"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Beds */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Beds</h2>
              <div className="flex items-center">
                <button
                  onClick={() => decrement(setBeds, beds)}
                  className="p-2 border border-gray-100 rounded-full"
                >
                  <FiMinus />
                </button>
                <span className="mx-4">{beds}</span>
                <button
                  onClick={() => increment(setBeds, beds)}
                  className="p-2 border border-gray-100 rounded-full"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Bathrooms */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Bathrooms</h2>
              <div className="flex items-center">
                <button
                  onClick={() => decrement(setBathrooms, bathrooms)}
                  className="p-2 border border-gray-100 rounded-full"
                >
                  <FiMinus />
                </button>
                <span className="mx-4">{bathrooms}</span>
                <button
                  onClick={() => increment(setBathrooms, bathrooms)}
                  className="p-2 border border-gray-100 rounded-full"
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full left-0 fixed bottom-0 bg-white shadow-md flex flex-col">
        <div className="w-full h-1 bg-gray-300 rounded-full relative">
          <div
            className="absolute bg-[#FFC500] top-0 left-0 h-full rounded-full"
            style={{ width: "28%" }} // Adjust progress bar width as needed
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <Link to={"/create-listing-step-five"}>
            <button className="flex items-center ml-4 underline font-medium">
              Back
            </button>
          </Link>
          <Link to={"/create-listing-step-seven"}>
            <button
              className={`mt-2 px-3 py-1 text-lg rounded-lg mb-2 mr-2 bg-[#FFC500] text-white`}
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateListingStepSix;