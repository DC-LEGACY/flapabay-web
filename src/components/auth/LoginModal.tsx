import React, { useEffect, useRef, useState } from "react";

import ConfirmationModal from "./ConfirmationModal";
import EnterCodeModal from "./EnterCodeModal";
import { Link } from "react-router-dom";
import apple from "../../assets/apple-logo.png";
import axios from "axios";
import close from "../../assets/close.png";
import email from "../../assets/email.png";
import facebook from "../../assets/facebook.png";
import google from "../../assets/google.png";
import phone from "../../assets/smartphone.png";

// List of countries with phone codes
const countries = [
  { name: "Afghanistan", code: "+93" },
  { name: "Albania", code: "+355" },
  { name: "Algeria", code: "+213" },
  { name: "Argentina", code: "+54" },
  { name: "Australia", code: "+61" },
  { name: "Austria", code: "+43" },
  { name: "Bangladesh", code: "+880" },
  { name: "Belgium", code: "+32" },
  { name: "Brazil", code: "+55" },
  { name: "Canada", code: "+1" },
  { name: "China", code: "+86" },
  { name: "Colombia", code: "+57" },
  { name: "Denmark", code: "+45" },
  { name: "Egypt", code: "+20" },
  { name: "Ethiopia", code: "+251" },
  { name: "Finland", code: "+358" },
  { name: "France", code: "+33" },
  { name: "Germany", code: "+49" },
  { name: "Greece", code: "+30" },
  { name: "India", code: "+91" },
  { name: "Indonesia", code: "+62" },
  { name: "Iran", code: "+98" },
  { name: "Iraq", code: "+964" },
  { name: "Ireland", code: "+353" },
  { name: "Israel", code: "+972" },
  { name: "Italy", code: "+39" },
  { name: "Japan", code: "+81" },
  { name: "Kenya", code: "+254" },
  { name: "Malaysia", code: "+60" },
  { name: "Mexico", code: "+52" },
  { name: "Netherlands", code: "+31" },
  { name: "New Zealand", code: "+64" },
  { name: "Nigeria", code: "+234" },
  { name: "Norway", code: "+47" },
  { name: "Pakistan", code: "+92" },
  { name: "Philippines", code: "+63" },
  { name: "Poland", code: "+48" },
  { name: "Portugal", code: "+351" },
  { name: "Russia", code: "+7" },
  { name: "Saudi Arabia", code: "+966" },
  { name: "South Africa", code: "+27" },
  { name: "South Korea", code: "+82" },
  { name: "Spain", code: "+34" },
  { name: "Sri Lanka", code: "+94" },
  { name: "Sweden", code: "+46" },
  { name: "Switzerland", code: "+41" },
  { name: "Thailand", code: "+66" },
  { name: "Turkey", code: "+90" },
  { name: "United Arab Emirates", code: "+971" },
  { name: "United Kingdom", code: "+44" },
  { name: "United States", code: "+1" },
  { name: "Vietnam", code: "+84" },
];

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(); // Close modal if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const [selectedCountryCode, setSelectedCountryCode] = useState(
    countries[0].code
  ); // Default to the first country
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailMode, setIsEmailMode] = useState(false);

  const [showEmailConfirmationModal, setShowEmailConfirmationModal] =
    useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [emailError, setEmailError] = useState("");

  const handlePhoneContinue = () => {
    setShowEmailConfirmationModal(true);
  };
  const handleEmailContinue = () => {
    // Validate email input
    if (!email) {
      setEmailError("Please enter your email.");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError(""); // Clear error if valid
    }

    // Show the password entry modal instead of making an API call here
    setShowConfirmationModal(true);
  };

  if (showEmailConfirmationModal) {
    return (
      <ConfirmationModal onClose={() => setShowEmailConfirmationModal(false)} />
    );
  }
  if (showConfirmationModal) {
    return (
      <EnterCodeModal
        onClose={() => setShowConfirmationModal(false)}
        email={email}
      />
    );
  }

  // Handle country code change
  const handleCountryCodeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCountryCode(event.target.value);
  };

  // Handle phone number input (allow only numbers)
  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value); // Only update state if input is numeric
    }
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const toggleMode = () => {
    setIsEmailMode((prevMode) => !prevMode); // Toggle between email and phone mode
  };










  
  return (
    <div>
      <div
      // Prevent closing modal when clicking inside
      >
        <div className="">
          {!isEmailMode ? (
            <div>
              <div className="border border-gray-400 rounded-t-md">
                <label className="block text-sm text-gray-400 pl-2 pt-1">
                  Country code
                </label>
                <select
                  style={{ outline: "none" }}
                  className="bg-white block w-full rounded-2xl sm:text-sm h-10 pl-1"
                  value={selectedCountryCode}
                  onChange={handleCountryCodeChange}
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>
              </div>
              <div className="border border-gray-400 rounded-b-md">
                <label className="block text-sm text-gray-400 pt-1 pl-2">
                  Phone number
                </label>
                <div className="flex items-center">
                  <span className="pl-2 text-[16px]">
                    {selectedCountryCode}
                  </span>
                  <input
                    type="text"
                    className="bg-white flex-1 text-[16px] rounded-r-md shadow-sm sm:text-sm p-2 outline-none"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="border border-gray-400 rounded-2xl">
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-white w-full text-[16px] rounded-2xl shadow-sm p-[12px] sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
          )}

          <p className="text-xs text-gray-500 pt-2">
            We’ll call or text you to confirm your number. Standard message and
            data rates apply.{" "}
            <a href="#" className="text-black underline">
              Privacy Policy
            </a>
          </p>

          {isEmailMode ? (
            <button
              onClick={handleEmailContinue}
              className=" mt-2 w-full bg-[#ffc500] font-semibold text-white py-2 rounded-2xl"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handlePhoneContinue}
              className="mt-2 w-full bg-[#ffc500] font-semibold text-white py-2 rounded-2xl"
            >
              Continue with phone
            </button>
          )}

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="border-t  border-gray-400 w-full"></div>
            <span className="mx-4 text-black text-sm">or</span>
            <div className="border-t border-gray-400 w-full"></div>
          </div>

          {/* Social login buttons */}
          <div className="space-y-2">
            <button className="w-full border border-gray-600 rounded-2xl py-2 flex items-center space-x-0">
              <img src={google} alt="Google" className="h-4 w-7 pl-3" />
              <span className="flex-1 text-center text-[16px]">
                Continue with Google
              </span>
            </button>
            <button className="w-full border border-gray-600 rounded-2xl py-2 flex items-center space-x-0">
              <img src={apple} alt="Apple" className="h-4 w-7 pl-3" />
              <span className="flex-1 text-center text-[16px]">
                Continue with Apple
              </span>
            </button>
            <button
              onClick={toggleMode}
              className="w-full border border-gray-600 rounded-2xl py-2 flex items-center space-x-0"
            >
              {isEmailMode ? (
                <img src={phone} alt="Toggle Icon" className="h-4 w-7 pl-3" />
              ) : (
                <img src={email} alt="Toggle Icon" className="h-4 w-7 pl-3" />
              )}
              <span className="flex-1 text-center text-[16px]">
                {isEmailMode ? "Continue with phone" : "Continue with email"}
              </span>
            </button>
            <button className="w-full border border-gray-600 rounded-2xl py-2 flex items-center space-x-0">
              <img src={facebook} alt="Facebook" className="h-4 w-7 pl-3" />
              <span className="flex-1 text-center text-[16px]">
                Continue with Facebook
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
