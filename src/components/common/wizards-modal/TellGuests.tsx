import React from "react";

const TellGuests: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg w-[90%]">
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
        
        <div className="px-4 text-black pb-6">
        <h2 className="text-lg font-semibold">Tell guests about your exterior security cameras</h2>
        <p className="mb-6">Descibde the area that each camera monitor, such as backyard or pool.
        <span> </span><span className=" underline">  Learn more</span>
        </p>
          <textarea className="p-2 mt-2 border border-black mb-2 w-full rounded-2xl pointer-events-auto" type="text" placeholder="" />
          
          
        </div>
        <div className="px-4 py-3 flex justify-end gap-2 border-t">
          
          <button className="bg-gray-950 pointer-events-auto text-white px-4 py-2 font-medium rounded-2xl" >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default TellGuests