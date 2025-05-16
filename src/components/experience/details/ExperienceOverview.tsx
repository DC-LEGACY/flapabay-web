
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Globe, AlertCircle, Award } from 'lucide-react';

interface ExperienceOverviewProps {
  duration: string;
  groupSize: number;
  languages?: string[];
  ageRestriction?: string;
  skillLevel?: string;
  host?: {
    name: string;
    image: string;
  };
}

const ExperienceOverview: React.FC<ExperienceOverviewProps> = ({
  duration,
  groupSize,
  languages = ['English'],
  ageRestriction = 'All ages welcome',
  skillLevel = 'All skill levels',
  host
}) => {
  return (
    <motion.div 
      className="mt-6 border-b border-gray-200 pb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock className="h-5 w-5 text-flapabay-yellow" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-medium">{duration}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-flapabay-yellow" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Group size</p>
            <p className="font-medium">Up to {groupSize} people</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Globe className="h-5 w-5 text-flapabay-yellow" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Languages</p>
            <p className="font-medium">{languages.join(', ')}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            {skillLevel === 'All skill levels' ? (
              <Award className="h-5 w-5 text-flapabay-yellow" />
            ) : (
              <AlertCircle className="h-5 w-5 text-flapabay-yellow" />
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500">Skill level</p>
            <p className="font-medium">{skillLevel}</p>
          </div>
        </div>
      </div>
      
      {/* Host quick preview - small version */}
      {host && (
        <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
          <img 
            src={host.image} 
            alt={host.name}
            className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-primary"
          />
          <div>
            <p className="text-sm text-gray-500">Hosted by</p>
            <p className="font-medium">{host.name}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ExperienceOverview;
