import React, { useState } from "react";
import CommunityCommitmentModal from "./CommunityCommitmentModal"; // Import next modal

interface ProfilePhotoModalProps {
  onClose: () => void;
}

const ProfilePhotoModal: React.FC<ProfilePhotoModalProps> = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showCommitmentModal, setShowCommitmentModal] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setSelectedImage(imageUrl);
      moveToNextModal();
    }
  };

  const moveToNextModal = () => {
    // onClose(); // Close ProfilePhotoModal
    setShowCommitmentModal(true); // Show Community Commitment Modal
  };

  return (
    <>
      {!showCommitmentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative z-60" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-center">Create your profile</h2>
            <p className="text-sm text-gray-500 text-center">STEP 1 OF 1</p>
            <h3 className="text-md font-bold text-center mt-2">Add a profile photo</h3>
            <p className="text-sm text-gray-600 text-center mt-1">
              Pick an image that shows your face. Hosts won’t be able to see your profile photo until your reservation is confirmed.
            </p>

            {/* Profile Image Upload Section */}
            <div className="flex justify-center mt-4">
              <label className="relative w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer bg-black">
                {selectedImage ? (
                  <img src={selectedImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-500">+</span>
                    <span className="text-xs text-gray-500">Add</span>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>

            {/* Skip Button */}
            <div className="text-center mt-4">
              <button className="text-sm font-medium underline" onClick={moveToNextModal}>
                I’ll do this later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show Community Commitment Modal after clicking "I'll do this later" or uploading an image */}
      {showCommitmentModal && <CommunityCommitmentModal onClose={() => setShowCommitmentModal(false)} />}
    </>
  );
};

export default ProfilePhotoModal;
