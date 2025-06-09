import React, { useState } from "react";

import close from "@/assets/close.png";

const EmailConfirmationModal = ({
  email,
  onClose,
}: {
  email: string;
  onClose: () => void;
}) => {
  const [code, setCode] = useState("");

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setCode(value); // Only update state if input is numeric
    }
  };

  return (
    <div
      className=" inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" flex space-x-28">
          <button className="  top-4 right-4" onClick={onClose}>
            <img src={close} alt="Close" className="h-4 w-4" />
          </button>
          <h2 className="text-lg font-semibold text-center">Confirm account</h2>
        </div>
        <div className="h-[.5px] w-full bg-gray-400 mt-2" />

        <h2 className="text-lg font-semibold mt-4">
          Enter Your Verification Code
        </h2>
        <p className="text-sm text-gray-800 mb-4 mt-2">
          Enter the code we emailed to {email}.
        </p>
        <div className="flex justify-center space-x-2 mb-4">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className="w-12 h-12 border bg-white border-gray-300 rounded-2xl text-center text-lg"
              onChange={handleCodeChange}
            />
          ))}
        </div>
        <p className="text-sm text-gray-600">
          Didn’t get an email?{" "}
          <a href="#" className="text-black underline">
            Try again
          </a>
        </p>
      </div>
    </div>
  );
};

export default EmailConfirmationModal;
