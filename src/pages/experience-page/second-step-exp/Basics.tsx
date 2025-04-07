import { FaChevronRight, FaPlus, FaTimes } from "react-icons/fa";
import React, { useState } from "react";

const languages = [
  "English", "Spanish", "French", "German", "Italian",
  "Chinese", "Japanese", "Korean", "Portuguese", "Russian",
  "Arabic", "Hindi", "Bengali", "Dutch", "Greek",
  "Hebrew", "Swedish", "Turkish", "Vietnamese", "Thai"
];

const Basic: React.FC = () => {
  const [city, setCity] = useState("");
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [additionalLanguages, setAdditionalLanguages] = useState<string[]>([]);
  const [showPartnerCode, setShowPartnerCode] = useState(false);
  const [showAdditionalLangModal, setShowAdditionalLangModal] = useState(false);

  const closeModals = () => {
    setShowLanguageModal(false);
    setShowAdditionalLangModal(false);
  };

  const selectLanguage = (language: string) => {
    setSelectedLanguage(language);
    closeModals();
  };

  const addAdditionalLanguage = (language: string) => {
    if (!additionalLanguages.includes(language)) {
      setAdditionalLanguages([...additionalLanguages, language]);
    }
    closeModals();
  };

  return (
    <div className="max-w-lg mx-auto p-6 ">
      <h2 className="text-2xl font-semibold">Tell us a bit more</h2>

      {/* City Input */}
      <div className="mt-4">
        <label className="block font-medium">Which city do you want to host your experience in?</label>
        <input
          type="text"
          placeholder="City"
          className="mt-2 p-2 w-full border rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <p className=" underline cursor-pointer mt-2 flex items-center">
          Use my current location
        </p>
      </div>

      {/* Language Selection */}
      <div className="mt-4 border-b pb-4">
        <label className="block font-medium">Which language(s) will you offer your experience in?</label>
        <p className="text-gray-500 text-sm">You should be able to read, write, and speak in this language.</p>
        
        {/* Primary Language */}
        <div className="flex justify-between items-center mt-2 p-2 border rounded cursor-pointer" onClick={() => setShowLanguageModal(true)}>
          <span>{selectedLanguage}</span>
          <FaChevronRight />
        </div>

        {/* Additional Languages */}
        {additionalLanguages.map((lang, index) => (
          <div key={index} className="flex justify-between items-center mt-2 p-2 border rounded">
            <span>{lang}</span>
            <FaTimes className="text-gray-500 cursor-pointer" onClick={() => 
              setAdditionalLanguages(additionalLanguages.filter(l => l !== lang))
            } />
          </div>
        ))}

        <p className=" underline cursor-pointer mt-2 flex items-center" onClick={() => setShowAdditionalLangModal(true)}>
          <FaPlus className="mr-2" /> Add additional languages
        </p>
      </div>

      {/* Partner Organization */}
      <div className="mt-4">
        <label className="block font-medium">Airbnb partner organization (optional)</label>
        <p className="text-gray-500 text-sm">I’m hosting with an organization and have a confirmation code</p>

        {/* Toggle Switch */}
        <div className="flex items-center mt-2">
          <input 
            type="checkbox" 
            id="partner-toggle" 
            className="hidden" 
            checked={showPartnerCode} 
            onChange={() => setShowPartnerCode(!showPartnerCode)} 
          />
          <label 
            htmlFor="partner-toggle" 
            className="relative w-10 h-6 bg-black rounded-full flex items-center cursor-pointer"
          >
            <div 
              className={`absolute w-5 h-5 bg-white rounded-full shadow transition-transform ${
                showPartnerCode ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </label>
        </div>

        {/* Partner Code Input */}
        {showPartnerCode && (
          <input
            type="text"
            placeholder="Partner confirmation code"
            className="mt-3 p-2 w-full border rounded"
          />
        )}
      </div>

      {/* Language Modal (Closes on Outside Click) */}
      {showLanguageModal && (
        <div className="fixed inset-0 flex justify-center items-center  bg-opacity-30" onClick={closeModals}>
          <div className="bg-white p-4 rounded-2xl shadow-lg max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className=" flex items-center justify-between">
            <h3 className="text-lg font-semibold">Select a Language</h3>
            <button className=" text-red-500" onClick={closeModals}>Close</button>
            </div>
            <ul className="mt-2 max-h-60 overflow-auto thin-scrollbar">
              {languages.map((lang, index) => (
                <li key={index} 
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => selectLanguage(lang)}>
                  {lang}
                </li>
              ))}
            </ul>
            
          </div>
        </div>
      )}

      {/* Additional Languages Modal (Closes on Outside Click) */}
      {showAdditionalLangModal && (
        <div className="fixed inset-0 flex justify-center items-center  bg-opacity-30" onClick={closeModals}>
          <div className="bg-white p-4 rounded-2xl shadow-lg max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className=" flex items-center justify-between">
            <h3 className="text-lg font-semibold">Add Additional Languages</h3>
            <button className=" text-red-500" onClick={closeModals}>Close</button>
            </div>
            <ul className="mt-2 max-h-60 overflow-auto thin-scrollbar">
              {languages.map((lang, index) => (
                <li key={index} 
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => addAdditionalLanguage(lang)}>
                  {lang}
                </li>
              ))}
            </ul>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Basic;
