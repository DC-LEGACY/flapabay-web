import { useState } from "react";

const GuestPricing = () => {
  const [individualRate, setIndividualRate] = useState<number | string>("");
  const [minimumPrice, setMinimumPrice] = useState<number | string>("");
  const [requireMinimum, setRequireMinimum] = useState(false);
  const [freeAccess, setFreeAccess] = useState(false);

  // Calculate earnings after 10% deduction
  const estimatedEarnings = individualRate ? (Number(individualRate) * 0.9).toFixed(2) : "0.00";

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Guest pricing</h2>
      <p className="text-gray-600 text-sm mt-2">
        How much you charge is entirely up to you. Enter the price you want each guest to pay and discover what you can earn.
        <span className="underline cursor-pointer"> Learn more</span>
      </p>

      {/* Individual Rate */}
      <div className="pt-6 border-b pb-4">
        <h3 className="text-lg font-medium">Individual rate</h3>
        <div className="flex items-center gap-4 mt-3">
          <label className="text-gray-600">Each guest pays</label>
          <div className="flex items-center border px-3 py-2 rounded">
            <span className="text-gray-600 pr-2">USD</span>
            <input
              type="number"
              value={individualRate}
              onChange={(e) => setIndividualRate(e.target.value)}
              className="w-20 outline-none text-right"
              placeholder="0"
            />
          </div>
        </div>
        <p className="text-gray-600 text-sm mt-2">Your estimated earnings: <span className="font-semibold">USD {estimatedEarnings}</span></p>
      </div>

      {/* Private Groups Pricing */}
      <div className="pt-6 border-b pb-4">
        <h3 className="text-lg font-medium">Per instance: Private groups</h3>
        <p className="text-gray-600 text-sm mt-1">
          If no other seats are taken, guests can book an instance for a private group.
        </p>

        <input
          type="number"
          value={minimumPrice}
          onChange={(e) => setMinimumPrice(e.target.value)}
          className="border mt-3 px-3 py-2 rounded w-full"
          placeholder="Minimum price"
        />

        <div className="flex items-center justify-between mt-4">
          <label className="text-gray-600">Always require minimum price</label>
          <input
            type="checkbox"
            checked={requireMinimum}
            onChange={() => setRequireMinimum(!requireMinimum)}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      </div>

      {/* Access for Guests with Disabilities */}
      <div className="pt-6">
        <h3 className="text-lg font-medium">Access providers for guests with disabilities</h3>
        <p className="text-gray-600 text-sm mt-1">
          Invite interpreters, caregivers, or support professionals to join the guests they’re assisting at no additional cost.
          <span className=" underline cursor-pointer"> Learn more</span>
        </p>

        <div className="flex items-center justify-between mt-4">
          <label className="text-gray-600">Free admission for access providers</label>
          <input
            type="checkbox"
            checked={freeAccess}
            onChange={() => setFreeAccess(!freeAccess)}
            className="w-5 h-5 cursor-pointer "
          />
        </div>
      </div>
    </div>
  );
};

export default GuestPricing;
