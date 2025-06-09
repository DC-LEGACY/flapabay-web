import React from "react";

const Aboutplace: React.FC = () => {
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
        <h2 className="text-lg font-semibold">About this place</h2>
        <p className="mb-6"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint eveniet reprehenderit architecto reiciendis dolorum sunt inventore ut facere quis officiis! Descibde the area that each camera monitor, such as backyard or pool.
        
        </p>
         
          
        </div>
        
      </div>
    </div>
  );
};

export default Aboutplace