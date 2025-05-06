import React from 'react'
import { MdWarning, MdLink } from 'react-icons/md';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
const Host = () => {
  return (

    <>
    <div className="w-full max-w-6xl px-2 mx-auto mt-6">
    <h2 className="mb-4 text-2xl font-medium">Recommended for you</h2>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="p-4 border rounded-lg shadow-sm">
        <div className="flex items-center mb-2 font-bold text-red-600">
          <MdWarning className="mr-2" /> ACTION REQUIRED
        </div>
        <h3 className="font-semibold">Your identity is not fully verified</h3>
        <p className="pb-3 text-sm text-gray-600">Identity verification helps us check that you’re really you. It’s one of the ways we keep Airbnb secure.</p>
        <div className='flex items-center justify-between pb-3 border-t border-b border-gray-300'>
        <button className="mt-2 ">Check identity verification status</button>
        <MdOutlineKeyboardArrowRight className='mt-2 text-lg' />
        </div>
        <div className='flex items-center justify-between pt-2'>
        <button className="mt-1 ">Learn more </button>
        <MdOutlineKeyboardArrowRight className='mt-2 text-lg'/>
        </div>
      </div>
      <div className="p-4 border rounded-lg shadow-sm">
        <div className="flex items-center mb-2 font-bold text-gray-600">
          <MdLink className="mr-2" /> QUICK LINK
        </div>
        <h3 className="font-semibold">Finding reservation details</h3>
        <p className="pb-16 text-sm text-gray-600">Your Trips tab has full details, receipts, and Host contact info for each of your reservations.</p>
        <div className='flex items-center justify-between border-t border-gray-300'>
        <button className="mt-2 ">Go to Today tab</button>
        <MdOutlineKeyboardArrowRight className='mt-2 text-lg ' />
        </div>
      </div>
    </div>
    <h2 className="pt-6 mb-4 text-2xl font-medium">Guides for getting started</h2>
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <div>
        <img src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg" alt="Getting started" className="rounded-lg" />
        <p className="mt-2 font-medium">Getting started on Airbnb</p>
      </div>
      <div>
        <img src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg" alt="Finding a stay" className="rounded-lg" />
        <p className="mt-2 font-medium">Finding a stay that's right for you</p>
      </div>
      <div>
        <img src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg" alt="Paying for your trip" className="rounded-lg" />
        <p className="mt-2 font-medium">Paying for your trip</p>
      </div>
      <div>
        <img src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg" alt="AirCover" className="rounded-lg" />
        <p className="mt-2 font-medium">AirCover for guests</p>
      </div>
    </div>


    <h2 className="pt-6 pb-2 text-2xl font-medium">Top articles</h2>
      <div className="grid grid-cols-2 gap-4 pb-10 text-sm">
        <div className='pb-3 border-b border-gray-300'>
        <a href="#" className="font-medium underline ">If your guest cancels</a>
        <p>It happens—plans change! If a guest needs to cancel their reservation, we’re here to help you...</p>
        </div>
        <div className='pb-3 border-b border-gray-300'>
        <a href="#" className="font-medium underline ">Cancellation policies for your listing</a>
        <p>Sometimes, things come up and guests have to cancel. To keep things running smoothly, you can choose the cancellation policies....</p>
        </div>
        <div className='pb-3 border-b border-gray-300'>
        <a href="#" className="font-medium underline ">Deactivating or deleting your account</a>
        <p>We’d hate to see you go, but if you’ve decided to leave Airbnb, you have a couple of options. You can temporarily deactivate your account,...</p>
        </div>
        <div className='pb-3 border-b border-gray-300'>
        <a href="#" className="font-medium underline ">Expired or withdrawn invites, offers and requests</a>
        <p>It's important to respond to guests within 24 hours, but if a pre-approved invite, special...</p>
        </div>
        <div    className='pb-3 border-b border-gray-300'>
        <a href="#" className="font-medium underline ">Changing the price of confirmed or pending reservations</a>
        <p>Here's how to change the price of a confirmed reservation, or send a special offer for a...</p>
        </div>
        <div   className='pb-3 border-b border-gray-300'>
        <a href="#" className="font-medium underline ">Experienced guests</a>
        <p>
        At Airbnb, we want to help make hosting easier for all our Host—and we’re always identifying ways to help make our comm...</p>
        </div>
      </div>


     





  </div>



<div className="p-6 mt-10 text-white bg-black">
<h2 className="max-w-4xl mx-auto mb-4 text-2xl font-medium text-white">Explore more</h2>
<div className="grid max-w-4xl gap-4 mx-auto lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2">
  <div className="pb-2 bg-gray-800 rounded-lg">
    <img src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg" alt="Community policies" className="rounded-lg" />
    <p className="pl-2 mt-2 font-medium text-white">Our community policies</p>
    <p className="pl-2 text-sm text-gray-400">How we build a foundation of trust.</p>
  </div>
  <div className="pb-2 bg-gray-800 rounded-lg">
    <img src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg" alt="Safety tips" className="rounded-lg" />
    <p className="pl-2 mt-2 font-medium text-white">Safety tips and guidelines</p>
    <p className="pl-2 text-sm text-gray-400">Resources to help travelers stay safe.</p>
  </div>
  <div className='p-2 my-auto rounded-lg '>
    <h2 className='text-lg font-medium text-white '>Need to get in touch?</h2>
    <p className='text-white '>We’ll start with some questions and get you to the right place.</p>
    <button className="w-full px-4 py-2 mt-2 font-medium text-black bg-white rounded-lg">Contact us</button>
    <p className='pt-2 text-white '>You can also <span className='font-medium underline '>give us feedback.</span> </p>
  </div>
</div>
</div>

</>
  )
}

export default Host