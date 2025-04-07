import React from "react";
import { RxCross2 } from "react-icons/rx";

const Deletewishlist: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg w-[98%]">
        <div className="px-4 py-3 flex items-center">
        <button
          type="button"
          className="btn-close pointer-events-auto"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
          
          
        </div>
        <div className="p-4 text-gray-700">
        <h2 className="text-lg font-semibold text-center">Delete this wishlist?</h2>
          <p className=" text-center">
         "Private Room" will be permanentaly deleted. 
          </p>
        </div>
        <div className="px-4 py-3 flex justify-between gap-2 border-t">
          <button className="cursor-pointer pointer-events-auto text-gray-900 font-medium px-4 py-2 rounded-2xl" data-bs-dismiss="modal" aria-label="Close">
            Cancel
          </button>
          <button className="bg-gray-950 pointer-events-auto text-white px-4 py-2 font-medium rounded-2xl">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deletewishlist;
