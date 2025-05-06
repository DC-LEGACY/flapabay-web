
import React from 'react';
import { motion } from 'framer-motion';
import PropertyCard, { PropertyProps } from './PropertyCard';

interface ExperienceSimilarProps {
  experiences: PropertyProps[];
}

const ExperienceSimilar: React.FC<ExperienceSimilarProps> = ({ experiences }) => {
  if (!experiences || experiences.length === 0) return null;
  
  return (
    <motion.div 
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.6 }}
    >
      <h3 className="text-xl font-semibold mb-6">Similar experiences you may like</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {experiences.map(experience => (
          <PropertyCard key={experience.id} {...experience} type="experience" />
        ))}
      </div>
    </motion.div>
  );
};

export default ExperienceSimilar;
