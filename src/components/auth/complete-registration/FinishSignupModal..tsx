import React, { useState } from "react";
import EmailConfirmationModal from "@/components/auth/verify/EmailConfirmationModal";
import close from "@/assets/left.png";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authStore";
import { authService } from "@/api/services/auth";
import { useToast } from "@/hooks/use-toast";
import { RegisterUserDetailsRequest, AuthResponse } from "@/api/types/apiTypes";

interface FinishSignupModalProps {
  onClose: () => void;
  email: string;
}

const FinishSignupModal: React.FC<FinishSignupModalProps> = ({ onClose, email }) => {
  console.log("FinishSignupModal rendered with email:", email);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [showEmailConfirmationModal, setShowEmailConfirmationModal] = useState(false);
  const [, setUser] = useAtom(userAtom);
  const { toast } = useToast();

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



  const handleSignup = async () => {
      if (!validateForm()) return;
      console.log("Form is valid, proceeding with signup...");

      setLoading(true);
      try {
        const registerData: RegisterUserDetailsRequest = {
          fname: firstName,
          lname: lastName,
          email,
          phone,
          password,
          dob: birthdate,
        };

        const [registerResponse, registerError] = await authService.registerUserDetails(registerData);
        console.log("Register response:", registerResponse);
        console.log("Register error:", registerError);

        if (registerError) {
            throw new Error(registerError.message || "Registration request failed");
          }
        if (registerResponse?.data?.alreadyRegistered) {
         
          const user = registerResponse?.data?.user;
          console.log("User data from response:", user);

          if (!user) {
            throw new Error("rushiii -----User data missing in response.");
          }


          console.log("User already registered:", user);

          
          // Optional: Save user info if needed
          localStorage.setItem("user_data", JSON.stringify(user));
          setUser(user);

          // Directly send OTP request
          const [otpResponse, otpError] = await authService.getEmailOtp(email);

          if (otpError) throw new Error(otpError.message);

          if (!otpResponse?.data?.success) throw new Error("Failed to send OTP");

          setShowEmailConfirmationModal(true);
          toast({
            title: "Welcome back",
            description: "OTP sent! Please verify your email.",
          });
          return;
        }



        const authData = registerResponse?.data;

        if (!authData?.user) {
          throw new Error("User data is missing in registration response.");
        }

        const userData = {
          id: authData.user.id,
          email: authData.user.email,
          name: authData.user.name,
          picture: undefined,
        };

        localStorage.setItem("user_data", JSON.stringify(userData));
        setUser(userData);

        const [otpResponse, otpError] = await authService.getEmailOtp(email);
        console.log("OTP response:", otpResponse);
        console.log("OTP error:", otpError);

        if (otpError) {
          throw new Error(otpError.message);
        }

        if (!otpResponse?.success) {
          throw new Error("Failed to send OTP");
        }

        setShowEmailConfirmationModal(true);
        toast({
          title: "Success",
          description: "Registration successful! Please verify your email.",
        });

      } catch (error: any) {
        console.error("Registration failed:", error);
        setErrors({ server: error.message || "Registration failed. Try again." });
        toast({
          title: "Error",
          description: error.message || "Registration failed. Try again.",
          variant: "destructive",
        });
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
