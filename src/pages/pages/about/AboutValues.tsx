
import React from 'react';
import { Heart, Shield, Coins, Palette, Lightbulb } from 'lucide-react';

const AboutValues = () => {
  const values = [
    {
      title: "Community",
      description: "We foster genuine connections between hosts and travelers, creating a global community of like-minded individuals.",
      icon: <Heart className="h-8 w-8 text-flapabay-yellow" />
    },
    {
      title: "Trust",
      description: "We build trust through transparency, reliable reviews, and comprehensive safety measures.",
      icon: <Shield className="h-8 w-8 text-flapabay-yellow" />
    },
    {
      title: "Affordability",
      description: "We believe in providing quality experiences at fair prices, making travel accessible to more people.",
      icon: <Coins className="h-8 w-8 text-flapabay-yellow" />
    },
    {
      title: "Cultural Connection",
      description: "We celebrate cultural diversity and facilitate authentic interactions with local traditions and communities.",
      icon: <Palette className="h-8 w-8 text-flapabay-yellow" />
    },
    {
      title: "Innovation",
      description: "We continuously improve our platform to enhance user experience and meet evolving travel needs.",
      icon: <Lightbulb className="h-8 w-8 text-flapabay-yellow" />
    }
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="flapabay-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
          <div className="w-16 h-1 bg-flapabay-yellow mx-auto mb-6"></div>
          <p className="text-lg text-gray-300">
            These core principles guide everything we do at FlapaBay, from how we build our platform to how we interact with our community.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="p-6 border border-gray-800 rounded-lg hover-lift bg-gray-900/50 backdrop-blur-sm"
            >
              <div className="mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
              <p className="text-gray-300">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
