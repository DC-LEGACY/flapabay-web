// pages/just.tsx
import { useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";

export default function JustPage() {
  const [complianceChecked, setComplianceChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const handleSubmit = () => {
    if (complianceChecked && termsChecked) {
      alert('Submission successful!');
    } else {
      alert('Please agree to all terms before submitting.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold pb-6">Just a few last things...</h1>

      {/* Additional Licenses, Permits, or Permissions Section */}
      <div className="mb-6">
        <p className="text-sm  mb-4">
          You may be required to have additional licenses, permits, or permissions because of details that are specific to your experience:
        </p>
        <ul className="list-disc list-inside text-sm  mb-4">
            <div className='flex items-center justify-between '>
          <li className='  pb-3 font-medium'>Local laws</li>
          <IoIosArrowForward />
          </div>
          <div className=' h-[1px] w-full bg-gray-400' />
          <div className=' flex items-center justify-between '>
          <li className=' pt-3 font-medium'>Your guiding</li>
          <IoIosArrowForward className='' />
          </div>
        </ul>
      </div>

      {/* Compliance Checkbox */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={complianceChecked}
            onChange={(e) => setComplianceChecked(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm ">
            By selecting this checkbox, I attest that I have read, understand, and agree to maintain compliance with each of the applicable requirements presented above, and that I may be required to provide evidence of such compliance.
          </span>
        </label>
      </div>

      {/* Terms Checkbox */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={termsChecked}
            onChange={(e) => setTermsChecked(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm ">
            By selecting this checkbox, I agree to the Airbnb Experience standards and requirements, guest refund policy, and additional terms of service. Further, I confirm that my Experience complies with all applicable laws, rules, and regulations and that my descriptions and photos are my own and accurately reflect my experience.
          </span>
        </label>
      </div>

      
    </div>
  );
}