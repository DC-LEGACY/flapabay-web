import {
  Brush,
  Heart as HeartIcon,
  LampOn,
  Money4,
  ShieldTick
} from "iconsax-react";
import { Coins, Heart, Lightbulb, Palette, Shield } from 'lucide-react';

import React from 'react';

const AboutValues = () => {
  const values = [
    {
      title: "Community",
      description: "We foster genuine connections between hosts and travelers, creating a global community of like-minded individuals.",
      icon: <HeartIcon size="32" color="#FFD700" />
    },
    {
      title: "Trust",
      description: "We build trust through transparency, reliable reviews, and comprehensive safety measures.",
      icon: <ShieldTick size="32" color="#FFD700"/>
    },
    {
      title: "Affordability",
      description: "We believe in providing quality experiences at fair prices, making travel accessible to more people.",
      icon: <Money4 size="32" color="#FFD700"/>
    },
    {
      title: "Cultural Connection",
      description: "We celebrate cultural diversity and facilitate authentic interactions with local traditions and communities.",
      icon: <Brush size="32" color="#FFD700"/>
    },
    {
      title: "Innovation",
      description: "We continuously improve our platform to enhance user experience and meet evolving travel needs.",
      icon: <LampOn size="32" color="#FFD700"/>
    }
  ];


  return (
    <section className="py-20 text-white bg-black">
      <div className="flapabay-container">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">Our Values</h2>
          <div className="w-16 h-1 mx-auto mb-6 bg-flapabay-yellow"></div>
          <p className="text-lg text-gray-300">
            These core principles guide everything we do at FlapaBay, from how we build our platform to how we interact with our community.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <div 
              key={index}
              className="p-6 border border-gray-800 rounded-lg hover-lift bg-gray-900/50 backdrop-blur-sm"
            >
              <div className="mb-4">
                {value.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">{value.title}</h3>
              <p className="text-gray-300">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
