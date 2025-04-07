import { Gallery, Item } from "react-photoswipe-gallery";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import AllReviews from "../property/reviews";
import ContactWithAgent from "../property/property-single-style/sidebar/ContactWithAgent";
import EnergyClass from "../property/property-single-style/common/EnergyClass";
import FloorPlans from "../property/property-single-style/common/FloorPlans";
import Footer from "@/components/common/default-footer";
import Header from "@/components/common/DefaultHeader";
import HomeValueChart from "../property/property-single-style/common/HomeValueChart";
import InfoWithForm from "../property/property-single-style/common/more-info";
import MetaData from "../common/MetaData";
import MobileMenu from "../common/mobile-menu";
import ModalVideo from "react-modal-video";
import MortgageCalculator from "../listing/grid-view/banner-search-v1/MortgageCalculator";
import NearbySimilarProperty from "../property/property-single-style/common/NearbySimilarProperty";
import OverView from "../property/property-single-style/common/OverView";
import PropertyAddress from "../property/property-single-style/common/PropertyAddress";
import PropertyDetails from "../property/property-single-style/common/PropertyDetails";
import PropertyFeaturesAminites from "../property/property-single-style/common/PropertyFeaturesAminites";
import PropertyGallery from "../property/property-single-style/single-v1/PropertyGallery";
import PropertyHeader from "../property/property-single-style/common/PropertyHeader";
import PropertyNearby from "../property/property-single-style/common/PropertyNearby";
import PropertyVideo from "../property/property-single-style/common/PropertyVideo";
import PropertyViews from "../property/property-single-style/common/property-view";
import ProperytyDescriptions from "../property/property-single-style/common/ProperytyDescriptions";
import ReviewBoxForm from "../property/ReviewBoxForm";
import ScheduleTour from "../property/property-single-style/sidebar/ScheduleTour";
import VirtualTour360 from "../property/property-single-style/common/VirtualTour360";
import WalkScore from "../property/property-single-style/common/WalkScore";
import axios from "axios";

const metaInformation = {
  title:
    "Property Single V1 || Flapabay- Apartment Rental, Experiences and More!",
};






const getYouTubeVideoId = (url) => {
  if (!url) return null;
  try {
    const parsed = JSON.parse(url); // Try parsing JSON if it's a stringified array
    url = Array.isArray(parsed) ? parsed[0] : url; // Use first video if array
  } catch {
    // Ignore JSON parse error
  }
  
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  return match ? match[1] : null;
};







const BookingPage = () => {
  // const [propertyreview, setPropertyreview] = useState({});
  const [reviewsproperty, setReviewsproperty] = useState([]);
  let params = useParams();
  const location = useLocation();

  const property = location.state?.property; // Get passed data
  const propertyId = params.id || property?.id;

  if (!property)
    return <p>Property data not found. Please go back and select a listing.</p>;

  const imagesArray = (() => {
  if (Array.isArray(property.images)) {
    return property.images; // Already an array
  }
  if (typeof property.images === "string") {
    try {
      return JSON.parse(property.images); // Try parsing JSON
    } catch {
      return property.images.split(","); // Convert CSV string to array if JSON fails
    }
  }
  return []; // Fallback to empty array if undefined or incorrect type
})();

  const overviewData = [
    {
      icon: "flaticon-bed",
      label: "Bedroom",
      value: property.bed,
    },
    {
      icon: "flaticon-shower",
      label: "Bath",
      value: property.bath,
    },
    {
      icon: "flaticon-event",
      label: "Year Built",
      value: property.yearBuilding,
    },
    {
      icon: "flaticon-garage",
      label: "Garage",
      value: "2",
      xs: true,
    },
    {
      icon: "flaticon-expand",
      label: "Sqft",
      value: property.sqft,
      xs: true,
    },
    {
      icon: "flaticon-home-1",
      label: "Property Type",
      value: property.property_type_id,
    },
  ];
  const reviews = [
    {
      name: "Bessie Cooper",
      date: "12 March 2022",
      rating: 5,
      text: "Every single thing we tried with John was delicious! Found some awesome places we would definitely go back to on our trip. John was also super friendly and passionate about Beşiktaş and Istanbul.",
      images: [
        "/images/blog/blog-single-3.jpg",
        "/images/blog/blog-single-4.jpg",
        "/images/blog/blog-single-5.jpg",
        "/images/blog/blog-single-6.jpg",
      ],
    },
    {
      name: "Darrell Steward",
      date: "12 March 2022",
      rating: 5,
      text: "Every single thing we tried with John was delicious! Found some awesome places we would definitely go back to on our trip. John was also super friendly and passionate about Beşiktaş and Istanbul.",
      images: [
        "/images/blog/blog-single-3.jpg",
        "/images/blog/blog-single-4.jpg",
        "/images/blog/blog-single-5.jpg",
        "/images/blog/blog-single-6.jpg",
      ],
    },
  ];
  const columns = [
    [
      {
        label: "Property ID",
        value: property.id,
      },
      {
        label: "Price",
        value: property.price,
      },
      {
        label: "Property latitude",
        value: property.latitude,
      },
      {
        label: "Property longitude",
        value: property.longitude,
      },
      {
        label: "Bathrooms",
        value: property.bath,
      },
      {
        label: "Bedrooms",
        value: property.bed,
      },
    ],
    [
      {
        label: "Garage",
        value: "2",
      },
      {
        label: "Garage Size",
        value: "200 SqFt",
      },
      {
        label: "Year Built",
        value: "2022",
      },
      {
        label: "Property Type",
        value: property.property_type_id,
      },
      {
        label: "Property Status",
        value: "For Sale",
      },
    ],
  ];
  const sortOptions = [
    "Newest",
    "Best Seller",
    "Best Match",
    "Price Low",
    "Price High",
  ];

  const addresses = [
    {
      address: property.address,
      city: property.city,
      state: property.state,
      zipCode: property.zipCode,
      area: property.area,
      country: property.county,
    },
    {
      address: property.address,
      city: property.city,
      state: property.state,
      zipCode: property.zipCode,
      area: property.area,
      country: property.county,
    },
  ];

  const amenities = property.amenities;
  const featuresAmenitiesData = JSON.parse(amenities); // Convert string to array

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!propertyId || isNaN(propertyId) || propertyId <= 0) {
      console.error("Invalid property ID:", propertyId);

      return;
    }

    const fetchReviews = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      if (!token) {
        console.error("No auth token found!");

        return;
      }

      const apiUrl = `http://localhost/flapabay-engine-main/api/v1/properties/${propertyId}/reviews`;
      // console.log("Fetching reviews from:", apiUrl);

      try {
        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Reviews Response:", response.data);

        if (response.data.success) {
          setReviewsproperty(response.data.reviews);
        } else {
          console.error("Error fetching reviews:", response.data.message);
        }
      } catch (error) {
        console.error(
          "Failed to fetch reviews:",
          error.response?.data || error.message
        );
      } finally {
        console.log("Reviewskjdna:", reviewsproperty);
      }
    };

    fetchReviews();
  }, [propertyId]);


  // const [isOpen, setOpen] = useState(false);
  
  const videoId = getYouTubeVideoId(property.video_link);

  return (
    <>
      <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <Header />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Property All Single V1 */}
      <section className="pt60 pb90 bgc-f7">
        <div className="container">
          <div className="row">
            {/* <PropertyHeader id={params.id} />
             */}

            <>
              <div className="col-lg-8">
                <div className="single-property-content mb30-md">
                  <h2 className="sp-lg-title">{property.title}</h2>
                  <div className="pd-meta mb15 d-md-flex align-items-center">
                    <p className="text fz15 mb-0 bdrr1 pr10 bdrrn-sm">
                      {property.location}
                    </p>
                    <a className="ff-heading text-thm fz15 bdrr1 pr10 ml0-sm ml10 bdrrn-sm">
                      <i className="fas fa-circle fz10 pe-2" />
                      For {property.forRent ? "rent" : "sale"}
                    </a>
                    <a className="ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm">
                      <i className="far fa-clock pe-2" />
                      {Number(new Date().getFullYear()) -
                        Number(property.yearBuilding)}{" "}
                      years ago
                    </a>
                    <a className="ff-heading ml10 ml0-sm fz15">
                      <i className="flaticon-fullscreen pe-2 align-text-top" />
                      8721
                    </a>
                  </div>
                  <div className="property-meta d-flex align-items-center">
                    <a className="text fz15">
                      <i className="flaticon-bed pe-2 align-text-top" />
                      {property.bed} bed
                    </a>
                    <a className="text ml20 fz15">
                      <i className="flaticon-shower pe-2 align-text-top" />
                      {property.bath} bath
                    </a>
                    <a className="text ml20 fz15">
                      <i className="flaticon-expand pe-2 align-text-top" />
                      {property.sqft} sqft
                    </a>
                  </div>
                </div>
              </div>
              {/* End .col-lg--8 */}

              <div className="col-lg-4">
                <div className="single-property-content">
                  <div className="property-action text-lg-end">
                    <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
                      <a className="icon mr10">
                        <span className="flaticon-like" />
                      </a>
                      <a className="icon mr10">
                        <span className="flaticon-new-tab" />
                      </a>
                      <a className="icon mr10">
                        <span className="flaticon-share-1" />
                      </a>
                      <a className="icon">
                        <span className="flaticon-printer" />
                      </a>
                    </div>
                    <h3 className="price mb-0">{property.price}</h3>
                    <p className="text space fz15">
                      $
                      {/* {(
                Number(property.price.split("$")[1].split(",").join("")) / property.sqft
              ).toFixed(2)} */}
                      /sq ft
                    </p>
                  </div>
                </div>
              </div>
              {/* End .col-lg--4 */}
            </>
          </div>
          {/* End .row */}

          <div className="row mb30 mt30">
            {/* <PropertyGallery id={params.id}/> */}

            <>
  <Gallery>
    {imagesArray.length > 0 ? (
      <div className="row">
        {imagesArray.map((image, index) => (
          <div className="col-sm-6" key={index}>
            <div className="sp-img-content mb15-md">
              <div className="popup-img preview-img-1 sp-img">
                <Item
                  original={image}
                  thumbnail={"/images/listings/listing-single-1.jpg"}
                  width={500}
                  height={300}
                >
                  {({ ref, open }) => (
                    <img
                      src={image}
                      ref={ref}
                      onClick={open}
                      alt={`Property Image ${index + 1}`}
                      role="button"
                      className="w-[100%] h-[50%] cover pt-2"
                    />
                  )}
                </Item>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p>No images available</p>
    )}

    {/* Second Image Block */}
    {imagesArray.length > 0 ? (
      <div className="row">
        {imagesArray.map((image, index) => (
          <div className="col-6 pt-2  ps-sm-0" key={index}>
            <div className="sp-img-content">
              <div
                className={`popup-img preview-img-${index + 2} sp-img mb10`}
              >
                <Item
                  original={image}
                  thumbnail={image}
                  width={500}
                  height={300}
                >
                  {({ ref, open }) => (
                    <img
                      
                      ref={ref}
                      onClick={open}
                      role="button"
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-[100%] h-[50%] cover"
                    />
                  )}
                </Item>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p>No images available</p>
    )}
  </Gallery>
</>;
          </div>
          {/* End .row */}

          <div className="row wrap">
            <div className="col-lg-8">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Overview</h4>
                <div className="row">
                  {/* <OverView /> */}
                  {overviewData.map((item, index) => (
                    <div
                      key={index}
                      className={`col-sm-6 col-lg-4 ${
                        item.xs ? "mb25-xs" : "mb25"
                      }`}
                    >
                      <div className="overview-element d-flex align-items-center">
                        <span className={`icon ${item.icon}`} />
                        <div className="ml15">
                          <h6 className="mb-0">{item.label}</h6>
                          <p className="text mb-0 fz15">{item.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Property Description</h4>
                {/* <ProperytyDescriptions /> */}

                <>
                  <p className="text mb10">{property.description}</p>
                </>

                {/* End property description */}

                <h4 className="title fz17 mb30 mt50">Property Details</h4>
                <div className="row">
                  {/* <PropertyDetails /> */}

                  <div className="row">
                    {columns.map((column, columnIndex) => (
                      <div
                        key={columnIndex}
                        className={`col-md-6 col-xl-4${
                          columnIndex === 1 ? " offset-xl-2" : ""
                        }`}
                      >
                        {column.map((detail, index) => (
                          <div
                            key={index}
                            className="d-flex justify-content-between"
                          >
                            <div className="pd-list">
                              <p className="fw600 mb10 ff-heading dark-color">
                                {detail.label}
                              </p>
                            </div>
                            <div className="pd-list">
                              <p className="text mb10">{detail.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30 mt30">Address</h4>
                <div className="row">
                  <>
                    {addresses.map((address, index) => (
                      <div
                        key={index}
                        className={`col-md-6 col-xl-4 ${
                          index === 1 ? "offset-xl-2" : ""
                        }`}
                      >
                        <div className="d-flex justify-content-between">
                          <div className="pd-list">
                            <p className="fw600 mb10 ff-heading dark-color">
                              Address
                            </p>
                            <p className="fw600 mb10 ff-heading dark-color">
                              State/country
                            </p>
                            <p className="fw600 mb-0 ff-heading dark-color">
                              City
                            </p>
                          </div>
                          <div className="pd-list">
                            <p className="text mb10">{address.address}</p>

                            <p className="text mb-0">{address.country}</p>
                            <p className="text mb10">{address.city}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* End col */}

                    <div className="col-md-12">
                      <iframe
                        className="position-relative bdrs12 mt30 h250"
                        loading="lazy"
                        src={`https://maps.google.com/maps?q=${addresses[0].address}&t=m&z=14&output=embed&iwloc=near`}
                        title={addresses[0].address}
                        aria-label={addresses[0].address}
                      />
                    </div>
                    {/* End col */}
                  </>
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Features &amp; Amenities</h4>
                <div className="row">
                  {/* <PropertyFeaturesAminites /> */}

                  <>
                    {featuresAmenitiesData.map((item, index) => (
                      <div key={index} className="col-sm-6 col-md-4">
                        <div className="pd-list">
                          <p className="text mb10">
                            <i className="fas fa-circle fz6 align-middle pe-2" />
                            {item}
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Energy Class</h4>
                <div className="row">
                  <EnergyClass />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Floor Plans</h4>
                <div className="row">
                  <div className="col-md-12">
                    <div className="accordion-style1 style2">
                      <FloorPlans />
                    </div>
                  </div>
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30">
      <h4 className="title fz17 mb30">Video</h4>
      <div className="row">
        {videoId ? (
          <>
            <ModalVideo
              channel="youtube"
              isOpen={isOpen}
              videoId={videoId}
              onClose={() => setOpen(false)}
            />
            <div className="col-md-12">
              <div className="property_video bdrs12 w-100">
                <button
                  className="video_popup_btn mx-auto popup-img"
                  onClick={() => setOpen(true)}
                  style={{ border: "none", background: "transparent" }}
                >
                  <span className="flaticon-play" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <p>No video available</p>
        )}
      </div>
    </div>
              {/* End .ps-widget */}

              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">What&apos;s Nearby?</h4>
                <div className="row">
                  <PropertyNearby />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Walkscore</h4>
                <div className="row">
                  <div className="col-md-12">
                    <h4 className="fw400 mb20">
                      10425 Tabor St Los Angeles CA 90034 USA
                    </h4>
                    <WalkScore />
                  </div>
                </div>
              </div>
              {/* End .ps-widget */}

              {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Mortgage Calculator</h4>
                <div className="row">
                  <MortgageCalculator />
                </div>
              </div> */}
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <div className="row">
                  <PropertyViews />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Home Value</h4>
                <div className="row">
                  <HomeValueChart />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Get More Information</h4>
                <InfoWithForm />
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <div className="row">
                  {/* <AllComments /> */}
                  {/* <AllReviews /> */}

                  <div className="product_single_content mb50">
                    <div className="mbp_pagination_comments">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="total_review d-flex align-items-center justify-content-between mb20 mt60">
                            <h6 className="fz17 mb15">
                              <i className="fas fa-star fz12 pe-2" />
                              {reviewsproperty.rating} · 3 reviews
                            </h6>
                            <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
                              <div className="pcs_dropdown mb15 d-flex align-items-center">
                                <span style={{ minWidth: "60px" }}>
                                  Sort by
                                </span>
                                <select className="form-select">
                                  {sortOptions.map((option, index) => (
                                    <option key={index}>{option}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End review filter */}

                        {/* <SingleReview /> */}

                        <>
                          {reviewsproperty.map((review) => (
                            <p key={review.id}>Rating: {review.rating}</p>
                          ))}

                          {reviews.map((review, index) => (
                            <div className="col-md-12" key={index}>
                              <div className="mbp_first position-relative d-flex align-items-center justify-content-start mt30 mb30-sm">
                                <img
                                  src="/images/blog/comments-2.png"
                                  className="mr-3"
                                  alt="comments-2.png"
                                />
                                <div className="ml20">
                                  <h6 className="mt-0 mb-0">{review.name}</h6>
                                  <div>
                                    <span className="fz14">{review.date}</span>
                                    <div className="blog-single-review">
                                      <ul className="mb0 ps-0">
                                        {[...Array(review.rating)].map(
                                          (_, i) => (
                                            <li
                                              className="list-inline-item me-0"
                                              key={i}
                                            >
                                              <a href="#">
                                                <i className="fas fa-star review-color2 fz10" />
                                              </a>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* End .d-flex */}

                              <p className="text mt20 mb20">{review.text}</p>
                              <ul className="mb20 ps-0">
                                {review.images.map((image, i) => (
                                  <li
                                    className="list-inline-item mb5-xs"
                                    key={i}
                                  >
                                    <img
                                      className="bdrs6"
                                      src={image}
                                      alt="review-img"
                                    />
                                  </li>
                                ))}
                              </ul>

                              <div className="review_cansel_btns d-flex bdrb1 pb30">
                                <a href="#">
                                  <i className="fas fa-thumbs-up" />
                                  Helpful
                                </a>
                                <a href="#">
                                  <i className="fas fa-thumbs-down" />
                                  Not helpful
                                </a>
                              </div>
                            </div>
                          ))}

                          <div className="col-md-12">
                            <div className="position-relative bdrb1 pt30 pb20">
                              <a href="#" className="ud-btn btn-white2">
                                Show all 134 reviews
                                <i className="fal fa-arrow-right-long" />
                              </a>
                            </div>
                          </div>
                        </>

                        {/* End reviews */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Leave A Review</h4>
                <div className="row">
                  <ReviewBoxForm />
                </div>
              </div>
              {/* End .ps-widget */}
            </div>
            {/* End .col-8 */}

            <div className="col-lg-4">
              <div className="column">
                <div className="  p30 mb30-md position-relative">
                  <ScheduleTour />
                </div>
                {/* End .Schedule a tour */}

                <div className="agen-personal-info position-relative bgc-white default-box-shadow1 bdrs12 p30 mt30">
                  <div className="widget-wrapper mb-0">
                    <h6 className="title fz17 mb30">Get More Information</h6>
                    <ContactWithAgent />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row mt30 align-items-center justify-content-between">
            <div className="col-auto">
              <div className="main-title">
                <h2 className="title">Discover Our Featured Listings</h2>
                <p className="paragraph">
                  Aliquam lacinia diam quis lacus euismod
                </p>
              </div>
            </div>
            {/* End header */}

            <div className="col-auto mb30">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button className="featured-prev__active swiper_button">
                    <i className="far fa-arrow-left-long" />
                  </button>
                </div>
                {/* End prev */}

                <div className="col-auto">
                  <div className="pagination swiper--pagination featured-pagination__active" />
                </div>
                {/* End pagination */}

                <div className="col-auto">
                  <button className="featured-next__active swiper_button">
                    <i className="far fa-arrow-right-long" />
                  </button>
                </div>
                {/* End Next */}
              </div>
              {/* End .col for navigation and pagination */}
            </div>
            {/* End .col for navigation and pagination */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12">
              <div className="property-city-slider">
                <NearbySimilarProperty />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Property All Single V1  */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default BookingPage;
