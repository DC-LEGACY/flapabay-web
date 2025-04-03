
import React from 'react';
import { motion } from 'framer-motion';

const AboutStory = () => {
  return (
    <section className="py-20 bg-flapabay-yellow">
      <div className="flapabay-container">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <motion.div 
              className="relative"
              whileInView={{ scale: 1, opacity: 1 }}
              initial={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img 
                src="/lovable-uploads/f77c0e1a-b334-40f9-bdae-c148d52c1407.png" 
                alt="FlapaBay's story" 
                className="rounded-lg shadow-lg w-full h-auto object-cover" 
              />
              <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-black rounded-lg -z-10"></div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Our Story</h2>
            <div className="w-16 h-1 bg-black mb-6"></div>
            
            <p className="text-lg text-gray-800 mb-6">
              FlapaBay was born from a simple idea: to connect travelers with authentic African experiences while empowering local communities. Our founders, avid travelers themselves, noticed a gap in the market for quality accommodations that truly represented the spirit of African hospitality.
            </p>
            
            <p className="text-lg text-gray-800 mb-6">
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
