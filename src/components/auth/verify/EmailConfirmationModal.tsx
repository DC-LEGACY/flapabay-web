import React, { useRef, useState } from "react";

import close from "@/assets/close.png";

const EmailConfirmationModal = ({
  email,
  onClose,
}: {
  email: string;
  onClose: () => void;
}) => {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleCodeChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to the next input field
      if (value && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  return (
    <div
      className=" inset-0 shadow-lg w-fit ml-auto mr-auto rounded-2xl flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex space-x-20">
          <button className="top-4 right-4" onClick={onClose}>
            <img src={close} alt="Close" className="h-4 w-4" />
          </button>
          <h2 className="text-lg font-semibold text-center">Confirm account</h2>
        </div>
        <div className="h-[.5px] w-full bg-gray-400 mt-2" />

        <h2 className="text-lg font-semibold mt-4">Enter Your Verification Code</h2>
        <p className="text-sm text-gray-800 mb-4 mt-2">
          Enter the code we emailed to {email}.
        </p>
        <div className="flex justify-center space-x-2 mb-4">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              maxLength={1}
              value={digit}
              className="w-12 h-12 border bg-white border-gray-300 rounded-2xl text-center text-lg"
              onChange={(e) => handleCodeChange(i, e)}
            />
          ))}
        </div>
        <button
          onClick={async () => {
            const enteredOtp = code.join("");
            try {
              const response = await fetch("http://localhost:8000/api/v1/auth/verify-otp-byemail", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  email,
                  otp: enteredOtp,
                }),
              });

              const data = await response.json();

              if (data.status) {
                alert("✅ OTP verification successful. You can now log in.");
                onClose(); // Optionally close the modal
              } else {
                alert("❌ " + (data.error || "OTP verification failed."));
              }
            } catch (err) {
              alert("🚨 Server error during OTP verification.");
            }
          }}
          className="bg-black text-white rounded-lg px-4 py-2 mt-2 mx-auto block"
        >
          Verify OTP
        </button>
        <p className="text-sm text-gray-600">
          Didn’t get an email? <a href="#" className="text-black underline">Try again</a>
        </p>
      </div>
    </div>
  );
};

export default EmailConfirmationModal;
