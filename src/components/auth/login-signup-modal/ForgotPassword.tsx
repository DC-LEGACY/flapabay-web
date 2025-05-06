import React from "react";
import left from "../../../assets/left.png";

interface EnterCodeModalProps {
  onClose: () => void;
}

const ForgotPassword: React.FC<EnterCodeModalProps> = ({ onClose }) => {
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
          <div className=" flex items-center space-x-28">
            <button className="  top-4 right-4" onClick={onClose}>
              <img src={left} alt="Close" className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold text-center">
              Forgot Password
            </h2>
          </div>
          <div className="h-[.5px] w-full bg-gray-400 mt-2" />
          <p className="text-sm text-gray-900 mt-2">
            Enter the email address associated with your account, and we'll
            email you a link to reset your password.
          </p>
          <input
            type="email"
            placeholder="Email"
            className="w-full border text-gray-900 text-[16px] bg-white mt-4 border-gray-400 rounded-2xl py-2 px-3 mb-4"
          />
          <button
            className="w-full bg-[#ffc500] text-white font-semibold py-2 rounded-2xl"
            onClick={onClose}
          >
            Send reset link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
