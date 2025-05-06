import React from "react";
import { MdWarning, MdLink } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
const ExperienceHost = () => {
  return (
    <>
      <div className="w-full max-w-6xl px-2 mx-auto mt-6">
        
        <h2 className="mb-4 text-2xl font-medium">
          Guides for getting started
        </h2>
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
            Airbnb Experiences standards and requirements
            </a>
            <p>
            In addition to behaving in accordance with our Terms of Service and Community Standards, which apply to all community members,...
            </p>
          </div>
          <div className="pb-3 border-b border-gray-300">
            <a href="#" className="font-medium underline ">
            Canceling your Experience as a Host
            </a>
            <p>
            Although cancellations by Hosts are rare, and some cancellations are beyond a Host’s....
            </p>
          </div>
          <div className="pb-3 border-b border-gray-300">
            <a href="#" className="font-medium underline ">
            What happens if my guest cancels their experience booking?
            
            </a>
            <p>
            Hosts have the choice between two cancellation policies for your Experiences:...
            </p>
          </div>
          <div className="pb-3 border-b border-gray-300">
            <a href="#" className="font-medium underline ">
            Reviews for Experiences
            </a>
            <p>
            
            Reviews are critical to help build trust on Airbnb—they’re an important way for Hosts...
            </p>
          </div>
          <div className="pb-3 border-b border-gray-300">
            <a href="#" className="font-medium underline ">
            How do payouts for experiences work?
            </a>
            <p>
            
            You'll need to set up your preferred payout method on your Airbnb profile. Learn how to...
            </p>
          </div>
          <div className="pb-3 border-b border-gray-300">
            <a href="#" className="font-medium underline ">
            Add a payout method
            </a>
            <p>
            
            Ready to host? Fantastic. Just set up a payout method and prepare to welcome your guests....
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

export default ExperienceHost;
