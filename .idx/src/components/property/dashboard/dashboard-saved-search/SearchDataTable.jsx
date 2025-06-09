import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineWindow } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
const Listings = () => {
  const [isListView, setIsListView] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  

  const listings = [
    {
      id: 1,
      image: "https://img.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_185193-110089.jpg?t=st=1738051169~exp=1738054769~hmac=dc000c8c3508efaf525ae1668ac5579f3325365d8e755bfe435692aee1b50b67&w=1060",
      title: "Your House listing",
      location: "",
      status: "In progress",
    },
    {
      id: 2,
      image: "https://img.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_185193-110089.jpg?t=st=1738051169~exp=1738054769~hmac=dc000c8c3508efaf525ae1668ac5579f3325365d8e755bfe435692aee1b50b67&w=1060",
      title: "Your House listing",
      location: "",
      status: "In progress",
    },
    {
      id: 3,
      image: "https://img.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_185193-110089.jpg?t=st=1738051169~exp=1738054769~hmac=dc000c8c3508efaf525ae1668ac5579f3325365d8e755bfe435692aee1b50b67&w=1060",
      title: "Your House listing",
      location: "",
      status: "In progress",
    },
    {
      id: 4,
      image: "https://img.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_185193-110089.jpg?t=st=1738051169~exp=1738054769~hmac=dc000c8c3508efaf525ae1668ac5579f3325365d8e755bfe435692aee1b50b67&w=1060",
      title: "Your House ",
      location: "Praha 3, Hlavní město Praha",
      status: "In progress",
    },
    {
      id: 5,
      image: "https://img.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_185193-110089.jpg?t=st=1738051169~exp=1738054769~hmac=dc000c8c3508efaf525ae1668ac5579f3325365d8e755bfe435692aee1b50b67&w=1060",
      title: "Your Hous",
      location: "Lusaka, Lusaka Province",
      status: "In progress",
    },
  ];

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };

  const handleViewToggle = () => {
    setIsListView(!isListView);
  };

  

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your listings</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleSearchToggle}
            className="p-2 rounded-full border border-gray-300 hover:shadow-lg"
          >
            <IoSearchOutline className=" text-[20px]" />
          </button>
          <button
            onClick={handleViewToggle}
            className="p-2 rounded-full border border-gray-300 hover:shadow-lg"
          >
            <MdOutlineWindow className=" text-[20px]" />
          </button>
          <button
            // onClick={navigateToAnotherPage}
            className="p-2 rounded-full border border-gray-300 hover:shadow-lg"
          >
            <FaPlus className=" text-[20px]" />
          </button>
        </div>
      </div>

      {showSearch && (
        <input
          type="text"
          placeholder="Search listings..."
          className="w-full mb-4 p-3 rounded-lg shadow-sm"
        />
      )}

      {isListView && (
        <div className="grid grid-cols-[1fr_1fr_1fr] mb-2 font-bold text-sm text-gray-700 px-5">
          <p className="text-left font-medium text-lg">List</p>
          <p className="text-center font-medium text-text-lg">Location</p>
          <p className="text-right font-medium text-text-lg">Status</p>
        </div>
      )}

      <div
        className={
          isListView
            ? "space-y-4"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        }
      >
        {listings.map((listing) => (
          <div
            key={listing.id}
            className={`p-4  ${
              isListView ? "flex items-center justify-between" : "flex flex-col items-start"
            }`}
          >
            {isListView ? (
              <>
                <div className="flex items-center space-x-4 w-1/3">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <h2 className="text-lg font-semibold truncate">{listing.title}</h2>
                </div>
                <p className="text-sm text-gray-600 text-center w-1/3 truncate">
                  {listing.location}
                </p>
                <p className="text-sm text-orange-600 font-medium text-right w-1/3 truncate">
                  {listing.status}
                </p>
              </>
            ) : (
              <>
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-semibold mb-2 truncate">{listing.title}</h2>
                {listing.location && (
                  <p className="text-sm text-gray-600 mb-2 truncate">{listing.location}</p>
                )}
                <p className="text-sm text-orange-600 font-medium truncate">
                  {listing.status}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
