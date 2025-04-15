import React from "react";
import { MdWarning, MdLink } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
const TravelAdmin = () => {
  return (
    <>
      <div className="w-full max-w-6xl px-2 mx-auto mt-6">
        <h2 className="mb-4 text-2xl font-medium">Guides for getting started</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div>
            <img
              src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg"
              alt="Getting started"
              className="rounded-lg"
            />
            <p className="mt-2 font-medium">Getting started on Airbnb</p>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg"
              alt="Finding a stay"
              className="rounded-lg"
            />
            <p className="mt-2 font-medium">
              Finding a stay that's right for you
            </p>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg"
              alt="Paying for your trip"
              className="rounded-lg"
            />
            <p className="mt-2 font-medium">Paying for your trip</p>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg"
              alt="AirCover"
              className="rounded-lg"
            />
            <p className="mt-2 font-medium">AirCover for guests</p>
          </div>
        </div>

        <h2 className="pt-6 pb-2 text-2xl font-medium">Top articles</h2>
        <div className="grid grid-cols-2 gap-4 pb-10 text-sm">
          <div className="pb-3 border-b border-gray-300">
            <a href="#" className="font-medium underline ">
              About Airbnb for Work
            </a>
            <p>
              Arranging accommodation for business trips is a cinch with Airbnb
              for Work, which puts a...
            </p>
          </div>
          <div className="pb-3 border-b border-gray-300">
            <a href="#" className="font-medium underline ">
              Sign your company up for Airbnb for Work
            </a>
            <p>
              Joining Airbnb for Work makes it easy to book and manage company
              travel, with access to....
            </p>
          </div>
          <div className="pb-3 border-b border-gray-300">
            <a href="#" className="font-medium underline ">
              Access and get to know your Airbnb for Work dashboard
            </a>
            <p>
              Airbnb for Work admins and trip planners have access to a
              convenient dashboard to help...
            </p>
          </div>
          <div className="pb-3 border-b border-gray-300">
            <a href="#" className="font-medium underline ">
              Invite employees to join Airbnb for Work
            </a>
            <p>
              If you’re a travel admin for your company’s Airbnb for Work
              account, you can invite...
            </p>
          </div>
          <div className="pb-3 border-b border-gray-300">
            <a href="#" className="font-medium underline ">
              Set up a company credit card for Airbnb for Work
            </a>
            <p>
              One useful feature of Airbnb for Work is that employees can book
              and charge business...
            </p>
          </div>
          <div className="pb-3 border-b border-gray-300">
            <a href="#" className="font-medium underline ">
              Print or download receipts for Airbnb for Work business trips
            </a>
            <p>
              As a travel admin for your company’s Airbnb for Work account, you
              can print or download....
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 mt-10 text-white bg-black">
        <h2 className="max-w-4xl mx-auto mb-4 text-2xl font-medium text-white">
          Explore more
        </h2>
        <div className="grid max-w-4xl gap-4 mx-auto lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2">
          <div className="pb-2 bg-gray-800 rounded-lg">
            <img
              src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg"
              alt="Community policies"
              className="rounded-lg"
            />
            <p className="pl-2 mt-2 font-medium text-white">
              Our community policies
            </p>
            <p className="pl-2 text-sm text-gray-400">
              How we build a foundation of trust.
            </p>
          </div>
          <div className="pb-2 bg-gray-800 rounded-lg">
            <img
              src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg"
              alt="Safety tips"
              className="rounded-lg"
            />
            <p className="pl-2 mt-2 font-medium text-white">
              Safety tips and guidelines
            </p>
            <p className="pl-2 text-sm text-gray-400">
              Resources to help travelers stay safe.
            </p>
          </div>
          <div className="p-2 my-auto rounded-lg ">
            <h2 className="text-lg font-medium text-white ">
              Need to get in touch?
            </h2>
            <p className="text-white ">
              We’ll start with some questions and get you to the right place.
            </p>
            <button className="w-full px-4 py-2 mt-2 font-medium text-black bg-white rounded-lg">
              Contact us
            </button>
            <p className="pt-2 text-white ">
              You can also{" "}
              <span className="font-medium underline ">give us feedback.</span>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelAdmin;
