
import React from 'react';
import { Globe, Users, Home } from 'lucide-react';

const AboutMission = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="flapabay-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission & Vision</h2>
          <div className="w-16 h-1 bg-flapabay-yellow mx-auto mb-6"></div>
          <p className="text-lg text-gray-700">
            We're on a mission to transform how people experience Africa, by connecting travelers with authentic stays and experiences while empowering local hosts and communities.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm hover-lift">
            <div className="w-14 h-14 bg-flapabay-yellow/20 rounded-full flex items-center justify-center mb-6">
              <Home className="w-7 h-7 text-flapabay-black" />
            </div>
            <h3 className="text-xl font-bold mb-4">Empowering Hosts</h3>
            <p className="text-gray-700">
              We provide local hosts with the tools, support and platform to showcase their unique properties and build sustainable businesses.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm hover-lift">
            <div className="w-14 h-14 bg-flapabay-yellow/20 rounded-full flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-flapabay-black" />
            </div>
            <h3 className="text-xl font-bold mb-4">Accessible Travel</h3>
            <p className="text-gray-700">
              We're committed to making travel more accessible and inclusive, offering a diverse range of accommodations for every budget and preference.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm hover-lift">
            <div className="w-14 h-14 bg-flapabay-yellow/20 rounded-full flex items-center justify-center mb-6">
              <Globe className="w-7 h-7 text-flapabay-black" />
            </div>
            <h3 className="text-xl font-bold mb-4">Authentic Experiences</h3>
            <p className="text-gray-700">
              We curate genuine African experiences that foster cultural exchange and create lasting connections between travelers and local communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
