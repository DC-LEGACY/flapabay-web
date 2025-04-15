import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { atom, useAtom } from "jotai";
import { useRef, useState } from "react";

import { FiChevronDown } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { IoDiamondOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";

const guestsAtom = atom({ adults: 1, children: 0, infants: 0, pets: 0 });

const GuestSelectionModal = ({ isOpen, onClose }) => {
  const [guests, setGuests] = useAtom(guestsAtom);

  const updateGuestCount = (type, amount) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + amount),
    }));
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">Guests</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <IoClose size={24} />
          </button>
        </div>
        {[
          { label: "Adults", type: "adults", description: "Age 13+" },
          { label: "Children", type: "children", description: "Ages 2-12" },
          { label: "Infants", type: "infants", description: "Under 2" },
          {
            label: "Pets",
            type: "pets",
            description: "Bringing a service animal?",
          },
        ].map(({ label, type, description }) => (
          <div key={type} className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">{label}</p>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => updateGuestCount(type, -1)}
                className="p-2 border rounded-full text-gray-600"
                disabled={guests[type] === 0}
              >
                -
              </button>
              <span className="mx-3 font-medium">{guests[type]}</span>
              <button
                onClick={() => updateGuestCount(type, 1)}
                className="p-2 border rounded-full text-gray-600"
              >
                +
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="text-gray-600 underline">
            Cancel
          </button>
          <button
            onClick={onClose}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

const MessageHostModal = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState("");
  const modalRef = useRef(null);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return isOpen ? (
    <div
      className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">Message the host</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <IoClose size={24} />
          </button>
        </div>
        <p className="text-sm text-black mb-4">
          Share why you're traveling, who's coming with you, and what you love
          about the space.
        </p>
        <div className="bg-gray-100 p-3 rounded mb-4">
          <p className="font-semibold">Bua</p>
          <p className="text-sm text-gray-600">Joined in 2012</p>
          <p className="text-sm mt-2">
            Thank you for booking our place! We're looking forward to seeing
            you.
          </p>
        </div>
        <textarea
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-black"
          rows="4"
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          className={`w-full mt-4 py-2 rounded text-white font-semibold ${
            message
              ? "bg-[#FFC500] hover:bg-red-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!message}
        >
          Save
        </button>
      </div>
    </div>
  ) : null;
};

const ProfilePhotoModal = ({ isOpen, onClose }) => {
  const [image, setImage] = useState(null);
  const modalRef = useRef(null);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return isOpen ? (
    <div
      className="fixed inset-0 z-50 bg-opacity-50 flex items-center justify-center p-4"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg text-center"
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">Add your profile photo</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <IoClose size={24} />
          </button>
        </div>
        <div className="mb-4">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>
        <p className="text-sm text-black mb-4">
          Pick an image that shows your face. Hosts won’t be able to see your
          profile photo until your booking is confirmed.
        </p>
        <div className="flex flex-col gap-2">
          <label className="cursor-pointer font-medium px-4 py-2 bg-blue-500 text-white rounded">
            Use Facebook photo
            <input type="file" className="hidden" accept="image/*" />
          </label>
          <label className="cursor-pointer font-medium  px-4 py-2 bg-[#FFC500] text-white rounded">
            Upload a photo
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>
    </div>
  ) : null;
};

const DateSelectionModal = ({ isOpen, onClose, onSelectDates }) => {
  const today = new Date();
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const modalRef = useRef(null);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleDateClick = (date) => {
    const newSelectedDate = new Date(currentYear, currentMonth, date);
    if (newSelectedDate < today) return;

    if (selectedDates.length === 2) {
      setSelectedDates([newSelectedDate]);
    } else {
      setSelectedDates(
        [...selectedDates, newSelectedDate].sort((a, b) => a - b)
      );
    }
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
  };

  const goToPreviousMonth = () => {
    if (currentYear > today.getFullYear() || currentMonth > today.getMonth()) {
      setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
      if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
    }
  };

  const handleSave = () => {
    if (selectedDates.length === 2) {
      onSelectDates(selectedDates);
      onClose();
    }
  };

  return isOpen ? (
    <div
      className="fixed inset-0 z-50  bg-opacity-50 flex items-center justify-center p-4"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">Select dates</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <IoClose size={24} />
          </button>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={goToPreviousMonth}
            className={`p-2 rounded-full ${
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear()
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            disabled={
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear()
            }
          >
            <FiArrowLeft size={24} />
          </button>
          <CalendarMonth
            month={currentMonth}
            year={currentYear}
            selectedDates={selectedDates}
            onDateClick={handleDateClick}
          />
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <FiArrowRight size={24} />
          </button>
        </div>
        <button
          onClick={handleSave}
          className={`w-full mt-4 py-2 rounded text-white font-semibold ${
            selectedDates.length === 2
              ? "bg-[#FFC500] hover:bg-[#FFC500]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={selectedDates.length !== 2}
        >
          Save
        </button>
      </div>
    </div>
  ) : null;
};

const CalendarMonth = ({ month, year, selectedDates, onDateClick }) => {
  const today = new Date();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const days = Array.from({ length: firstDay }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold">
        {new Date(year, month).toLocaleString("en-US", { month: "long" })}{" "}
        {year}
      </h3>
      <div className="grid grid-cols-7 gap-1 text-gray-600 text-sm mt-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="font-medium">
            {day}
          </div>
        ))}
        {days.map((day, index) =>
          day ? (
            <button
              key={index}
              className={`p-2 w-10 h-10 rounded-full ${
                new Date(year, month, day) < today
                  ? "text-gray-400 cursor-not-allowed"
                  : selectedDates.some(
                      (selectedDate) =>
                        selectedDate.toDateString() ===
                        new Date(year, month, day).toDateString()
                    )
                  ? "bg-[#ffc500] text-white font-medium"
                  : "hover:bg-gray-200"
              }`}
              onClick={() =>
                new Date(year, month, day) >= today && onDateClick(day)
              }
              disabled={new Date(year, month, day) < today}
            >
              {day}
            </button>
          ) : (
            <div key={index}></div>
          )
        )}
      </div>
    </div>
  );
};

const ConfirmAndPay = ({ isOpen, onClose }) => {
  const [paymentOption, setPaymentOption] = useState("full");
  const [selectedCountry, setSelectedCountry] = useState("Pakistan");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenone, setIsModalOpenone] = useState(false);
  const [isProfilePhotoModalOpen, setIsProfilePhotoModalOpen] = useState(false);
  const [isModalOpentwo, setIsModalOpentwo] = useState(false);
  const [dates, setDates] = useState([null]);
  const [isModalOpenthree, setIsModalOpenthree] = useState(false);
  const [guests] = useAtom(guestsAtom);
  

  const guestSummary = `${guests.adults + guests.children} guest${
    guests.adults + guests.children > 1 ? "s" : ""
  }`;

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
    "Sweden",
    "Norway",
    "Denmark",
    "Finland",
    "Switzerland",
    "Belgium",
    "Austria",
    "Ireland",
    "Portugal",
    "Poland",
    "Greece",
    "Brazil",
    "Mexico",
    "Argentina",
    "Colombia",
    "Chile",
    "South Africa",
    "Nigeria",
    "Egypt",
    "India",
    "China",
    "Japan",
    "South Korea",
    "Indonesia",
    "Thailand",
    "Vietnam",
    "Malaysia",
    "Philippines",
    "Russia",
    "Turkey",
    "Saudi Arabia",
    "United Arab Emirates",
    "Israel",
    "New Zealand",
    "Singapore",
    "Hong Kong",
    "Taiwan",
    "Pakistan",
    "Bangladesh",
    "Sri Lanka",
    "Ukraine",
  ];














  

  return (
    <>
      <header className="w-full bg-white z-50 fixed top-0 left-0 flex justify-between items-center p-2 px-4">
        <div className="text-2xl font-bold text-black">
          <Link className="header-logo logo1" to="/">
            <img src="/images/logo.svg" alt="Header Logo" />
          </Link>
        </div>
        <button className="text-black text-sm flex items-center border border-gray-100 rounded-full px-3 py-2">
          Exit
        </button>
      </header>
      <div className="max-w-5xl mx-auto flex items-center px-2 pt-24 ">
        <Link to={"/booking-page"}>
          {" "}
          <MdKeyboardArrowLeft className=" text-4xl " />
        </Link>
        <h1 className="text-2xl font-semibold ml-5">Confirm and Pay</h1>
      </div>

      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-4 border rounded-lg shadow-sm flex items-center justify-between">
            <div>
              <p className="text-black font-medium">This is a rare find.</p>
              <p className="text-gray-500">
                Candice's place is usually book.
              </p>
            </div>
            <IoDiamondOutline className="text-2xl text-[#FFC500]" />
          </div>

          <div className="p-4 border rounded-lg shadow-sm space-y-3">
            <h2 className="text-xl font-semibold">Your trip</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dates</p>
                <p className="text-gray-600">{dates.length === 2 ? `${dates[0].toDateString()} - ${dates[1].toDateString()}` : "Fri Feb 28 2025 - Wed Mar 05 2025"}</p>
              </div>
              <button
                onClick={() => setIsModalOpentwo(true)}
                className="py-2 px-3 font-medium underline"
              >
                Edit
              </button>
              <DateSelectionModal
                isOpen={isModalOpentwo}
                onClose={() => setIsModalOpentwo(false)}
                onSelectDates={setDates}
              />
            </div>
            <div className="flex items-center justify-between ">
              <div>
                <p className=" font-medium">Guests</p>
                <p className="text-gray-600 ">{guestSummary}</p>
              </div>
              <button
                onClick={() => setIsModalOpenthree(true)}
                className="py-2 px-3 font-medium underline"
              >
                Edit
              </button>
              <GuestSelectionModal
                isOpen={isModalOpenthree}
                onClose={() => setIsModalOpenthree(false)}
              />
            </div>
          </div>

          {/* Payment Options */}
          <div className="p-4 border rounded-lg shadow-sm space-y-3">
            <h2 className="text-xl font-semibold">Choose how to pay</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="full"
                  checked={paymentOption === "full"}
                  onChange={() => setPaymentOption("full")}
                  className="w-4 h-4"
                />
                <span className="text-gray-900 font-medium">
                  Pay $965.46 AUD now
                </span>
              </label>
              <label className="flex flex-col gap-1 p-3 border rounded-lg cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="part"
                    checked={paymentOption === "part"}
                    onChange={() => setPaymentOption("part")}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-900 font-medium">
                    Pay part now, part later
                  </span>
                </div>
                <p className="text-gray-600 text-sm pl-6">
                  $536.04 AUD due today, $429.42 AUD on Mar 15, 2025. No extra
                  fees.
                </p>
              </label>
            </div>
          </div>

          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Pay with</h3>
            <select className="w-full p-2 border rounded mt-2">
              <option>Credit or debit card</option>
              <option>PayPal</option>
            </select>
            <input
              type="text"
              placeholder="Card number"
              className="w-full p-2 border rounded mt-2"
            />
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Expiration"
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-1/2 p-2 border rounded"
              />
            </div>
          </div>

          {/* Billing Address */}
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Billing address</h3>
            <input
              type="text"
              placeholder="Street address"
              className="w-full p-2 border rounded mt-2"
            />
            <input
              type="text"
              placeholder="Apt or suite number"
              className="w-full p-2 border rounded mt-2"
            />
            <input
              type="text"
              placeholder="City"
              className="w-full p-2 border rounded mt-2"
            />
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="State"
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="ZIP code"
                className="w-1/2 p-2 border rounded"
              />
            </div>
          </div>

          <div className="border p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Country</h2>

            <div
              className="border p-2 flex justify-between items-center mt-2 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <span>{selectedCountry}</span>
              <FiChevronDown size={20} />
            </div>
          </div>

          {/* Phone & Cancellation Policy */}
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Required for your trip</h3>
            <div className="flex justify-between items-center pb-4">
              <div className=" pt-2">
                <h3 className="font-medium">Message the host</h3>
                <p className="text-gray-600 text-sm">
                  Share why you're traveling, who's coming with you, and what
                  you love about the space.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpenone(true)}
                className="border px-4 py-2 rounded-lg text-sm"
              >
                Add
              </button>
              <MessageHostModal
                isOpen={isModalOpenone}
                onClose={() => setIsModalOpenone(false)}
              />
            </div>

            {/* Profile Photo Section */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Profile photo</h3>
                <p className="text-gray-600 text-sm">
                  Hosts want to know who’s staying at their place.
                </p>
              </div>
              <button
                onClick={() => setIsProfilePhotoModalOpen(true)}
                className="border px-4 py-2 rounded-lg text-sm"
              >
                Add
              </button>
              <ProfilePhotoModal
                isOpen={isProfilePhotoModalOpen}
                onClose={() => setIsProfilePhotoModalOpen(false)}
              />
            </div>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Cancellation policy</h3>
            <p className="text-sm text-gray-600">
              Free cancellation for 24 hours. Cancel before Mar 23 for a partial
              refund.
            </p>
          </div>

          <div className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold">Ground rules</h2>
            <p className="text-sm text-gray-600">
              Follow the house rules and treat the host’s home like your own.
            </p>
          </div>

          {/* Confirm and Pay Button */}
          
        </div>

        {/* Right Section - Fixed Price Details */}
        <div className="md:col-span-1 sticky top-6 self-start p-2 border rounded-lg shadow-sm bg-white">
          <div className="flex gap-2 items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLat8bZvhXD3ChSXyzGsFVh6qgplm1KhYPKA&s"
              className="w-28 h-28  rounded-lg"
            />
            <div>
              <h3 className="font-semibold">
                Couplespod at Riverstone House Portfolio
              </h3>
              <p className="text-gray-600 text-sm">
                Farm stay • ⭐ 4.94 (128 reviews)
              </p>
            </div>
          </div>

          <div className="border-t my-4"></div>

          <h2 className="text-xl font-semibold">Price details</h2>
          <div className="space-y-2 text-black">
            <div className="flex justify-between">
              <span>$166.64 AUD x 5 nights</span>
              <span>$833.20 AUD</span>
            </div>
            <div className="flex justify-between">
              <span>Cleaning fee</span>
              <span>$12.82 AUD</span>
            </div>
            <div className="flex justify-between">
              <span>Airbnb service fee</span>
              <span>$119.44 AUD</span>
            </div>
          </div>

          <div className="border-t my-4"></div>

          <div className="flex justify-between text-lg font-semibold">
            <span>Total (AUD)</span>
            <span>$965.46 AUD</span>
          </div>
        </div>
        <Link to={"/reservation-page"}>
        <button className="w-full bg-[#FFC500] text-white py-3 rounded-lg font-semibold">
            Confirm and pay
          </button>
          </Link>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg w-1/3">
              <h2 className="text-lg font-semibold mb-4">Select a Country</h2>
              <ul>
                {countries.map((country) => (
                  <li
                    key={country}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setSelectedCountry(country);
                      setIsModalOpen(false);
                    }}
                  >
                    {country}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}


      </div>
    </>
  );
};

export default ConfirmAndPay;
