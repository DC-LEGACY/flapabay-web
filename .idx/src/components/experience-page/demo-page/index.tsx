import {
  FaCalendarAlt,
  FaChartLine,
  FaCreditCard,
  FaTable,
} from "react-icons/fa";
import React, { useState } from "react";

import { Link } from "react-router-dom";

const DemoPage = () => {
  const [showAllFAQs, setShowAllFAQs] = useState(false); // State to manage FAQ visibility

  // Function to toggle FAQ visibility
  const toggleFAQs = () => {
    setShowAllFAQs(!showAllFAQs);
  };

  // List of FAQs
  const faqs = [
    {
      question: "Do I have to host a home to host an experience?",
      answer:
        "No. You don’t have to host guests overnight in your home or space to be an experience host.",
    },
    {
      question: "What’s the time commitment?",
      answer:
        "You can host as often as you like—feel free to adjust your dates and times until you find what works best for you.",
    },
    {
      question: "Do I need a business license?",
      answer: (
        <>
          Depending on activities involved, certain experiences may require a
          business license. Make sure to check local laws in your area to
          determine which licenses may be required for your experience,
          especially if there is food, alcohol, or transportation involved.{" "}
        </>
      ),
    },
    {
      question: "Can I set a minimum number of guests per experience?",
      answer:
        "The minimum number of guests you can host during each instance of your experience is 1.",
    },
    {
      question: "Do I need insurance?",
      answer: (
        <>
          With AirCover for Hosts, you get Experiences liability insurance. That
          coverage applies to you in the rare event a guest is hurt or their
          property is damaged during a covered Experience.{" "}
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-cover bg-center">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white bg-opacity-90 shadow-sm z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link className="header-logo w-32  logo1" to="/">
            <img src="/images/logo.svg" alt="Header Logo" />
          </Link>

          {/* Let's Go Button */}
          <Link to="/first-step-exp">
            <button className="bg-[#ffc500] text-white px-4 py-1 rounded-full font-semibold hover:bg-[#e0b000] transition-colors">
              Let's go
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center pt-40 pb-10 text-center text-white">
        <h1 className="text-medium font-medium mb-4">
          HOST AN EXPERIENCE ON FLAPABAY
        </h1>
        <h1 className="text-5xl font-bold mb-4">
          Earn money leading people on activities you love.
        </h1>
        <Link to="/first-step-exp">
          <button className="bg-[#ffc500] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#e0b000] transition-colors">
            Let's go
          </button>
        </Link>
      </div>

      {/* Video Section with Text Overlay */}
      <div className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source
            src="/public/images/two.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Text Overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <h2 className="text-4xl font-bold mb-6 text-white">
            What's an experience?
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            It's an activity that goes beyond the typical tour or class,
            designed and led by locals all over the world. Show off your city,
            craft, cause, or culture by hosting an experience.
          </p>
        </div>
      </div>

      <div className="bg-white justify-center pt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center">
            {/* Left Side: Image */}
            <div className="w-full md:w-1/2">
              <img
                src="https://img.freepik.com/premium-photo/delicious-sweet-shu-cake-with-cream-nuts_73989-37006.jpg" // Replace with your image path
                alt="Create an Experience"
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Right Side: Content */}
            <div className="w-full md:w-1/2 md:pl-8 pt-8 md:mt-0">
              <h2 className="text-4xl font-bold">
                Create an activity, your way
              </h2>
              <p className="text-xl text-black pt-6 ">
                Food tour by bike, light photography at night, tapas on a boat,
                or yoga (with goats). Create and curate a unique activity people
                want to join.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white justify-center pt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center">
            {/* Left Side: Image */}

            <div className="w-full md:w-1/2 md:pl-8 pt-8 pb-6 md:mt-0">
              <h2 className="text-4xl font-bold">
                Do what you love (and get paid)
              </h2>
              <p className="text-xl text-black pt-6 ">
                Scout for street art or surf at sunset, turn your passion into
                profit. Earn money without it feeling like a job.
                <br />
              </p>
            </div>
            {/* Right Side: Content */}

            <div className="w-full md:w-1/2">
              <img
                src="https://img.freepik.com/premium-photo/delicious-sweet-shu-cake-with-cream-nuts_73989-37006.jpg" // Replace with your image path
                alt="Create an Experience"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white justify-center pt-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center">
            {/* Left Side: Image */}
            <div className="w-full md:w-1/2">
              <img
                src="https://img.freepik.com/premium-photo/delicious-sweet-shu-cake-with-cream-nuts_73989-37006.jpg" // Replace with your image path
                alt="Create an Experience"
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Right Side: Content */}
            <div className="w-full md:w-1/2 md:pl-8 pt-8 md:mt-0">
              <h2 className="text-4xl font-bold">
                Create an activity, your way
              </h2>
              <p className="text-xl text-black pt-6 ">
                Food tour by bike, light photography at night, tapas on a boat,
                or yoga (with goats). Create and curate a unique activity people
                want to join.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* // 3333 */}

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          {/* Heading and Description */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold pb-4">Show what you know</h2>
            <p className="text-xl text-black max-w-2xl mx-auto">
              There are experiences of every kind, like cooking, crafting,
              kayaking, and more. There's no limit to what you can do. Explore
              these featured categories.
            </p>
          </div>

          {/* Featured Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Culture & History */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <img
                src="https://img.freepik.com/premium-photo/delicious-sweet-shu-cake-with-cream-nuts_73989-37006.jpg" // Replace with your image path
                alt="Create an Experience"
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-xl font-bold mb-2 pt-6">Culture & History</h3>
              <p className="text-black">
                Share the story behind famous landmarks in your city.
              </p>
            </div>

            {/* Food & Drink */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <img
                src="https://img.freepik.com/premium-photo/delicious-sweet-shu-cake-with-cream-nuts_73989-37006.jpg" // Replace with your image path
                alt="Create an Experience"
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-xl font-bold mb-2 pt-6">Food & Drink</h3>
              <p className="text-black">
                Host a food tour, cooking class, dining experience, and more.
              </p>
            </div>

            {/* Nature & Outdoor */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <img
                src="https://img.freepik.com/premium-photo/delicious-sweet-shu-cake-with-cream-nuts_73989-37006.jpg" // Replace with your image path
                alt="Create an Experience"
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-xl font-bold mb-2 pt-6">Nature & Outdoor</h3>
              <p className="text-black">
                Lead nature hikes, water sports, mountain activities, and more.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 444 */}

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          {/* Heading and Description */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              We’ve got your back, every step of the way
            </h2>
            <p className="text-xl text-black max-w-2xl mx-auto">
              Resources like articles and insights dedicated to your hosting
              needs, 24/7 customer support for you and your guests, exposure for
              your experiences, and much more, to help you grow your business.
            </p>
          </div>

          {/* Tools Section */}
          <div className="mb-16 xl:flex items-center bg-gray-50 p-5">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-6">Tools tailored to you</h3>
              <p className="text-medium text-black pb-8">
                A dashboard to give you insights. Feedback on how to improve
                visibility to guests from all over the world through search and
                filters, seamless payments, and much more.
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-2">
              {/* Table */}
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <FaTable className="text-4xl text-[#ffc500] mx-auto mb-4" />{" "}
                {/* React Icon */}
                <h4 className="text-2xl font-bold pb-2">Task</h4>
                <p className="text-black">
                  Manage your bookings and schedules efficiently.
                </p>
              </div>

              {/* Scheduling */}
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <FaCalendarAlt className="text-4xl text-[#ffc500] mx-auto mb-4" />{" "}
                {/* React Icon */}
                <h4 className="text-2xl font-bold pb-2">Scheduling</h4>
                <p className="text-black">
                  Easily schedule and manage your experiences.
                </p>
              </div>

              {/* Payments */}
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <FaCreditCard className="text-4xl text-[#ffc500] mx-auto mb-4" />{" "}
                {/* React Icon */}
                <h4 className="text-2xl font-bold pb-2">Payments</h4>
                <p className="text-black">
                  Seamless payment processing for your bookings.
                </p>
              </div>

              {/* Insights */}
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <FaChartLine className="text-4xl text-[#ffc500] mx-auto mb-4" />{" "}
                {/* React Icon */}
                <h4 className="text-2xl font-bold pb-2">Insights</h4>
                <p className="text-black">
                  Get valuable insights to grow your business.
                </p>
              </div>
            </div>
          </div>

          {/* Alicover for Hosts Section */}
          <div className="bg-[#f7f7f7] p-8 rounded-lg flex ">
            <div className="w-1/2 flex items-center flex-col justify-center ">
              <div className="flex items-center">
                <h3 className="text-4xl font-bold  text-[#ffc500]">air</h3>
                <h3 className="text-4xl font-bold ">cover</h3>
              </div>
              <h3 className="text-xl font-bold mb-4">for Hosts</h3>
            </div>
            <div className=" w-1/2">
              <p className="text-xl text-black pb-6">
                Alicover for Hosts covers Experiences, too. Alicover for Hosts
                includes $1M in Experiences liability insurance in the rare
                event a guest gets hurt during an Airbnb Experience. Always
                included and always free.
              </p>
              <button className="bg-[#ffc500] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#e0b000] transition-colors">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 555 */}

      <div className="bg-white py-10">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How to get started</h2>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center bg-slate-50 pb-2">
              <div className="text-4xl font-bold text-[#ffc500] pb-4">1</div>
              <h3 className="text-xl font-bold pb-2">
                Learn our quality standards
              </h3>
              <p className="text-lg text-black">
                Make sure your experience meets our best for expertise, insider
                access, and connection.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center bg-slate-50 pb-2">
              <div className="text-4xl font-bold text-[#ffc500] pb-4">2</div>
              <h3 className="text-xl font-bold pb-2">Submit your experience</h3>
              <p className="text-lg text-black">
                Share a description and high-quality photos of what you have in
                mind to show what your experience would be like.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center bg-slate-50 pb-2">
              <div className="text-4xl font-bold text-[#ffc500] pb-4">3</div>
              <h3 className="text-xl font-bold pb-2">Start hosting</h3>
              <p className="text-lg text-black">
                Your experience will be reviewed and if it is approved, you can
                add dates to your calendar and start welcoming guests.
              </p>
            </div>
          </div>

          {/* Let's Go Button */}
          <div className="text-center pt-6">
            <Link to="/first-step-exp">
              <button  className="bg-[#ffc500] text-white px-8 py-2 rounded-full font-semibold hover:bg-[#e0b000] transition-colors">
                Let's go
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* 66 */}

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Frequently asked questions
            </h2>
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto">
            {/* Render FAQs based on state */}
            {faqs.slice(0, showAllFAQs ? faqs.length : 3).map((faq, index) => (
              <div key={index} className="pb-4 pt-4 border-b">
                <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                <p className="text-lg text-black">{faq.answer}</p>
              </div>
            ))}

            {/* Show More / Show Less Button */}
            <div className="text-center">
              <button
                onClick={toggleFAQs}
                className="text-[#ffc500] font-semibold underline"
              >
                {showAllFAQs ? "Show less ~" : "Show more"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
