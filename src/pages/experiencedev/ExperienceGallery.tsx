
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, Grid3X3, Play } from 'lucide-react';
import { Button } from '@/ui/button';


interface ExperienceGalleryProps {
  images: string[];
  title: string;
  onOpenFullGallery: () => void;
  video?: string;
}

const ExperienceGallery: React.FC<ExperienceGalleryProps> = ({ 
  images, 
  title,
  onOpenFullGallery,
  video
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  if (!images.length) return null;

  return (
    <div className="relative w-full h-[70vh] overflow-hidden rounded-3xl bg-gray-100">
      {/* Main Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <img 
            src={images[currentImageIndex]} 
            alt={`${title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Play button overlay for video */}
          {video && currentImageIndex === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button 
                size="icon"
                className="w-16 h-16 rounded-full bg-black/50 text-white hover:bg-primary hover:scale-110 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle video play logic
                }}
                aria-label="Play video"
              >
                <Play className="h-8 w-8 fill-white" />
              </Button>
            </div>
          )}
          
          {/* Navigation overlay (only on hover) */}
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
            <Button 
              onClick={handlePrevImage}
              size="icon"
              variant="secondary" 
              className="rounded-full shadow-lg bg-white/80 text-gray-800 hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button 
              onClick={handleNextImage}
              size="icon"
              variant="secondary" 
              className="rounded-full shadow-lg bg-white/80 text-gray-800 hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Image counter */}
      <div className="absolute bottom-4 left-4 bg-black/60 text-white px-2 py-1 rounded-md text-sm">
        {currentImageIndex + 1} / {images.length}
      </div>
      
      {/* Gallery actions */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button 
          onClick={onOpenFullGallery}
          variant="secondary" 
          size="sm"
          className="shadow-lg bg-white/80 text-gray-800 hover:bg-white"
        >
          <Grid3X3 className="h-4 w-4 mr-2" />
          Show all photos
        </Button>
        
        <Button 
          onClick={onOpenFullGallery}
          variant="secondary" 
          size="icon"
          className="shadow-lg bg-white/80 text-gray-800 hover:bg-white"
          aria-label="View in fullscreen"
        >
          <Expand className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ExperienceGallery;
