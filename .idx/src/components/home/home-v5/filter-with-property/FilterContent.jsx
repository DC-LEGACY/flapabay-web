import "rc-slider/assets/index.css";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import React, { useEffect, useRef, useState } from "react";
import { SearchNormal, Setting4, Size } from "iconsax-react";
import { atom, useAtom } from "jotai";

import { FaPlus } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { TiMinus } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useScreenSize } from "@/utilis/screenUtils";

const selectedMonthsAtom = atom(3);
const selectedFlexibleOptionAtom = atom(null);
const selectedMonthsFlexibleAtom = atom([]);

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
      <div className="flex items-center justify-between">
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
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
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
      <div className="grid grid-cols-7 gap-1 mt-2 text-sm text-gray-600">
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

const DatesTabtwo = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const handleDateClick = (date) => {
    const selectedDate = new Date(currentYear, currentMonth, date);

    if (selectedDate < today) return; // Prevent selecting past dates

    if (!startDate || (startDate && endDate)) {
      // If no start date OR both dates exist, reset and select new start date
      setStartDate(selectedDate);
      setEndDate(null);
    } else if (selectedDate >= startDate) {
      // If selecting a valid end date after start date
      setEndDate(selectedDate);
    } else {
      // If clicking before the start date, update the start date
      setStartDate(selectedDate);
      setEndDate(null);
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

  return (
    <div className="text-center min-h-[300px]">
      <div className="flex items-center justify-between">
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

        <CalendarMonthtwo
          month={currentMonth}
          year={currentYear}
          startDate={startDate}
          endDate={endDate}
          onDateClick={handleDateClick}
        />

        {/* Next Arrow */}
        <button
          onClick={goToNextMonth}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <FiArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

// CalendarMonth Component: Displays a month's calendar
const CalendarMonthtwo = ({ month, year, startDate, endDate, onDateClick }) => {
  const today = new Date();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const days = Array.from({ length: firstDay }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const isInRange = (day) => {
    const date = new Date(year, month, day);
    return startDate && endDate && date > startDate && date < endDate;
  };

  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold">
        {new Date(year, month).toLocaleString("en-US", { month: "long" })}{" "}
        {year}
      </h3>
      <div className="grid grid-cols-7 gap-1 mt-2 text-sm text-gray-600">
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
                  : startDate &&
                    new Date(year, month, day).toDateString() ===
                      startDate.toDateString()
                  ? "bg-[#ffc500] text-white font-medium"
                  : endDate &&
                    new Date(year, month, day).toDateString() ===
                      endDate.toDateString()
                  ? "bg-[#ffc500] text-white font-medium"
                  : isInRange(day)
                  ? "bg-yellow-200"
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
      <h2 className="mb-4 text-lg font-semibold">When’s your trip?</h2>
      <div className="relative flex items-center justify-center w-40 h-40">
        {/* Circular Progress */}
        <div className="absolute w-full h-full bg-gray-200 rounded-full" />
        <div
          className="absolute w-full h-full rounded-full"
          style={{
            background: `conic-gradient(#ffc500 ${
              (selectedMonths / 12) * 360
            }deg, #eee 0deg)`,
          }}
        />
        {/* Centered Value */}
        <div className="absolute flex flex-col items-center justify-center w-24 h-24 bg-white rounded-full shadow-md">
          <span className="text-2xl font-bold">{selectedMonths}</span>
          <span className="text-sm">months</span>
        </div>
      </div>
      {/* Controls */}
      <div className="flex mt-4 space-x-4">
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
      <h2 className="mb-4 text-lg font-semibold">Stay for a week</h2>
      <div className="flex justify-center space-x-2">
        {options.map((option) => (
          <button
            key={option}
            className={`px-4 py-2 rounded-full border ${
              selectedOption === option ? "bg-[#ffc500] text-white" : "bg-white"
            }`}
            onClick={() => selectOption(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <h2 className="mt-6 mb-4 text-lg font-semibold">Go anytime</h2>
      <div className="flex items-center space-x-2">
        <button className="p-2 bg-gray-200 rounded-full" onClick={handlePrev}>
          <IoIosArrowBack size={24} />
        </button>
        <div className="flex space-x-4 overflow-hidden">
          {months.slice(startIndex, startIndex + 5).map((month) => (
            <button
              key={month}
              className={`p-3 w-24 rounded-lg border flex flex-col items-center ${
                selectedMonths.includes(month)
                  ? "bg-[#ffc500] text-white"
                  : "bg-white"
              }`}
              onClick={() => toggleMonth(month)}
            >
              <span className="text-lg font-semibold">{month}</span>
            </button>
          ))}
        </div>
        <button className="p-2 bg-gray-200 rounded-full" onClick={handleNext}>
          <IoIosArrowForward size={24} />
        </button>
      </div>
    </div>
  );
};

const FilterContent = () => {
  const [activeTabone, setActiveTabone] = useState("dates");
  const isMobile = useScreenSize();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Experiences");
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const guestModalRef = useRef(null);
  const CalenderModalRef = useRef(null);
  const CalendertwoModalRef = useRef(null);
  const isModalOpenRef = useRef(null);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [searchValue, setSearchValue] = useState("");
  const modalRef = useRef(null);

  const suggestions = [
    { name: "Nearby", desc: "Find what’s around you", icon: "📍" },
    {
      name: "Islamabad, Pakistan",
      desc: "For sights like Faisal Mosque",
      icon: "🏝️",
    },
    { name: "Shimla, India", desc: "For nature-lovers", icon: "🏕️" },
    {
      name: "New Delhi, India",
      desc: "For its stunning architecture",
      icon: "🏛️",
    },
    { name: "Manali, India", desc: "Great for winter getaways", icon: "❄️" },
  ];

  const handleFocus = () => setIsModalOpen(true);

  const handleBlur = (event) => {
    if (!modalRef.current?.contains(event.relatedTarget)) {
      setIsModalOpen(false);
    }
  };

  const handleSelectSuggestion = (name) => {
    setSearchValue(name);
    setIsModalOpen(false); // Close modal after selecting
  };

  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  // Click Outside Detector for Guest Modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        guestModalRef.current &&
        !guestModalRef.current.contains(event.target)
      ) {
        setIsGuestModalOpen(false);
      }
    };
    if (isGuestModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isGuestModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isModalOpenRef.current &&
        !isModalOpenRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  // Update guest count
  const updateGuestCount = (type, value) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + value), // Ensure non-negative values
    }));
  };

  // Format guest summary text
  const getGuestSummary = () => {
    let totalGuests = guests.adults + guests.children;
    let summary = `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`;
    if (guests.infants > 0) summary += `, ${guests.infants} infant`;
    if (guests.pets > 0) summary += `, ${guests.pets} pet`;
    return summary;
  };

  const [CalenderModal, setCalenderModal] = useState(false);
  const [CalendertwoModal, setCalendertwoModal] = useState(false);

  const tabs = [
    { id: "Explore", label: "Explore" },
    { id: "Experiences", label: "Experiences" },
  ];

  const [price, setPrice] = useState({ min: 2000, max: 45000 });

  // price range handler
  const handleOnChange = (value) => {
    setPrice({ min: value[0], max: value[1] });
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        CalenderModalRef.current &&
        !CalenderModalRef.current.contains(event.target)
      ) {
        setCalenderModal(false);
      }
    };
    if (CalenderModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [CalenderModal]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        CalendertwoModalRef.current &&
        !CalendertwoModalRef.current.contains(event.target)
      ) {
        setCalendertwoModal(false);
      }
    };
    if (CalendertwoModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [CalendertwoModal]);

  return (
    <div className="mx-auto z-0 advance-style4 at-home10 mt-100 mt50-lg mb10 animate-up-2">
      <ul className="z-0 pr-6 m-0 nav nav-tabs flex flex-row justify-start">
        {tabs.map((tab) => (
          <li className="z-0 nav-item flex-1  text-center" key={tab.id}>
            <button
              className={`z-0 nav-link text-left w-full ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {activeTab === "Explore" ? (
        !isMobile ? (
          <div>
            <div className="z-0 tab-content text-start">
              {tabs.map((tab) => (
                <div
                  className={`${activeTab === tab.id ? "active" : ""} tab-pane`}
                  key={tab.id}
                >
                  <div className="z-0 advance-content-style3 at-home5">
                    <div className="row align-items-center">
                      <div className="col-6 col-md-6 col-xl-4 bdrr1 bdrrn-sm">
                        <label className="mb-1 form-label fz16">
                          Where to ?
                        </label>
                        <div className="advance-search-field position-relative">
                          <form className="form-search position-relative">
                            <div className="box-search">
                              <input
                                className="form-control bgc-f7 bdrs12 ps-0"
                                placeholder={
                                  tab.label === "Experiences"
                                    ? "Search your experiences"
                                    : `Apartments, experiences, destinations! ${tab.label}`
                                }
                                type="text"
                                name="search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onFocus={handleFocus}
                                // onBlur={handleBlur}
                              />
                            </div>
                          </form>
                        </div>
                      </div>

                      <div className="col-md-2 col-xl-3 bdrr1 bdrrn-sm px20 pl15-sm hidate">
                        <div className="px-0 mt-3 cursor-pointer mt-md-0">
                          <div
                            className="bootselect-multiselect"
                            onClick={() => setCalendertwoModal(true)}
                          >
                            <label className="fz13">Dates</label>
                            Add Dates
                          </div>
                        </div>
                      </div>

                      <div className="relative col-md-4 col-xl-3 bdrr1 bdrrn-sm px20 pl15-sm hidate">
                        <div className="mt-3 mt-md-0">
                          <div className="dropdown-lists">
                            <label className="fz13 ">Guests</label>
                            <div
                              className="w-full px-1 py-0 btn open-btn text-start dropdown-toggle"
                              onClick={() =>
                                setIsGuestModalOpen(!isGuestModalOpen)
                              }
                              style={{ fontSize: "13px" }}
                            >
                              {getGuestSummary()}{" "}
                              <i className="fas fa-caret-down" />
                            </div>
                          </div>
                        </div>

                        {/* Guest Modal */}
                      </div>

                      <div className="col-md-4 col-xl-2 bdrr1 bdrrn-sm px20 pl15-sm">
                        <div className="mt-3 d-flex align-items-center justify-content-start justify-content-md-center mt-md-0">
                          <button
                            className="advance-search-btn"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#advanceSeachModal"
                          >
                            <span className="flaticon-settings" /> Filters
                          </button>
                          
                          <button
                            className="ud-btn btn-thm ms-2 search-tbn"
                            type="button"
                            onClick={() => navigate("/grid-full-3-col")}
                          >
                            <SearchNormal color="white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="tab-content text-start">
              {tabs.map((tab) => (
                <div
                  className={`${activeTab === tab.id ? "active" : ""} tab-pane`}
                  key={tab.id}
                >
                  <div className="advance-content-style3 at-home5">
                    <div className="flex-row align-items-center">
                      {/* Search Section */}
                      <div className="col-11 col-md-8 d-flex flex-column">
                        {/* Label and Input Group */}
                        <div className="form-group w-100">
                          <div className="advance-search-field input-wrapper position-relative">
                            <div className="col-8 col-md-4 col-xl-3 bdrr1 bdrrn-sm">
                              <label
                                htmlFor="searchInput"
                                className="mb-1 form-label fz16"
                              >
                                Where to?
                              </label>
                              <div className="advance-search-field position-relative">
                                <form className="form-search position-relative">
                                  <div className="box-search">
                                    <input
                                      className="form-control bgc-f7 bdrs12 ps-0"
                                      placeholder={
                                        tab.label === "Experiences"
                                          ? "Search your experiences"
                                          : `Apartments, experiences, destinations! ${tab.label}`
                                      }
                                      type="text"
                                      name="search"
                                    />
                                  </div>
                                </form>
                              </div>
                            </div>
                            {/* Search Button */}
                            <button
                              style={{
                                position: "fixed",
                                right: 50,
                                width: 55,
                                height: 55,
                              }}
                              className="ud-btn btn-thm ms-2 search-tbn search-btn"
                              type="button"
                              onClick={() => navigate("/grid-full-3-col")}
                            >
                              <SearchNormal color="white" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Filter Section */}
                      <div className="mt-3 col-4 col-md-4 d-flex justify-content-md-end mt-md-0">
                        <button
                          style={{
                            position: "fixed",
                            top: 60,
                            right: 5,
                            width: 55,
                            height: 55,
                          }}
                          className="advance-search-btn"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#advanceSeachModal"
                        >
                          <Setting4 size={22} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ) : !isMobile ? (
        <div>
          <div className="tab-content text-start">
            {tabs.map((tab) => (
              <div
                className={`${activeTab === tab.id ? "active" : ""} tab-pane`}
                key={tab.id}
              >
                <div className="advance-content-style3 at-home5">
                  <div className="row align-items-center">
                    <div className="col-6 col-md-6 col-xl-4 bdrr1 bdrrn-sm">
                      <label className="mb-1 form-label fz16">Where to ?</label>
                      <div className="advance-search-field position-relative">
                        <form className="form-search position-relative">
                          <div className="box-search">
                            <input
                              className="form-control bgc-f7 bdrs12 ps-0"
                              placeholder={
                                tab.label === "Experiences"
                                  ? "Search your experiences"
                                  : `Apartments, experiences, destinations! ${tab.label}`
                              }
                              type="text"
                              name="search"
                              value={searchValue}
                              onChange={(e) => setSearchValue(e.target.value)}
                              onFocus={handleFocus}
                              // onBlur={handleBlur}
                            />
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="col-md-2 col-xl-2 bdrr1 bdrrn-sm px20 pl15-sm hidate">
                      <div className="px-0 mt-3 cursor-pointer mt-md-0">
                        <div
                          className="bootselect-multiselect"
                          onClick={() => setCalenderModal(true)}
                        >
                          <label className="fz13">Add Checkin</label>
                          Add Dates
                        </div>
                      </div>
                    </div>

                    <div className="col-md-2 col-xl-2 bdrr1 bdrrn-sm px20 pl15-sm hidate">
                      <div className="mt-3 cursor-pointer mt-md-0">
                        <div
                          className="bootselect-multiselect"
                          onClick={() => setCalenderModal(true)}
                        >
                          <label className="fz13">Checkout</label>
                          Add Dates
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 col-xl-2 bdrr1 bdrrn-sm px20 pl15-sm hidate">
                      <div className="mt-3 mt-md-0">
                        <div className="dropdown-lists">
                          <label className="mb-1 fz13">Guests</label>
                          <div
                            className="w-full px-1 py-0 btn open-btn text-start dropdown-toggle"
                            onClick={() =>
                              setIsGuestModalOpen(!isGuestModalOpen)
                            }
                            style={{ fontSize: "13px" }}
                          >
                            {getGuestSummary()}{" "}
                            <i className="fas fa-caret-down" />
                          </div>
                        </div>
                      </div>

                      {/* Guest Modal */}
                    </div>

                    <div className="col-md-4 col-xl-2 bdrr1 bdrrn-sm px20 pl15-sm">
                      <div className="mt-3 d-flex align-items-center justify-content-start justify-content-md-start mt-md-0">
                        <button
                          className="advance-search-btn"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#advanceSeachModal"
                        >
                          <span className="flaticon-settings" /> Filters
                        </button>&nbsp;
                        
                        <button
                          className="ud-btn btn-thm ms-2 search-tbn absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#FFC500] text-white p-2 rounded-full"
                          type="button"
                          onClick={() => navigate("/grid-full-3-col")}
                        >
                          <SearchNormal color="white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="tab-content text-start">
            {tabs.map((tab) => (
              <div
                className={`${activeTab === tab.id ? "active" : ""} tab-pane`}
                key={tab.id}
              >
                <div className="advance-content-style3 at-home5">
                  <div className="flex-row align-items-center">
                    {/* Search Section */}
                    <div className="col-11 col-md-8 d-flex flex-column">
                      {/* Label and Input Group */}
                      <div className="form-group w-100">
                        <div className="advance-search-field input-wrapper position-relative">
                          <div className="col-8 col-md-4 col-xl-3 bdrr1 bdrrn-sm">
                            <label
                              htmlFor="searchInput"
                              className="mb-1 form-label fz16"
                            >
                              Where to?
                            </label>
                            <div className="advance-search-field position-relative">
                              <form className="form-search position-relative">
                                <div className="box-search">
                                  <input
                                    className="form-control bgc-f7 bdrs12 ps-0"
                                    placeholder={
                                      tab.label === "Experiences"
                                        ? "Search your experiences"
                                        : `Apartments, experiences, destinations! ${tab.label}`
                                    }
                                    type="text"
                                    name="search"
                                  />
                                </div>
                              </form>
                            </div>
                          </div>
                          {/* Search Button */}
                          <button
                            style={{
                              position: "fixed",
                              right: 75,
                             
                            }}
                            className="transform rounded-full right-3 top-1/2 ud-btn btn-thm ms-2 search-tbn search-btn"
                            type="button"
                            onClick={() => navigate("/grid-full-3-col")}
                          >
                            <SearchNormal color="white" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Filter Section */}
                    <div className="mt-3 col-4 col-md-4 d-flex justify-content-md-end mt-md-0">
                      <button
                        style={{
                          position: "fixed",
                          top: 60,
                          right: 5,
                          width: 55,
                          height: 55,
                        }}
                        className="advance-search-btn"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#advanceSeachModal"
                      >
                        <Setting4 size={22} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        // <div>hello</div>
      )}

      {isModalOpen && (
        <div
          ref={isModalOpenRef}
          className="absolute left-0 z-50 p-4 mt-2 bg-white rounded-lg shadow-lg top-full"
        >
          {/* Recent Searches */}
          <h3 className="text-sm font-semibold text-left text-gray-600">
            Recent searches
          </h3>
          <div
            className="flex items-center gap-2 mt-2 cursor-pointer"
            onClick={() =>
              handleSelectSuggestion("SHAPE Itaim Apt high standard studio")
            }
          >
            <img
              src="https://img.freepik.com/free-photo/close-up-horse-nature_23-2149312906.jpg"
              alt="Recent Search"
              className="w-12 h-12 rounded-md"
            />
            <div>
              <p className="font-medium text-gray-900">
                SHAPE Itaim Apt high standard studio 15th floor
              </p>
              <p className="text-xs text-left text-gray-500">
                Feb 26 – Mar 3 · 1 guest
              </p>
            </div>
          </div>

          {/* Suggested Destinations */}
          <h3 className="mt-4 text-sm font-semibold text-left text-gray-600">
            Suggested destinations
          </h3>
          <ul className="mt-2 space-y-3">
            {suggestions.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectSuggestion(item.name)}
              >
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {CalenderModal && (
        <div
          ref={CalenderModalRef}
          className="absolute top-28 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-2xl shadow-lg w-[700px] z-50"
        >
          {/* Tabs */}
          <div className="flex justify-center pb-2 space-x-4 border-b">
            {["dates", "months", "flexible"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-full ${
                  activeTabone === tab
                    ? "bg-[#ffc500] font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTabone(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            {activeTabone === "dates" && <DatesTab />}
            {activeTabone === "months" && <MonthsTab />}
            {activeTabone === "flexible" && <FlexibleTab />}
          </div>

          {/* Close Button */}
        </div>
      )}
      {CalendertwoModal && (
        <div
          ref={CalendertwoModalRef}
          className="absolute top-28 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-2xl shadow-lg w-[700px] z-50"
        >
          {/* Tabs */}
          <div className="flex justify-center pb-2 space-x-4 border-b">
            {["dates", "months", "flexible"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-full ${
                  activeTabone === tab
                    ? "bg-[#ffc500] font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTabone(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            {activeTabone === "dates" && <DatesTabtwo />}
            {activeTabone === "months" && <MonthsTab />}
            {activeTabone === "flexible" && <FlexibleTab />}
          </div>

          {/* Close Button */}
        </div>
      )}

      {isGuestModalOpen && (
        <div
          ref={guestModalRef}
          className="absolute z-50 w-full p-4 mt-1 bg-white border rounded-lg shadow-lg top-full"
        >
          {["adults", "children", "infants", "pets"].map((type, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 text-left border-b"
            >
              <div>
                <p className="font-medium">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </p>
                <p className="text-xs text-left text-gray-500">
                  {type === "adults"
                    ? "Ages 13+"
                    : type === "children"
                    ? "Ages 2-12"
                    : type === "infants"
                    ? "Under 2"
                    : "Bringing a pet?"}
                </p>
              </div>
              <div className="flex items-center">
                <button
                  className="border px-[11px] py-1 rounded-full"
                  onClick={() => updateGuestCount(type, -1)}
                >
                  -
                </button>
                <span className="mx-3">{guests[type]}</span>
                <button
                  className="border px-[9px] py-1 rounded-full"
                  onClick={() => updateGuestCount(type, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterContent;
