import "swiper/css/bundle";

import { Swiper, SwiperSlide } from "swiper/react";

import AdvanceFilterModal from "@/components/common/advance-filter";
import FilterWithProperties from "@/components/home/home-v5/filter-with-property";
import HeroContent from "./HeroContent";
import { Home } from "iconsax-react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import PropertiesByCities from "@/components/home/home-v4/PropertiesByCities";

const Hero = () => {
  return (
    <>
      <div className="text-center inner-banner-style1">
        
        <FilterWithProperties/>
        
      </div>
      {/* End Hero content */}
          
      {/* <!-- Advance Feature Modal Start --> */}
      <div className="advance-feature-modal">
        <div
          className="modal fade"
          id="advanceSeachModal"
          tabIndex={-1}
          aria-labelledby="advanceSeachModalLabel"
          aria-hidden="true"
        >
          <AdvanceFilterModal />
        </div>
      </div>
      {/* <!-- Advance Feature Modal End --> */}
    </>

    
  );
};

export default Hero;
