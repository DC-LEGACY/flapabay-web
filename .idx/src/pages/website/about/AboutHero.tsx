import React from 'react';
import { motion } from 'framer-motion';

const AboutHero = () => {
  return (
    <div className="lg:pt-[30rem] lg:pb-0 md:pt-40 sm:py-40 bg-[url('/images/about/womann.PNG')] bg-no-repeat bg-cover bg-left relative w-full overflow-hidden ">
      {/* Hero Image */}
      <div className="absolute inset-0">
        {/* <img 
          src="/images/about/woman.png" 
          alt="FlapaBay hero image" 
          className="object-cover w-full h-full"
        /> */}
        <div className="absolute inset-0 text-white bg-opacity-40" />
      </div>
      
      {/* Hero Content - Positioned to the right */}
      <div className="absolute inset-0 flex items-center justify-center p-4 text-white">
        <div className="max-w-xl mr-12">
          <motion.h1 
            className="pb-6 text-4xl font-bold text-center text-white md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About FlapaBay
          </motion.h1>
          
          <motion.p 
            className="items-center mb-4 text-xl text-center text-white md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover & Connect- 
            <span className="text-xl font-medium text-flapabay-yellow"> Live Like a Local!</span><br/> Connecting travelers with authentic African experiences
          </motion.p>
        
          
         
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
