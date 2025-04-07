import { useState } from "react";

const ExperienceName = () => {
  const [title, setTitle] = useState("");
  const maxLength = 60;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-semibold">Name your experience</h2>
      <p className="text-gray-600 text-sm mt-2">
        Great names are both descriptive and appealing. A few tips: Short titles work best, only capitalize the first letter, and the more clear you can make it the better.
      </p>
      <button className="text-black font-medium mt-2 underline">Show examples</button>

      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={maxLength}
        className="w-full p-3 border border-gray-300 rounded-md mt-4 text-xl font-semibold resize-none"
        placeholder="Enter your experience name"
        rows={2}
      />

      <p className="text-gray-500 text-sm mt-1">{title.length}/{maxLength}</p>
    </div>
  );
};

export default ExperienceName;
