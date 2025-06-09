import React, { useEffect, useState } from 'react';
import { getExperienceById, getSimilarExperiences } from '@/datatwo/experiences';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExperienceContent from './ExperienceContent';
import ExperienceGalleryModal from '../experiencedev/ExperienceGalleryModal';
import { motion } from 'framer-motion';

const ExperienceContainer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<any>(null);
  const [similarExperiences, setSimilarExperiences] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  
  useEffect(() => {
    if (id) {
      const experienceId = parseInt(id);
      const foundExperience = getExperienceById(experienceId);
      
      if (foundExperience) {
        setExperience(foundExperience);
        const similar = getSimilarExperiences(experienceId);
        setSimilarExperiences(similar as any[]);
      }
      
      setIsLoading(false);
    }
  }, [id]);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const openGallery = () => {
    setIsGalleryOpen(true);
  };
  
  const closeGallery = () => {
    setIsGalleryOpen(false);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce loading-dot"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce loading-dot"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce loading-dot"></div>
        </div>
      </div>
    );
  }
  
  if (!experience) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* <DefaultHeader /> */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <h1 className="text-3xl font-bold mb-4">Experience Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, the experience you're looking for doesn't exist or has been removed.</p>
          <Button onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* <DefaultHeader /> */}
      
      <main className="flex-1">
        <div className="flapabay-container py-6">
          {/* Back button */}
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="mb-4 pl-0"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to experiences
          </Button>
          
          <ExperienceContent 
            experience={experience} 
            similarExperiences={similarExperiences} 
            openGallery={openGallery} 
          />
          
          {/* Experience Gallery Modal */}
          <ExperienceGalleryModal 
            isOpen={isGalleryOpen}
            onClose={closeGallery}
            images={experience.images || [experience.image]}
            title={experience.title}
          />
        </div>
      </main>
      
      {/* <Footer /> */}
    </div>
  );
};

export default ExperienceContainer;
