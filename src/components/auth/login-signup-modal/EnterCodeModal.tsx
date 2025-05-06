import React, { useState } from "react";

import ForgotPassword from "./ForgotPassword";
import left from "../../../assets/left.png";

interface EnterCodeModalProps {
  onClose: () => void;
}

const EnterCodeModal: React.FC<EnterCodeModalProps> = ({ onClose }) => {
  const [showEmailConfirmationModal, setShowEmailConfirmationModal] =
    useState(false);
  const forgothandle = () => {
    setShowEmailConfirmationModal(true);
  };

  if (showEmailConfirmationModal) {
    return (
      <ForgotPassword onClose={() => setShowEmailConfirmationModal(false)} />
    );
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-md relative z-60"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <div className="p-6">
          <div className=" flex items-center space-x-36">
            <button className="  top-4 right-4" onClick={onClose}>
              <img src={left} alt="Close" className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold text-center">Login</h2>
          </div>
          <div className="h-[.5px] w-full bg-gray-400 mt-2" />

          <input
            type="text"
            placeholder="Password"
            className="w-full border bg-white mt-6 border-gray-400 rounded-2xl py-2 px-3 mb-4"
          />
          <button
            className="w-full bg-[#ffc500] text-white font-semibold py-2 rounded-2xl"
            onClick={onClose}
          >
            Log in
          </button>
          <div className="">
            <button
              onClick={forgothandle}
              className="text-sm text-black underline mt-4 font-semibold"
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterCodeModal;
