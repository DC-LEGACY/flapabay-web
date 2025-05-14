import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Partner: React.FC = () => {
  const partnerImages: string[] = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];
  const [showSlider, setShowSlider] = useState<boolean>(false);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  return (
    <>
      {showSlider && (
        <Swiper
          spaceBetween={10}
          slidesPerView={6}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            992: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 6,
            },
          }}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="swiper-container"
        >
          {partnerImages.map((imageName, index) => (
            <SwiperSlide key={index}>
              <div className="item">
                <div className="partner_item">
                  <img
                    style={{ objectFit: "contain" }}
                    className="wa m-auto"
                    src={`/images/partners/${imageName}`}
                    alt={`Partner ${index + 1}`}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default Partner; 