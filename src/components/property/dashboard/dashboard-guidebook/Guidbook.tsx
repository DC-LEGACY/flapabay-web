import { FaChild, FaClipboardList, FaEye, FaHandHoldingHeart, FaLanguage, FaPiggyBank, FaSuitcaseRolling, FaWalking } from "react-icons/fa";

import { BsLightbulb } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GiBookshelf } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";

const Guidebooks = () => {
  const [showModal, setShowModal] = useState(false);
  const [showListingsModal, setShowListingsModal] = useState(false);
  const [selectedListings, setSelectedListings] = useState([]);
  const [showEditCover, setShowEditCover] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdviceModal, setShowAdviceModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categories1, setCategories] = useState(["Food scene", "Sightseeing"]);
  const places = [
    "Holi, Eimsbüttel, DE",
    "Haydn-Haus, Vienna, AT",
    "Hawassa University, Awasa, ET",
    "Hopper Field, Texas, US",
    "Hyatt Regency New Orleans, US",
  ];

  const filteredPlaces = places.filter((place) =>
    place.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };
  const handleCreateCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([...categories1, newCategory]);
      setSelectedCategory(newCategory);
      setNewCategory("");
      setCreatingCategory(false);
    }
  };

  const categories = [
    { name: "Getting around", icon: <FaWalking /> },
    { name: "Don't miss", icon: <FaEye /> },
    { name: "Customs", icon: <FaHandHoldingHeart /> },
    { name: "Ways to save", icon: <FaPiggyBank /> },
    { name: "Book before", icon: <FaSuitcaseRolling /> },
    { name: "What to pack", icon: <FaClipboardList /> },
    { name: "Useful phrases", icon: <FaLanguage /> },
    { name: "Traveling kids", icon: <FaChild /> },
  ];
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [advice, setAdvice] = useState("");
  const [selectedCategory1, setSelectedCategory1] = useState(null);
  const [tip, setTip] = useState("");
  const listings = [
    { id: 1, address: "Jeseníova, 130 00 Praha 3, Česko" },
    { id: 2, address: "Lumumba Rd, Lusaka, Zambia" },
    { id: 3, address: "Random Street 1, Berlin, Germany" },
  ];
  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
    setShowSearchModal(false);
    setShowDetailModal(true);
  };
  const handleSelectListing = (id) => {
    setSelectedListings((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const [guidebooks, setGuidebooks] = useState([
    {
      id: 1,
      title: "George’s guidebook",
      image:
        "https://img.freepik.com/free-photo/young-woman-leaning-against-window_1157-1094.jpg?t=st=1738080552~exp=1738084152~hmac=8da86ecfea4fa53bab542ff014455fcce3331e3faf0e176f28e914d3dd72f07e&w=996",
      profilePic: "/profile1.jpg",
      author: "George",
    },
    {
      id: 2,
      title: "George’s guidebook",
      image:
        "https://img.freepik.com/free-photo/young-woman-leaning-against-window_1157-1094.jpg?t=st=1738080552~exp=1738084152~hmac=8da86ecfea4fa53bab542ff014455fcce3331e3faf0e176f28e914d3dd72f07e&w=996",
      profilePic: "/profile2.jpg",
      author: "John",
    },
    {
      id: 3,
      title: "George’s guidebook",
      image:
        "https://img.freepik.com/free-photo/young-woman-leaning-against-window_1157-1094.jpg?t=st=1738080552~exp=1738084152~hmac=8da86ecfea4fa53bab542ff014455fcce3331e3faf0e176f28e914d3dd72f07e&w=996",
      profilePic: "/profile2.jpg",
      author: "John",
    },
    {
      id: 4,
      title: "George’s guidebook",
      image:
        "https://img.freepik.com/free-photo/young-woman-leaning-against-window_1157-1094.jpg?t=st=1738080552~exp=1738084152~hmac=8da86ecfea4fa53bab542ff014455fcce3331e3faf0e176f28e914d3dd72f07e&w=996",
      profilePic: "/profile2.jpg",
      author: "John",
    },
  ]);

  const handleDelete = (id) => {
    setGuidebooks(guidebooks.filter((guidebook) => guidebook.id !== id));
  };

  const isFormComplete = selectedCategory && title.trim() !== "" && advice.trim() !== "";

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Guidebooks</h1>
        <div
          className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <FaPlus className="text-[18px]" />
        </div>
      </div>
      <p className="text-gray-600">
        Create a guidebook to easily share local tips with guests.{" "}
        <span className="text-black cursor-pointer underline font-medium">
          Read our content policy
        </span>
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-3 gap-4 pt-6">
        {guidebooks.map((guidebook) => (
          <div
            key={guidebook.id}
            className="relative bg-gray-200 rounded-lg overflow-hidden h-56"
          >
            <div className="relative w-full h-full">
              <img
                src={guidebook.image}
                alt={guidebook.title}
                className="w-full h-full object-cover brightness-50"
              />
              <div className="absolute bottom-14 left-2 text-white px-2 py-1 text-lg rounded">
                {guidebook.title}
              </div>
              <div className="absolute bottom-2 left-2 flex items-center text-white px-2 py-1 text-sm rounded font-medium">
                <img
                  src={guidebook.profilePic}
                  alt={guidebook.author}
                  className="w-8 h-8 rounded-full mr-2"
                />
                {guidebook.author}
              </div>
            </div>
            <button
              onClick={() => handleDelete(guidebook.id)}
              className="absolute top-2 right-2 bg-slate-50 text-black px-2 py-2 text-sm rounded-full"
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg w-[400px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-4 text-gray-500"
              onClick={() => setShowModal(false)}
            >
              <IoMdClose size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">George’s guidebook</h2>
            <div className="flex space-x-2 mb-4">
              <button
                className="border rounded-full px-4 py-2 "
                onClick={() => setShowListingsModal(true)}
              >
                Edit listings
              </button>
              <button
                className="border rounded-full px-4 py-2 "
                onClick={() => {
                  setShowEditCover(true);
                  setShowModal(false);
                }}
              >
                Edit cover
              </button>
            </div>
            <div className="border p-4 rounded-lg text-center">
              <p className="font-semibold">Share your recommendations</p>
              <p className="text-gray-500 text-sm mb-4">
                Suggest places to visit, where to eat, and more.
              </p>
              <button
                className="bg-black text-white px-4 py-2 rounded"
                onClick={() => {
                  setShowOptionsModal(true);
                  setShowAddModal(false);
                }}
              >
                Add to guidebook
              </button>
            </div>
          </div>
        </div>
      )}

      {showListingsModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setShowListingsModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg w-[400px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-4 text-gray-500"
              onClick={() => setShowListingsModal(false)}
            >
              <IoMdClose size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Choose listings</h2>
            <p className="text-gray-600 text-sm mb-4">
              The listing should be in the same area as your recommendations in
              this guidebook.
            </p>
            <div className="space-y-2">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="flex justify-between items-center p-2 "
                >
                  <div className="flex">
                    <img
                      className=" w-8 h-8 rounded-2xl"
                      src="https://img.freepik.com/free-photo/young-woman-leaning-against-window_1157-1094.jpg?t=st=1738080552~exp=1738084152~hmac=8da86ecfea4fa53bab542ff014455fcce3331e3faf0e176f28e914d3dd72f07e&w=996"
                      alt=""
                    />
                    <span className=" ml-2">{listing.address}</span>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      checked={selectedListings.includes(listing.id)}
                      onChange={() => handleSelectListing(listing.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              className="mt-4 bg-black text-white px-4 py-2 rounded w-full"
              onClick={() => setShowListingsModal(false)}
            >
              Save
            </button>
          </div>
        </div>
      )}
      {showEditCover && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setShowEditCover(false)}
        >
          <div
            className="bg-white p-6 rounded-lg w-[400px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-4 text-gray-500"
              onClick={() => setShowEditCover(false)}
            >
              <IoMdClose size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Edit Cover</h2>
            <label className="block text-sm font-medium">Guidebook Title</label>
            <textarea
              type="text"
              className="border rounded px-3 py-2 w-full mb-4"
              defaultValue="George’s guidebook"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="upload-photo"
            />
            <label
              htmlFor="upload-photo"
              className="border px-4 py-2 w-full mb-4 cursor-pointer text-center block"
            >
              Upload Photo
            </label>

            <div className="border rounded-lg text-center  h-52 flex items-center justify-center">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Uploaded Cover"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <p className="text-lg">George’s guidebook</p>
              )}
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="text-gray-500"
                onClick={() => setShowEditCover(false)}
              >
                Cancel
              </button>
              <button className="bg-black text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showOptionsModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setShowOptionsModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg w-[400px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-4 text-gray-500"
              onClick={() => setShowOptionsModal(false)}
            >
              <IoMdClose size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">What do you want to add?</h2>
            <div className="space-y-3">
              <div className="border rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-gray-100">
                <div onClick={() => {
                  setShowModal(false);
                  setShowOptionsModal(false);
                  setShowSearchModal(true);
                }}>
                  <h3 className="font-semibold">Places</h3>
                  <p className="text-gray-500 text-sm">
                    Where should travelers go?
                  </p>
                </div>
                <FaMapMarkerAlt className="text-xl text-gray-600" />
              </div>
              <div onClick={() => {
                  setShowModal(false);
                  setShowOptionsModal(false);
                  setShowSearchModal(true);
                }} className="border rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-gray-100">
                <div>
                  <h3 className="font-semibold">Neighborhoods</h3>
                  <p className="text-gray-500 text-sm">
                    What are the areas like?
                  </p>
                </div>
                <GiBookshelf className="text-xl text-gray-600" />
              </div>
              <div onClick={() => {
                  setShowModal(false);
                  setShowOptionsModal(false);
                  setShowAdviceModal(true);
                  
                }} className="border rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-gray-100">
                <div>
                  <h3 className="font-semibold">City advice</h3>
                  <p className="text-gray-500 text-sm">
                    What should travelers know?
                  </p>
                </div>
                <BsLightbulb className="text-xl text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      )}




{showAdviceModal && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        onClick={() => setShowAdviceModal(false)}
      >
        <div
          className="bg-white p-6 rounded-lg w-[500px] relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className=" top-4 right-4 text-gray-500"
            onClick={() => setShowAdviceModal(false)}
          >
            <IoMdClose size={24} />
          </button>
          <h2 className="text-xl font-medium mb-2">What's your advice about?</h2>

          {/* Categories */}
          <div className="grid grid-cols-4 gap-3 mb-4">
          {categories.map((item, index) => (
            <div className=" flex flex-col  items-center justify-center">
            <button
              key={index}
              className={`flex flex-col items-center justify-center border p-3 rounded-full text-sm transition ${
                selectedCategory === item.name ? "bg-black text-white" : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedCategory(item.name)}
            >
              <span className="text-lg">{item.icon}</span>
              
            </button>
            <span className="mt-1 text-center">{item.name}</span>
            </div>
          ))}
        </div>

          {/* Input Fields */}
          <span className="text-lg font-medium">Advice title</span>
          <input
          type="text"
          placeholder="Ex: Avoid ice cubes in drinks"
          className="w-full border rounded-lg p-2 mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="text-lg font-medium">Share your advice</span>
        <textarea
          placeholder="Give travelers some quick and easy advice."
          className="w-full border rounded-lg p-2 mb-4 h-24"
          value={advice}
          onChange={(e) => setAdvice(e.target.value)}
        ></textarea>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              className="text-gray-600"
              onClick={() => setShowAdviceModal(false)}
            >
              Cancel
            </button>
            <button
            className={`px-4 py-2 rounded-lg transition ${
              isFormComplete ? "bg-black text-white" : "bg-gray-300 text-black cursor-not-allowed"
            }`}
            disabled={!isFormComplete}
          >
              Save
            </button>
          </div>
        </div>
      </div>
    )}

      {showSearchModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setShowSearchModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg w-[400px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-4 text-gray-500"
              onClick={() => setShowSearchModal(false)}
            >
              <IoMdClose size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Search for a place</h2>
            <input
              type="text"
              className="border rounded px-3 py-2 w-full mb-4"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="space-y-2">
              {filteredPlaces.map((place, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 border-b cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectPlace(place)}
                >
                  <FaMapMarkerAlt className="mr-2 text-gray-600" /> {place}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}



{showDetailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" >
          <div className="bg-white p-6 rounded-lg w-[500px] relative">
            

            {/* Place Info */}
            <div className="flex items-center mb-4">
              {uploadedImage ? (
                <img src={uploadedImage} alt="Uploaded" className="w-20 h-20 rounded-2xl mr-3 object-cover" />
              ) : (
                <img src="https://via.placeholder.com/50" alt="Default" className="w-12 h-12 rounded-2xl mr-3" />
              )}
              <div>
                <h2 className="text-lg font-bold">{selectedPlace}</h2>
              </div>
            </div>

            {/* Add Photos */}
            <label className="border px-3 py-1 rounded-lg text-sm font-medium cursor-pointer">
              Add photos
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>

            {/* Tip Input */}
            <p className="mt-4 text-sm font-medium">Why do you recommend this place?</p>
            <textarea
              className="w-full border rounded-lg p-2 mt-2"
              placeholder="Write a tip that will help travelers get the most out of their visit."
              value={tip}
              onChange={(e) => setTip(e.target.value)}
            ></textarea>

            {/* Categories */}
            <p className="mt-4 text-sm font-medium">Categorize this place (Required)</p>
            <p className="text-xs text-gray-500 mb-2">
              Organize your recommendations by theme to help travelers find what they're looking for.
            </p>
            <div className="space-y-2">
              {categories1.map((category, index) => (
                <label key={index} className="flex justify-between items-center p-2 border rounded-lg cursor-pointer">
                  {category}
                  <input
                    type="radio"
                    name="category"
                    className="form-radio"
                    checked={selectedCategory1 === category}
                    onChange={() => setSelectedCategory1(category)}
                  />
                </label>
              ))}
            </div>

            {/* Create a Category */}
            {!creatingCategory ? (
              <p className="mt-3 text-sm text-gray-600 cursor-pointer flex items-center" onClick={() => setCreatingCategory(true)}>
                ✎ Create a category
              </p>
            ) : (
              <div className="mt-3">
                <input
                  type="text"
                  className="border rounded px-3 py-2 w-full"
                  placeholder="Enter new category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <div className="flex justify-end mt-2 space-x-2">
                  <button className="text-gray-600" onClick={() => setCreatingCategory(false)}>
                    Cancel
                  </button>
                  <button
                    className="px-3 py-1 rounded-lg bg-black text-white"
                    onClick={handleCreateCategory}
                    disabled={newCategory.trim() === ""}
                  >
                    Create
                  </button>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button className="text-gray-600" onClick={() => setShowDetailModal(false)}>
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-lg transition ${
                  tip && selectedCategory1 ? "bg-black text-white" : "bg-gray-300 text-black cursor-not-allowed"
                }`}
                disabled={!tip || !selectedCategory1}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guidebooks;
