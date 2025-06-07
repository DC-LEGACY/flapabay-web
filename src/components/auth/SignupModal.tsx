import React, { useEffect, useRef, useState } from "react";

import ConfirmationModal from "./verify/ConfirmationModal";

import FinishSignupModal from "./complete-registration/FinishSignupModal";
import { Button } from "@/components/ui/button";
import apple from "../../assets/apple-logo.png";
import facebook from "../../assets/facebook.png";
import google from "../../assets/google.png";
import phone from "../../assets/smartphone.png";
import { Sms, Mobile } from "iconsax-react";
import { useAuth } from "@/contexts/AuthContext";
// List of countries with phone codes
const countries = [
  { name: "Afghanistan", code: "+93" },
  { name: "Albania", code: "+355" },
  { name: "Algeria", code: "+213" },
  { name: "Andorra", code: "+376" },
  { name: "Angola", code: "+244" },
  { name: "Antigua and Barbuda", code: "+1-268" },
  { name: "Argentina", code: "+54" },
  { name: "Armenia", code: "+374" },
  { name: "Australia", code: "+61" },
  { name: "Austria", code: "+43" },
  { name: "Azerbaijan", code: "+994" },
  { name: "Bahamas", code: "+1-242" },
  { name: "Bahrain", code: "+973" },
  { name: "Bangladesh", code: "+880" },
  { name: "Barbados", code: "+1-246" },
  { name: "Belarus", code: "+375" },
  { name: "Belgium", code: "+32" },
  { name: "Belize", code: "+501" },
  { name: "Benin", code: "+229" },
  { name: "Bhutan", code: "+975" },
  { name: "Bolivia", code: "+591" },
  { name: "Bosnia and Herzegovina", code: "+387" },
  { name: "Botswana", code: "+267" },
  { name: "Brazil", code: "+55" },
  { name: "Brunei", code: "+673" },
  { name: "Bulgaria", code: "+359" },
  { name: "Burkina Faso", code: "+226" },
  { name: "Burundi", code: "+257" },
  { name: "Cabo Verde", code: "+238" },
  { name: "Cambodia", code: "+855" },
  { name: "Cameroon", code: "+237" },
  { name: "Canada", code: "+1" },
  { name: "Central African Republic", code: "+236" },
  { name: "Chad", code: "+235" },
  { name: "Chile", code: "+56" },
  { name: "China", code: "+86" },
  { name: "Colombia", code: "+57" },
  { name: "Comoros", code: "+269" },
  { name: "Congo (Congo-Brazzaville)", code: "+242" },
  { name: "Costa Rica", code: "+506" },
  { name: "Croatia", code: "+385" },
  { name: "Cuba", code: "+53" },
  { name: "Cyprus", code: "+357" },
  { name: "Czech Republic", code: "+420" },
  { name: "Democratic Republic of the Congo", code: "+243" },
  { name: "Denmark", code: "+45" },
  { name: "Djibouti", code: "+253" },
  { name: "Dominica", code: "+1-767" },
  { name: "Dominican Republic", code: "+1-809" },
  { name: "Ecuador", code: "+593" },
  { name: "Egypt", code: "+20" },
  { name: "El Salvador", code: "+503" },
  { name: "Equatorial Guinea", code: "+240" },
  { name: "Eritrea", code: "+291" },
  { name: "Estonia", code: "+372" },
  { name: "Eswatini", code: "+268" },
  { name: "Ethiopia", code: "+251" },
  { name: "Fiji", code: "+679" },
  { name: "Finland", code: "+358" },
  { name: "France", code: "+33" },
  { name: "Gabon", code: "+241" },
  { name: "Gambia", code: "+220" },
  { name: "Georgia", code: "+995" },
  { name: "Germany", code: "+49" },
  { name: "Ghana", code: "+233" },
  { name: "Greece", code: "+30" },
  { name: "Grenada", code: "+1-473" },
  { name: "Guatemala", code: "+502" },
  { name: "Guinea", code: "+224" },
  { name: "Guinea-Bissau", code: "+245" },
  { name: "Guyana", code: "+592" },
  { name: "Haiti", code: "+509" },
  { name: "Honduras", code: "+504" },
  { name: "Hungary", code: "+36" },
  { name: "Iceland", code: "+354" },
  { name: "India", code: "+91" },
  { name: "Indonesia", code: "+62" },
  { name: "Iran", code: "+98" },
  { name: "Iraq", code: "+964" },
  { name: "Ireland", code: "+353" },
  { name: "Israel", code: "+972" },
  { name: "Italy", code: "+39" },
  { name: "Ivory Coast", code: "+225" },
  { name: "Jamaica", code: "+1-876" },
  { name: "Japan", code: "+81" },
  { name: "Jordan", code: "+962" },
  { name: "Kazakhstan", code: "+7" },
  { name: "Kenya", code: "+254" },
  { name: "Kiribati", code: "+686" },
  { name: "Kuwait", code: "+965" },
  { name: "Kyrgyzstan", code: "+996" },
  { name: "Laos", code: "+856" },
  { name: "Latvia", code: "+371" },
  { name: "Lebanon", code: "+961" },
  { name: "Lesotho", code: "+266" },
  { name: "Liberia", code: "+231" },
  { name: "Libya", code: "+218" },
  { name: "Liechtenstein", code: "+423" },
  { name: "Lithuania", code: "+370" },
  { name: "Luxembourg", code: "+352" },
  { name: "Madagascar", code: "+261" },
  { name: "Malawi", code: "+265" },
  { name: "Malaysia", code: "+60" },
  { name: "Maldives", code: "+960" },
  { name: "Mali", code: "+223" },
  { name: "Malta", code: "+356" },
  { name: "Marshall Islands", code: "+692" },
  { name: "Mauritania", code: "+222" },
  { name: "Mauritius", code: "+230" },
  { name: "Mexico", code: "+52" },
  { name: "Micronesia", code: "+691" },
  { name: "Moldova", code: "+373" },
  { name: "Monaco", code: "+377" },
  { name: "Mongolia", code: "+976" },
  { name: "Montenegro", code: "+382" },
  { name: "Morocco", code: "+212" },
  { name: "Mozambique", code: "+258" },
  { name: "Myanmar (Burma)", code: "+95" },
  { name: "Namibia", code: "+264" },
  { name: "Nauru", code: "+674" },
  { name: "Nepal", code: "+977" },
  { name: "Netherlands", code: "+31" },
  { name: "New Zealand", code: "+64" },
  { name: "Nicaragua", code: "+505" },
  { name: "Niger", code: "+227" },
  { name: "Nigeria", code: "+234" },
  { name: "North Korea", code: "+850" },
  { name: "North Macedonia", code: "+389" },
  { name: "Norway", code: "+47" },
  { name: "Oman", code: "+968" },
  { name: "Pakistan", code: "+92" },
  { name: "Palau", code: "+680" },
  { name: "Palestine", code: "+970" },
  { name: "Panama", code: "+507" },
  { name: "Papua New Guinea", code: "+675" },
  { name: "Paraguay", code: "+595" },
  { name: "Peru", code: "+51" },
  { name: "Philippines", code: "+63" },
  { name: "Poland", code: "+48" },
  { name: "Portugal", code: "+351" },
  { name: "Qatar", code: "+974" },
  { name: "Romania", code: "+40" },
  { name: "Russia", code: "+7" },
  { name: "Rwanda", code: "+250" },
  { name: "Saint Kitts and Nevis", code: "+1-869" },
  { name: "Saint Lucia", code: "+1-758" },
  { name: "Saint Vincent and the Grenadines", code: "+1-784" },
  { name: "Samoa", code: "+685" },
  { name: "San Marino", code: "+378" },
  { name: "Sao Tome and Principe", code: "+239" },
  { name: "Saudi Arabia", code: "+966" },
  { name: "Senegal", code: "+221" },
  { name: "Serbia", code: "+381" },
  { name: "Seychelles", code: "+248" },
  { name: "Sierra Leone", code: "+232" },
  { name: "Singapore", code: "+65" },
  { name: "Slovakia", code: "+421" },
  { name: "Slovenia", code: "+386" },
  { name: "Solomon Islands", code: "+677" },
  { name: "Somalia", code: "+252" },
  { name: "South Africa", code: "+27" },
  { name: "South Korea", code: "+82" },
  { name: "South Sudan", code: "+211" },
  { name: "Spain", code: "+34" },
  { name: "Sri Lanka", code: "+94" },
  { name: "Sudan", code: "+249" },
  { name: "Suriname", code: "+597" },
  { name: "Sweden", code: "+46" },
  { name: "Switzerland", code: "+41" },
  { name: "Syria", code: "+963" },
  { name: "Taiwan", code: "+886" },
  { name: "Tajikistan", code: "+992" },
  { name: "Tanzania", code: "+255" },
  { name: "Thailand", code: "+66" },
  { name: "Timor-Leste", code: "+670" },
  { name: "Togo", code: "+228" },
  { name: "Tonga", code: "+676" },
  { name: "Trinidad and Tobago", code: "+1-868" },
  { name: "Tunisia", code: "+216" },
  { name: "Turkey", code: "+90" },
  { name: "Turkmenistan", code: "+993" },
  { name: "Tuvalu", code: "+688" },
  { name: "Uganda", code: "+256" },
  { name: "Ukraine", code: "+380" },
  { name: "United Arab Emirates", code: "+971" },
  { name: "United Kingdom", code: "+44" },
  { name: "United States", code: "+1" },
  { name: "Uruguay", code: "+598" },
  { name: "Uzbekistan", code: "+998" },
  { name: "Vanuatu", code: "+678" },
  { name: "Vatican City", code: "+379" },
  { name: "Venezuela", code: "+58" },
  { name: "Vietnam", code: "+84" },
  { name: "Yemen", code: "+967" },
  { name: "Zambia", code: "+260" },
  { name: "Zimbabwe", code: "+263" }
];


interface SignupModalProps {
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ onClose }) => {
  const { 
    signInWithGoogle, 
    loading, 
    error: authError,
    getSignupPhoneOtp,
    getSignupEmailOtp,
    verifyOtpByPhone,
    verifyOtpByEmail
  } = useAuth();

  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState(countries[194].code);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailMode, setIsEmailMode] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handlePhoneContinue = async () => {
    try {
      setIsLoading(true);
      setError("");

      if (!phoneNumber) {
        setError("Please enter your phone number.");
        return;
      }

      const [response, error] = await getSignupPhoneOtp({
        phone: phoneNumber,
        code: selectedCountryCode.replace('+', '')
      });

      if (error) throw error;

      setShowConfirmationModal(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailContinue = async () => {
    try {
      setIsLoading(true);
      setError("");

      if (!email) {
        setError("Please enter your email.");
        return;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }

      const [response, error] = await getSignupEmailOtp(email);

      if (error) throw error;

      setShowConfirmationModal(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };

  const toggleMode = () => {
    setIsEmailMode(!isEmailMode);
    setError("");
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountryCode(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  if (showConfirmationModal) {
    return (
      <ConfirmationModal 
        onClose={() => setShowConfirmationModal(false)} 
        phone={phoneNumber}
        code={selectedCountryCode.replace('+', '')}
      />
    );
  }

  if (showFinishModal) {
    return (
      <FinishSignupModal 
        onClose={() => setShowFinishModal(false)} 
        email={email}
      />
    );
  }

  return (
    <div>
      <div>
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
                    <option key={`${country.name}-${country.code}`} value={country.code}>
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
                    minLength={9} maxLength={13}
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
                  className="w-full text-[16px] rounded-2xl p-[12px] sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          )}

          <p className="text-xs text-gray-500 pt-2">
            We'll call or text you to confirm your number. Standard message and
            data rates apply.{" "}
            <a href="#" className="text-black underline">
              Privacy Policy
            </a>
          </p>

          {isEmailMode ? (
            <Button
              onClick={handleEmailContinue}
              className="mt-2 w-full bg-[#ffc500] font-semibold text-white py-2 rounded-2xl"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Continue'}
            </Button>
          ) : (
            <Button
              onClick={handlePhoneContinue}
              className="mt-2 w-full bg-[#ffc500] font-semibold text-white py-2 rounded-2xl"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Continue with phone'}
            </Button>
          )}

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="border-t border-gray-400 w-full"></div>
            <span className="mx-4 text-black text-sm">or</span>
            <div className="border-t border-gray-400 w-full"></div>
          </div>

          {/* Social login buttons */}
          <div className="space-y-2">
            <Button 
              onClick={handleGoogleSignIn} 
              variant="ghost" 
              className="w-full border border-gray-600 rounded-2xl py-2 flex items-center space-x-0"
              disabled={loading}
            >
              <img src={google} alt="Google" className="h-4 w-7 pl-3" />
              <span className="flex-1 text-center text-[16px]">
                {loading ? 'Signing in...' : 'Continue with Google'}
              </span>
            </Button>
            
            <Button 
              variant="ghost"
              onClick={toggleMode}
              className="w-full border border-gray-600 rounded-2xl py-2 flex items-center space-x-0"
            >
              {isEmailMode ? (
                <Mobile style={{
                  width: 33,
                  height: 30,
                }} className="h-4 w-7 pl-3" />
              ) : (
                <Sms style={{
                  width: "33px",
                  height: "30px",
                }} variant="Bold" size="30" className="h-10 w-10 pl-3" />
              )}
              <span className="flex-1 text-center text-[16px]">
                {isEmailMode ? "Continue with phone" : "Continue with email"}
              </span>
            </Button>
            <Button variant="ghost" className="w-full border border-gray-600 rounded-2xl py-2 flex items-center space-x-0">
              <img src={facebook} alt="Facebook" className="h-4 w-7 pl-3" />
              <span className="flex-1 text-center text-[16px]">
                Continue with Facebook
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
