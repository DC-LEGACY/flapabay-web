
import React from 'react';
import { Leaf, Heart, Award } from 'lucide-react';

const AboutSustainability = () => {
  const initiatives = [
    {
      title: "Eco-Friendly Properties",
      description: "We highlight and promote eco-friendly accommodations that use renewable energy, reduce waste, and conserve water.",
      icon: <Leaf className="h-8 w-8 text-green-500" />
    },
    {
      title: "Community Support",
      description: "A portion of every booking goes toward supporting local community projects and conservation efforts.",
      icon: <Heart className="h-8 w-8 text-pink-500" />
    },
    {
      title: "Responsible Tourism",
      description: "We encourage travelers to respect local cultures, support local businesses, and minimize their environmental footprint.",
      icon: <Award className="h-8 w-8 text-blue-500" />
    }
  ];

  return (
    <section className="py-20 bg-flapabay-yellow">
      <div className="flapabay-container">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Sustainability & Impact</h2>
            <div className="w-16 h-1 bg-black mb-6"></div>
            
            <p className="text-lg text-gray-800 mb-6">
              At FlapaBay, we believe that travel should be a force for good. We're committed to promoting responsible tourism that benefits local communities and protects the environment.
            </p>
            
            <p className="text-lg text-gray-800 mb-8">
              Our platform prioritizes properties and experiences that align with our sustainability values, making it easier for travelers to make environmentally and socially conscious choices.
            </p>
            
            <div className="space-y-6">
              {initiatives.map((initiative, index) => (
                <div key={index} className="flex items-start bg-white/80 p-4 rounded-lg">
                  <div className="mr-4 mt-1">
                    {initiative.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{initiative.title}</h3>
                    <p className="text-gray-700">{initiative.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
                  alt="Eco-friendly accommodation" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb" 
                  alt="Wildlife conservation" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05" 
                  alt="Local community" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86" 
                  alt="Natural landscapes" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSustainability;
