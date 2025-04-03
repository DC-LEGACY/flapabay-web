
import React from 'react';
import { motion } from 'framer-motion';

const AboutHero = () => {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/952a1c77-e501-4b8c-a004-db3f13b7e443.png" 
          alt="FlapaBay hero image" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>
      
      {/* Hero Content - Positioned to the right */}
      <div className="absolute inset-0 flex items-center justify-end text-white p-4">
        <div className="max-w-xl mr-12">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            FlapaBay
          </motion.h1>
          
          <motion.p 
            className="text-3xl md:text-4xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover & Connect- 
            <span className="text-flapabay-yellow font-medium"> Live Like a Local</span>
          </motion.p>
          
          <motion.p 
            className="text-2xl md:text-3xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Connecting travelers with authentic African experiences
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="w-32 h-2 bg-flapabay-yellow"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
