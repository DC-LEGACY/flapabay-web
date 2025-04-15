import { Award, Heart, Leaf } from 'lucide-react';

import React from 'react';

const AboutSustainability = () => {
  const initiatives = [
    {
      title: "Eco-Friendly Properties",
      description: "We highlight and promote eco-friendly accommodations that use renewable energy, reduce waste, and conserve water.",
      icon: <Leaf className="w-8 h-8 text-flapabay-yellow" />
    },
    {
      title: "Community Support",
      description: "A portion of every booking goes toward supporting local community projects and conservation efforts.",
      icon: <Heart className="w-8 h-8 text-flapabay-yellow" />
    },
    {
      title: "Responsible Tourism",
      description: "We encourage travelers to respect local cultures, support local businesses, and minimize their environmental footprint.",
      icon: <Award className="w-8 h-8 text-flapabay-yellow" />
    }
  ];

  return (
    <section className="py-20 bg-flapabay-yellow">
      <div className="flapabay-container">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="lg:w-1/2">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Sustainability & Impact</h2>
            
            
            <p className="mb-6 text-lg text-gray-800">
              At FlapaBay, we believe that travel should be a force for good. We're committed to promoting responsible tourism that benefits local communities and protects the environment.
            </p>
            
            <p className="mb-8 text-lg text-gray-800">
              Our platform prioritizes properties and experiences that align with our sustainability values, making it easier for travelers to make environmentally and socially conscious choices.
            </p>
            
            <div className="space-y-6">
              {initiatives.map((initiative, index) => (
                <div key={index} className="flex items-start p-4 bg-white rounded-lg">
                  <div className="mt-1 mr-4">
                    {initiative.icon}
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold">{initiative.title}</h3>
                    <p className="text-black">{initiative.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-lg aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
                  alt="Eco-friendly accommodation" 
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-lg aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb" 
                  alt="Wildlife conservation" 
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-lg aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05" 
                  alt="Local community" 
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-lg aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86" 
                  alt="Natural landscapes" 
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
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
