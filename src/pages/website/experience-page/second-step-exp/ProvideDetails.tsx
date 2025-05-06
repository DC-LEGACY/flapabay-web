import { useState } from "react";

const ProvideDetails = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Add details about what you’ll provide</h2>
      <p className="text-gray-600 text-sm mt-2">
        You can provide food and drink, special equipment, a ticket to a concert, or anything else special to make your guests comfortable.
      </p>

      <div className="mt-4">
        <h3 className="font-semibold">Does your experience involve any one of the following?</h3>
        <p className="text-gray-500 text-sm mb-3">
          Making a selection may open additional feature detail selection options.
        </p>

        {/* Custom checkboxes */}
        {[
          "Driving (Car, ATV, Motorized Scooter, Snowmobile, etc.)",
          "Boating (Motorized boat, sailboat, waterski, parasailing, towed tubing etc.)",
          "Motorcycling",
          "Flying (Plane, Helicopter, or Hot Air Balloon)",
          "My experience does not include any of these activities",
        ].map((option) => (
          <label key={option} className="flex items-center space-x-3 cursor-pointer">
            <div
              className={`w-5 py-2 h-5 border-2 rounded-2xl flex items-center justify-center ${
                selectedOptions.includes(option) ? "bg-black border-black" : "border-gray-400"
              }`}
              onClick={() => toggleOption(option)}
            >
              {selectedOptions.includes(option) && (
                <div className="w-2.5 py-2 h-2.5 bg-white rounded-sm"></div>
              )}
            </div>
            <span className="text-black">{option}</span>
          </label>
        ))}
      </div>

      {/* Add Items */}
      <div className="pt-6 space-y-4">
        {["Food", "Drinks", "Tickets", "Transportation", "Equipment"].map((item) => (
          <div key={item} className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-semibold">{item}</p>
              <p className="text-sm text-gray-500">Optional</p>
            </div>
            <button className="text-black font-medium">Add</button>
          </div>
        ))}
      </div>
      
      <div>
            <h2 className=" text-xl font-medium pt-6">Keep in mind
           </h2>
           <p> If you’re using an independent business or other third party to provide transportation or equipment for your experience, you should include the name of the business and any other information that might be helpful to the guest. This only applies to transportation and equipment providers - you don’t need to list things like food or drink providers (but you can if you want to!).</p>
          </div>

      {/* Custom Button */}
      
    </div>
  );
};

export default ProvideDetails;
