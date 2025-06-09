import React from "react";

const WhatWereLookingFor = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Heading */}
      <h1 className="text-3xl font-semibold mb-4">What we're looking for</h1>

      {/* Image */}
      <div className="w-full rounded-lg overflow-hidden">
        <img
          src="https://img.freepik.com/premium-photo/medium-shot-woman-living-farmhouse_23-2150621719.jpg"
          alt="People enjoying an outdoor experience"
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>

      {/* Description */}
      <p className="text-black pt-6">
        Experiences are the best way to access the local culture of a place—by
        participating in unique activities led by remarkable people.
      </p>

      {/* Requirements List */}
      <p className="text-black mt-4">
        Every experience must meet the standards and requirements which include:
      </p>
      <ul className="list-disc list-inside mt-2 space-y-2 text-black">
        <li>A host’s unique insight and passion</li>
        <li>
          Thoughtfully designed activities a guest couldn’t do on their own
        </li>
        <li>An inspiring and memorable location</li>
      </ul>

      {/* Standards & Requirements Link */}
      <p className="mt-4">
        Review a detailed description of the{" "}
        <a href="#" className="text-blue-600 font-semibold hover:underline">
          standards and requirements.
        </a>
      </p>
    </div>
  );
};

export default WhatWereLookingFor;
