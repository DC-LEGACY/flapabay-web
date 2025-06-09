import React from 'react';
import ExperienceGallery from '../experiencedev/ExperienceGallery';
import ExperienceHeader from '../experiencedev/ExperienceHeader';
import ExperienceOverview from '../experiencedev/ExperienceOverview';
import ExperienceDescription from '../experiencedev/ExperienceDescription';
import ExperienceIncludes from '../experiencedev/ExperienceIncludes';
import ExperienceHost from '../experiencedev/ExperienceHost';
import ExperienceReviews from '../experiencedev/ExperienceReviews';
import ExperienceMap from '../experiencedev/ExperienceMap';
import ExperienceSupport from '../experiencedev/ExperienceSupport';
import ExperienceBooking from '../experiencedev/ExperienceBooking';
import ExperienceSimilar from '../experiencedev/ExperienceSimilar'; // Ensure this is imported

interface ExperienceContentProps {
  experience?: any;  // Optional to prevent errors
  similarExperiences?: any[];
  openGallery: () => void;
}

const ExperienceContent: React.FC<ExperienceContentProps> = ({ 
  experience = {}, // Default value
  similarExperiences = [], 
  openGallery 
}) => {

  // Prevent errors if experience is undefined
  if (!experience || Object.keys(experience).length === 0) {
    return <p>Loading experience details...</p>;
  }

  return (
    <>
      {/* Experience Gallery */}
      <ExperienceGallery 
        images={experience?.images || [experience?.image]} 
        title={experience?.title || "No Title"}
        onOpenFullGallery={openGallery}
      />
      
      {/* Experience Header */}
      <ExperienceHeader 
        title={experience?.title || "No Title"}
        location={experience?.location || "Unknown"}
        rating={experience?.rating || 0}
        reviewCount={experience?.reviewCount || 0}
        isSuperhost={experience?.host?.isSuperhost || false}
        category={experience?.category || "General"}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {/* Experience Overview */}
          <ExperienceOverview 
            duration={experience?.duration || "N/A"}
            groupSize={experience?.groupSize || "N/A"}
            languages={experience?.languages || []}
            ageRestriction={experience?.ageRestriction || "None"}
            skillLevel={experience?.skillLevel || "Beginner"}
            host={experience?.host || {}}
          />
          
          {/* Experience Description */}
          <ExperienceDescription 
            description={experience?.description || 'No description provided.'}
            whatToExpect={experience?.whatToExpect || []}
            highlights={experience?.highlights || []}
            requirements={experience?.requirements || []}
            bringingItems={experience?.bringingItems || []}
            houseRules={experience?.houseRules || []}
            cancellationPolicy={experience?.cancellationPolicy || 'No policy provided'}
          />
          
          {/* Experience Includes */}
          <ExperienceIncludes 
            included={experience?.included || ['Local guide', 'Equipment']}
            notIncluded={experience?.notIncluded || ['Food and beverages', 'Transportation']}
          />
          
          {/* Experience Host */}
          {experience?.host && <ExperienceHost host={experience.host} />}
          
          {/* Experience Reviews */}
          {experience?.reviews?.length > 0 && (
            <ExperienceReviews 
              rating={experience?.rating || 0}
              reviewCount={experience?.reviewCount || 0}
              reviews={experience?.reviews}
            />
          )}
          
          {/* Experience Map */}
          <ExperienceMap 
            coordinates={experience?.coordinates || { lat: 0, lng: 0 }}
            location={experience?.location || "No Location"}
            meetingPoint={experience?.meetingPoint || "No Meeting Point"}
            meetingTime={experience?.meetingTime || "No Meeting Time"}
            transportOptions={experience?.transportOptions || []}
          />
          
          {/* Experience Support */}
          <ExperienceSupport />
        </div>
        
        <div className="lg:col-span-1">
          {/* Experience Booking */}
          <ExperienceBooking 
            price={experience?.price || 0}
            currency={experience?.currency || 'USD'}
            rating={experience?.rating || 0}
            reviewCount={experience?.reviewCount || 0}
            duration={experience?.duration || "N/A"}
            groupSize={experience?.groupSize || "N/A"}
            availableDates={experience?.availableDates || []}
            instantBook={experience?.instantBook || false}
          />
        </div>
      </div>
      
      {/* Similar Experiences */}
      {similarExperiences?.length > 0 && (
        <ExperienceSimilar experiences={similarExperiences} />
      )}
    </>
  );
};

export default ExperienceContent;
