import React from "react";

const EditLocation: React.FC = () => {
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
        
        <div className="px-4 text-gray-700">
        <h2 className="text-lg font-semibold">Edit Location</h2>
          
        <p className="mb-6">What would you like to do?</p>
        </div>
        <div className="px-4 py-1 flex justify-center ">
          
          <button className="bg-white border border-black pointer-events-auto text-black px-4 py-2 font-medium rounded-2xl w-full" >
            Update
          </button>
        </div>
        <div className="px-4 py-1 flex justify-center ">
          
          <button className="bg-white border pointer-events-auto text-red-800 px-4 py-2 font-medium rounded-2xl w-full mb-2" >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLocation