import { Link } from "react-router-dom";
import React from "react";

interface CommunityCommitmentModalProps {
  onClose: () => void;
}

const CommunityCommitmentModal: React.FC<CommunityCommitmentModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative z-60" onClick={(e) => e.stopPropagation()}>
        <div className="text-center">
        <div className="text-2xl font-bold text-black">
              <Link className="header-logo logo1 flex justify-center pt-2 pb-2 items-center" to="/">
                <img src="/images/logo.svg" alt="Header Logo" />
              </Link>
            </div>
          <h3 className="text-sm font-semibold text-[#FFC500]">Our community commitment</h3>
          <h2 className="text-lg font-bold mt-1">Airbnb is a community where anyone can belong</h2>
          <p className="text-sm text-gray-600 mt-2">
            To ensure this, we’re asking you to commit to the following:
          </p>
          <p className="text-sm text-gray-600 mt-2">
            I agree to treat everyone in the Airbnb community—regardless of their race, religion, national origin, ethnicity, skin color, disability, sex,
            gender identity, sexual orientation, or age—with respect, and without judgment or bias.
          </p>

          {/* Buttons */}
          <div className="mt-6">
            <Link to={"/"}>
            <button
              className="w-full bg-[#FFC500] text-white font-semibold py-2 rounded-2xl"
              onClick={onClose}
            >
              Agree and continue
            </button>
            </Link>
            <button className="w-full mt-2 text-sm text-gray-600 font-medium" onClick={onClose}>
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCommitmentModal;
