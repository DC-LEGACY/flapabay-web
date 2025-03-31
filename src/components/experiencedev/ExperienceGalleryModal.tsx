
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/ui/button';


interface ExperienceGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title: string;
}

const ExperienceGalleryModal: React.FC<ExperienceGalleryModalProps> = ({
  isOpen,
  onClose,
  images,
  title
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex flex-col"
        >
          <div className="p-4 flex justify-between items-center text-white">
            <h2 className="text-xl font-semibold">{title}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex-1 flex flex-col md:flex-row">
            {/* Main large image */}
            <div className="flex-1 flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img 
                    src={images[currentImageIndex]} 
                    alt={`${title} - Image ${currentImageIndex + 1}`}
                    className="max-h-[80vh] max-w-full object-contain"
                  />
                </motion.div>
              </AnimatePresence>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 text-white bg-black/30 rounded-full hover:bg-black/50"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 text-white bg-black/30 rounded-full hover:bg-black/50"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
            
            {/* Thumbnails sidebar */}
            <div className="w-full md:w-28 lg:w-32 p-2 md:p-4 overflow-y-auto flex flex-row md:flex-col gap-2">
              {images.map((img, index) => (
                <div 
                  key={index}
                  className={`relative cursor-pointer transition-all duration-200 ${
                    currentImageIndex === index 
                      ? 'ring-2 ring-white' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img 
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-20 md:w-full md:h-24 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 text-white">
            <p>{currentImageIndex + 1} / {images.length}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExperienceGalleryModal;
