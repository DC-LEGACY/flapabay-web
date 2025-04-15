import { IoBulbOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdBook } from "react-icons/io";
import React from "react";

const Addplace: React.FC = () => {
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
        
        <div className="px-4 text-black pb-6">
        <h2 className="text-lg font-semibold">What do you want to add?</h2>
          
          <div className=" flex w-full border rounded-lg p-2 mt-2 justify-between items-center">
            <div>
            <h6 className=" font-semibold">Places</h6>
            <span>Where should travelers go?</span>
            </div>
            <div>
            <IoLocationOutline className="text-[24px]" />
            </div>
          </div>
          <div className=" flex w-full border rounded-lg p-2 mt-2 justify-between items-center">
            <div>
            <h6 className=" font-semibold">Nieghborhoods</h6>
            <span>What are the areas like?</span>
            </div>
            <div>
            <IoMdBook className="text-[24px]"/>
            </div>
          </div>
          <div className=" flex w-full border rounded-lg p-2 mt-2 justify-between items-center">
            <div>
            <h6 className=" font-semibold">City Advice</h6>
            <span>Where should travelers know?</span>
            </div>
            <div>
            <IoBulbOutline className="text-[24px]"/>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Addplace