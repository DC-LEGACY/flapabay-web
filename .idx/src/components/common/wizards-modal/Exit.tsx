import React from "react";

const Exit: React.FC = () => {
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
        
        <div className="px-4 text-black">
        <h2 className="text-lg font-semibold">Are you sure you want to exit?</h2>
          <p className="mb-6">If you exit now, Your info not be saved.</p>
          
          
        </div>
        <div className="px-4 py-3 flex justify-between gap-2 border-t">
          <button className="cursor-pointer pointer-events-auto text-gray-900 font-medium px-4 py-2 rounded-2xl " data-bs-dismiss="modal" aria-label="Close">
            Cancel
          </button>
          <button className="bg-gray-950 pointer-events-auto text-white px-4 py-2 font-medium rounded-2xl" >
            Ok, Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Exit