// pages/verify.tsx
import { useState } from 'react';

export default function VerifyPage() {
  const [isIdentityVerified, setIsIdentityVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const handleVerifyIdentity = () => {
    // Simulate identity verification process
    setTimeout(() => {
      setIsIdentityVerified(true);
      alert('Identity verification successful!');
    }, 2000);
  };

  const handleVerifyPhoneNumber = () => {
    // Simulate phone number verification process
    setTimeout(() => {
      setIsPhoneVerified(true);
      alert('Phone number verification successful!');
    }, 2000);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-medium pb-2">Your information</h1>

      {/* Identity Verification Section */}
      <div className="mb-8">
        <p className="text-sm text-gray-600 mb-4">
          Before you submit, we need a few more things. This is so we can keep our community safe.
        </p>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Verify your identity</h2>
          {isIdentityVerified ? (
            <p className="text-green-600 font-semibold">Identity verified successfully!</p>
          ) : (
            <button
              onClick={handleVerifyIdentity}
              className="bg-[#ffc500] text-white px-6 py-2 rounded-lg  transition duration-200"
            >
              Get Verified
            </button>
          )}
        </div>
      </div>

      {/* Phone Number Verification Section */}
      <div className="mb-8">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Phone number</h2>
          <p className="text-sm text-gray-600 mb-4">
            Before you submit, we want to make sure that you're really you! Add your phone number so we can verify it.
          </p>
          {isPhoneVerified ? (
            <p className="text-green-600 font-semibold">Phone number verified successfully!</p>
          ) : (
            <button
              onClick={handleVerifyPhoneNumber}
              className="bg-[#ffc500] text-white px-6 py-2 rounded-lg  transition duration-200"
            >
              Verify phone number
            </button>
          )}
        </div>
      </div>
    </div>
  );
}