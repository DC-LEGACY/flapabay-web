import {
  Briefcase as BriefcaseIcon,
  Calendar as CalendarIcon,
  Global,
  Home2,
  People,
} from "iconsax-react";
import { Globe, Home, Users } from 'lucide-react';

import React from 'react';

const AboutMission = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="flapabay-container">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="pb-6 text-3xl font-bold md:text-4xl">Our Mission & Vision</h2>
          <p className="text-lg text-black">
            We're on a mission to transform how people experience Africa, by connecting travelers with authentic stays and experiences while empowering local hosts and communities.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-8 bg-white rounded-lg shadow-sm hover-lift">
            <div className="flex items-center justify-center mb-6 rounded-full w-14 h-14 bg-flapabay-yellow/20">
              <Home2 className="w-7 h-7 text-flapabay-black" />
            </div>
            <h3 className="mb-4 text-xl font-bold">Empowering Hosts</h3>
            <p className="text-black">
              We provide local hosts with the tools, support and platform to showcase their unique properties and build sustainable businesses.
            </p>
          </div>
          
          <div className="p-8 bg-white rounded-lg shadow-sm hover-lift">
            <div className="flex items-center justify-center mb-6 rounded-full w-14 h-14 bg-flapabay-yellow/20">
              <People className="w-7 h-7 text-flapabay-black" />
            </div>
            <h3 className="mb-4 text-xl font-bold">Accessible Travel</h3>
            <p className="text-black">
              We're committed to making travel more accessible and inclusive, offering a diverse range of accommodations for every budget and preference.
            </p>
          </div>
          
          <div className="p-8 bg-white rounded-lg shadow-sm hover-lift">
            <div className="flex items-center justify-center mb-6 rounded-full w-14 h-14 bg-flapabay-yellow/20">
              <Global className="w-7 h-7 text-flapabay-black" />
            </div>
            <h3 className="mb-4 text-xl font-bold">Authentic Experiences</h3>
            <p className="text-black">
              We curate genuine African experiences that foster cultural exchange and create lasting connections between travelers and local communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
