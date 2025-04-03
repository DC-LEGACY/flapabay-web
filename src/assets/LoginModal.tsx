import React, { useState } from "react";
import google from "../../assets/google.png";
import apple from "../../assets/apple-logo.png";
import facebook from "../../assets/facebook.png";
import email from "../../assets/email.png";
import close from "../../assets/close.png";
import phone from "../../assets/smartphone.png";

import EnterCodeModal from "./EnterCodeModal";
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

interface SignupModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<SignupModalProps> = ({ onClose }) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    countries[0].code
  ); // Default to the first country
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailMode, setIsEmailMode] = useState(false);

  // Handle country code change
  const handleCountryCodeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCountryCode(event.target.value);
  };

  const [showEmailConfirmationModal, setShowEmailConfirmationModal] =
    useState(false);
  const handleEmailContinue = () => {
    setShowEmailConfirmationModal(true);
  };

  if (showEmailConfirmationModal) {
    return (
      <EnterCodeModal onClose={() => setShowEmailConfirmationModal(false)} />
    );
  }

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
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-md relative z-60"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <div className="flex items-center space-x-32 text-center pt-5 text-lg font-semibold mb-4 ">
          <img
            onClick={onClose}
            src={close}
            alt="Facebook"
            className="h-3 w-6 pl-3 cursor-pointer"
          />
          <span className=" text-center"> Log in or sign up</span>
        </div>
        <div className="h-[.5px] w-[100%] bg-gray-600 " />
        <div className="p-6">
          <div className="font-semibold pb-4">Welcome to Flapabay</div>

          {!isEmailMode ? (
            <div>
              <div className="border border-gray-400 rounded-t-md">
                <label className="block text-sm text-gray-400 pl-2 pt-1">
                  Country code
                </label>
                <select
                style={{outline:"none"}}
                  className="bg-white block w-full rounded-md sm:text-sm h-10 pl-1"
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
              <div className="border border-gray-400 rounded-md">
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-white w-full text-[16px] rounded-md shadow-sm  p-2 sm:text-sm outline-none"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
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
              className=" mt-4 w-full bg-[#ffc500] font-semibold text-white py-2 rounded-md"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleEmailContinue}
              className=" mt-4 w-full bg-[#ffc500] font-semibold text-white py-2 rounded-md"
            >
              Continue
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
            <button className="w-full border border-gray-600 rounded-md py-2 flex items-center space-x-0">
              <img src={google} alt="Google" className="h-4 w-7 pl-3" />
              <span className="flex-1 text-center text-[16px]">
                Continue with Google
              </span>
            </button>
            <button className="w-full border border-gray-600 rounded-md py-2 flex items-center space-x-0">
              <img src={apple} alt="Apple" className="h-4 w-7 pl-3" />
              <span className="flex-1 text-center text-[16px]">
                Continue with Apple
              </span>
            </button>
            <button
              onClick={toggleMode}
              className="w-full border border-gray-600 rounded-md py-2 flex items-center space-x-0"
            >
              {/* <img
                src={isEmailMode ? phone:email}
                alt="Toggle Icon"
                className="h-4 w-7 pl-3"
              /> */}

              {isEmailMode ? (
                <img src={phone} alt="Toggle Icon" className="h-4 w-7 pl-3" />
              ) : (
                <img src={email} alt="Toggle Icon" className="h-4 w-7 pl-3" />
              )}
              <span className="flex-1 text-center text-[16px]">
                {isEmailMode ? "Continue with phone" : "Continue with email"}
              </span>
            </button>
            <button className="w-full border border-gray-600 rounded-md py-2 flex items-center space-x-0">
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
