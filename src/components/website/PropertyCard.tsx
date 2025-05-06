import React from 'react';
import { Heart, Star, Location } from 'iconsax-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface PropertyCardProps {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  type: "property";
  host: {
    name: string;
    image: string;
    isSuperhost: boolean;
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  location,
  price,
  rating,
  reviewCount,
  image,
  host,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden group"
    >
      <div className="relative">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-4 right-4 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
        >
          <Heart className="text-gray-700 hover:text-red-500" />
        </motion.button>
        {host.isSuperhost && (
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full"
          >
            Superhost
          </motion.span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Star size={16} className="text-yellow-400" />
          <span className="font-medium">{rating}</span>
          <span className="text-gray-500">·</span>
          <span className="text-gray-500">{reviewCount} reviews</span>
        </div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <div className="flex items-center text-gray-600 mb-3">
          <Location size={16} className="mr-1" />
          <span>{location}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">${price}/mo</span>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              View Details
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
