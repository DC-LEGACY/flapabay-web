import React, { useState } from "react";

import { Link } from "react-router-dom";
import ProfilePhotoModal from "./ProfilePhotoModal"; // Import the next modal

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  const [showProfilePhotoModal, setShowProfilePhotoModal] = useState(false);

  const handleContinue = () => {
    // onClose(); // Close WelcomeModal
    setShowProfilePhotoModal(true); // Open ProfilePhotoModal after delay
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative z-60" onClick={(e) => e.stopPropagation()}>
          <div className="text-center">
            <div className="text-2xl font-bold text-black">
              <Link className="header-logo logo1 flex justify-center pt-2 pb-2 items-center" to="/">
                <img src="/images/logo.svg" alt="Header Logo" />
              </Link>
            </div>
            <h2 className="text-lg font-semibold">Welcome to Flapabay</h2>
            <p className="text-gray-600 mt-2">
              Discover places to stay and unique experiences around the world.
            </p>
            <button className="w-full bg-[#FFC500] text-white font-semibold py-2 rounded-2xl mt-4" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Show ProfilePhotoModal after clicking "Continue" */}
      {showProfilePhotoModal && <ProfilePhotoModal onClose={() => setShowProfilePhotoModal(false)} />}
    </>
  );
};

export default WelcomeModal;
