import {
  Calendar1,
  ArrowLeft,
  ArrowRight2,
  Filter,
  Heart,
  Map,
  Search2,
  Star,
  Users,
} from "iconsax-react";
import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";
import { motion, useAnimation } from "framer-motion";

import { Button } from "@/ui/button";
import Hero from "../home/home-v1/hero";
import { Link } from "react-router-dom";
import PropertiesByCategory from "../home/home-v4/PropertiesByCategory";
import PropertyCard from "../experiencedev/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { useScreenSize } from "@/utilis/screenUtils";

const fetchExperiences = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: 101,
      title: "Urban Photography Workshop",
      location: "New York City",
      price: 75,
      rating: 4.8,
      reviewCount: 156,
      image:
        "https://images.unsplash.com/photo-1584661156301-2a5248132334?q=80&w=2070&auto=format&fit=crop",
      type: "experience" as const,
      date: "Available today",
      duration: "3 hours",
      host: {
        name: "Michael K.",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
        isSuperhost: true,
      },
      tags: ["Arts", "Photography", "Small group"],
    },
    // ... rest of mock data remains unchanged
  ];
};

const africanExperiences = [
  // ... rest of mock data remains unchanged
];

const celebrityExperiences = [
  // ... rest of mock data remains unchanged
];

const categoriesWithIcons = [
  { name: "Trending", icon: "🔥" },
  { name: "Arts & Culture", icon: "🎨" },
  { name: "Food & Drink", icon: "🍷" },
  { name: "Nature", icon: "🏞️" },
  { name: "Sports", icon: "🏄‍♂️" },
  { name: "Nightlife", icon: "🌃" },
  { name: "Wellness", icon: "🧘‍♀️" },
  { name: "Tours", icon: "🚶‍♂️" },
  { name: "Classes", icon: "📚" },
  { name: "African", icon: "🌍" },
  { name: "Celebrity", icon: "🌟" },
  { name: "Seasonal", icon: "🍂" },
  { name: "Adventure", icon: "🧗‍♀️" },
  { name: "Photography", icon: "📸" },
  { name: "Music", icon: "🎵" },
  { name: "Cooking", icon: "👨‍🍳" },
  { name: "Crafts", icon: "🧶" },
  { name: "Local", icon: "📍" },
  { name: "Water", icon: "🏊‍♂️" },
  { name: "Virtual", icon: "💻" },
];

const Experiences = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ["experiences"],
    queryFn: fetchExperiences,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Trending");
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [viewedExperiences, setViewedExperiences] = useState<any[]>([]);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (categoryScrollRef.current) {
        if (
          categoryScrollRef.current.scrollLeft +
            categoryScrollRef.current.offsetWidth >=
          categoryScrollRef.current.scrollWidth - 20
        ) {
          categoryScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          categoryScrollRef.current.scrollTo({
            left: categoryScrollRef.current.scrollLeft + 200,
            behavior: "smooth",
          });
        }
      }
    }, 5000);

    return () => clearInterval(scrollInterval);
  }, []);

  const handleCategoryScroll = () => {
    if (categoryScrollRef.current) {
      setShowLeftArrow(categoryScrollRef.current.scrollLeft > 20);
      setShowRightArrow(
        categoryScrollRef.current.scrollLeft +
          categoryScrollRef.current.offsetWidth <
          categoryScrollRef.current.scrollWidth - 20
      );
    }
  };

  useEffect(() => {
    const scrollContainer = categoryScrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleCategoryScroll);
      return () =>
        scrollContainer.removeEventListener("scroll", handleCategoryScroll);
    }
  }, []);

  const scrollCategories = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      categoryScrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      setTimeout(() => {
        const mockCategoryData = [
          ...Array(8)
            .fill(null)
            .map((_, index) => ({
              id: 1000 + index,
              title: `${selectedCategory} Experience ${index + 1}`,
              location: [
                "Miami",
                "New York",
                "Los Angeles",
                "Chicago",
                "San Francisco",
              ][Math.floor(Math.random() * 5)],
              price: Math.floor(Math.random() * 100) + 30,
              rating: (Math.random() * 1.5 + 3.5).toFixed(1),
              reviewCount: Math.floor(Math.random() * 200) + 50,
              image: `https://source.unsplash.com/featured/?${selectedCategory.toLowerCase()},experience&sig=${index}`,
              type: "experience" as const,
              duration: `${Math.floor(Math.random() * 4) + 1} hours`,
              host: {
                name: ["Michael", "Emma", "David", "Sofia", "Alex"][
                  Math.floor(Math.random() * 5)
                ],
                image: `https://source.unsplash.com/featured/?person,portrait&sig=${index}`,
                isSuperhost: Math.random() > 0.5,
              },
              tags: [selectedCategory, "Recommended", "Popular"],
            })),
        ];

        setViewedExperiences(mockCategoryData);
      }, 500);
    }
  }, [selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const isMobile = useScreenSize();

  return (
    <div className="min-h-screen bg-white">
      {/* <DefaultHeader /> */}

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
                        <PropertiesByCategory />
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
                  <PropertiesByCategory />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* <section className="py-8 max-w-6xl mx-auto bg-white">
        <div className="flapabay-container relative">
          {showLeftArrow && (
            <button 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-[#FFC500]/10"
              onClick={() => scrollCategories('left')}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          
          {showRightArrow && (
            <button 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-[#FFC500]/10"
              onClick={() => scrollCategories('right')}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
          
          <div 
            ref={categoryScrollRef}
            className="flex overflow-x-auto gap-4 px-10 py-4 no-scrollbar scroll-smooth"
            onScroll={handleCategoryScroll}
          >
            {categoriesWithIcons.map((category, index) => (
              <motion.div
                key={index}
                className={`flex flex-col items-center space-y-2 flex-shrink-0 cursor-pointer ${
                  selectedCategory === category.name ? 'scale-110' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  selectedCategory === category.name ? 'bg-[#FFC500]' : 'bg-[#FFC500]/10'
                }`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <span className={`text-sm font-medium whitespace-nowrap ${
                  selectedCategory === category.name ? 'font-bold' : ''
                }`}>
                  {category.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {selectedCategory && viewedExperiences.length > 0 && (
        <section className="py-12 max-w-6xl mx-auto bg-white">
          <div className="flapabay-container">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {selectedCategory} Experiences
              </h2>
              <Button
                variant="outline"
                className="border-[#FFC500] hover:bg-[#FFC500]/10 text-black"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {viewedExperiences.map((experience) => (
                <PropertyCard key={experience.id} {...experience} />
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <Button className="bg-[#FFC500] hover:bg-[#e6b000] text-black">
                View More {selectedCategory} Experiences
              </Button>
            </div>
          </div>
        </section>
      )}

      <section className="py-12 bg-gradient-to-r from-[#000] to-[#222] text-white">
        <div className="flapabay-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Meet Your Celebrity Experiences
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Exclusive activities hosted by your favorite celebrities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2xl:grid-cols-4 gap-8">
            {celebrityExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover-lift"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden h-[220px]">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                      <Heart className="h-5 w-5 text-white" />
                    </button>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#FFC500] text-black text-xs font-bold px-3 py-1 rounded-full">
                      Celebrity
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-[#FFC500] fill-[#FFC500]" />
                    <span className="ml-1 text-sm font-medium">
                      {experience.rating}
                    </span>
                    <span className="mx-1 text-gray-400">·</span>
                    <span className="text-sm text-gray-400">
                      {experience.reviewCount} reviews
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-1 text-white">
                    {experience.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    <MapPin className="inline-block h-3 w-3 mr-1" />
                    {experience.location}
                  </p>
                  <div className="flex items-center mt-4">
                    <img
                      src={experience.host.image}
                      alt={experience.host.name}
                      className="h-10 w-10 rounded-full border-2 border-[#FFC500] mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">
                        Hosted by
                      </p>
                      <p className="text-xs text-[#FFC500]">
                        {experience.host.name}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <p className="text-xl font-bold text-white">
                        ${experience.price}
                      </p>
                      <p className="text-xs text-gray-400">per person</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button className="bg-[#FFC500] hover:bg-[#e6b000] text-black px-8 py-6 rounded-lg font-medium text-lg">
              Explore All Celebrity Experiences
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto bg-flapabay-lightGray">
        <div className="flapabay-container">
          <motion.h2
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Popular Experiences
          </motion.h2>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-80 bg-gray-100 rounded-[30px] animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {experiences.map((experience: any) => (
                <PropertyCard key={experience.id} {...experience} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[#FFC500]/20 to-[#FFC500]/5">
        <div className="flapabay-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Explore Africa</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover authentic activities across the beautiful continent of
              Africa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {africanExperiences.map((experience) => (
              <PropertyCard key={experience.id} {...experience} />
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button className="bg-[#FFC500] hover:bg-[#e6b000] text-black px-8 py-6 rounded-lg font-medium text-lg">
              See All African Experiences
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto bg-white">
        <div className="flapabay-container">
          <motion.div
            className="bg-[#FFF8E1] rounded-3xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="order-2 lg:order-1 p-8 lg:p-12 flex flex-col justify-center">
                <span className="bg-[#FFC500] text-black px-3 py-1 rounded-full text-sm font-medium inline-block mb-4 w-fit">
                  Featured Experience
                </span>
                <h2 className="text-3xl font-bold mb-4">
                  Coastal Sunset Sail & Wine Tasting
                </h2>
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 text-[#FFC500] fill-[#FFC500] mr-1" />
                  <span className="font-medium">4.96</span>
                  <span className="text-gray-500 mx-1">·</span>
                  <span className="text-gray-500">312 reviews</span>
                </div>
                <p className="text-gray-600 mb-6 text-lg">
                  Join Captain Maria on her vintage sailboat for a breathtaking
                  sunset cruise along the coast, followed by a guided tasting of
                  local wines paired with artisanal cheeses.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-[#FFC500]/10 px-3 py-1 rounded-full text-sm">
                    2.5 hours
                  </span>
                  <span className="bg-[#FFC500]/10 px-3 py-1 rounded-full text-sm">
                    Up to 8 people
                  </span>
                  <span className="bg-[#FFC500]/10 px-3 py-1 rounded-full text-sm">
                    All equipment provided
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <Button className="bg-[#FFC500] hover:bg-[#e6b000] text-black px-6 py-2 h-12 rounded-lg">
                    Book Now - $129/person
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#FFC500] text-black hover:bg-[#FFC500]/10 h-12 rounded-lg"
                  >
                    <Heart className="mr-2 h-5 w-5" /> Save
                  </Button>
                </div>
              </div>
              <div className="order-1 lg:order-2 h-72 lg:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1534438097545-a2c22c57f2ad?q=80&w=2070&auto=format&fit=crop"
                  alt="Sunset Sail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[#000] to-[#222] text-white">
        <div className="flapabay-container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Share Your Passion with the World
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Create memorable experiences by sharing your expertise, skill, or
              local knowledge with travelers.
            </p>
            <Button className="bg-[#FFC500] hover:bg-[#e6b000] text-black px-8 py-6 rounded-lg font-medium text-lg">
              Become an Experience Host
            </Button>
          </motion.div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default Experiences;
