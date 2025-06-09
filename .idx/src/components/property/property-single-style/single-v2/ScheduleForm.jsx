import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ScheduleForm = () => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  const handleGuestsChange = (increment) => {
    setGuests((prev) => (increment ? prev + 1 : prev > 1 ? prev - 1 : prev));
  };

  const calculateTotalNights = () => {
    if (checkInDate && checkOutDate) {
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    const nights = calculateTotalNights();
    return nights * 46; // $46 AUD per night
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">$46 AUD night</h1>

      {/* Date Pickers */}
      <div className="flex justify-between mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">CHECK-IN</label>
          <DatePicker
  selected={checkInDate}
  onChange={(date) => setCheckInDate(date)}
  className="border p-2 rounded"
  placeholderText="Select check-in date"
/>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CHECKOUT</label>
          <DatePicker
  selected={checkOutDate}
  onChange={(date) => setCheckOutDate(date)}
  className="border p-2 rounded"
  placeholderText="Select checkout date"
/>
        </div>
      </div>

      {/* Guests Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">GUESTS</label>
        <input
          type="text"
          value={`${guests} guest${guests !== 1 ? "s" : ""}`}
          readOnly
          onClick={() => setIsGuestModalOpen(true)}
          className="border p-2 rounded w-full cursor-pointer"
        />
      </div>

      {/* Reserve Button */}
      <button className="bg-pink-600 text-white w-full py-2 rounded mb-4">
        Reserve
      </button>

      {/* Price Breakdown */}
      <div className="text-sm">
        <p className="mb-2">You won't be charged yet</p>
        <div className="flex justify-between mb-2">
          <span>
            $46 AUD x {calculateTotalNights()} nights
          </span>
          <span>${calculateTotalPrice()} AUD</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Airbnb service fee</span>
          <span>$135 AUD</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total before taxes</span>
          <span>${calculateTotalPrice() + 135} AUD</span>
        </div>
      </div>

      {/* Guest Modal */}
      {isGuestModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Add Guests</h2>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => handleGuestsChange(false)}
                className="bg-gray-200 p-2 rounded-full"
              >
                -
              </button>
              <span>{guests} guest{guests !== 1 ? "s" : ""}</span>
              <button
                onClick={() => handleGuestsChange(true)}
                className="bg-gray-200 p-2 rounded-full"
              >
                +
              </button>
            </div>
            <button
              onClick={() => setIsGuestModalOpen(false)}
              className="bg-pink-600 text-white w-full py-2 rounded"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleForm;