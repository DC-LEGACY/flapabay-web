import React from "react";
import { RxCross2 } from "react-icons/rx";

const Renamewishlist: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg w-96">
        <div className="px-4 py-3 border-b flex items-center">
        <button
          type="button"
          className="btn-close pointer-events-auto"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
          <h2 className="text-lg font-semibold text-center ml-12">Rename Wishlist?</h2>
          
        </div>
        <div className="p-0 text-black  mt-3 mb-3  w-[85%] ml-auto mr-auto ">
            
          <input  className="pointer-events-auto w-full outline-none border rounded-lg p-3" type="Dream Holiday" placeholder="Dream Holiday!"/>
        </div>
        <div className="px-4 py-3 flex justify-between gap-2 border-t">
          <button className="cursor-pointer pointer-events-auto text-gray-900 font-medium px-4 py-2 rounded-2xl" data-bs-dismiss="modal" aria-label="Close">
            Cancel
          </button>
          <button className="bg-gray-950 pointer-events-auto text-white px-4 py-2 font-medium rounded-2xl">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Renamewishlist;
