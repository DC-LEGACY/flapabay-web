import categories, { Category } from "@/data/propertyByCategory"
import Cta from "@/components/home/home-v6/Cta";
import Hero from "@/components/home/home-v1/hero";
import MetaData from "@/components/common/MetaData";
import ListingbyCategory from "@/components/ui/ListingbyCategory";
import { useScreenSize } from "@/utilis/screenUtils";

import {
  BagHappy,
  Book,
  Building,
  ChartCircle,
  Courthouse,
  Heart,
  Icon,
  People,
  SafeHome,
  SearchNormal,
  Tree,
  Wind,
} from "iconsax-react";
import { motion } from "framer-motion"


const Home_V1 = () => {
  
  const isMobile = useScreenSize();

  // Error handling for categories
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>Error: Categories data not loaded.</div>;
  }

  return (
    <>
      
      <section className="home-banner-style1 p0">
        <div className="home-style1">
          <div className="container-fluid container-fluidest">
            <div className="row">
              <div className="mx-auto col-xl-10">
                <Hero />
              </div>
            </div>
            {isMobile && (
              <section className="filtericons">
                <div className="">
                  <div className="row">
                    <motion.section
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="w-full p-0"
                    >
                      <div className="relative w-full p-0">
                        <ListingbyCategory categories={categories} />
                      </div>
                    </motion.section>
                  </div>
                </div>
              </section>
            )}
          </div>

          <a href="#explore-property">
            <div className="mouse_scroll animate-up-4">
              <img src="/images/about/home-scroll.png" alt="scroll image" />
            </div>
          </a>
        </div>
      </section>
      {!isMobile && (
        <section className="filtericons">
          <div className="container-fluid  container-fluidest">
            <div className="row">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full p-0"
              >
                <div className="relative w-full">
                  <ListingbyCategory categories={categories} />
                </div>
              </motion.section>
            </div>
          </div>
        </section>
      )}
      {/* End Home Banner Style V1 */}

      {/* Explore Apartment */}
      <section id="explore-property" className="pb90 pb30-md somesections">
        {/* Popular Property */}
        {/* <PropertyByCitiesWrapper showCircularIcons={false} /> */}
        {/* Popular Property */}
      </section>
      {/* End Explore Apartment */}

      {/* Our CTA */}
      <Cta />


    </>
  );
};

export default Home_V1;
