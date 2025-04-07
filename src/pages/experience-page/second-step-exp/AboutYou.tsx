import { useState } from "react";

const AboutYou = () => {
  const [hosting, setHosting] = useState("solo");
  const [bio, setBio] = useState("");

  return (
    <div className="max-w-lg mx-auto p-6  rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Tell guests (and us) more about you</h2>
      
      <div className="mb-6">
        <p className="font-medium">How are you hosting this experience?</p>
        <label className="flex items-center space-x-2 mt-2 cursor-pointer">
          <input
            type="radio"
            name="hosting"
            value="solo"
            checked={hosting === "solo"}
            onChange={() => setHosting("solo")}
            className="w-4 h-4"
          />
          <span>I’m hosting by myself</span>
        </label>
        <label className="flex items-center space-x-2 pt-2 cursor-pointer">
          <input
            type="radio"
            name="hosting"
            value="team"
            checked={hosting === "team"}
            onChange={() => setHosting("team")}
            className="w-4 h-4"
          />
          <span>I have a team who helps me host</span>
        </label>
      </div>

      <div className="pb-6 pt-4">
        <h3 className="font-medium pb-1">Your personal profile</h3>
        <p className="text-sm text-gray-600">Use your legal name and provide a photo that clearly shows your face (not a logo).</p>
        <div className="flex items-center mt-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div className="ml-4">
            <p className="font-medium">George</p>
            <p className="text-sm text-gray-500">ZM</p>
            <div className="mt-1  text-sm">
              <button className="mr-2 underline">Edit name</button>
              <button className="underline">Edit photo</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="font-medium">What makes you uniquely qualified to host this experience?</p>
        <div className="relative mt-2">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full h-28 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Share the story behind your passion and knowledge."
          ></textarea>
          <p className="text-sm text-gray-500 mt-1">{150 - bio.length} more required</p>
        </div>
      </div>

      
    </div>
  );
};

export default AboutYou;
