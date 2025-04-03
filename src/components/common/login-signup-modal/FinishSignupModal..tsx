import React, { useState } from "react";
import close from "../../../assets/left.png";
import EmailConfirmationModal from "./EmailConfirmationModal";

const FinishSignupModal = ({ onClose }: { onClose: () => void }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("fdytali65@gmail.com"); // Example email pre-filled
  const [password, setPassword] = useState("");

  const [showEmailConfirmationModal, setShowEmailConfirmationModal] =
    useState(false);
  const handleEmailContinue = () => {
    setShowEmailConfirmationModal(true);
  };

  if (showEmailConfirmationModal) {
    return (
      <EmailConfirmationModal
        onClose={() => setShowEmailConfirmationModal(false)}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" flex items-center space-x-28">
          <button className=" right-4" onClick={onClose}>
            <img src={close} alt="Close" className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold  text-center">
            Finish signing up
          </h2>
        </div>
        <div className="mb-4 mt-4">
          <label className=" text-sm font-medium mb-2 mt-8">Legal name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full text-[15px] border bg-white border-gray-300 rounded-t-md p-2 mt-5"
            placeholder="First name on ID"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full text-[15px] border bg-white border-gray-300 rounded-b-md p-2"
            placeholder="Last name on ID"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Date of birth
          </label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full border bg-white text-[15px] text-black border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Contact info</label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full border text-[15px] bg-white border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border bg-white text-[15px] border-gray-300 rounded-md p-2"
            placeholder="Enter your password"
          />
        </div>
        <button
          onClick={handleEmailContinue}
          className="w-full bg-[#ffc500] text-white py-2 rounded-md font-semibold"
        >
          Agree and continue
        </button>
        <div className="mt-4 text-xs text-gray-400">
          By selecting Agree and continue, you agree to Airbnb's{" "}
          <a href="#" className="text-black underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-black underline">
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default FinishSignupModal;
