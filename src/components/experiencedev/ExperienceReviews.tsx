import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import React, { useState } from 'react';
import { Star, User } from 'lucide-react';

import { Button } from '@/ui/button';
import { motion } from 'framer-motion';

interface Review {
  id: number;
  user: string;
  userImage: string;
  rating: number;
  date: string;
  comment: string;
}

interface ExperienceReviewsProps {
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

const ExperienceReviews: React.FC<ExperienceReviewsProps> = ({
  rating,
  reviewCount,
  reviews
}) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 6);
  
  return (
    <motion.div 
      className="mt-8 border-b border-gray-200 pb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <Star className="h-5 w-5 text-[#ffc500] fill-[#ffc500]" />
        <h3 className="text-xl font-semibold">{rating} · {reviewCount} reviews</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {visibleReviews.map(review => (
          <motion.div 
            key={review.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10 border border-gray-200">
                <AvatarImage src={review.userImage} alt={review.user} />
                <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{review.user}</p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? 'text-[#ffc500] fill-[#ffc500]' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <p className="text-black">{review.comment}</p>
          </motion.div>
        ))}
      </div>
      
      {reviews.length > 6 && (
        <Button 
          variant="outline" 
          className="mt-8"
          onClick={() => setShowAllReviews(!showAllReviews)}
        >
          {showAllReviews ? 'Show fewer reviews' : `Show all ${reviews.length} reviews`}
        </Button>
      )}
    </motion.div>
  );
};

export default ExperienceReviews;
