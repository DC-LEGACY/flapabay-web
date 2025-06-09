import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
// import { IoIosArrowDown } from "react-icons/io";
import { IoIosClose, IoIosArrowDown } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import {
  FaGift,
  FaBullhorn,
  FaHeadset,
  FaTrophy,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoIosGift } from "react-icons/io";

const Tabs = [
  "Opportunities",
  "Reviews",
  "Views",
  "Superhost",
  "Listing issues",
];

const rewards = [
  {
    icon: <IoIosGift className=" text-white" />,
    title: "Flapabay Coupons",
    description:
      "Each time you maintain your Superhost status for a whole year, you get a $100 Airbnb coupon.",
  },
  {
    icon: <FaBullhorn className=" text-white" />,
    title: "Promoted to Guests",
    description: "You’ll be featured to guests in promotional emails.",
  },
  {
    icon: <FaHeadset className=" text-white" />,
    title: "Superhost Badge",
    description:
      "This trusted symbol of great hospitality will show up on your profile and listing pages.",
  },
  {
    icon: <FaTrophy className=" text-white" />,
    title: "Extra referral bonus",
    description:
      "You get an additional 20% bonus on top of the standard host referral bonus.",
  },
  {
    icon: <FaShieldAlt className=" text-white" />,
    title:
      "You can pilot new programs and test features before they launch to everyone.",
  },
  {
    icon: <FaChartLine className=" text-white" />,
    title: "Priority support",
    description: "You get priority assistance when you contact Airbnb Support.",
  },
];
const OpportunitiesPage = () => {
  const [activeTab, setActiveTab] = useState("Opportunities");
  const [showModal, setShowModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState("All listings");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [assessmentPeriod, setAssessmentPeriod] = useState(
    "Jul 1, 2023 - Jun 30, 2024"
  );
  const nextRewards = () => {
    if (currentIndex + 3 < rewards.length) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  const prevRewards = () => {
    if (currentIndex - 3 >= 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  const listings = [
    "All listings",
    "New - Private room",
    "New - Private room",
    "New - Private room",
    "New -",
    "New - Private room",
    "New -",
    "New - Entire place",
    "New - Entire place",
  ];
  return (
    <div className="w-full p-6">
      {/* Tabs Navigation */}
      <div className="border-b flex space-x-6 text-gray-600">
        {Tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 font-medium ${
              activeTab === tab ? "border-b-2 border-black text-black" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Opportunities Section */}
      {activeTab === "Opportunities" && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Resources for hosting now</h2>
          <div className="grid grid-cols-2 gap-6 mt-4">
            {[
              {
                title:
                  "Why it’s smart to offer flexible cancellations right now",
                image:
                  "https://img.freepik.com/free-photo/young-man-hugging-woman-coverlet-sea-shore_23-2148020067.jpg",
              },
              {
                title: "Getting started with Airbnb’s cleaning protocol",
                image:
                  "https://img.freepik.com/free-photo/young-man-hugging-woman-coverlet-sea-shore_23-2148020067.jpg",
              },
              {
                title: "What you need to know about hosting families and pets",
                image: "https://img.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_185193-110089.jpg?t=st=1738051169~exp=1738054769~hmac=dc000c8c3508efaf525ae1668ac5579f3325365d8e755bfe435692aee1b50b67&w=1060",
              },
              {
                title: "How to make your space comfortable for remote workers",
                image: "https://img.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_185193-110089.jpg?t=st=1738051169~exp=1738054769~hmac=dc000c8c3508efaf525ae1668ac5579f3325365d8e755bfe435692aee1b50b67&w=1060",
              },
              {
                title: "The do's and don’ts of providing self check-in",
                image: "https://img.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_185193-110089.jpg?t=st=1738051169~exp=1738054769~hmac=dc000c8c3508efaf525ae1668ac5579f3325365d8e755bfe435692aee1b50b67&w=1060",
              },
              {
                title: "The best amenities to offer right now",
                image: "https://img.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_185193-110089.jpg?t=st=1738051169~exp=1738054769~hmac=dc000c8c3508efaf525ae1668ac5579f3325365d8e755bfe435692aee1b50b67&w=1060",
              },
            ].map((item, index) => (
              <div key={index} className="flex space-x-4 items-center">
                <img
                  src={item.image}
                  alt="resource"
                  className="w-12 h-12 rounded-md"
                />
                <p className="text-gray-700">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews Section */}
      {activeTab === "Reviews" && (
        <div className="mt-6">
          <h1 className="text-2xl font-bold">Reviews</h1>
          <div className="flex items-center">
            <div className="font-semibold">{selectedListing}</div>
            <div className=" cursor-pointer" onClick={() => setShowModal(true)}>
              <IoIosArrowDown className=" text-[20px] mt-1" />
            </div>
          </div>
          <div className="mt-6 border p-6 rounded-lg flex flex-col items-center">
            <FaStar className="text-pink-500 text-3xl" />
            <h2 className="mt-4 font-semibold">
              Your first review will show up here
            </h2>
            <p className="text-gray-500">
              We'll let you know when guests leave feedback.
            </p>
          </div>
        </div>
      )}

      {activeTab === "Superhost" && (
        <div className="pt-6">
          <h1 className="text-2xl font-bold text-red-500">
            Become a Superhost this April!
          </h1>
          <p className="">
            Get recognized and rewarded for exceptional hospitality. Your next
            chance is April 1, 2025.
          </p>
          <button className="font-medium underline mt-2 mb-8">
            Learn more about the program
          </button>

          <div className="mt-6 p-6 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold">Your Superhost stats</h2>

            <div className="mt-2">
              <select
                className="border border-gray-300 rounded-md p-2"
                value={assessmentPeriod}
                onChange={(e) => setAssessmentPeriod(e.target.value)}
              >
                <option>Jul 1, 2023 - Jun 30, 2024</option>
                <option>Apr 1, 2024 - Mar 31, 2025</option>
              </select>
            </div>

            <p className="mt-3 font-semibold ">
              You didn’t get Superhost status this time.
            </p>
            <p className="text-gray-600 text-sm">
              For this assessment period, you didn’t quite meet all the
              Superhost criteria.
            </p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {[
                {
                  title: "Overall rating",
                  value: "0",
                  criteria: "4.8",
                  status: "Didn't meet",
                  icon: <FaStar className="text-gray-500 text-3xl mx-auto" />,
                },
                {
                  title: "Response rate",
                  value: "0%",
                  criteria: "90%",
                  status: "Didn't meet",
                  
                },
                {
                  title: "Stays, nights",
                  value: "0",
                  criteria: "10 stays or 100 nights",
                  status: "Didn't meet",
                 
                },
                {
                  title: "Cancellation rate",
                  value: "0.0%",
                  criteria: "Less than 1.0%",
                  status: "Achieved!",
                  icon: (
                    <FaRegCheckCircle className="text-green-500 text-3xl mx-auto" />
                  ),
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-4  rounded-lg items-center text-center border border-black"
                >
                  <div className=" flex text-center items-center ml-auto mr-auto">
                  <p className="text-2xl font-bold text-center ml-auto">{stat.value}</p>
                 <p className=" text-center mr-auto"> {stat.icon}</p>
                  </div>
                  <h3 className="mt-2 font-medium">{stat.title}</h3>
                  <p className="text-gray-500 text-sm">
                    Criteria: {stat.criteria}
                  </p>
                  <p
                    className={`mt-1 font-medium ${
                      stat.status === "Achieved!"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.status}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <h2 className="text-lg font-semibold">Superhost rewards</h2>
            <div className="mt-4 flex items-center">
              <button
                onClick={prevRewards}
                className="p-2 bg-gray-200 rounded-full"
              >
                <IoIosArrowBack />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4">
                {rewards
                  .slice(currentIndex, currentIndex + 3)
                  .map((reward, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg shadow-md items-center space-x-3"
                    >
                      <div className="text-3xl ml-2 mb-1 bg-black w-12 h-12 rounded-full flex justify-center items-center">
                        {reward.icon}
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{reward.title}</h3>
                        <p className="text-gray-500 text-sm">
                          {reward.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              <button
                onClick={nextRewards}
                className="p-2 bg-gray-200 rounded-full"
              >
                <IoIosArrowForward />
              </button>
            </div>
            <p className="text-center mt-2">
              {currentIndex / 3 + 1} / {Math.ceil(rewards.length / 3)}
            </p>
          </div>

          <div className="pt-6">
            <h2 className="text-lg font-semibold">
              Resources to elevate your hosting
            </h2>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Secrets from a seasoned Superhost",
                "10 ways to improve your space",
                "Why strive for Superhost status",
                "What makes Superhosts so 'super'?",
                "Get more 5-star reviews",
              ].map((title, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <img
                    src="https://img.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_185193-110089.jpg?t=st=1738051169~exp=1738054769~hmac=dc000c8c3508efaf525ae1668ac5579f3325365d8e755bfe435692aee1b50b67&w=1060"
                    alt={title}
                    className="w-16 h-16 rounded-lg"
                  />
                  <p className="font-medium">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Views Section */}
      {activeTab === "Views" && (
        <div className="mt-6">
          <div className="mt-6">
            <div className="flex gap-10 text-gray-700 text-md">
              <span>Views, past 30 days</span>
              <span>New bookings, past 30 days</span>
              <span>
                Booking rate <span className="text-gray-400">(?)</span>
              </span>
            </div>
            <div className="border-b pt-36"></div>
            <div className="mt-6 font-medium">December</div>
            <div className="text-xs text-gray-400 mt-2">
              Data may be delayed up to 3 days
            </div>
            <div className=" underline cursor-pointer mt-1">Give feedback</div>
          </div>
        </div>
      )}

      {activeTab === "Listing issues" && (
        <div className="mt-6">
          <h1 className="text-2xl font-medium">No issues here!</h1>
          <p className="text-gray-500 mt-2">
            If issues are reported in the future, you'll be able to find that
            info here. It may take up to 1 day for the latest info to appear.
          </p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center mb-4 border-b">
              <IoIosClose
                className="text-2xl cursor-pointer"
                onClick={() => setShowModal(false)}
              />
              <h2 className=" flex text-center items-center justify-center ml-16 text-lg font-bold">
                Select a listing
              </h2>
            </div>
            <ul className="space-y-2 max-h-60 overflow-auto">
              {listings.map((listing, index) => (
                <li
                  key={index}
                  className={`p-2 flex items-center space-x-3 cursor-pointer rounded ${
                    selectedListing === listing ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setSelectedListing(listing);
                    setShowModal(false);
                  }}
                >
                  <div className="w-10 h-10 bg-gray-300 rounded-md flex items-center justify-center">
                    🏠
                  </div>
                  <span className="text-gray-700">{listing}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpportunitiesPage;
