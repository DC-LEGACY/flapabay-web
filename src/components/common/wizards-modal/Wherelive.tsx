import React from "react";

const Wherelive: React.FC = () => {
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
        
        <div className="px-4 text-gray-700 pb-40">
        <h2 className="text-lg font-semibold">Where you live</h2>
          
          <input className="p-2 mt-2 border mb-2 w-full rounded-full pointer-events-auto" type="text" placeholder="Search for your city" />
          
          
        </div>
        <div className="px-4 py-3 flex justify-end gap-2 border-t">
          
          <button className="bg-gray-950 pointer-events-auto text-white px-4 py-2 font-medium rounded-2xl" >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wherelive