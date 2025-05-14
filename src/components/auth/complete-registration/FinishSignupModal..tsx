import React, { useState } from "react";

import EmailConfirmationModal from "@/components/auth/verify/EmailConfirmationModal";
import axios from "axios";
import close from "@/assets/left.png";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authStore";

const FinishSignupModal = ({ onClose, email }: { onClose: () => void; email: string }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [showEmailConfirmationModal, setShowEmailConfirmationModal] = useState(false);
  const [, setUser] = useAtom(userAtom);
  // Validation Function
  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!firstName || firstName.length < 3) newErrors.firstName = "First name must be at least 3 characters.";
    if (!lastName || lastName.length < 3) newErrors.lastName = "Last name must be at least 3 characters.";
    if (!birthdate) newErrors.birthdate = "Date of birth is required.";
    if (!phone) newErrors.phone = "Phone number is required.";
    if (!password || password.length < 6) newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // Handle Signup
  const handleSignup = async () => {
    if (!validateForm()) return; // Stop if validation fails

    setLoading(true);
    try {
      // Register User
      const response = await axios.post("https://localhost:8000/api/v1/register", {
        fname: firstName,
        lname: lastName,
        email,
        phone,
        password,
      });

      console.log("User registered:", response.data);

      // Store user data in localStorage
      const userData = {
        firstName,
        lastName,
        email,
        phone,
        token: response.data.token, // Assuming backend sends a token
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData); 

      // Call Email OTP API
      await axios.post("https://localhost:8000/api/v1/get-email-otp", { email });

      console.log("OTP sent successfully");

      // Show Email Confirmation Modal
      setShowEmailConfirmationModal(true);
    } catch (error: any) {
      console.error("Registration failed:", error);
      setErrors({ server: error.response?.data?.message || "Registration failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  if (showEmailConfirmationModal) {
    return <EmailConfirmationModal onClose={() => setShowEmailConfirmationModal(false)} email={email} />;
  }

  return (
    <div className="inset-0 shadow-lg rounded-2xl w-fit ml-auto mr-auto bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center space-x-24">
          <button className="right-4" onClick={onClose}>
            <img src={close} alt="Close" className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold text-center">Finish signing up</h2>
        </div>

        {/* Legal Name */}
        <div className="mb-4 mt-4">
          <label className="text-sm font-medium mb-2">Legal name</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
            className="w-full text-[15px] border bg-white border-gray-300 rounded-t-md p-2 mt-5" placeholder="First name on ID" />
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
            className="w-full text-[15px] border bg-white border-gray-300 rounded-b-md p-2" placeholder="Last name on ID" />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Date of birth</label>
          <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)}
            className="w-full border bg-white text-[15px] text-black border-gray-300 rounded-2xl p-2" />
          {errors.birthdate && <p className="text-red-500 text-sm">{errors.birthdate}</p>}
        </div>

        {/* Contact Info */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Contact info</label>
          <input type="email" placeholder="Email" value={email} readOnly className="w-full border text-[15px] bg-white border-gray-300 rounded-2xl p-2" />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
            className="w-full border text-[15px] bg-white border-gray-300 rounded-2xl p-2" placeholder="Enter your phone number" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full border bg-white text-[15px] border-gray-300 rounded-2xl p-2" placeholder="Enter your password" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Error Message */}
        {errors.server && <p className="text-red-500 text-sm text-center">{errors.server}</p>}

        {/* Signup Button */}
        <button onClick={handleSignup} disabled={loading}
          className={`w-full py-2 rounded-2xl font-semibold ${loading ? "bg-gray-400" : "bg-[#ffc500] text-white"}`}>
          {loading ? "Signing up..." : "Agree and continue"}
        </button>

        {/* Terms & Privacy */}
        <div className="mt-4 text-xs text-gray-400">
          By selecting Agree and continue, you agree to Airbnb's{" "}
          <a href="#" className="text-black underline">Terms of Service</a> and{" "}
          <a href="#" className="text-black underline">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default FinishSignupModal;
