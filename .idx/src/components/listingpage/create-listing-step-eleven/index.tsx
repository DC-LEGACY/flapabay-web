import { FaAnchor, FaMusic, FaRoute, FaShip, FaStar, FaWater } from "react-icons/fa"; // Import icons

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const CreateListingStepEleven = () => {
  const [imageVisible, setImageVisible] = useState(true);
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([]);

  // Highlights with icons
  const highlights = [
    { name: "Baro", icon: <FaAnchor className="mr-2" /> },
    { name: "Route", icon: <FaRoute className="mr-2" /> },
    { name: "Instrone", icon: <FaMusic className="mr-2" /> },
    { name: "Memorable", icon: <FaStar className="mr-2" /> },
    { name: "Bemonde", icon: <FaShip className="mr-2" /> },
    { name: "Matecte", icon: <FaWater className="mr-2" /> },
  ];

  const toggleHighlight = (highlight: string) => {
    setSelectedHighlights((prev) =>
      prev.includes(highlight)
        ? prev.filter((item) => item !== highlight) // Deselect if already selected
        : prev.length < 2
        ? [...prev, highlight] // Select if less than 2 are selected
        : prev // Do nothing if 2 are already selected
    );
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
      <div className="flex flex-1 items-center justify-center px-28 py-24 mt-20">
        <div className="max-w-lg">
          
          <h1 className="text-xl font-medium mt-2">Next, let's describe your boat</h1>
          <p className="text-gray-500">
            Choose up to 2 highlights. We'll use these to get your description started.
          </p>

          {/* Highlights Selection */}
          <div className="pt-8">
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((highlight) => (
                <button
                  key={highlight.name}
                  onClick={() => toggleHighlight(highlight.name)}
                  className={`flex items-center justify-center p-4 border rounded-lg text-sm transition
                    ${
                      selectedHighlights.includes(highlight.name)
                        ? "bg-[#FFC500] text-white"
                        : "border-gray-300 hover:bg-gray-200"
                    }`}
                >
                  {highlight.icon} {highlight.name}
                </button>
              ))}
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
            style={{ width: "56%" }} // Adjust progress bar width as needed
          ></div>
        </div>
      
        <div className="flex items-center justify-between">
          <Link to={"/create-listing-step-ten"}>
            <button className="flex items-center ml-4 underline font-medium">
              Back
            </button>
          </Link>
          <Link to={"/create-listing-step-twelve"}>
            <button
              className={`mt-2 px-3 py-1 text-lg rounded-lg mb-2 mr-2 bg-[#FFC500] text-white`}
              disabled={selectedHighlights.length < 1}
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateListingStepEleven;