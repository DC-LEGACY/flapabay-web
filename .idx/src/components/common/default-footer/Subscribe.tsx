import React from "react";

const Subscribe: React.FC = () => {
  return (
    <div className="mb-4 mailchimp-widget mb-lg-5">
      <h5 style={{fontSize: 25, fontWeight: 500}} className="text-white text-strong text-bold title mb20">
        Sign up for our weekly newsletter!
      </h5>
      <div className="mailchimp-style1">
        <input type="email" className="form-control" placeholder="Your Email" />
        <button 
          className="bg-[#000] ms-2 text-white absolute right-3 top-1/2 transform -translate-y-1/2 text-white p-3" 
          type="submit"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Subscribe; 