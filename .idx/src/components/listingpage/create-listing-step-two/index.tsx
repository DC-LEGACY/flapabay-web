import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const CreateListingStepTwo = () => {
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
      <div className="flex flex-1 items-center justify-between px-28 py-24 mt-12">
        <div className="max-w-lg">
          <h2 className="text-sm font-semibold text-gray-600">Step 1</h2>
          <h1 className="text-4xl font-medium mt-2">Tell us about your place</h1>
          <p className="text-gray-500 mt-4">
            In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.
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
      <div className="w-full left-0 fixed bottom-0 bg-white shadow-md flex flex-col items-end ">
        <div className="w-full h-1 bg-gray-300 rounded-full relative">
          <div className="absolute bg-[#FFC500] top-0 left-0 h-full  rounded-full" ></div>
        </div>
        <Link to={"/create-listing-step-three"}>
        <button className="mt-2 px-3 py-1 bg-[#FFC500] text-white text-lg rounded-lg mb-2 mr-2" >Next</button>
        </Link>
      </div>
    </div>
  );
};

export default CreateListingStepTwo;