// import { useState, useRef, useEffect } from "react";
// import { FiSearch, FiFileText } from "react-icons/fi";
// import Guest from "./Guest";
// import Host from "./Host";
// import ExperienceHost from "./ExperienceHost";
// import TravelAdmin from "./TravelAdmin";
// import Header from "../home/home-v1/Header";
// import MobileMenu from "../common/mobile-menu";
// import { SearchNormal } from "iconsax-react";
// import Footer from "../common/default-footer";

// const tabs = [
//   { name: "Guest", component: <Guest /> },
//   { name: "Host", component: <Host /> },
//   { name: "Experience Host", component: <ExperienceHost /> },
//   { name: "Travel Admin", component: <TravelAdmin /> },
// ];

// const suggestions = [
//   "How to book a trip?",
//   "Cancel a reservation",
//   "Change account settings",
//   "Refund policies",
//   "Host payment options",
// ];

// export default function HelpPage() {
//   const [activeTab, setActiveTab] = useState(tabs[0].name);
//   const [searchText, setSearchText] = useState("");
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const searchRef = useRef(null);

//   const handleSelectSuggestion = (text) => {
//     setSearchText(text);
//     setShowSuggestions(false);
//   };

//   const handleClickOutside = (event) => {
//     if (searchRef.current && !searchRef.current.contains(event.target)) {
//       setShowSuggestions(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   return (
//     <>
//       <Header />
//       <MobileMenu />
//       <div className="flex flex-col items-center pt-6 lg:pt-36">
//         <h1 className="pb-6 text-3xl font-medium">Hi Fahad, how can we help?</h1>
        
//         {/* Search Bar with Suggestions */}
//         <div className="relative w-full max-w-4xl mb-6" ref={searchRef}>
//           <input
//             type="text"
//             placeholder="Search how-tos and more"
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             onFocus={() => setShowSuggestions(true)}
//             className="w-full px-4 py-3 border rounded-full shadow-sm"
//           />
//           <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#FFC500] text-white p-2 rounded-full">
//             <SearchNormal size={18} />
//           </button>
          
//           {showSuggestions && (
//             <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg">
//               {suggestions.map((suggestion, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center p-3 cursor-pointer hover:bg-gray-100"
//                   onClick={() => handleSelectSuggestion(suggestion)}
//                 >
//                   <FiFileText className="mr-3 text-gray-500" size={18} />
//                   <span>{suggestion}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Tabs */}
//         <div className="flex w-full max-w-6xl px-2 pt-6 border-b">
//           {tabs.map((tab) => (
//             <button
//               key={tab.name}
//               onClick={() => setActiveTab(tab.name)}
//               className={`pb-2 px-4 text-sm font-medium ${
//                 activeTab === tab.name ? "border-b-2 border-black" : "text-gray-500"
//               }`}
//             >
//               {tab.name}
//             </button>
//           ))}
//         </div>

//         {/* Active Tab Content */}
//         <div className="w-full max-w-6xl pt-8 m-1">{tabs.find((tab) => tab.name === activeTab)?.component}</div>
//       </div>
//       <section className="pb-0 footer-style1 pt60">
//         <Footer />
//       </section>
//     </>
//   );
// }




//   Icons Fetched Successfully

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const HelpPage = () => {
//   const [icons, setIcons] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchIcons = async () => {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const token = user?.token;

//       if (!token) {
//         setError("Unauthorized: No token found.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           "http://localhost/flapabay-engine-main/api/v1/icons",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setIcons(response.data);
//         console.log("Icons fetched:", response.data);
//       } catch (err) {
//         setError("Failed to load icons. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchIcons();
//   }, []);

//   return (
//     <div className="p-4 bg-white shadow rounded-md">
//       <h2 className="text-lg font-semibold mb-3">Available Icons</h2>

//       {loading ? (
//         <div className="flex justify-center">
//           <div className="w-8 h-8 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : icons.length === 0 ? (
//         <p>No icons found.</p>
//       ) : (
//         <div className="grid grid-cols-4 gap-4">
//           {icons.map((icon, index) => (
//             <div key={index} className="flex flex-col items-center">
//               <img
//                 src={icon.icon_image_url || "images/default-icon.png"} // Fallback Image
//                 alt={icon.black_icon || "Icon"}
//                 className="w-16 h-16 object-contain"
//                 onError={(e) => (e.target.src = "images/default-icon.png")} // Handle Broken Images
//               />
//               <p className="text-sm mt-1">{icon.black_icon || "No Name"}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HelpPage;












//  Categories Fetched Successfully


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const HelpPage = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const token = user?.token;

//       if (!token) {
//         setError("Unauthorized: No token found.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           "http://localhost/flapabay-engine-main/api/v1/categories",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.data.status === "success") {
//           setCategories(response.data.data);
//           console.log("Categories fetched:", response.data.data);
//         } else {
//           setError("Failed to fetch categories.");
//         }
//       } catch (err) {
//         setError("Error fetching categories.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <div className="p-4 bg-white shadow rounded-md">
//       <h2 className="text-lg font-semibold mb-3">Categories</h2>

//       {loading ? (
//         <div className="flex justify-center">
//           <div className="w-8 h-8 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : categories.length === 0 ? (
//         <p>No categories found.</p>
//       ) : (
//         <div className="grid grid-cols-3 gap-4">
//           {categories.map((category) => (
//             <div key={category.id} className="p-3 bg-gray-100 rounded-md">
//               <h3 className="text-md font-semibold">{category.name}</h3>
//               <p className="text-sm text-gray-600">{category.description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HelpPage;




//  bookings Fetched Successfully

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const HelpPage = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const token = user?.token;

//       if (!token) {
//         setError("Unauthorized: No token found.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           "http://localhost/flapabay-engine-main/api/v1/bookings",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.data.success) {
//           setBookings(response.data.booking);
//           console.log("Bookings fetched:", response.data.booking);
//         } else {
//           setError("Failed to fetch bookings.");
//         }
//       } catch (err) {
//         setError("Error fetching bookings.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   return (
//     <div className="p-4 bg-white shadow rounded-md">
//       <h2 className="text-lg font-semibold mb-3">Bookings</h2>

//       {loading ? (
//         <div className="flex justify-center">
//           <div className="w-8 h-8 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse border border-gray-200 text-sm">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2">ID</th>
//                 <th className="border p-2">Booking Number</th>
//                 <th className="border p-2">User ID</th>
//                 <th className="border p-2">Property ID</th>
//                 <th className="border p-2">Amount</th>
//                 <th className="border p-2">Guest Count</th>
//                 <th className="border p-2">Start Date</th>
//                 <th className="border p-2">End Date</th>
//                 <th className="border p-2">Booking Status</th>
//                 <th className="border p-2">Booking Type</th>
//                 <th className="border p-2">Payment Status</th>
//                 <th className="border p-2">Payment Method</th>
//                 <th className="border p-2">Payment Date</th>
//                 <th className="border p-2">Cancellation Date</th>
//                 <th className="border p-2">Cancellation Reason</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking) => (
//                 <tr key={booking.id} className="text-center">
//                   <td className="border p-2">{booking.id}</td>
//                   <td className="border p-2">{booking.booking_number}</td>
//                   <td className="border p-2">{booking.user_id}</td>
//                   <td className="border p-2">{booking.property_id}</td>
//                   <td className="border p-2">${booking.amount}</td>
//                   <td className="border p-2">{booking.guest_count}</td>
//                   <td className="border p-2">{booking.start_date}</td>
//                   <td className="border p-2">{booking.end_date}</td>
//                   <td className="border p-2">{booking.booking_status}</td>
//                   <td className="border p-2">{booking.booking_type}</td>
//                   <td className="border p-2">{booking.payment_status}</td>
//                   <td className="border p-2">{booking.payment_method}</td>
//                   <td className="border p-2">{booking.payment_date}</td>
//                   <td className="border p-2">{booking.cancellation_date || "N/A"}</td>
//                   <td className="border p-2">{booking.cancellation_reason || "N/A"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HelpPage;




//   locations Fetched Successfully


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const HelpPage = () => {
//   const [locations, setLocations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchLocations = async () => {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const token = user?.token;

//       if (!token) {
//         setError("Unauthorized: No token found.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           "http://localhost/flapabay-engine-main/api/v1/locations",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setLocations(response.data);
//         console.log("Locations fetched:", response.data);
//       } catch (err) {
//         setError("Error fetching locations.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLocations();
//   }, []);

//   return (
//     <div className="p-4 bg-white shadow rounded-md">
//       <h2 className="text-lg font-semibold mb-3">Available Locations</h2>

//       {loading ? (
//         <div className="flex justify-center">
//           <div className="w-8 h-8 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : locations.length === 0 ? (
//         <p>No locations found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {locations.map((location) => (
//             <div key={location.id} className="bg-gray-100 p-4 rounded-lg shadow">
//               <img
//                 src={location.placeholder_img}
//                 alt={location.name}
//                 className="w-full h-40 object-cover rounded-md"
//               />
//               <h3 className="text-lg font-bold mt-2">{location.name} ({location.code})</h3>
//               <p className="text-sm text-gray-600 mt-1">{location.description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HelpPage;




// payment status Fetched Successfully



// import React, { useState } from "react";
// import axios from "axios";

// const HelpPage = () => {
//   const [paymentId, setPaymentId] = useState("");
//   const [status, setStatus] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchPaymentStatus = async () => {
//     if (!paymentId) {
//       setError("Please enter a valid Payment ID.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     const user = JSON.parse(localStorage.getItem("user"));
//     const token = user?.token;

//     if (!token) {
//       setError("Unauthorized: No token found.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost/flapabay-engine-main/api/v1/payments/status",
//         { payment_id: parseInt(paymentId) },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setStatus(response.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch payment status.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 bg-white shadow rounded-md">
//       <h2 className="text-lg font-semibold mb-3">Check Payment Status</h2>

//       <div className="flex items-center gap-2">
//         <input
//           type="number"
//           value={paymentId}
//           onChange={(e) => setPaymentId(e.target.value)}
//           placeholder="Enter Payment ID"
//           className="border p-2 rounded w-full"
//         />
//         <button
//           onClick={fetchPaymentStatus}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           disabled={loading}
//         >
//           {loading ? "Checking..." : "Check"}
//         </button>
//       </div>

//       {error && <p className="text-red-500 mt-2">{error}</p>}

//       {status && (
//         <div className="mt-4 p-3 bg-gray-100 rounded">
//           <h3 className="font-bold text-green-600">Payment Status</h3>
//           <p className="text-sm">
//             <strong>Status:</strong> {status.status}
//           </p>
//           <p className="text-sm">
//             <strong>Message:</strong> {status.message}
//           </p>
//           {status.data && (
//             <div className="mt-2">
//               <p><strong>Amount:</strong> {status.data.amount}</p>
//               <p><strong>Payment Method:</strong> {status.data.payment_method}</p>
//               <p><strong>Payment Date:</strong> {status.data.payment_date}</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HelpPage;




// payment payout option Fetched Successfully


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const HelpPage = () => {
//   const [payoutOptions, setPayoutOptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPayoutOptions = async () => {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const token = user?.token;

//       try {
//         const response = await axios.get(
//           "http://localhost/flapabay-engine-main/api/v1/payments/payout-options",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setPayoutOptions(response.data.data); // Accessing `data` inside response
//       } catch (err) {
//         setError("Failed to load payout options.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayoutOptions();
//   }, []);

//   return (
//     <div className="p-4 bg-white shadow rounded-md">
//       <h2 className="text-lg font-semibold mb-3">Payout Options</h2>

//       {loading ? (
//         <div className="flex justify-center">
//           <div className="w-8 h-8 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : payoutOptions.length === 0 ? (
//         <p>No payout options available.</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {payoutOptions.map((option) => (
//             <div key={option.id} className="border rounded-lg p-4 shadow-md">
//               <h3 className="text-md font-semibold">{option.name}</h3>
//               <p className="text-sm text-gray-600">{option.description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HelpPage;



// get user detail payment Fetched Successfully


import React, { useEffect, useState } from "react";
import axios from "axios";

const HelpPage = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPaymentDetails = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      console.log("User from localStorage:", storedUser); // Debugging
  
      const token = storedUser?.token;
      const userId = storedUser?.user?.id; // Fix: Extract correct user ID
  
      if (!userId) {
        console.error("User ID is missing");
        setError("User ID is missing.");
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.get(
          `http://localhost/flapabay-engine-main/api/v1/payments/user-payment-details`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        console.log("API Response:", response.data);
        setPaymentDetails(response.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load payment details.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserPaymentDetails();
  }, []);
  
  

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-lg font-semibold mb-3">User Payment Details</h2>

      {loading ? (
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : paymentDetails.length === 0 ? (
        <p>No payment details available.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paymentDetails.map((detail) => (
            <div key={detail.id} className="border rounded-lg p-4 shadow-md">
              <h3 className="text-md font-semibold">{detail.method_name}</h3>
              <p className="text-sm text-gray-600">Account: {detail.account_number}</p>
              <p className="text-sm text-gray-600">Status: {detail.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HelpPage;
