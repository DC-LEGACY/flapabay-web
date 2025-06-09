import React from 'react';
import { motion } from 'framer-motion';

const AboutStory = () => {
  return (
    <section className="py-20 bg-flapabay-yellow">
      <div className="flapabay-container">
      <h1 className="pb-12 text-3xl font-bold text-center text-black md:text-3xl">
              Our Story
            </h1>
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="lg:w-1/2">
            <motion.div 
              className="relative"
              whileInView={{ scale: 1, opacity: 1 }}
              initial={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img 
                src="/images/about/f77c0e1a-b334-40f9-bdae-c148d52c1407.png" 
                alt="FlapaBay's story" 
                className="object-cover w-full h-full shadow-lg rounded-2xl" 
              />
              <div className="absolute w-full h-full bg-black rounded-lg -bottom-5 -right-5 -z-10"></div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2">
            {/* <h2 className="mb-6 text-3xl font-bold text-black md:text-4xl">Our Story</h2> */}
            <h1 className="pb-2 text-xl font-semibold text-left text-black md:text-2xl">
              How it all Started
            </h1>
            
            <p className="mb-6 text-lg text-gray-800">
              FlapaBay was born from a simple idea: to connect travelers with authentic African experiences while empowering local communities. Our founders, avid travelers themselves, noticed a gap in the market for quality accommodations that truly represented the spirit of African hospitality.
            </p>
            
            <p className="mb-6 text-lg text-gray-800">
              In 2018, we launched with just 50 listings across 3 countries. Today, we've grown to over 5,000 carefully curated properties spanning 15 African countries, from cozy urban apartments to breathtaking safari lodges.
            </p>
            
            <p className="text-lg text-gray-800">
              Our journey has been about more than just providing places to stay. We've created a platform that celebrates cultural exchange, supports local entrepreneurs, and makes exploring the beauty and diversity of Africa accessible to everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
