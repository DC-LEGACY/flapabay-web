import { FiArrowLeft, FiCheck } from "react-icons/fi";

import { Link } from "react-router-dom";
import { useState } from "react";

const CreateListingComplete = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateListingClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    
          <h1 className="text-4xl font-medium mt-2">Finish a few last steps</h1>
          <p className="text-gray-500 mt-4 text-center">
            Once this is done, you can publish your listing and start getting booked.
          </p>

          <div className="mt-6">
            <button
              className="mt-2 px-3 py-1 text-lg rounded-lg mb-2 mr-2 bg-[#FFC500] text-white flex items-center justify-center"
              onClick={handleCreateListingClick}
            >
              Create listing
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full left-0 fixed bottom-0 bg-white shadow-md flex flex-col">
        <div className="w-full h-1 bg-gray-300 rounded-full relative">
          <div
            className="absolute bg-[#FFC500] top-0 left-0 h-full rounded-full"
            style={{ width: "100%" }} // Adjust progress bar width as needed
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <Link to={"/create-listing-step-nineteen"}>
            <button className="flex items-center ml-4 underline font-medium">
              <FiArrowLeft className="mr-2" /> Back
            </button>
          </Link>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-fit">
            <h2 className="text-2xl font-semibold">Listing Created Successfully!</h2>
            <p className="text-gray-500 mt-2">
              Your listing has been created and is now live. You can start getting bookings.
            </p>
            <div className="mt-4 flex justify-end">
                <Link to={"/"}>
              <button
                className="px-4 py-2 bg-[#FFC500] text-white rounded-lg"
                
              >
                Close
              </button></Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateListingComplete;