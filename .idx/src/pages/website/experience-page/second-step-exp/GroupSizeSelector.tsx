import { useState } from "react";
import { ChevronDown } from "lucide-react";

const GroupSizeSelector = () => {
  const [publicGroupSize, setPublicGroupSize] = useState(8);
  const [privateGroupSize, setPrivateGroupSize] = useState(8);

  const publicOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  const privateOptions = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Maximum group size</h2>
      <p className="text-gray-600 text-sm mt-2">
        Think about what group size is best for your experience. Is it more interactive with fewer people, or more fun
        with a larger group? Remember: If only one person books, you'll still be expected to host.
      </p>

      {/* Public Group Section */}
      <div className="pt-6">
        <h3 className="text-lg font-medium">Public groups</h3>
        <div className="relative mt-2">
          <select
            className="w-full border px-4 py-2 rounded appearance-none cursor-pointer"
            value={publicGroupSize}
            onChange={(e) => setPublicGroupSize(Number(e.target.value))}
          >
            {publicOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
        </div>
        <p className="text-gray-600 text-sm mt-2">
          You can host a public group for up to 10 guests. Guests who book may or may not know each other.
        </p>
        <p className=" text-sm flex items-center gap-2 mt-2">
          <span>📈</span> We suggest {publicGroupSize} people based on your activity. You can always change this later.
        </p>
      </div>

      <hr className="my-6" />

      {/* Private Group Section */}
      <div>
        <h3 className="text-lg font-medium">Private groups</h3>
        <div className="relative mt-2">
          <select
            className="w-full border px-4 py-2 rounded appearance-none cursor-pointer"
            value={privateGroupSize}
            onChange={(e) => setPrivateGroupSize(Number(e.target.value))}
          >
            {privateOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
        </div>
        <p className="text-gray-600 text-sm mt-2">
          For in-person experiences, you can host a private group for up to 30 guests.
        </p>
      </div>
    </div>
  );
};

export default GroupSizeSelector;
