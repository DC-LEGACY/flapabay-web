import React from "react";

const EarlySuccess: React.FC = () => {
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
        
        <div className="px-4 text-gray-700 border-b mb-2">
        <h2 className="text-lg font-semibold text-center">Continue to Early Success?</h2>
          
        <p className="mb-2 mt-1 text-center">Once you have early success to the winter 2024 release, you can't go back to current version of these features.</p>
        </div>
        <div className="px-4 py-1 flex justify-center ">
          
          <button className="bg-black border border-black pointer-events-auto text-white px-4 py-2 font-medium rounded-2xl w-full" >
            Yes, Continue
          </button>
        </div>
        <div className="px-4 py-1 flex justify-center ">
          
          <button className="bg-white pointer-events-auto text-black px-4 py-2 font-medium rounded-2xl w-full mb-2" >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default EarlySuccess