import React, { useState } from "react";

import { CiSettings } from "react-icons/ci";
import { FaChevronDown } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import { IoDocumentOutline } from "react-icons/io5";
import { Line } from "react-chartjs-2";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdPayments } from "react-icons/md";
import { RiHomeHeartLine } from "react-icons/ri";

// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   LinearScale,
//   Title,
//   Tooltip,
//   CategoryScale,
// } from "chart.js";







// Register required components
// ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, CategoryScale);



const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');


const EarningsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  // const chartData = {
  //   labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  //   datasets: [
  //     {
  //       label: "Earnings",
  //       data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //       borderColor: "#4F46E5",
  //       backgroundColor: "rgba(79, 70, 229, 0.2)",
  //       tension: 0.3,
  //     },
  //   ],
  // };

  // const chartOptions = {
  //   responsive: true,
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       ticks: {
  //         callback: (value) => `$${value}`,
  //       },
  //     },
  //   },
  // };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      setIsModalOpen(false);
    }
  };

  const payoutHistory = [
    {
      id: 1,
      platform: 'PawaPay Payout',
      currency: 'ZMW',
      amount: '-K49.00',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjl584R1Uupfoo58b5Z-MF1-cQOQ5B6B1eJA&s',
      status: 'success',
      time: 'Oct 04, 05:45 AM',
    },
    {
      id: 2,
      platform: 'Bank transfer payout',
      currency: 'ZMW',
      amount: '+K49.00',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjl584R1Uupfoo58b5Z-MF1-cQOQ5B6B1eJA&s',
      status: 'pending',
      time: 'Oct 04, 05:45 AM',
    },
    {
      id: 3,
      platform: 'Stripe Transfer Payout',
      currency: 'USD',
      amount: '-$100.00',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjl584R1Uupfoo58b5Z-MF1-cQOQ5B6B1eJA&s',
      status: 'success',
      time: 'Oct 04, 05:45 AM',
    },
  ];


  return (
    <div className="flex flex-col w-[100%] py-4">
        <div className=" flex">
        <div className="w-[100%]">
      {/* Header Section */}
      <div className="flex justify-between max-w-4xl w-[90%]">
        <h1 className="text-2xl font-bold">Earnings</h1>
<div  onClick={handleModalToggle} className="flex border rounded-full w-10 h-10 items-center justify-center bg-slate-100 cursor-pointer "><CiSettings className=" text-[22px]" /></div>
      </div>






      <div className="p-4 max-w-3xl  rounded-lg ">
      <div className="bg-[#FFC500] p-4 rounded-lg text-white text-center">
        <p className="text-sm font-semibold">Pending payouts: $459.31</p>
        <p className="text-xs font-medium">Available Payout</p>
        <p className="text-3xl font-bold">$124.57</p>
      </div>

      <button className="w-full mt-4 bg-[#4CAF50] text-white py-2 rounded-lg flex items-center justify-center">
        <FaChevronDown className="mr-2" /> Request Payout
      </button>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Payout History</h2>
        <div className="mt-2 space-y-3">
          {payoutHistory.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-3">
                <img src={item.icon} alt={item.platform} className="w-8 h-8" />
                <div>
                  <p className="font-semibold">
                    {item.platform} <span className="font-bold">({item.currency})</span>
                  </p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
              <p className={cn('font-semibold', item.amount.startsWith('+') ? 'text-green-500' : 'text-red-500')}>
                {item.amount}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center">
        <button className="text-blue-500 font-semibold">View All</button>
      </div>
    </div>









      {/* Alert Section */}
      <div className="pt-6 w-[90%] max-w-4xl">
        <div className="p-2  border border-red-400 text-red-700 rounded-lg">
          <h2 className="text-lg font-medium">Add a payout method</h2>
          <p>In order to get paid, you’ll need to let us know where to send your money.</p>
          <button className="mt-3 px-4 py-2  text-black underline rounded-2xl hover:bg-blue-500">
            Learn more
          </button>
          <button className="mt-3 px-4 py-2  text-black border rounded-2xl hover:bg-gray-100">
            Set up payouts
          </button>
        </div>
      </div>

      {/* Earnings Section */}
      <div className="pt-10 w-full max-w-4xl">
        <h2 className="text-3xl font-bold">You’ve made</h2>
        <div className=" flex">
        <p className="text-4xl font-extrabold text-gray-600 mr-4">$0.00 </p>
        <p className="text-4xl font-extrabold text-gray-900"> this month</p>
        </div>
      </div>

      {/* Chart Section */}
      {/* <div className="mt-8 w-[100%]">
        <Line data={chartData} options={chartOptions} className="bg-white p-4 rounded-lg shadow-md " />
      </div> */}

      {/* Upcoming Reservations Section */}
      <div className="pt-10 w-full max-w-4xl">
        <h3 className="text-xl font-semibold">Upcoming</h3>
        <p className="text-gray-600 mt-2">No upcoming reservations at the moment.</p>
      </div>

      {/* Paid Section */}
      <div className="pt-10 w-full max-w-4xl">
        <h3 className="text-xl font-semibold">Paid</h3>
        <p className="text-gray-600 mt-2">
          Payouts are sent after guests check in.{' '}
          <a href="#" className="text-black underline hover:underline">
            Learn how payouts work
          </a>
        </p>
      </div>
      </div>
      {/* Year-to-Date Summary */}
      <div className="mt-10 max-w-4xl h-[50%] hidden xl:flex justify-end">
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-md w-64">
          <h3 className="text-md font-semibold">Year-to-date summary</h3>
          <h3 className=" text-gray-400 mb-2">Jan 1 - 28 ,2024</h3>
          <div className="flex justify-between text-gray-600">
            <span>Gross earnings</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between text-gray-600 mt-2">
            <span>Adjustments</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between text-gray-600 mt-2">
            <span>Service fee</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between text-gray-600 mt-2">
            <span>Tax withheld</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between border-t text-black font-semibold mt-3">
            <span>Total (USD)</span>
            <span>$0.00</span>
          </div>
        </div>
      </div>
      </div>
      {isModalOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleOutsideClick}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
            <button
              className=" top-4 right-4 text-gray-600 hover:text-black"
              onClick={handleModalToggle}
            >
              <IoClose size={24} />
            </button>
            <h2 className="text-xl font-md mt-2 mb-4">Settings and documents</h2>
            <ul className="space-y-4">
              <li className="flex items-center cursor-pointer ">
              <MdPayments />
              
                <span className="ml-2">Payout settings</span>
                <MdKeyboardArrowRight className="bg-slate-100 w-5 h-5 flex justify-center items-center rounded-full text-end ml-[129px]" />
                
              </li>
              <li className="flex items-center cursor-pointer ">
              <IoDocumentOutline />
                <span className="ml-2">Tax information</span>
                <MdKeyboardArrowRight className="bg-slate-100 w-5 h-5 flex justify-center items-center rounded-full ml-32" />
              </li>
              <li className="flex items-center cursor-pointer ">
              <RiHomeHeartLine />
                <span className="ml-2">Airbnb.org donations</span>
                <MdKeyboardArrowRight className="bg-slate-100 w-5 h-5 flex justify-center items-center rounded-full ml-[92px]" />
              </li>
            </ul>
            <button className="mt-6 px-4 py-2 bg-gray-100 text-black rounded-2xl">
              Give feedback
            </button>
          </div>
        </div>
      )}
    </div>

  );
};

export default EarningsPage;
