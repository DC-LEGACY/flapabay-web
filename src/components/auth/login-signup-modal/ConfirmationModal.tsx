import React, { useState } from "react";

import left from "../../../assets/left.png";

interface ConfirmationModalProps {
  phoneNumber: string; // Pass the phone number to display
  onClose: () => void;
  onBack: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  phoneNumber,
  onClose,
  onBack,
}) => {
  const [code, setCode] = useState("");

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setCode(value); // Only update state if input is numeric
    }
  };

  const handleContinue = () => {
    // Add your logic to verify the code
    console.log("Code entered:", code);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white  rounded-2xl shadow-lg w-full max-w-md relative z-60 p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <div className="flex items-center text-center space-x-20">
          <button className="  top-4 right-4" onClick={onClose}>
            <img src={left} alt="Close" className="h-5 w-5" />
          </button>
          <div className="text-center text-lg font-semibold">
            Confirm your number
          </div>
        </div>
        <div className="h-[.5px] w-full bg-gray-400 mt-2" />
        <p className="text-sm text-gray-800 mb-4 mt-5">
          Enter the code we sent over SMS to {phoneNumber}:
        </p>
        <div className="flex  bg-white items-center mb-4">
          <input
            type="text"
            maxLength={6} // Assume the code has 6 digits
            className="text-center text-2xl border bg-white border-gray-400 rounded-2xl p-2 w-[50%] outline-none"
            value={code}
            onChange={handleCodeChange}
            placeholder="- - - - - -"
          />
        </div>
        <div className=" flex items-center justify-between">
          <div className="text-center">
            <button
              onClick={onBack}
              className="text-sm text-black underline mt-4 font-semibold"
            >
              More options
            </button>
          </div>
          <button
            onClick={handleContinue}
            className={`mt-4 w-[30%] font-semibold py-1 rounded-2xl ${
              code.length === 6
                ? "bg-[#ffc500] text-white"
                : "bg-gray-300 text-gray-600"
            }`}
            disabled={code.length !== 6}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
