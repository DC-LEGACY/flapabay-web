import { Heart } from "iconsax-react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const FeaturedListings = ({ cities }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      try {
        const response = await axios.get(
          "https://localhost:8000/api/v1/properties",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setProperties(response.data.data);
          console.log("Properties fetched successfully:", response.data.data);
        } else {
          console.error("Error fetching properties:", response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-yellow-500 border-solid border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        properties.slice(0, 8).map((listing) => {
          let imageArray = [];
          try {
            imageArray = JSON.parse(listing.images || "[]");
          } catch (error) {
            console.error("Error parsing images:", error);
          }

          const imageUrl = imageArray.length > 0 ? imageArray[0] : "images/image.jpg";

          return (
            <div className="col-sm-6 col-lg-4 col-xl-3" key={listing.id}>
              <div className="listing-style5">
                <Link to={`/booking-page/${listing.id}`} state={{ property: listing }}>
                  <div className="list-thumb">
                    <img className=" w-96 h-64 object-cover" src={imageUrl} alt={listing.title} />
                    {listing.featured && (
                      <div className="sale-sticker-wrap">
                        <div className="list-tag fz12">
                          <span className="flaticon-electricity me-2" />
                          Featured
                        </div>
                      </div>
                    )}
                    <div className="list-meta2">
                      <a href="#">
                        <Heart variant={isClicked ? "Bold" : isHovered ? "Bold" : ""} />
                      </a>
                    </div>
                  </div>
                </Link>
                <div className="list-content">
                  <h6 className="list-title">
                    <Link to={`/booking-page/${listing.id}`}>{listing.title}</Link>
                  </h6>
                  <div className="list-price mb-2 text-primary">
                    {listing.currency} {listing.price} / <span>mo</span>
                  </div>
                  <p className="list-text">{listing.location}</p>
                  <div className="list-meta d-flex align-items-center">
                    <a href="#">
                      <span className="flaticon-bed" /> {listing.num_of_bedrooms} bed
                    </a>
                    <a href="#">
                      <span className="flaticon-shower" /> {listing.num_of_bathrooms} bath
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default FeaturedListings;
