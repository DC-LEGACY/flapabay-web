import Map, { Marker, NavigationControl } from "react-map-gl";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

const MAPBOX_TOKEN = "pk.eyJ1IjoicmFqcG9vdGZhaGFkNzcxIiwiYSI6ImNtNHdmeHR5bTBlcTUyaXA3aW02bXZpMWMifQ.V4RKMEW-u84e5foK0FpBLA" || "";

const CreateListingStepFive = () => {
  const [viewport, setViewport] = useState({
      latitude: 37.7749,
      longitude: -122.4194,
      zoom: 10,
    });
  
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
    // Fetch suggestions from Mapbox Geocoding API
    const fetchSuggestions = debounce(async (query) => {
      if (!query) {
        setSuggestions([]);
        return;
      }
  
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_TOKEN}&limit=5`
        );
        const data = await res.json();
        setSuggestions(data.features || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }, 500);
  
    const handleInputChange = (e) => {
      setSearchQuery(e.target.value);
      fetchSuggestions(e.target.value);
    };
  
    const handleSuggestionClick = (place) => {
      const [lng, lat] = place.center;
      setViewport({ latitude: lat, longitude: lng, zoom: 12 });
      setSelectedLocation({
        address: place.place_name,
        latitude: lat,
        longitude: lng,
      });
      setSuggestions([]);
      setSearchQuery(place.place_name);
      setShowModal(true);
    };

  
  

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full fixed top-0 bg-white left-0 flex justify-between items-center px-4 pt-2 z-50">
        <div className="text-2xl font-bold text-black">
          <Link className="header-logo logo1" to="/">
            <img src="/images/logo.svg" alt="Header Logo" />
          </Link>
        </div>
        <button className="text-sm flex items-center border border-gray-100 rounded-full px-3 py-2">
          Save & exit
        </button>
      </header>



<>
    <h2 className=" font-medium text-xl ml-auto mr-auto text-center">Where should guests meet you?</h2>
    <div className="w-full h-screen relative mt-[40px]">
      {/* Search Input */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 rounded-2xl shadow-md z-10 w-96">
        <input
          type="text"
          placeholder="Enter Address..."
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-2xl focus:outline-none"
        />
        {suggestions.length > 0 && (
          <ul className="bg-white border rounded-2xl mt-1 max-h-60 overflow-y-auto">
            {suggestions.map((place) => (
              <li
                key={place.id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSuggestionClick(place)}
              >
                {place.place_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Map Component */}
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        className="w-full h-full"
      >
        <NavigationControl position="top-left" />
        {selectedLocation && (
          <Marker latitude={selectedLocation.latitude} longitude={selectedLocation.longitude} color="red" />
        )}
      </Map>

      {/* Modal for Address Confirmation */}
      {showModal && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
            <h2 className="text-lg font-bold">Confirm Address</h2>
            

            <div className="mt-4">
              <label className="text-sm">Street Address</label>
              <input
                type="text"
                value={selectedLocation.address}
                onChange={(e) => setSelectedLocation({ ...selectedLocation, address: e.target.value })}
                className="w-full p-2 border rounded-2xl focus:outline-none"
              />
            </div>
            <div className="mt-2">
              
              <input type="text" placeholder="apt,suite(optional)" className="w-full p-2 border rounded-2xl focus:outline-none" />
            </div>

            <div className="mt-4 flex gap-2">
              <div className="w-1/2">
                <label className="text-sm">City</label>
                <input type="text" className="w-full p-2 border rounded-2xl focus:outline-none" />
              </div>
              <div className="w-1/2">
                <label className="text-sm">State</label>
                <input type="text" className="w-full p-2 border rounded-2xl focus:outline-none" />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm">Country</label>
              <select className="w-full p-2 border rounded-2xl">
              <option value="PK">Pakistan - PK</option>
    <option value="US">United States - US</option>
    <option value="CA">Canada - CA</option>
    <option value="GB">United Kingdom - GB</option>
    <option value="AU">Australia - AU</option>
    <option value="DE">Germany - DE</option>
    <option value="FR">France - FR</option>
    <option value="IT">Italy - IT</option>
    <option value="ES">Spain - ES</option>
    <option value="IN">India - IN</option>
    <option value="CN">China - CN</option>
    <option value="JP">Japan - JP</option>
    <option value="KR">South Korea - KR</option>
    <option value="RU">Russia - RU</option>
    <option value="BR">Brazil - BR</option>
    <option value="MX">Mexico - MX</option>
    <option value="ZA">South Africa - ZA</option>
    <option value="EG">Egypt - EG</option>
    <option value="TR">Turkey - TR</option>
    <option value="SA">Saudi Arabia - SA</option>
    <option value="AE">United Arab Emirates - AE</option>
    <option value="ID">Indonesia - ID</option>
    <option value="TH">Thailand - TH</option>
    <option value="VN">Vietnam - VN</option>
    <option value="MY">Malaysia - MY</option>
    <option value="PH">Philippines - PH</option>
    <option value="SG">Singapore - SG</option>
    <option value="NZ">New Zealand - NZ</option>
    <option value="AR">Argentina - AR</option>
    <option value="CL">Chile - CL</option>
    <option value="CO">Colombia - CO</option>
    <option value="PE">Peru - PE</option>
    <option value="NG">Nigeria - NG</option>
    <option value="KE">Kenya - KE</option>
    <option value="GH">Ghana - GH</option>
    <option value="UA">Ukraine - UA</option>
    <option value="PL">Poland - PL</option>
    <option value="SE">Sweden - SE</option>
    <option value="FI">Finland - FI</option>
    <option value="NO">Norway - NO</option>
    <option value="DK">Denmark - DK</option>
    <option value="CH">Switzerland - CH</option>
    <option value="BE">Belgium - BE</option>
    <option value="AT">Austria - AT</option>
    <option value="NL">Netherlands - NL</option>
    <option value="GR">Greece - GR</option>
    <option value="PT">Portugal - PT</option>
    <option value="CZ">Czech Republic - CZ</option>
    <option value="HU">Hungary - HU</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="text-sm">Meeting point name (optional)</label>
              <input type="text" className="w-full p-2 border rounded-2xl focus:outline-none" />
            </div>

            <div className="mt-4 flex justify-between items-center">
              <label className="text-sm">Add detailed instructions (optional)</label>
              <input type="checkbox" className="toggle" />
            </div>

            <button
              className="mt-4 w-full bg-black text-white py-2 rounded-lg"
              onClick={() => setShowModal(false)}
            >
              Looks good
            </button>
          </div>
        </div>
      )}
    </div>
    </>















    

      {/* Footer */}
      <div className="w-full left-0 fixed bottom-0 bg-white shadow-md flex flex-col z-50">
        <div className="w-full h-1 bg-gray-300 rounded-full relative">
          <div
            className="absolute bg-[#FFC500] top-0 left-0 h-full rounded-full"
            style={{ width: "21%" }} // Adjust progress bar width
          ></div>
        </div>

        <div className="flex items-center justify-end">
          <Link to={"/create-listing-step-six"}>
            <button
              className={`mt-2 px-3 py-1 text-lg rounded-lg mb-2 mr-2 bg-[#FFC500] text-white`}
              // Disable button if no address is entered
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateListingStepFive;




// import React, { useState } from "react";
// import Map, { Marker, NavigationControl } from "react-map-gl";
// import debounce from "lodash.debounce";

// const MAPBOX_TOKEN = "pk.eyJ1IjoicmFqcG9vdGZhaGFkNzcxIiwiYSI6ImNtNHdmeHR5bTBlcTUyaXA3aW02bXZpMWMifQ.V4RKMEW-u84e5foK0FpBLA" || "";

// const CreateListingStepFive = () => {
//   const [viewport, setViewport] = useState({
//     latitude: 37.7749,
//     longitude: -122.4194,
//     zoom: 10,
//   });

//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // Fetch suggestions from Mapbox Geocoding API
//   const fetchSuggestions = debounce(async (query) => {
//     if (!query) {
//       setSuggestions([]);
//       return;
//     }

//     try {
//       const res = await fetch(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_TOKEN}&limit=5`
//       );
//       const data = await res.json();
//       setSuggestions(data.features || []);
//     } catch (error) {
//       console.error("Error fetching suggestions:", error);
//     }
//   }, 500);

//   const handleInputChange = (e) => {
//     setSearchQuery(e.target.value);
//     fetchSuggestions(e.target.value);
//   };

//   const handleSuggestionClick = (place) => {
//     const [lng, lat] = place.center;
//     setViewport({ latitude: lat, longitude: lng, zoom: 12 });
//     setSelectedLocation({
//       address: place.place_name,
//       latitude: lat,
//       longitude: lng,
//     });
//     setSuggestions([]);
//     setSearchQuery(place.place_name);
//     setShowModal(true);
//   };

//   return (
//     <>
//     <h2 className=" font-medium text-xl ml-auto mr-auto text-center">Where should guests meet you?</h2>
//     <div className="w-full h-screen relative">
//       {/* Search Input */}
//       <div className="absolute top-4 left-1/2 transform -translate-x-1/2 rounded-2xl shadow-md z-10 w-96">
//         <input
//           type="text"
//           placeholder="Enter Address..."
//           value={searchQuery}
//           onChange={handleInputChange}
//           className="w-full p-3 border rounded-2xl focus:outline-none"
//         />
//         {suggestions.length > 0 && (
//           <ul className="bg-white border rounded-2xl mt-1 max-h-60 overflow-y-auto">
//             {suggestions.map((place) => (
//               <li
//                 key={place.id}
//                 className="p-2 hover:bg-gray-200 cursor-pointer"
//                 onClick={() => handleSuggestionClick(place)}
//               >
//                 {place.place_name}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Map Component */}
//       <Map
//         mapboxAccessToken={MAPBOX_TOKEN}
//         initialViewState={viewport}
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//         className="w-full h-full"
//       >
//         <NavigationControl position="top-left" />
//         {selectedLocation && (
//           <Marker latitude={selectedLocation.latitude} longitude={selectedLocation.longitude} color="red" />
//         )}
//       </Map>

//       {/* Modal for Address Confirmation */}
//       {showModal && (
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
//           <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
//             <h2 className="text-lg font-bold">Confirm Address</h2>
            

//             <div className="mt-4">
//               <label className="text-sm">Street Address</label>
//               <input
//                 type="text"
//                 value={selectedLocation.address}
//                 onChange={(e) => setSelectedLocation({ ...selectedLocation, address: e.target.value })}
//                 className="w-full p-2 border rounded-2xl focus:outline-none"
//               />
//             </div>
//             <div className="mt-2">
              
//               <input type="text" placeholder="apt,suite(optional)" className="w-full p-2 border rounded-2xl focus:outline-none" />
//             </div>

//             <div className="mt-4 flex gap-2">
//               <div className="w-1/2">
//                 <label className="text-sm">City</label>
//                 <input type="text" className="w-full p-2 border rounded-2xl focus:outline-none" />
//               </div>
//               <div className="w-1/2">
//                 <label className="text-sm">State</label>
//                 <input type="text" className="w-full p-2 border rounded-2xl focus:outline-none" />
//               </div>
//             </div>

//             <div className="mt-4">
//               <label className="text-sm">Country</label>
//               <select className="w-full p-2 border rounded-2xl">
//               <option value="PK">Pakistan - PK</option>
//     <option value="US">United States - US</option>
//     <option value="CA">Canada - CA</option>
//     <option value="GB">United Kingdom - GB</option>
//     <option value="AU">Australia - AU</option>
//     <option value="DE">Germany - DE</option>
//     <option value="FR">France - FR</option>
//     <option value="IT">Italy - IT</option>
//     <option value="ES">Spain - ES</option>
//     <option value="IN">India - IN</option>
//     <option value="CN">China - CN</option>
//     <option value="JP">Japan - JP</option>
//     <option value="KR">South Korea - KR</option>
//     <option value="RU">Russia - RU</option>
//     <option value="BR">Brazil - BR</option>
//     <option value="MX">Mexico - MX</option>
//     <option value="ZA">South Africa - ZA</option>
//     <option value="EG">Egypt - EG</option>
//     <option value="TR">Turkey - TR</option>
//     <option value="SA">Saudi Arabia - SA</option>
//     <option value="AE">United Arab Emirates - AE</option>
//     <option value="ID">Indonesia - ID</option>
//     <option value="TH">Thailand - TH</option>
//     <option value="VN">Vietnam - VN</option>
//     <option value="MY">Malaysia - MY</option>
//     <option value="PH">Philippines - PH</option>
//     <option value="SG">Singapore - SG</option>
//     <option value="NZ">New Zealand - NZ</option>
//     <option value="AR">Argentina - AR</option>
//     <option value="CL">Chile - CL</option>
//     <option value="CO">Colombia - CO</option>
//     <option value="PE">Peru - PE</option>
//     <option value="NG">Nigeria - NG</option>
//     <option value="KE">Kenya - KE</option>
//     <option value="GH">Ghana - GH</option>
//     <option value="UA">Ukraine - UA</option>
//     <option value="PL">Poland - PL</option>
//     <option value="SE">Sweden - SE</option>
//     <option value="FI">Finland - FI</option>
//     <option value="NO">Norway - NO</option>
//     <option value="DK">Denmark - DK</option>
//     <option value="CH">Switzerland - CH</option>
//     <option value="BE">Belgium - BE</option>
//     <option value="AT">Austria - AT</option>
//     <option value="NL">Netherlands - NL</option>
//     <option value="GR">Greece - GR</option>
//     <option value="PT">Portugal - PT</option>
//     <option value="CZ">Czech Republic - CZ</option>
//     <option value="HU">Hungary - HU</option>
//               </select>
//             </div>

//             <div className="mt-4">
//               <label className="text-sm">Meeting point name (optional)</label>
//               <input type="text" className="w-full p-2 border rounded-2xl focus:outline-none" />
//             </div>

//             <div className="mt-4 flex justify-between items-center">
//               <label className="text-sm">Add detailed instructions (optional)</label>
//               <input type="checkbox" className="toggle" />
//             </div>

//             <button
//               className="mt-4 w-full bg-black text-white py-2 rounded-lg"
//               onClick={() => setShowModal(false)}
//             >
//               Looks good
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default CreateListingStepFive;
