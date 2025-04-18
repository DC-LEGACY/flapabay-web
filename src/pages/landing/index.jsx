// import categories from "@/data/propertyByCategory"
import Cta from "@/components/home/home-v6/Cta";
import Footer from "@/components/common/default-footer";
import Header from "@/components/common/DefaultHeader";
import Hero from "@/components/home/home-v1/hero";
import MetaData from "@/components/common/MetaData";
import MobileMenu from "../../components/common/mobile-menu";
import ListingbyCategory from "@/components/ui/ListingbyCategory";
import PropertyByCitiesWrapper from "@/components/home/home-v3/PropertyByCitiesWrapper";
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
const metaInformation = {
  title: "Home || flapabay - Real Estate ReactJS Template",
};


const Home_V1 = () => {
  const isMobile = useScreenSize();
  const categories = [
    {
      id: 1,
      name: "Trending",
      icon: ChartCircle,
      propertyCount: 12,
    },
    {
      id: 2,
      name: "Arts & Culture",
      icon: Courthouse,
      propertyCount: 12,
    },
    {
      id: 3,
      name: "Food & Drink",
      icon: BagHappy,
      propertyCount: 12,
    },
    {
      id: 4,
      name: "Nature",
      icon: Tree,
      propertyCount: 12,
    },
    {
      id: 5,
      name: "Sports",
      icon: Wind,
      propertyCount: 12,
    },
    {
      id: 6,
      name: "Nightlife",
      icon: Building,
      propertyCount: 12,
    },
    {
      id: 7,
      name: "Wellness",
      icon: SafeHome,
      propertyCount: 12,
    },
    {
      id: 8,
      name: "Tours",
      icon: People,
      propertyCount: 12,
    },
    {
      id: 9,
      name: "Classes",
      icon: Book,
      propertyCount: 12,
    },
    {
      id: 10,
      name: "African",
      icon: BagHappy,
      propertyCount: 12,
    },
    {
      id: 11,
      name: "Celebrity",
      icon: Icon,
      propertyCount: 12,
    },
    {
      id: 12,
      name: "Seasonal",
      icon: Tree,
      propertyCount: 12,
    },
    {
      id: 13,
      name: "Adventure",
      icon: Wind,
      propertyCount: 12,
    },
    {
      id: 14,
      name: "Photography",
      icon: Icon,
      propertyCount: 12,
    },
    {
      id: 15,
      name: "Music",
      icon: ChartCircle,
      propertyCount: 12,
    },
    {
      id: 16,
      name: "Cooking",
      icon: BagHappy,
      propertyCount: 12,
    },
    {
      id: 17,
      name: "Crafts",
      icon: Icon,
      propertyCount: 12,
    },
    {
      id: 18,
      name: "Local",
      icon: People,
      propertyCount: 12,
    },
    {
      id: 19,
      name: "Water",
      icon: Wind,
      propertyCount: 12,
    },
    {
      id: 20,
      name: "Virtual",
      icon: Icon,
      propertyCount: 12,
    },
  ];
  return (
    <>
      <MetaData meta={metaInformation} />

      <Header />

      <MobileMenu />

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
                    <div
                      className="col-lg-12"
                      data-aos="fade-up"
                      data-aos-delay="300"
                    >
                      <div className="property-city-slider position-relative">
                        <ListingbyCategory categories={categories}/>
                      </div>
                    </div>
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
          <div className="container-fluid container-fluidest">
            <div className="row">
              <div
                className="col-lg-12"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="property-city-slider position-relative">
                  <ListingbyCategory categories={categories} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* End Home Banner Style V1 */}

      {/* Explore Apartment */}
      <section id="explore-property" className="pb90 pb30-md somesections">
        {/* Popular Property */}
        <PropertyByCitiesWrapper showCircularIcons={false} />
        {/* Popular Property */}
      </section>
      {/* End Explore Apartment */}

      {/* Our CTA */}
      <Cta />

      {/* End Our CTA */}
      {/* Start Our Footer */}
      <section className="pb-0 footer-style1 pt60">
        <Footer />
      </section>

      {/* End Our Footer */}
    </>
  );
};

export default Home_V1;
