import React from "react";

const Searchforplace: React.FC = () => {
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
        
        <div className="px-4 text-black pb-40">
        <h2 className="text-lg font-semibold">Search for a place</h2>
          
          <input className="p-2 mt-2 border mb-2 w-full rounded-full pointer-events-auto" type="text" placeholder="Find a place or address" />
          
          
        </div>
       
      </div>
    </div>
  );
};

export default Searchforplace