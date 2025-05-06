import { Heart, Share } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React from 'react';
import { motion } from 'framer-motion';

interface ExperienceHeaderProps {
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  isSuperhost?: boolean;
  category?: string;
}

const ExperienceHeader: React.FC<ExperienceHeaderProps> = ({
  title,
  location,
  rating,
  reviewCount,
  isSuperhost,
  category
}) => {
  return (
    <motion.div 
      className="mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {category && (
        <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary/20">
          {category}
        </Badge>
      )}
      
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Share className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Save</span>
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
        <div className="flex items-center">
          <span className="text-lg font-semibold">{rating}</span>
          <span className="mx-1">·</span>
          <span className="text-gray-600">{reviewCount} reviews</span>
        </div>
        
        {isSuperhost && (
          <>
            <span className="text-gray-400">·</span>
            <span className="px-2 py-1 text-xs font-medium border border-gray-300 rounded-2xl">
              Superhost
            </span>
          </>
        )}
        
        <span className="text-gray-400">·</span>
        <span className="text-gray-600 underline">{location}</span>
      </div>
    </motion.div>
  );
};

export default ExperienceHeader;
