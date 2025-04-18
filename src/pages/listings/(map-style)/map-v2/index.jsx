import DefaultHeader from "@/components/common/DefaultHeader";

import MobileMenu from "@/components/common/mobile-menu";

import PropertyFilteringThree from "@/components/listing/map-style/map-v2/PropertyFilteringThree";

import React from "react";

import MetaData from "@/components/common/MetaData";

const metaInformation = {
  title: "Map V2 || Flapabay- Apartment Rental, Experiences and More!",
};

const MapV2 = () => {
  return (
    <>
    <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <Header />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}
            {/* Property Filtering */}
      <PropertyFilteringThree/>

     
      {/* Property Filtering */}
    </>
  );
};

export default MapV2;
