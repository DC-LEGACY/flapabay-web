import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import PropertyCard from "@/components/website/PropertyCard";
import { useScreenSize } from "@/utilis/screenUtils";
import {
  Heart,
  SearchNormal,
  Filter,
  Star,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Users,
} from "iconsax-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css/bundle";

// Types
interface Experience {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  type: "experience";
  date: string;
  duration: string;
  host: {
    name: string;
    image: string;
    isSuperhost: boolean;
  };
  tags: string[];
}

interface Category {
  id: number;
  name: string;
  icon: React.ElementType;
  propertyCount: number;
}

// Mock Data
const mockExperienceData: Experience[] = [
  {
    id: 1,
    title: "Urban Photography Workshop",
    location: "New York City",
    price: 75,
    rating: 4.8,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1584661156301-2a5248132334?q=80&w=2070&auto=format&fit=crop",
    type: "experience",
    date: "Available today",
    duration: "3 hours",
    host: {
      name: "Michael K.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
      isSuperhost: true,
    },
    tags: ["Arts", "Photography", "Small group"],
  },
  // Add more mock experiences here
];

const categories: Category[] = [
  {
    id: 1,
    name: "Trending",
    icon: Star,
    propertyCount: 12,
  },
  {
    id: 2,
    name: "Arts & Culture",
    icon: Heart,
    propertyCount: 12,
  },
  // Add more categories here
];

const Experiences = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Trending");
  const { isMobile } = useScreenSize();

  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ["experiences"],
    queryFn: () => mockExperienceData,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-yellow-400 to-orange-500 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Discover Unforgettable Experiences
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Find and book unique activities hosted by local experts
            </p>
            <div className="relative max-w-3xl mx-auto">
              <Input
                type="text"
                placeholder="Search experiences..."
                className="w-full px-6 py-4 rounded-full shadow-lg text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white rounded-full p-3 hover:bg-gray-800">
                <SearchNormal size={24} />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Browse by Category</h2>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={20} />
              Filters
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`p-4 rounded-xl text-center transition-all ${
                  selectedCategory === category.name
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <category.icon
                  size={24}
                  className="mx-auto mb-2"
                  variant="Bold"
                />
                <span className="block text-sm font-medium">{category.name}</span>
                <span className="text-xs text-gray-500">
                  {category.propertyCount} experiences
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-200" />
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))
            ) : (
              experiences.map((experience) => (
                <PropertyCard key={experience.id} {...experience} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Hosts Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Meet Our Featured Hosts</h2>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            navigation
            mousewheel
            modules={[Navigation, Mousewheel]}
            className="pb-12"
          >
            {experiences.map((experience) => (
              <SwiperSlide key={experience.id}>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="relative">
                    <img
                      src={experience.host.image}
                      alt={experience.host.name}
                      className="w-full h-48 object-cover"
                    />
                    {experience.host.isSuperhost && (
                      <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                        Superhost
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{experience.host.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {experience.title}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star size={16} className="text-yellow-400 mr-1" />
                      <span>{experience.rating}</span>
                      <span className="mx-1">·</span>
                      <span>{experience.reviewCount} reviews</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Share Your Passion with the World
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Create memorable experiences by sharing your expertise, skill, or local
            knowledge with travelers.
          </p>
          <Button className="bg-black text-white px-8 py-3 rounded-full text-lg hover:bg-gray-800">
            Become an Experience Host
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Experiences; 