import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import left from "@/assets/left.png";
import { Button } from "@/components/ui/button";

interface ConfirmationModalProps {
  onClose: () => void;
  phone: string;
  code: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onClose, phone, code }) => {
  const { loginWithOtp } = useAuth();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setOtp(value);
      setError("");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);
      setError("");

      if (!otp) {
        setError("Please enter the OTP code.");
        return;
      }

      const [response, error] = await loginWithOtp({
        phone,
        code,
        otp
      });

      if (error) throw error;

      onClose(); // Close modal on successful verification
    } catch (err: any) {
      setError(err.message || 'Failed to verify OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md relative z-60 p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <button onClick={onClose}>
            <img src={left} alt="Close" className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold text-center flex-1 ">Verify your phone</h2>
        </div>
        {/* <div className="h-[.5px] w-full bg-gray-400 pt-2" /> */}

        <div className="pt-6">
          <p className="text-sm text-gray-600 pb-4">
            Enter the verification code sent to {phone}
          </p>
          <div className="flex justify-center space-x-2 pb-4">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                className="w-12 h-12 border bg-white border-gray-300 rounded-2xl text-center text-lg"
                onChange={handleOtpChange}
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-sm pt-1">{error}</p>}
        </div>

        <Button 
          className="w-full  text-white font-semibold py-2 rounded-2xl mt-4"
          onClick={handleVerifyOtp}
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </Button>

        <div className="text-center mt-4">
          <button className="text-sm text-black underline font-semibold">
            Didn't receive the code? Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
