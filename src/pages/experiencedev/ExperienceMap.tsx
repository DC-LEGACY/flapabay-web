
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Map, Navigation, ExternalLink } from 'lucide-react';
import { Button } from '@/ui/button';

interface ExperienceMapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  location: string;
  meetingPoint?: string;
  meetingTime?: string;
  transportOptions?: string[];
}

const ExperienceMap: React.FC<ExperienceMapProps> = ({
  coordinates,
  location,
  meetingPoint,
  meetingTime,
  transportOptions = []
}) => {
  const [expanded, setExpanded] = useState(false);
  
  // Generate a Google Maps link for directions
  const getGoogleMapsLink = () => {
    const { lat, lng } = coordinates;
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };
  
  // Generate Google Maps embed URL
  const getMapEmbedUrl = () => {
    const { lat, lng } = coordinates;
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBn-Z4XMo5USfblO7JB2AfgKFwhIF2H9IA&q=${lat},${lng}&zoom=15`;
  };
  
  return (
    <motion.div 
      className="mt-8 border-b border-gray-200 pb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <h3 className="text-xl font-semibold mb-4">Meeting point</h3>
      
      <div className="bg-gray-100 rounded-2xl overflow-hidden h-[300px] relative group cursor-pointer">
        {/* Interactive Map */}
        <iframe 
          src={getMapEmbedUrl()} 
          className="w-full h-full border-0" 
          loading="lazy"
          title={`Map showing location at ${location}`}
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        
        {/* Pin overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
          <MapPin className="h-8 w-8 text-[#FFC500] filter drop-shadow-lg" />
        </div>
        
        {/* Location label */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
          <p className="font-medium text-gray-800">{location}</p>
        </div>
      </div>
      
      {(meetingPoint || meetingTime || transportOptions.length > 0) && (
        <motion.div 
          className="mt-4 bg-[#FFC500]/10 p-4 rounded-lg border border-[#FFC500]/20"
          initial={expanded ? { height: 'auto' } : { height: 'auto' }}
          animate={expanded ? { height: 'auto' } : { height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium text-gray-800">Meeting location details:</h4>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-xs hover:bg-[#FFC500]/20 p-1 h-auto" 
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Show less' : 'Show more'}
            </Button>
          </div>
          
          {meetingPoint && (
            <div className="flex items-start gap-3 mb-3">
              <MapPin className="h-5 w-5 text-[#FFC500] mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">{meetingPoint}</p>
            </div>
          )}
          
          {meetingTime && (
            <div className="flex items-start gap-3 mb-3 pl-8">
              <p className="text-gray-700 text-sm">
                <span className="font-medium">Meeting time:</span> {meetingTime}
              </p>
            </div>
          )}
          
          {expanded && transportOptions && transportOptions.length > 0 && (
            <div className="mt-3 border-t border-[#FFC500]/20 pt-3">
              <p className="font-medium text-gray-800 mb-2">Getting there:</p>
              <ul className="space-y-2 pl-8">
                {transportOptions.map((option, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-[#FFC500] mr-1">•</span> {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex flex-wrap gap-3 mt-3">
            <a 
              href={getGoogleMapsLink()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-[#FFC500] hover:text-[#e6b000] bg-white px-3 py-2 rounded-md shadow-sm"
            >
              <Navigation className="h-4 w-4 mr-1.5" />
              Get directions
            </a>
            
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 px-3 py-2 rounded-md shadow-sm"
            >
              <ExternalLink className="h-4 w-4 mr-1.5" />
              View larger map
            </a>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ExperienceMap;
