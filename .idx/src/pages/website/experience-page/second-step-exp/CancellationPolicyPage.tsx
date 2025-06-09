import { useState } from 'react';

export default function CancellationPolicyPage() {
  const [selectedPolicy, setSelectedPolicy] = useState<string>('');

  const handlePolicyChange = (policy: string) => {
    setSelectedPolicy(policy);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-medium pb-6">Choose a cancellation policy</h1>

      {/* Policy Option 1 */}
      <div className="pb-6">
        <label className="flex items-center mb-2">
          <input
            type="radio"
            name="cancellationPolicy"
            value="policy1"
            checked={selectedPolicy === 'policy1'}
            onChange={() => handlePolicyChange('policy1')}
            className="mr-2"
          />
          <span className="text-lg">Guests can cancel until 7 days before the experience start time for a full refund.  Or within 24 hours of booking as long as the booking is made more than 48 hours before the start time.</span>
        </label>
        
      </div>

      {/* Policy Option 2 */}
      <div className="mb-6">
        <label className="flex items-center mb-2">
          <input
            type="radio"
            name="cancellationPolicy"
            value="policy2"
            checked={selectedPolicy === 'policy2'}
            onChange={() => handlePolicyChange('policy2')}
            className="mr-2"
          />
          <span className="text-lg">Guests can cancel until 24 hours before the experience start time for a full refund.</span>
        </label>
      </div>
    </div>
  );
}