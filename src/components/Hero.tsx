
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CategoryProperties from './CategoryProperties';

const Hero = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const categories = [
    { icon: "🏠", label: "Apartments" },
    { icon: "🏕️", label: "Experiences" },
    { icon: "🎪", label: "Events" },
    { icon: "🏞️", label: "National Parks" },
    { icon: "🏝️", label: "Islands" },
    { icon: "🏡", label: "Bungalows" },
    { icon: "🏕️", label: "Cabins" },
    { icon: "🏘️", label: "Entire Home" },
    { icon: "🚪", label: "Private Room" },
    { icon: "🌊", label: "Beach Front" },
    { icon: "🏊", label: "With Pool" }
  ];
  
  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('category-scroll-container');
    if (container) {
      const scrollAmount = 300;
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      
      setScrollPosition(newPosition);
    }
  };
  
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };
  
  return (
    <>
      <section className="relative bg-[#FFC500]">
        <div className="flapabay-container mx-auto pt-24 pb-6">
          <div className="w-full max-w-6xl mx-auto">
            {/* Search Form Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              {/* Tabs Navigation */}
              <Tabs defaultValue="explore" className="w-full">
                <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-6 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger value="explore" className="text-base font-medium rounded-md">Explore</TabsTrigger>
                  <TabsTrigger value="experiences" className="text-base font-medium rounded-md">Experiences</TabsTrigger>
                </TabsList>
                
                <TabsContent value="explore">
                  {/* Search Form */}
                  <div className="w-full">
                    <h2 className="text-xl font-semibold mb-4">Where to?</h2>
                    <SearchBar />
                  </div>
                </TabsContent>
                
                <TabsContent value="experiences">
                  {/* Experiences Search Form */}
                  <div className="w-full">
                    <h2 className="text-xl font-semibold mb-4">Find experiences</h2>
                    <SearchBar />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* White background section for categories */}
        <div className="bg-white pt-8 pb-6">
          <div className="flapabay-container mx-auto">
            {/* Property Type Icons */}
            <div className="w-full overflow-hidden relative">
              {/* Left Arrow */}
              <button 
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md"
                onClick={() => handleScroll('left')}
              >
                <motion.div 
                  whileHover={{ x: -2 }}
                  className="w-6 h-6 flex items-center justify-center"
                >
                  <ChevronLeft className="h-5 w-5" />
                </motion.div>
              </button>
              
              {/* Right Arrow */}
              <button 
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md"
                onClick={() => handleScroll('right')}
              >
                <motion.div 
                  whileHover={{ x: 2 }}
                  className="w-6 h-6 flex items-center justify-center"
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.div>
              </button>
              
              {/* Categories Carousel */}
              <div 
                id="category-scroll-container"
                className="flex space-x-8 px-12 overflow-x-auto no-scrollbar py-2"
              >
                {categories.map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex flex-col items-center space-y-2 flex-shrink-0 cursor-pointer transition-all duration-300 ${
                      selectedCategory === item.label ? 'scale-110' : ''
                    }`}
                    onClick={() => handleCategoryClick(item.label)}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm border transition-all ${
                      selectedCategory === item.label 
                        ? 'bg-[#FFC500] border-[#FFC500]' 
                        : 'bg-white border-gray-100'
                    }`}>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <span className={`text-sm font-medium whitespace-nowrap ${
                      selectedCategory === item.label ? 'text-[#FFC500]' : 'text-black'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Property Listings Section */}
      <CategoryProperties selectedCategory={selectedCategory} />
    </>
  );
};

export default Hero;
