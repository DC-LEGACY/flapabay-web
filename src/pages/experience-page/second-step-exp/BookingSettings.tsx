import { useState } from "react";

const BookingSettings = () => {
  const [cutoffAdditional, setCutoffAdditional] = useState("");
  const [cutoffFirstGuest, setCutoffFirstGuest] = useState("");

  const cutoffOptions = [
    "30 minutes before",
    "1 hour before",
    "2 hours before",
    "4 hours before",
    "1 day before",
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Booking settings</h2>
      <p className="text-gray-600 text-sm mt-2">
        We recommend setting your cutoff time close to your start time so more guests can book. Be sure to give yourself enough time to prepare for your guests.
      </p>

      <div className="pt-6">
        <label className="block text-gray-700 font-medium">
          Cutoff time for additional guests
        </label>
        <select
          className="w-full border px-3 py-2 rounded mt-1"
          value={cutoffAdditional}
          onChange={(e) => setCutoffAdditional(e.target.value)}
        >
          <option value="">Choose amount of time</option>
          {cutoffOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="pt-6">
        <label className="block text-gray-700 font-medium">
          Cutoff time for your first guest
        </label>
        <select
          className="w-full border px-3 py-2 rounded mt-1"
          value={cutoffFirstGuest}
          onChange={(e) => setCutoffFirstGuest(e.target.value)}
        >
          <option value="">Choose amount of time</option>
          {cutoffOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BookingSettings;
