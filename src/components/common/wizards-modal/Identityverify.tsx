import React from "react";

const Identityverify: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg w-96">
        {/* Header */}
        <div className="px-4 py-3  flex items-center border-b">
          <button
            type="button"
            className="btn-close pointer-events-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
          <h2 className="text-lg font-semibold ml-12">Identity Verification</h2>
      
        </div>
        {/* Content */}
        
        <div className="px-4 text-gray-700 border-b mb-2 mt-2">
        <h2 className="text-lg font-semibold">We are reviewing you ID?</h2>
          
        <p className="mb-4 mt-1">Thanks for completeing this important step. We'll let you know soon if we need any more info from you.
            In the meantime, you can pick up where you left off.
        </p>
        </div>
        <div className="px-4 mb-4 py-1 flex justify-center ">
          
          <button className="bg-black border border-black pointer-events-auto text-white px-4 py-2 font-medium rounded-2xl w-full" >
            Done
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Identityverify