import { useState } from "react";
import { ChevronDown } from "lucide-react";

const GeneralAvailability = () => {
  const [startTime, setStartTime] = useState("");

  const timeOptions = [
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">General availability</h2>
      <p className="text-gray-600 text-sm mt-2">
        You’ll schedule exact dates and times that you’re available to host before you go live.
      </p>

      {/* Experience Start Time Selection */}
      <div className="pt-6">
        <h3 className="text-lg font-medium">What time would you typically start your experience?</h3>
        <p className="text-gray-600 text-sm mt-1">
          Later on, you’ll pick the exact calendar dates you’d like to host. You’ll also be able to adjust times for each
          individual date.
        </p>

        <div className="relative mt-4">
          <select
            className="w-full border px-4 py-2 rounded appearance-none cursor-pointer bg-white"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          >
            <option value="" disabled>
              Experience start time
            </option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default GeneralAvailability;
