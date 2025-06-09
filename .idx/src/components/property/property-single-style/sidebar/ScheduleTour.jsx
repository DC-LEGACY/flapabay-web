import { useState } from "react";
import { atom, useAtom } from "jotai";
import { Link } from "react-router-dom";

// Define Jotai atoms for guest counts
const adultsAtom = atom(0);
const childrenAtom = atom(0);
const infantsAtom = atom(0);
const petsAtom = atom(0);

export default function ScheduleTour() {
  const pricePerNight = 72; // AUD
  const serviceFee = 51; // AUD
  const [checkIn, setCheckIn] = useState("2025-03-01");
  const [checkOut, setCheckOut] = useState("2025-03-06");
  const [modalOpen, setModalOpen] = useState(false);
  
  // Jotai state management for guest selection
  const [adults, setAdults] = useAtom(adultsAtom);
  const [children, setChildren] = useAtom(childrenAtom);
  const [infants, setInfants] = useAtom(infantsAtom);
  const [pets, setPets] = useAtom(petsAtom);

  const totalGuests = adults + children;

  const nights = Math.max(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24),
    1
  );
  const totalBeforeTaxes = pricePerNight * nights + serviceFee;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-sm border relative">
      {/* Price Section */}
      <h2 className="text-2xl font-semibold">
        ${pricePerNight} <span className="text-gray-500 text-sm">AUD night</span>
      </h2>

      {/* Date Selection */}
      <div className="mt-4 border rounded-lg overflow-hidden">
        <div className="grid grid-cols-2 border-b">
          <div className="p-3">
            <label className="text-xs text-gray-600 uppercase block">Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
          <div className="p-3 border-l">
            <label className="text-xs text-gray-600 uppercase block">Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* Guests Dropdown */}
        <div className="p-3 relative">
          <label className="text-xs text-gray-600 uppercase block">Guests</label>
          <div className="w-full bg-transparent cursor-pointer" onClick={() => setModalOpen(true)}>
            {totalGuests} guest{totalGuests > 1 ? "s" : ""} &bull; {pets} pet{pets > 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Reserve Button */}
      <Link to={"/payment-page"}>
      <button className="w-full mt-4 bg-[#ffc500] text-white py-3 rounded-lg font-semibold">
        Reserve
      </button>
      </Link>

      {/* Price Breakdown */}
      <p className="text-xs text-gray-500 text-center mt-2">
        You won’t be charged yet
      </p>

      <div className="mt-4 text-sm space-y-2">
        <div className="flex justify-between">
          <p>
            ${pricePerNight} AUD × {nights} nights
          </p>
          <p>${pricePerNight * nights} AUD</p>
        </div>
        <div className="flex justify-between">
          <p className="text-blue-600 underline cursor-pointer">Flapabay service fee</p>
          <p>${serviceFee} AUD</p>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold text-lg">
          <p>Total before taxes</p>
          <p>${totalBeforeTaxes} AUD</p>
        </div>
      </div>

      {/* Guest Selection Modal */}
      {modalOpen && (
        <div className="absolute w-[88%] top-56 bg-white shadow-lg p-4 rounded-lg z-10">
          <h3 className="text-lg font-semibold mb-4">Select Guests</h3>
          {["Adults", "Children", "Infants", "Pets"].map((label, index) => {
            const stateArr = [adults, children, infants, pets];
            const setStateArr = [setAdults, setChildren, setInfants, setPets];

            return (
              <div key={index} className="flex justify-between items-center py-2">
                <p>{label}</p>
                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 border rounded-lg"
                    onClick={() => setStateArr[index](Math.max(stateArr[index] - 1, 0))}
                  >
                    -
                  </button>
                  <span>{stateArr[index]}</span>
                  <button
                    className="px-2 py-1 border rounded-lg"
                    onClick={() => setStateArr[index](stateArr[index] + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
          <button className="w-full bg-[#ffc500] text-white py-2 mt-4 rounded-lg" onClick={() => setModalOpen(false)}>
            Done
          </button>
        </div>
      )}
    </div>
  );
}
