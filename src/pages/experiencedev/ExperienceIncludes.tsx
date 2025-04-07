
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface ExperienceIncludesProps {
  included: string[];
  notIncluded: string[];
}

const ExperienceIncludes: React.FC<ExperienceIncludesProps> = ({
  included,
  notIncluded
}) => {
  return (
    <motion.div 
      className="mt-8 border-b border-gray-200 pb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <h3 className="text-xl font-semibold mb-6">What's included</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {included.length > 0 && (
          <div>
            <h4 className="text-lg font-medium mb-4">Included</h4>
            <ul className="space-y-3">
              {included.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {notIncluded.length > 0 && (
          <div>
            <h4 className="text-lg font-medium mb-4">Not included</h4>
            <ul className="space-y-3">
              {notIncluded.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                    <X className="h-4 w-4 text-red-600" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ExperienceIncludes;
