import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const PartnerDark: React.FC = () => {
  const partnerImages: string[] = ["7", "8", "9", "10", "11"];

  return (
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
                src={`/images/partners/${imageName}.png`}
                alt={`Partner ${imageName}`}
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PartnerDark; 