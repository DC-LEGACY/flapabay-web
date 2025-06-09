import "swiper/css/bundle";

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
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  Star,
  Users,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/composite/tabs";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import ListingbyCategory from "@/components/ui/ListingbyCategory"
import ExperiencesByCategory from "@/components/common/ExperiencesByCategory";
import { Input } from "@/components/ui/form/input"; 
import { Link } from "react-router-dom";
import MobileMenu from "@/components/common/mobile-menu";
import { Navigation, Mousewheel } from "swiper/modules";
import PropertyCard from "@/components/website/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { useScreenSize } from "@/utilis/screenUtils";

// import categories from "@/data/propertyByCategory";
const classes = [
  {
    name: "Gordon Ramsay",
    title: "Cooking Masterclass",
    price: 311,
    image: "https://your-image-url.com/gordon.jpg",
  },
  {
    name: "Jamie Oliver",
    title: "Italian Cuisine",
    price: 249,
    image: "https://your-image-url.com/jamie.jpg",
  },
  {
    name: "Alice Waters",
    title: "Organic Cooking",
    price: 280,
    image: "https://your-image-url.com/alice.jpg",
  },{
    name: "Alice Waters",
    title: "Organic Cooking",
    price: 280,
    image: "https://your-image-url.com/alice.jpg",
  },{
    name: "Alice Waters",
    title: "Organic Cooking",
    price: 280,
    image: "https://your-image-url.com/alice.jpg",
  },{
    name: "Alice Waters",
    title: "Organic Cooking",
    price: 280,
    image: "https://your-image-url.com/alice.jpg",
  },{
    name: "Alice Waters",
    title: "Organic Cooking",
    price: 280,
    image: "https://your-image-url.com/alice.jpg",
  },{
    name: "Alice Waters",
    title: "Organic Cooking",
    price: 280,
    image: "https://your-image-url.com/alice.jpg",
  },{
    name: "Alice Waters",
    title: "Organic Cooking",
    price: 280,
    image: "https://your-image-url.com/alice.jpg",
  },{
    name: "Alice Waters",
    title: "Organic Cooking",
    price: 280,
    image: "https://your-image-url.com/alice.jpg",
  },
];

// Add type for CookingClassCard props
interface CookingClassCardProps {
  name: string;
  title: string;
  price: number;
  image: string;
}

const CookingClassCard = ({ name, title, price, image }: CookingClassCardProps) => {
  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden h-48">
      <img src={image} alt={title} className="w-full h-2/3 object-cover" />

      <div className="absolute top-4 right-4 bg-white/80 rounded-full p-2">
        <Heart className="text-gray-700 hover:text-red-500" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white p-3">
        <h3 className="text-sm font-semibold">{name}</h3>
        <p className="text-xs mb-2">{title}</p>
        <Button className="bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-yellow-300">
          Book for ${price}
        </Button>
      </div>
    </div>
  );
};

const VerticalCookingClassSlider = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<any>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;

    if (swiper && prevRef.current && nextRef.current) {
      // Assign the navigation refs
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();

      const updateNavState = () => {
        setAtStart(swiper.isBeginning);
        setAtEnd(swiper.isEnd);
      };

      swiper.on("slideChange", updateNavState);
      updateNavState();
    }
  }, []);

  return (
    <div className="h-18 max-w-full mx-auto py-2 px-0 relative">
      <Swiper
        ref={swiperRef}
        direction="horizontal"
        spaceBetween={16}
        mousewheel={true}
        modules={[Navigation, Mousewheel]}
        className="h-full"
        breakpoints={{
          300: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
      >
        {classes.map((cls, index) => (
          <SwiperSlide key={index}>
            <div className="h-full">
              <CookingClassCard {...cls} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        ref={prevRef}
        className={`custom-prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 ${
          atStart ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={atStart}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        ref={nextRef}
        className={`custom-next absolute top-1/2 right-0 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 ${
          atEnd ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={atEnd}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

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

// Add mockExperienceData
const mockExperienceData = [
  {
    id: 1,
    title: "Urban Photography Workshop",
    location: "New York City",
    price: 75,
    rating: 4.8,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1584661156301-2a5248132334?q=80&w=2070&auto=format&fit=crop",
    type: "experience" as const,
    date: "Available today",
    duration: "3 hours",
    host: {
      name: "Michael K.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
      isSuperhost: true,
    },
    tags: ["Arts", "Photography", "Small group"],
  },
  {
    id: 2,
    title: "Wine Tasting Experience",
    location: "Napa Valley",
    price: 120,
    rating: 4.9,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop",
    type: "experience" as const,
    date: "Available tomorrow",
    duration: "4 hours",
    host: {
      name: "Sarah W.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
      isSuperhost: true,
    },
    tags: ["Food & Drink", "Wine", "Luxury"],
  },
  {
    id: 3,
    title: "Hiking Adventure",
    location: "Yosemite National Park",
    price: 65,
    rating: 4.7,
    reviewCount: 234,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop",
    type: "experience" as const,
    date: "Available this weekend",
    duration: "6 hours",
    host: {
      name: "John D.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
      isSuperhost: true,
    },
    tags: ["Outdoor", "Nature", "Adventure"],
  }
];

const africanExperiences = [
  {
    id: 1,
    title: 'Savannah Safari Adventure',
    location: 'Serengeti, Tanzania',
    price: 150,
    rating: 4.8,
    reviewCount: 92,
    image: 'https://source.unsplash.com/featured/?safari,tanzania',
    type: 'experience' as const,
    date: '2025-06-10',
    duration: '5 hours',
    host: {
      name: 'David Kimaro',
      image: 'https://randomuser.me/api/portraits/men/35.jpg',
      isSuperhost: true,
    },
    tags: ['wildlife', 'nature', 'outdoors'],
  },
  {
    id: 'ae-002',
    title: 'Nile River Kayaking',
    location: 'Jinja, Uganda',
    price: 110,
    rating: 4.6,
    reviewCount: 74,
    image: 'https://source.unsplash.com/featured/?kayaking,nile,uganda',
    images: [],
    tags: ['adventure', 'water', 'river'],
    isSuperhost: false,
    type: 'experience',
    date: '2025-05-15',
    duration: '3 hours',
    host: {
      name: 'Esther Achieng',
      image: 'https://randomuser.me/api/portraits/women/20.jpg',
    },
    instantBook: false,
  },
  {
    id: 'ae-003',
    title: 'Cape Town Hiking Trails',
    location: 'Cape Town, South Africa',
    price: 95,
    rating: 4.9,
    reviewCount: 88,
    image: 'https://source.unsplash.com/featured/?hiking,tablemountain',
    images: [
      'https://source.unsplash.com/featured/?trail,hike',
      'https://source.unsplash.com/featured/?capetown,mountains',
    ],
    tags: ['hiking', 'scenic', 'fitness'],
    isSuperhost: true,
    type: 'experience',
    date: '2025-07-01',
    duration: '4 hours',
    host: {
      name: 'Sipho Dlamini',
      image: 'https://randomuser.me/api/portraits/men/50.jpg',
    },
    instantBook: true,
  },
  {
    id: 'ae-004',
    title: 'Traditional Drumming Workshop',
    location: 'Kumasi, Ghana',
    price: 80,
    rating: 4.7,
    reviewCount: 66,
    image: 'https://source.unsplash.com/featured/?drumming,ghana',
    images: [],
    tags: ['music', 'culture', 'interactive'],
    isSuperhost: false,
    type: 'experience',
    date: '2025-06-20',
    duration: '2 hours',
    host: {
      name: 'Kojo Mensah',
      image: 'https://randomuser.me/api/portraits/men/42.jpg',
    },
    instantBook: true,
  },
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
    queryFn: () => mockExperienceData,
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
  const [searchEvent, setsearchEvent] = useState("");
  return (
    <>
      <main className="items-center flex-1">
        {/* Hero Section */}
        <section className="px-0 py-20 pb-10 lg:pt-36 md:pt-16 bg-[linear-gradient(146deg,_#FFE900_22%,_#FF914D_100%)]">
          <div className="flapabay-container">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold pb-4 text-white">
                Unforgettable Experiences
              </h1>
              <p className="text-xl text-white pb-8">
                Discover unique activities hosted by local experts
              </p>

              <form
                onSubmit={handleSearch}
                className="relative max-w-3xl mx-auto pb-2"
              >
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  className="w-full px-4 py-8 border rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#FFC500]"
                  value={searchEvent}
                  onChange={(e) => setsearchEvent(e.target.value)}
                />
                <Button className="ud-btn btn-thm p-2.5 right-3 search-tbn search-btn absolute top-[2rem] transform -translate-y-1/2 bg-[#FFC500] text-white rounded-2xl">
                  <SearchNormal color="white" />
                </Button>
              </form>
            </motion.div>
          </div>
        </section>

        <section className="py-0 pt-0 bg-white">
          <div className="flapabay-container py-0 relative">
            <section className="filtericons py-0">
              <div className="container-fluid container-fluidest">
                <div className="row">
                  <div
                    className="col-lg-12 py-0"
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
          </div>
        </section>
       

        {selectedCategory && viewedExperiences.length > 0 && (
          <section className="py-12 px-0 flex-1 bg-white">
            <div className="flapabay-container">
              <div className="flex justify-between items-center pb-6">
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

              <div className="grid grid-cols-1  md:grid-cols-4 lg:grid-cols-5 gap-6">
                {viewedExperiences.map((experience) => (
                  <PropertyCard key={experience.id} {...experience} />
                ))}
              </div>

              <div className="flex justify-center pt-10">
                <Button className="bg-[#FFC500]fix  hover:bg-[#e6b000] text-white">
                  View More {selectedCategory} Experiences
                </Button>
              </div>
            </div>
          </section>
        )}

        <section className="py-12 bg-gradient-to-r from-[#000] to-[#222] text-white">
          <div className="flapabay-container">
            <motion.div
              className="text-center pb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl text-white font-bold pb-4">
              Meet Your Celebrity Experiences
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Exclusive activities hosted by your favorite celebrities
              </p>
            </motion.div>
     

            <div className="row">
                  <div
                    className="col-lg-12"
                    data-aos="fade-up"
                    data-aos-delay="300">
                    <div className="property-city-slider position-relative">
                      <VerticalCookingClassSlider />
                    </div>
                    </div></div>
                
     
            

            <div className="text-center pt-10">
              <Button className="bg-[#FFC500] hover:bg-[#e6b000] text-white px-8 rounded-2xl font-medium text-lg">
                Explore All Celebrity Experiences
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-flapabay-lightGray">
          <div className="flapabay-container">
            <motion.h2
              className="text-3xl font-bold pb-8"
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
              className="text-center pb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold pb-4">Explore Africa</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover authentic activities across the beautiful continent of
                Africa
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {africanExperiences.map((experience) => (
                <PropertyCard key={experience.id} {...experience} />
              ))}
            </div>

            <div className="flex justify-center pt-12">
              <Button className="bg-[#FFC500] hover:bg-[#e6b000] text-white px-8 rounded-2xl font-medium text-lg">
                See All African Experiences
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
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
                  <span className="bg-[#FFC500] text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-4 w-fit">
                    Featured Experience
                  </span>
                  <h2 className="text-3xl font-bold pb-4">
                    Coastal Sunset Sail & Wine Tasting
                  </h2>
                  <div className="flex items-center pb-2">
                    <Star className="h-5 w-5 text-[#FFC500] fill-[#FFC500] mr-1" />
                    <span className="font-medium">4.96</span>
                    <span className="text-gray-500 mx-1">·</span>
                    <span className="text-gray-500">312 reviews</span>
                  </div>
                  <p className="text-gray-600 pb-6 text-lg">
                    Join Captain Maria on her vintage sailboat for a
                    breathtaking sunset cruise along the coast, followed by a
                    guided tasting of local wines paired with artisanal cheeses.
                  </p>
                  <div className="flex flex-wrap gap-2 pb-6">
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
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button className="bg-[#FFC500] hover:bg-[#e6b000] text-white px-6 h-12 rounded-2xl">
                      Book Now - $129/person
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#FFC500] text-black hover:bg-[#FFC500]/10 h-12 rounded-2xl"
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
              <h2 className="text-3xl text-white font-bold pb-4">
                Share Your Passion with the World
              </h2>
              <p className="text-lg text-white pb-8">
                Create memorable experiences by sharing your expertise, skill,
                or local knowledge with travelers.
              </p>
              <Button className="bg-flapabay-yellow hover:bg-[#e6b000] text-white px-8 rounded-2xl font-medium text-lg">
                Become an Experience Host
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Experiences;
