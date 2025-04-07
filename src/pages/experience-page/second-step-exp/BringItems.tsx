import { useState } from "react";

const BringItems = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [items, setItems] = useState<string[]>([""]);

  const handleAddItem = () => {
    setItems([...items, ""]);
  };

  const handleInputChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Will guests need to bring anything to the experience?</h2>

      {/* Selection Buttons */}
      <div className="mt-4 space-y-3">
        {["Yes", "No, guests just need to show up"].map((option) => (
          <button
            key={option}
            className={`w-full p-4 border rounded-lg text-left font-medium ${
              selected === option ? "border-black bg-gray-100" : "border-gray-300"
            }`}
            onClick={() => setSelected(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Show the input fields when "Yes" is selected */}
      {selected === "Yes" && (
        <div className="pt-6">
          <h3 className="font-semibold">What guests need to bring</h3>
          <p className="text-gray-500 text-sm mb-3">
            This list will be emailed to guests when they book your experience. Help them prepare by being specific and listing each item separately.
          </p>

          {/* Dynamic Inputs */}
          {items.map((item, index) => (
            <input
              key={index}
              type="text"
              value={item}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              placeholder="Item"
            />
          ))}

          {/* Add Another Item Button */}
          <button onClick={handleAddItem} className="text-black font-medium">
            Add another item
          </button>
        </div>
      )}
    </div>
  );
};

export default BringItems;
