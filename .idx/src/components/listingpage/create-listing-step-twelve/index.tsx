import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const CreateListingStepTwelve = () => {
  const [imageVisible, setImageVisible] = useState(true);
  const [boatTitle, setBoatTitle] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoatTitle(event.target.value);
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
      <div className="flex items-center justify-center  py-24 mt-24">
        <div className="max-w-screen-2xl">
         
          <h1 className="text-xl font-medium mt-2">Create your description</h1>
          <p className="text-gray-500 ">
          Share what makes your place special.
          </p>

          {/* Title Input Section */}
          <div className="pt-4">
            
            <textarea
              type="text"
              value={boatTitle}
              onChange={handleTitleChange}
              placeholder="Take in the special details of this romantic place."
              className="w-full p-3 border border-gray-300 rounded-lg  "
            />
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
          <Link to={"/create-listing-step-eleven"}>
            <button className="flex items-center ml-4 underline font-medium">
              Back
            </button>
          </Link>
          <Link to={"/create-listing-step-thirteen"}>
            <button
              className={`mt-2 px-3 py-1 text-lg rounded-lg mb-2 mr-2 bg-[#FFC500] text-white`}
              disabled={!boatTitle.trim()}
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateListingStepTwelve;