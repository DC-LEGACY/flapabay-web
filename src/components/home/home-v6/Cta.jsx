import React from "react";
import AppWidget from "./AppWidget";
import { useScreenSize } from "@/utilis/screenUtils";


const Cta = () => {
  const isMobile = useScreenSize();
  return (
    <section className="pt-10 pb-24 md:pt-16 md:pb-16 bg-flapabay-black">
      <div className="container  mx-auto px-4">
        <div className="flex pt-16  flex-col xl:flex-row items-center">
          {/* Image */}
          {!isMobile && (
          <div className="xl:w-1/2">
            <div className="cta-img">
              <img
                src="/images/about/mobile-img-1.png"
                alt="mobile"
                className="w-full h-auto"
              />
            </div>
          </div>
          )}
          {/* Text Content */}
          <div className="w-full xl:w-1/2 xl:pl-16 mt-8 xl:mt-0">
            <div className="cta-style5">
              <h1 className="text-white text-4xl font-bold mb-4">
                Discover & Connect <br />
                Download the <span className="text-primary">App</span>
              </h1>
              <span className="text-sm text-gray-300 uppercase tracking-widest mb-4 inline-block">
                Live like a local!
              </span>
              <p className={`text-white ${isMobile ? 'w-full' : 'w-1/2'} text-base pb-8`}>
                Book your next stay or experience on the go with the FlapaBay App.
                Browse and book unique accommodations to stay in, whether you're
                traveling by plane, road or anywhere else.
              </p>
              <AppWidget />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
