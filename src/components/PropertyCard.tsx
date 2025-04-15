
import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export interface PropertyProps {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[]; // Multiple images support
  tags?: string[];
  isSuperhost?: boolean;
  type?: 'stay' | 'experience' | 'event';
  date?: string; // For experiences or events
  duration?: string; // For experiences
  host?: {
    name: string;
    image: string;
    responseRate?: number;
    responseTime?: string;
    isSuperhost?: boolean;
    joinedDate?: string;
    totalReviews?: number;
    languages?: string[];
    verifications?: string[];
  };
  description?: string;
  amenities?: string[];
  houseRules?: string[];
  cancellationPolicy?: string;
  propertyType?: string;
  maxGuests?: number;
  bedrooms?: number;
  beds?: number;
  baths?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
  highlights?: string[];
  reviews?: Array<{
    id: number;
    user: string;
    userImage: string;
    rating: number;
    date: string;
    comment: string;
  }>;
  similarProperties?: number[];
  availableDates?: {
    start: string;
    end: string;
    bookedDates: string[];
  };
  instantBook?: boolean;
}

const PropertyCard: React.FC<PropertyProps> = ({
  id,
  title,
  location,
  price,
  rating,
  reviewCount,
  image,
  images = [],
  tags = [],
  isSuperhost = false,
  type = 'stay',
  date,
  duration,
  host,
  instantBook,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const allImages = images.length > 0 ? images : [image];
  
  // Ensure proper link path based on property type
  const linkPath = type === 'experience' ? `/experience/${id}` : `/property/${id}`;
  
  return (
    <motion.div 
      className="group relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <Link to={linkPath} className="block">
        <div className="relative overflow-hidden rounded-[30px] shadow-lg">
          <div className="aspect-[1/1] overflow-hidden">
            <img
              src={allImages[currentImageIndex]}
              alt={title}
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                isLoaded ? 'image-loaded' : 'image-loading'
              }`}
              onLoad={() => setIsLoaded(true)}
            />
          </div>
          
          <button
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-transform duration-200 hover:scale-110 z-10"
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
            />
          </button>
          
          {isSuperhost && (
            <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-white/80 backdrop-blur-sm text-xs font-medium text-gray-800 z-10">
              Superhost
            </div>
          )}

          {instantBook && (
            <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-[#FFC500]/90 backdrop-blur-sm text-xs font-medium text-black z-10">
              Instant Book
            </div>
          )}

          {type !== 'stay' && date && (
            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-md bg-white/80 backdrop-blur-sm text-xs font-medium text-gray-800 z-10">
              {date}
              {duration && ` · ${duration}`}
            </div>
          )}
        </div>
        
        <div className="mt-3 space-y-1">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-gray-900">{location}</p>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-[#FFC500] mr-1 fill-[#FFC500]" />
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
            </div>
          </div>
          
          <h3 className="text-base font-medium text-gray-700 line-clamp-1">{title}</h3>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 my-1">
              {tags.map((tag, index) => (
                <span key={index} className="text-xs text-gray-500">{tag}{index < tags.length - 1 ? ' · ' : ''}</span>
              ))}
            </div>
          )}
          
          {type === 'experience' && host && (
            <div className="flex items-center gap-2 my-1">
              <img src={host.image} alt={host.name} className="w-6 h-6 rounded-full object-cover" />
              <span className="text-xs text-gray-600">Hosted by {host.name}</span>
            </div>
          )}
          
          <p className="text-base font-semibold mt-1">
            ${price} 
            <span className="text-sm font-normal text-gray-500 ml-1">
              {type === 'stay' ? 'night' : type === 'experience' ? 'person' : 'ticket'}
            </span>
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
