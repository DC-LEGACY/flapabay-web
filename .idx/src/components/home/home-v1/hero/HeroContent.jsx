
import {useNavigate} from 'react-router-dom';
import React, { useState } from "react";

const HeroContent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Experiences");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = [
    { id: "Experiences", label: "Experiences" },
    { id: "rent", label: "Rent" },
   
  ];

  return (
    // <div className="mx-auto advance-search-tab mt70 mt30-md animate-up-3">
    //   <ul className="p-0 m-0 nav nav-tabs">
    //     {tabs.map((tab) => (
    //       <li className="nav-item" key={tab.id}>
    //         <button
    //           className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
    //           onClick={() => handleTabClick(tab.id)}
    //         >
    //           {tab.label}
    //         </button>
    //       </li>
    //     ))}
    //   </ul>

    //   <div className="tab-content">
    //     {tabs.map((tab) => (
    //       <div
    //         className={`${activeTab === tab.id ? "active" : ""} tab-pane`}
    //         key={tab.id}
    //       >
    //         <div className="advance-content-style1">
    //           <div className="row">
    //             <div className="col-md-8 col-lg-9">
    //               <div className="advance-search-field position-relative text-start">
    //                 <form className="form-search position-relative">
    //                   <div className="box-search">
    //                     <span className="icon flaticon-home-1" />
    //                     <input
    //                       className="form-control bgc-f7 bdrs12"
    //                       type="text"
    //                       name="search"
    //                       placeholder={`Enter an address, neighborhood, city, or ZIP code for ${tab.label}`}
    //                     />
    //                   </div>
    //                 </form>
    //               </div>
    //             </div>
    //             {/* End .col-md-8 */}

    //             <div className="col-md-4 col-lg-3">
    //               <div className="mt-3 d-flex align-items-center justify-content-start justify-content-md-center mt-md-0">
    //                 <button
    //                   className="advance-search-btn"
    //                   type="button"
    //                   data-bs-toggle="modal"
    //                   data-bs-target="#advanceSeachModal"
    //                 >
    //                   <span className="flaticon-settings" /> Advanced
    //                 </button>
    //                 <button
    //                   className="advance-search-icon ud-btn btn-thm ms-4"
    //                   onClick={() => navigate("/map-v1")}
    //                   type="button"
    //                 >
    //                   <span className="flaticon-search" />
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>


    <div>hello</div>
  );
};

export default HeroContent;
