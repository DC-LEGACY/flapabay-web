import React, { useState } from "react";
import { AiOutlineRight, AiOutlineSearch } from "react-icons/ai";
import { Dialog } from "@headlessui/react";
const subcategories = {
    "History and literature": [
      "History museum tour", "History tour", "Literature tour", "Writing class",
      "History talk", "Literature reading", "Storytelling",
      "Other history experience", "Other literature experience"
    ],
  };
const Themes: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState("Literature tour");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
 

  const filteredSubcategories = selectedTheme ?
    subcategories[selectedTheme]?.filter(sub => sub.toLowerCase().includes(searchTerm.toLowerCase())) : [];

  const themes = [
    "History museum tour",
    "History tour",
    "Literature tour",
    "Writing class",
    "Other literature experience",
    "History talk",
    "Literature reading",
    "Storytelling",
    "Other history experience",
  ];

 
  // Filter themes based on search
  const filteredThemes = themes.filter((theme) =>
    theme.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Heading */}
      <h1 className="text-3xl font-semibold mb-2">What will your experience focus on?</h1>

      {/* Subheading */}
      <p className="text-gray-600 pb-6">
        Choose the theme that best describes what guests will enjoy.
      </p>

      {/* Theme Selection Box */}
      <div
        className="flex justify-between items-center border p-4 rounded-lg cursor-pointer hover:bg-gray-100"
        onClick={() => setIsModalOpen(true)}
      >
        <div>
          <p className="font-medium">{selectedTheme}</p>
          {/* <p className="text-gray-500 text-sm">History and literature</p> */}
        </div>
        <AiOutlineRight className="text-gray-600" />
      </div>

      {/* Add additional theme link */}
      <div className="max-w-2xl mx-auto pt-6">


      {selectedThemes.map((theme, index) => (
        <div onClick={() => setIsModalOpen(true)} key={index} className="flex justify-between items-center border p-4 rounded-lg mb-2">
          <p className="font-medium">{theme}</p>
          <AiOutlineRight className="text-gray-600" />
        </div>
      ))}

      <p
        className="text-blue-600 mt-4 cursor-pointer hover:underline"
        onClick={() => setShowThemeModal(true)}
      >
        Add an additional theme (optional)
      </p>

      {/* Theme Selection Modal */}
      <Dialog open={showThemeModal} onClose={() => setShowThemeModal(false)} className="relative z-50">
        <div className="fixed inset-0  bg-opacity-30 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg max-w-lg w-full">
            <Dialog.Title className="text-lg font-semibold text-center p-4 border-b">Select a theme</Dialog.Title>
            <div className="p-4">
              
              <input
                type="text"
                className="w-full pl-4 pr-4 py-2 border rounded-lg"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 px-4 py-3 max-h-60 overflow-y-auto">
              {filteredThemes.map(theme => (
                <div
                  key={theme}
                  className="flex justify-between items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSelectedTheme(theme);
                    setSearchTerm("");
                    setShowThemeModal(false);
                    if (subcategories[theme]) setShowSubcategoryModal(true);
                    else setSelectedThemes([...selectedThemes, theme]);
                  }}
                >
                  {theme} <AiOutlineRight />
                </div>
              ))}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Subcategory Selection Modal */}
      <Dialog open={showSubcategoryModal} onClose={() => setShowSubcategoryModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg max-w-lg w-full">
            <Dialog.Title className="text-lg font-semibold text-center p-4 border-b">Select a subcategory</Dialog.Title>
            <div className="relative p-4">
              <AiOutlineSearch className="absolute left-5 top-6 text-gray-500" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid gap-4 p-4 max-h-60 overflow-y-auto">
              {filteredSubcategories?.map(sub => (
                <div
                  key={sub}
                  className="p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSelectedSubcategory(sub);
                    setSelectedThemes([...selectedThemes, sub]);
                    setShowSubcategoryModal(false);
                  }}
                >
                  {sub}
                </div>
              ))}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0  bg-opacity-30 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg max-w-lg w-full">
            <Dialog.Title className="text-lg font-semibold text-center p-4 border-b">
              What exactly in history and literature?
            </Dialog.Title>

            {/* Search Input */}
            <div className=" px-4 py-2">
              
              <input
                type="text"
                className="w-full pl-4 pr-4 py-2 border rounded-lg focus:outline-none"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Options List */}
            <div className="grid grid-cols-2 gap-4 p-3 max-h-60 overflow-y-auto">
              {filteredThemes.map((theme) => (
                <label
                  key={theme}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                >
                  <input
                    type="radio"
                    name="theme"
                    value={theme}
                    checked={selectedTheme === theme}
                    onChange={() => setSelectedTheme(theme)}
                    className="h-4 w-4"
                  />
                  <span>{theme}</span>
                </label>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-between px-4 py-2 border-t">
              <button className="text-gray-600" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button
                className="bg-black text-white px-6 py-2 rounded-lg"
                onClick={() => setIsModalOpen(false)}
              >
                Save
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>









     




    </div>
  );
};

export default Themes;
