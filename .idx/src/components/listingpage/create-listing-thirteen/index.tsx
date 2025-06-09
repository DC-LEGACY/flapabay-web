import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const CreateListingStepThirteen = () => {
  const [imageVisible, setImageVisible] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
       <header className="w-full fixed top-0 left-0 flex justify-between items-center p-4">
             <div className="text-2xl font-bold text-black">
             <Link className="header-logo logo1" to="/">
                           <img
                            
                             src="/images/logo.svg"
                             alt="Header Logo"
                           />
                         </Link>
             </div>
             <button className=" text-sm flex items-center border border-gray-100 rounded-full px-3 py-2">
              Save & exit
             </button>
           </header>
      
      {/* Content */}
      <div className="flex flex-1 items-center  justify-around py-24 mt-12">
        <div className="max-w-lg">
          <h2 className="text-sm font-semibold text-gray-600">Step 3</h2>
          <h1 className="text-4xl font-medium mt-2">Finish up and publish</h1>
          <p className="text-gray-500 mt-4">
          Finally, you'll choose booking settings, set up pricing, and publish your listing.
          </p>
        </div>
        
        {/* Animated Image */}
        <motion.img
          src="https://img.freepik.com/free-photo/hand-presenting-model-house-home-loan-campaign_53876-104970.jpg?t=st=1738389701~exp=1738393301~hmac=77474e6beacc9dfd29d76ca9656aaaa11a519e9f6d9635d6246d9a86d93e5299&w=996" 
          alt="Step 1 Illustration"
          className="w-1/3 rounded-lg"
          initial={{ opacity: 0, scale: .9 }}
          animate={{ opacity: imageVisible ? 1 : 0, scale: imageVisible ? 1 : 0.9 }}
          transition={{ duration: 1.5 }}
        />
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
                <Link to={"/create-listing-step-twelve"}>
                  <button className="flex items-center ml-4 underline font-medium">
                    Back
                  </button>
                </Link>
                <Link to={"/create-listing-step-fourteen"}>
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

export default CreateListingStepThirteen;