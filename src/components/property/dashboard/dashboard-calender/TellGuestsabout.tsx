import { FaCalendarAlt, FaLink, FaSync } from 'react-icons/fa';
import { FaCoins, FaPercentage, FaPlus, FaTag } from 'react-icons/fa';

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];
const days = ["S", "M", "T", "W", "T", "F", "S"];

const TellGuestsabout = () => {
  const [activeTab, setActiveTab] = useState("pricing");
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
     
      {/* Calendar View - Scrollable */}
      <main className=" flex hidden overflow-y-auto h-screen sm:hidden xl:block  " style={{ scrollbarWidth: 'thin',scrollBehavior:"smooth" }}>
        <div className="h-full overflow-y-scroll" style={{ scrollbarWidth: 'thin',scrollBehavior:"smooth" }}>
          {months.map((month, monthIndex) => (
            <div key={monthIndex} className="mb-10">
              <h1 className="text-2xl font-semibold mb-4 pt-5">{month} 2024</h1>
              <div className="grid grid-cols-7 gap-2 mb-2">
                {days.map((day, index) => (
                  <div key={index} className="font-bold text-center">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(31)].map((_, i) => (
                  <div key={i} className="border p-4 text-center">
                    {i + 1}
                    <p className="text-sm">1,453 Kč</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>



      <aside className="w-fit bg-white shadow-md p-6 border-r overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
        <h2 className="text-xl font-semibold">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">These apply to all nights, unless you customize them by date.</p>
        <div className="mt-4 flex border-b">
          <button
            className={`pb-2 px-4 font-medium ${activeTab === "pricing" ? "border-b-2 border-black" : "text-gray-500"}`}
            onClick={() => setActiveTab("pricing")}
          >
            Pricing
          </button>
          <button
            className={`pb-2 px-4 font-medium ${activeTab === "availability" ? "border-b-2 border-black" : "text-gray-500"}`}
            onClick={() => setActiveTab("availability")}
          >
            Availability
          </button>
        </div>
        {/* Sidebar Content */}
        {activeTab === "pricing" ? (
          <div className="p-6 bg-white rounded-lg ">
          {/* Base Price Section */}
          <div className="pb-4">
            <h3 className="font-semibold mb-2">Base Price</h3>
            <div className="flex items-center border border-black p-2 rounded-lg space-x-2">
              
              <span className="text-xl font-bold">Kč 1,453</span>
              <span className="text-gray-600">Per night</span>
            </div>
          </div>
    
          {/* Custom Weekend Price Section */}
          <div className="pb-6">
          <div className="pb-6 border flex justify-between items-center border-black p-2 rounded-lg">
            <span className=" text-[12px]">Custom Weekend Price</span>
           
               <span className=" font-medium underline cursor-pointer">Add</span>
               </div>
          </div>
    
          {/* Smart Pricing Section */}
          
          <div className="pb-6 border flex items-center justify-between border-black p-2 rounded-lg">
            <h3 className="text-[12px]">Smart Pricing</h3>
            <button
        onClick={handleToggle}
        className={` w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none ${
          isToggled ? 'bg-black' : 'bg-gray-300'
        }`}
      >
        <div
          className={` w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
            isToggled ? 'translate-x-6' : 'translate-x-0'
          }`}
        ></div>
      </button>
            
          </div>
    
          {/* Discounts Section */}
          <div className="pb-6 pt-2">
            <h3 className="font-semibold mb-2">Discounts</h3>
            <p className="text-sm text-gray-600 mb-4">
              Adjust your pricing to attract more guests.
            </p>
    
            {/* Weekly Discount */}
            <div className="mb-4 border border-black p-2 rounded-lg">
              <div className="flex items-center space-x-2">
                
                <span className="font-semibold">Weekly</span>
              </div>
              <p className="text-sm text-gray-600">For 7 nights or more</p>
              <div className=" flex items-center">
              <p className="text-[24px] font-semibold">10%</p>
              <p className="text-[12px] text-gray-600 ml-1">Weekly average is Kč 9,154</p>
              </div>
            </div>
    
            {/* Monthly Discount */}
            <div className="mb-4 border border-black p-2 rounded-lg">
              <div className="flex items-center space-x-2">
   
                <span className="font-semibold">Monthly</span>
              </div>
              <p className="text-sm text-gray-600">For 7 nights or more</p>
              <div className=" flex items-center">
              <p className="text-[24px] font-semibold">10%</p>
              <p className="text-[12px] text-gray-600 ml-1">Monthly average is Kč 9,154</p>
              </div>
            </div>
    
            {/* More Discounts */}
            <div className=" border border-black p-2 rounded-lg">
              <div className="flex items-center space-x-2">
              
                <span className="font-semibold">More discounts</span>
              </div>
              <p className="text-sm text-gray-600">Early bird, last-minute</p>
            </div>
          </div>
    
          {/* Promotions Section */}
          <div className="pb-6">
            <h3 className="font-semibold mb-2 flex items-center">
              <FaTag className="mr-2" /> Promotions
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Set short-term discounts to get new bookings.
            </p>
    
            {/* New Listing Promotion */}
            <div className="mb-4 border border-black p-2 rounded-lg">
              <div className="flex items-center space-x-2">
                
                <span className="font-semibold">New Listing Promotion</span>
              </div>
              <p className="text-[12px] text-gray-600">
                Get your first guests in the door.
              </p>
            </div>
          </div>
    
          {/* Additional Charges Section */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <FaCoins className="mr-2" /> Additional Charges
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Fees for cleaning, pets, extra guests, etc.
            </p>
    
            {/* Fees */}
            <div className=" border border-black p-2 rounded-lg">
              <div className="flex items-center space-x-2">
                
                <span className="font-semibold">Fees</span>
              </div>
              <p className="text-[12px] text-gray-600">Cleaning, pets, extra guests</p>
            </div>
          </div>
        </div>
        ) : (
          <div>
            {/* Availability Settings */}
            <div className="pt-6">
              <h3 className="text-sm font-medium">Trip length</h3>
              <div className="mt-2 border p-4 rounded-2xl">
                <p className="text-xs text-gray-500">Minimum nights</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <div className="mt-2 border p-4 rounded-2xl">
                <p className="text-xs text-gray-500">Maximum nights</p>
                <p className="text-2xl font-bold">365</p>
              </div>
              <div className="mt-2 flex cursor-pointer justify-between items-center border p-3 rounded-2xl">
                <p className="text-xs ">Custom trip to length</p>
                <MdOutlineKeyboardArrowRight />
              </div>
            
            </div>
           


            <div className="mb-6 pt-4">
        <h3 className="font-semibold mb-2">Advance notice</h3>
        <select className="border p-2 rounded-lg w-full">
          <option>None</option>
          <option>1 day</option>
          <option>2 day</option>
          <option>3 day</option>
          <option>4 day</option>
          <option>5 day</option>
          <option>6 day</option>
          <option>7 day</option>
        </select>
      </div>

      {/* Preparation Time Section */}
      <div className="mb-6 pt-4">
        <h3 className="font-semibold mb-2">Preparation Time</h3>
        <select className="border p-2 rounded-lg w-full">
          <option>None</option>
          <option>1 Hour</option>
          <option>2 Hours</option>
          <option>1 Day</option>
        </select>
      </div>

      {/* Availability Window Section */}
      <div className="mb-6 pt-4">
        <h3 className="font-semibold mb-2">Availability Window</h3>
        <select className="border p-2 rounded-lg w-full">
          <option>12 months in advance</option>
          <option>6 months in advance</option>
          <option>3 months in advance</option>
        </select>
      </div>

      {/* More Availability Settings Section */}
      <div className="mb-6 pt-4">
        <h3 className="font-semibold mb-2">More Availability Settings</h3>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox" />
          <span>Restrict check-in and checkout days</span>
        </label>
      </div>

      {/* Connect Calendars Section */}
      <div className="mb-6 pt-4">
        <h3 className="font-semibold mb-2 flex items-center">
          <FaCalendarAlt className="mr-2" /> Connect Calendars
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Sync all of your hosting calendars so they automatically stay up to date.
        </p>
        <div className=" pb-4">
        <button className="flex  items-center text-black border border-black px-4 py-2 rounded-lg">
          <FaSync className="mr-2" /> Connect to another website
        </button>
        </div>
      </div>

      {/* Connect to Another Website Section */}
      <div>
        <h3 className="font-semibold mb-2 flex items-center">
          <FaLink className="mr-2" /> Connect to another website
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Link your availability to another platform or website.
        </p>
        <button className="flex items-center  border border-black text-black px-4 py-2 rounded-lg">
          <FaLink className="mr-2" /> Connect
        </button>
      </div>


          </div>
        )}
      </aside>
    </div>
  );
};

export default TellGuestsabout;