
import React from 'react';
import { motion } from 'framer-motion';

const AboutMilestones = () => {
  const milestones = [
    {
      year: "2018",
      title: "FlapaBay Launches",
      description: "Started with 50 properties across 3 countries"
    },
    {
      year: "2019",
      title: "1,000 Listings Milestone",
      description: "Expanded to 7 countries across East and West Africa"
    },
    {
      year: "2020",
      title: "Virtual Experiences",
      description: "Launched online cultural experiences during global travel restrictions"
    },
    {
      year: "2021",
      title: "Sustainability Initiative",
      description: "Introduced eco-friendly certification for qualifying properties"
    },
    {
      year: "2022",
      title: "African Tourism Award",
      description: "Recognized for innovation in promoting sustainable tourism"
    },
    {
      year: "2023",
      title: "5,000 Listings",
      description: "Present in 15 African countries with over 100,000 satisfied travelers"
    }
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="flapabay-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Milestones & Achievements</h2>
          <div className="w-16 h-1 bg-flapabay-yellow mx-auto mb-6"></div>
          <p className="text-lg text-gray-300">
            Our journey of growth and impact across the African continent
          </p>
        </div>
        
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-700 hidden md:block"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:items-start' : 'md:flex-row-reverse md:items-start'}`}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-800">
                    <div className="text-flapabay-yellow text-xl font-bold mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold mb-2 text-white">{milestone.title}</h3>
                    <p className="text-gray-300">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center justify-center relative w-0">
                  <div className="w-5 h-5 rounded-full bg-flapabay-yellow absolute left-1/2 transform -translate-x-1/2"></div>
                </div>
                
                <div className="md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMilestones;
