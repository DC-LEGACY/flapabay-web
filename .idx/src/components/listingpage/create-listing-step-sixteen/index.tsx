import { FiArrowLeft, FiArrowRight, FiChevronDown, FiChevronUp, FiEdit } from "react-icons/fi";
import { useRef, useState } from "react";

import { Link } from "react-router-dom";

const CreateListingStepSixteen = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState("36");
  const priceRef = useRef(null);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      priceRef.current.focus(); // Focus the content-editable div
    }, 0);
  };

  const handlePriceChange = (e) => {
    const newValue = e.target.textContent.replace(/[^0-9]/g, ""); // Allow only numbers
    setPrice(newValue);
    e.target.textContent = newValue; // Update the content-editable div
  };

  const handleBlur = () => {
    setIsEditing(false);
    // You can add logic here to save the price to your backend or state management
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
          
          <h1 className="text-2xl font-medium mt-2">Now, set a weekday base price</h1>
          <p className="text-gray-500">
            You can change it anytime.
          </p>

          <div className="pt-6">
            <div className="p-4  bg-white">
              <div className="flex flex-col items-center justify-between">
                <div
                  ref={priceRef}
                  contentEditable={isEditing}
                  onInput={handlePriceChange}
                  onBlur={handleBlur}
                  className={`font-semibold text-4xl ${isEditing ? " outline-none" : ""}`}
                  suppressContentEditableWarning={true}
                >
                  ${price}
                </div>
                <div className="flex flex-col items-center text-4xl  ">
                  <button
                    className="text-gray-500 hover:text-black "
                    onClick={handleEditClick}
                  >
                    <FiEdit className="w-5 h-5 ml-10" />
                  </button>
                  <button
                    className=" flex items-center pt-10  text-gray-500 hover:text-black"
                    onClick={toggleDetails}
                  >
                    $41
                    {showDetails ? <FiChevronUp className="w-6 h-6" /> : <FiChevronDown className="w-6 h-6" />}
                    
                  </button>
                </div>
              </div>

              {showDetails && (
                <div className="mt-4">
                  <div className="flex justify-between text-gray-500">
                    <span>Guest price before taxes</span>
                    <span>$41</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full left-0 fixed bottom-0 bg-white shadow-md flex flex-col">
        <div className="w-full h-1 bg-gray-300 rounded-full relative">
          <div
            className="absolute bg-[#FFC500] top-0 left-0 h-full rounded-full"
            style={{ width: "87%" }} // Adjust progress bar width as needed
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <Link to={"/create-listing-step-fifteen"}>
            <button className="flex items-center ml-4 underline font-medium">
               Back
            </button>
          </Link>
          <Link to={"/create-listing-step-seventeen"}>
            <button className="mt-2 px-3 py-1 text-lg rounded-lg mb-2 mr-2 bg-[#FFC500] text-white flex items-center">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateListingStepSixteen;