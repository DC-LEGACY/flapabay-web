import React from "react";
import { RxCross2 } from "react-icons/rx";

const UnsubscribeModal: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg w-[98%]">
        <div className="px-4 py-3 border-b flex items-center">
        <button
          type="button"
          className="btn-close pointer-events-auto"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
          <h2 className="text-lg font-semibold text-center ml-32">Are you sure?</h2>
          
        </div>
        <div className="p-4 text-black">
          <p>
            You'll be unsubscribing from all marketing emails from Airbnb. This
            includes recommendations, travel inspiration and deals, things to
            do in your home city, how Airbnb works, invites and referrals,
            surveys and research studies, Airbnb for work updates, home hosting
            tips and promotions, and experience hosting tips and promotions.
          </p>
        </div>
        <div className="px-4 py-3 flex justify-between gap-2 border-t">
          <button className="cursor-pointer pointer-events-auto text-gray-900 font-medium px-4 py-2 rounded-2xl" data-bs-dismiss="modal" aria-label="Close">
            Cancel
          </button>
          <button className="bg-gray-950 pointer-events-auto text-white px-4 py-2 font-medium rounded-2xl">
            Unsubscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnsubscribeModal;
