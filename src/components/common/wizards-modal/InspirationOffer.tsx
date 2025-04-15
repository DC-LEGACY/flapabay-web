import React from "react";

const InspirationOffer: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg w-96">
        {/* Header */}
        <div className="px-4 py-3  flex justify-between items-center">
          <button
            type="button"
            className="btn-close pointer-events-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
      
        </div>
        {/* Content */}
        
        <div className="p-4 text-black">
        <h2 className="text-lg font-semibold">Inspiration and offers</h2>
          <p className="mb-6">Inspiring stays, experiences, and deals.</p>
          {/* Email Toggle */}
          <div className="flex justify-between items-center py-2">
            <span className=" font-semibold">Email</span>
            <label className="relative inline-flex items-center pointer-events-auto">
              <input
                type="checkbox"
                defaultChecked
                className="sr-only peer pointer-events-auto"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-black peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          {/* SMS Toggle */}
          <div className="flex justify-between items-center py-2">
            <span className=" font-semibold">SMS</span>
            <label className="relative inline-flex items-center pointer-events-auto">
              <input
                type="checkbox"
                defaultChecked
                className="sr-only peer pointer-events-auto"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-black peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          {/* Browser Notifications Toggle */}
          <div className="flex justify-between items-center py-2">
            <span className=" font-semibold">Browser notifications</span>
            <label className="relative inline-flex items-center pointer-events-auto">
              <input
                type="checkbox"
                className="sr-only peer pointer-events-auto"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-black peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspirationOffer;
