import React, { useRef, useState,useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
import { atom, useAtom } from "jotai";

// Jotai atom for storing the selected months
// const selectedMonthsAtom = atom(3);
const selectedMonthsAtom = atom(3);
const selectedFlexibleOptionAtom = atom(null);
const selectedMonthsFlexibleAtom = atom([]);

const CustomModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("dates");
  const modalRef = useRef(null);



  
  // Add an event handler on the modal itself to prevent propagation
//   const handleModalClick = (event) => {
//     event.stopPropagation(); // Prevents closing when clicking inside the modal
//   };
  
  if (!isOpen) return null;


  return (
    <div onClick={onClose} className="absolute  top-10 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-2xl shadow-lg w-[700px] z-50">
      {/* Tabs */}
      <div className="flex justify-center space-x-4 border-b pb-2">
        {["dates", "months", "flexible"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full ${
              activeTab === tab ? "bg-gray-200 font-semibold" : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "dates" && <DatesTab />}
        {activeTab === "months" && <MonthsTab />}
        {activeTab === "flexible" && <FlexibleTab />}
      </div>

      {/* Close Button */}
     
    </div>
  );
};

// DatesTab: Calendar with single date selection
const DatesTab = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const handleDateClick = (date) => {
    const newSelectedDate = new Date(currentYear, currentMonth, date);
    if (newSelectedDate < today) return; // Prevent selecting past dates

    setSelectedDate(newSelectedDate); // Allow only one selection
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

  return (
    <div className="text-center min-h-[300px]">
      <div className="flex justify-between items-center">
        {/* Back Arrow - Only enabled if not at current month */}
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
          selectedDate={selectedDate}
          onDateClick={handleDateClick}
        />

        {/* Next Arrow */}
        <button
          onClick={goToNextMonth}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <FiArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

// CalendarMonth: Displays a month's calendar
const CalendarMonth = ({ month, year, selectedDate, onDateClick }) => {
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
                  : selectedDate &&
                    new Date(year, month, day).toDateString() ===
                      selectedDate.toDateString()
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

// Placeholder components for the other tabs
const MonthsTab = () => {
  const [selectedMonths, setSelectedMonths] = useAtom(selectedMonthsAtom);

  const handleChange = (newValue) => {
    if (newValue >= 1 && newValue <= 12) {
      setSelectedMonths(newValue);
    }
  };

  return (
    <div className="flex flex-col min-h-[300px] items-center">
      <h2 className="text-lg font-semibold mb-4">When’s your trip?</h2>
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Circular Progress */}
        <div className="absolute w-full h-full rounded-full bg-gray-200" />
        <div
          className="absolute w-full h-full rounded-full"
          style={{
            background: `conic-gradient(#ffc500 ${
              (selectedMonths / 12) * 360
            }deg, #eee 0deg)`,
          }}
        />
        {/* Centered Value */}
        <div className="absolute flex flex-col items-center justify-center bg-white w-24 h-24 rounded-full shadow-md">
          <span className="text-2xl font-bold">{selectedMonths}</span>
          <span className="text-sm">months</span>
        </div>
      </div>
      {/* Controls */}
      <div className="flex space-x-4 mt-4">
        <button
          className="p-2 text-lg bg-gray-300 rounded-full disabled:opacity-50"
          onClick={() => handleChange(selectedMonths - 1)}
          disabled={selectedMonths <= 1}
        >
          <TiMinus />
        </button>
        <button
          className="p-2 text-lg bg-gray-300 rounded-full disabled:opacity-50"
          onClick={() => handleChange(selectedMonths + 1)}
          disabled={selectedMonths >= 12}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

const FlexibleTab = () => {
  const [selectedOption, setSelectedOption] = useAtom(
    selectedFlexibleOptionAtom
  );
  const [selectedMonths, setSelectedMonths] = useAtom(
    selectedMonthsFlexibleAtom
  );
  const [startIndex, setStartIndex] = useState(0);

  const options = ["Weekend", "Week", "Month"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const selectOption = (option) => {
    setSelectedOption(option);
  };

  const toggleMonth = (month) => {
    setSelectedMonths((prev) =>
      prev.includes(month)
        ? prev.filter((item) => item !== month)
        : [...prev, month]
    );
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev < months.length - 5 ? prev + 1 : prev));
  };

  return (
    <div className="text-center min-h-[300px]">
      <h2 className="text-lg font-semibold mb-4">Stay for a week</h2>
      <div className="flex justify-center space-x-2">
        {options.map((option) => (
          <button
            key={option}
            className={`px-4 py-2 rounded-full border ${
              selectedOption === option ? "bg-black text-white" : "bg-white"
            }`}
            onClick={() => selectOption(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <h2 className="text-lg font-semibold mt-6 mb-4">Go anytime</h2>
      <div className="flex items-center space-x-2">
        <button className="p-2 rounded-full bg-gray-200" onClick={handlePrev}>
          <FiArrowLeft size={24} />
        </button>
        <div className="flex space-x-4 overflow-hidden">
          {months.slice(startIndex, startIndex + 5).map((month) => (
            <button
              key={month}
              className={`p-3 w-24 rounded-lg border flex flex-col items-center ${
                selectedMonths.includes(month)
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
              onClick={() => toggleMonth(month)}
            >
              <span className="text-lg font-semibold">{month}</span>
            </button>
          ))}
        </div>
        <button className="p-2 rounded-full bg-gray-200" onClick={handleNext}>
          <FiArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default CustomModal;
