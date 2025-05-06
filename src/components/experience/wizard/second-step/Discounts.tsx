import { useState } from "react";

const Discounts = () => {
  const [groupRates, setGroupRates] = useState([
    { minSize: 2, maxSize: 8, discount: 20, price: 97.60 },
  ]);

  const addGroupRate = () => {
    setGroupRates([...groupRates, { minSize: 2, maxSize: 8, discount: 0, price: 97.60 }]);
  };

  const removeGroupRate = (index: number) => {
    const updatedRates = [...groupRates];
    updatedRates.splice(index, 1);
    setGroupRates(updatedRates);
  };

  const updateRate = (index: number, field: string, value: number) => {
    const updatedRates = [...groupRates];
    updatedRates[index] = { ...updatedRates[index], [field]: value };
    setGroupRates(updatedRates);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Discounts</h2>
      <p className="text-gray-600 text-sm mt-2">
        Consider adding discounts for different group sizes. Discounts apply to all paying guests, including children and infants.
      </p>

      {groupRates.map((rate, index) => {
        const discountedPrice = (rate.price * (1 - rate.discount / 100)).toFixed(2);

        return (
          <div key={index} className="border p-4 mt-4 rounded">
            <div className="flex items-center gap-4">
              <label className="text-gray-600">Group size</label>
              <input
                type="number"
                value={rate.minSize}
                onChange={(e) => updateRate(index, "minSize", Number(e.target.value))}
                className="border px-2 py-1 w-16 text-center rounded"
              />
              <span>-</span>
              <input
                type="number"
                value={rate.maxSize}
                onChange={(e) => updateRate(index, "maxSize", Number(e.target.value))}
                className="border px-2 py-1 w-16 text-center rounded"
              />
            </div>

            <div className="flex items-center gap-4 mt-3">
              <label className="text-gray-600">Discount</label>
              <input
                type="number"
                value={rate.discount}
                onChange={(e) => updateRate(index, "discount", Number(e.target.value))}
                className="border px-2 py-1 w-16 text-center rounded"
              />
              <span>%</span>
            </div>

            <div className="flex items-center gap-4 mt-3">
              <label className="text-gray-600">Each adult pays</label>
              <span className="border px-3 py-1 rounded bg-gray-100">USD {rate.price.toFixed(2)}</span>
            </div>

            <div className="flex items-center gap-4 mt-3">
              <label className="text-gray-600">Your estimated earnings</label>
              <span className="border px-3 py-1 rounded bg-gray-100">USD {discountedPrice}</span>
            </div>

            <button
              className="text-red-500 mt-3 text-sm underline"
              onClick={() => removeGroupRate(index)}
            >
              Remove group rate
            </button>
          </div>
        );
      })}
<div className=" pt-6">
      <button
        className=" px-4 py-2 border rounded text-black hover:bg-gray-100"
        onClick={addGroupRate}
      >
        Add group rate
      </button>
      </div>
    </div>
  );
};

export default Discounts;
