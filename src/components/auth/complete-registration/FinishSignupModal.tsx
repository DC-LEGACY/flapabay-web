import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import close from "@/assets/left.png";

interface FinishSignupModalProps {
  onClose: () => void;
  email: string;
}

const FinishSignupModal: React.FC<FinishSignupModalProps> = ({ onClose, email }) => {
  const { registerUserDetails } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Validation Function
  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!firstName || firstName.length < 3) newErrors.firstName = "First name must be at least 3 characters.";
    if (!lastName || lastName.length < 3) newErrors.lastName = "Last name must be at least 3 characters.";
    if (!birthdate) newErrors.birthdate = "Date of birth is required.";
    if (!phone) newErrors.phone = "Phone number is required.";
    if (!password || password.length < 6) newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const [response, error] = await registerUserDetails({
        fname: firstName,
        lname: lastName,
        email,
        phone,
        password,
        dob: birthdate
      });

      if (error) throw error;

      onClose(); // Close modal on successful registration
    } catch (err: any) {
      setErrors(prev => ({
        ...prev,
        submit: err.message || 'Failed to register user'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center space-x-28">
          <button className="right-4" onClick={onClose}>
            <img src={close} alt="Close" className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold text-center">Finish signing up</h2>
        </div>
        <div className="mb-4 mt-4">
          <label className="text-sm font-medium mb-2 mt-8">Legal name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full text-[15px] border bg-white border-gray-300 rounded-t-md p-2 mt-5"
            placeholder="First name on ID"
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full text-[15px] border bg-white border-gray-300 rounded-b-md p-2"
            placeholder="Last name on ID"
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Date of birth</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full border bg-white text-[15px] text-black border-gray-300 rounded-2xl p-2"
          />
          {errors.birthdate && <p className="text-red-500 text-sm mt-1">{errors.birthdate}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Phone number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border bg-white text-[15px] text-black border-gray-300 rounded-2xl p-2"
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border bg-white text-[15px] text-black border-gray-300 rounded-2xl p-2"
            placeholder="Create a password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        {errors.submit && <p className="text-red-500 text-sm mt-1">{errors.submit}</p>}
        <button
          className="w-full bg-[#ffc500] text-white font-semibold py-2 rounded-2xl mt-4"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </div>
    </div>
  );
};

export default FinishSignupModal; 