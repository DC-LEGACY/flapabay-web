
import categories from "@/data/propertyByCategory";
import { useScreenSize } from "@/utilis/screenUtils";
import { Link } from "react-router-dom";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
const PropertiesByCategory  = () => {
  const isMobile = useScreenSize();
  return (
    <>
      <Swiper
        spaceBetween={2}
        modules={[Navigation]}
        navigation={{
          nextEl: ".property-by-city-next__active",
          prevEl: ".property-by-city-prev__active",
        }}
        slidesPerView={1}
        breakpoints={{
          300: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 6,
          },
          1024: {
            slidesPerView: 10,
          },
          1200: {
            slidesPerView: 12,
          },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide  key={category.id}>
            <div style={{cursor:"pointer"}} className="item">
              <div className="feature-style3 text-center">
                <div className="feature-img">
                {isMobile ? (
          // Icons inside circular divs for mobile
          <>
            <div className="rounded-circle circle-icon">
            {category.icon && <category.icon size={25} color="#ffc500" />}
            </div>
            
          </>
        ) : (
          // Regular icons for PC
          <>
          
             {category.icon && <category.icon className="ml-auto mr-auto" size={28} color="#ffc500"  variant="TwoTone" />}
             
          </>
        )}

                
                </div>
                <div className="feature-content pt10">
                  <div className="top-area">
                    <p className="title mb-1">
                      <Link to="/map-v3">{category.name}</Link>
                    </p>
                    
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="rounded-arrow arrowY-center-position">
        <button className="property-by-city-prev__active swiper_button _prev">
          <i className="far fa-chevron-left" />
        </button>
        {/* End prev */}

        <button className="property-by-city-next__active swiper_button _next">
          <i className="far fa-chevron-right" />
        </button>
        {/* End Next */}
      </div>
      {/* End .col for navigation  */}
    </>
  );
};

export default PropertiesByCategory;
