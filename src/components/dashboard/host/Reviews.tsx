import { ArrowUpDown, Filter, Flag, MessageCircle, Search, Star, ThumbsUp } from 'lucide-react';
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const HostReviews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [selectedRating, setSelectedRating] = useState('all');
  
  const reviews = [
    {
      id: 1,
      author: 'Alice Johnson',
      date: '2023-08-15',
      rating: 5,
      comment: 'Exceptional stay! The property was immaculate and the host was incredibly responsive.',
      property: 'Cozy Cabin in the Woods',
      helpfulVotes: 2,
      flags: 0
    },
    {
      id: 2,
      author: 'Bob Williams',
      date: '2023-07-22',
      rating: 4,
      comment: 'Great location and comfortable amenities. Minor issue with the AC, but the host resolved it quickly.',
      property: 'Downtown Loft Apartment',
      helpfulVotes: 5,
      flags: 1
    },
    {
      id: 3,
      author: 'Charlie Brown',
      date: '2023-06-10',
      rating: 3,
      comment: 'Decent place for the price. Could use some updating, but overall a satisfactory experience.',
      property: 'Budget-Friendly Studio',
      helpfulVotes: 1,
      flags: 0
    },
    {
      id: 4,
      author: 'Diana Miller',
      date: '2023-05-01',
      rating: 5,
      comment: 'Absolutely loved my stay! The views were stunning and the host went above and beyond to make me feel welcome.',
      property: 'Luxury Penthouse Suite',
      helpfulVotes: 8,
      flags: 0
    },
    {
      id: 5,
      author: 'Ethan Davis',
      date: '2023-04-18',
      rating: 2,
      comment: 'Disappointing experience. The property was not as described and the host was unresponsive to my concerns.',
      property: 'Seaside Cottage',
      helpfulVotes: 0,
      flags: 3
    },
  ];
  
  const filteredReviews = reviews.filter(review => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      review.author.toLowerCase().includes(searchTerm) ||
      review.comment.toLowerCase().includes(searchTerm) ||
      review.property.toLowerCase().includes(searchTerm)
    );
  }).filter(review => {
    if (selectedRating === 'all') return true;
    return review.rating === parseInt(selectedRating);
  }).sort((a, b) => {
    if (selectedSort === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (selectedSort === 'highest') {
      return b.rating - a.rating;
    } else {
      return a.rating - b.rating;
    }
  });
  
  const getTimeAgo = (date: string) => {
    const now = new Date();
    const reviewDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - reviewDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return '1 month ago';
    if (diffMonths < 12) return `${diffMonths} months ago`;
    
    const diffYears = Math.floor(diffMonths / 12);
    if (diffYears === 1) return '1 year ago';
    return `${diffYears} years ago`;
  };
  
  // Fix the rating stars function to handle type properly
  const renderRatingStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Reviews</h1>
        <Button className="bg-[#FFC500] hover:bg-[#e6b000] text-black gap-2">
          <MessageCircle size={16} />
          Write a Response
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input 
          type="search" 
          placeholder="Search reviews..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <Select value={selectedSort} onValueChange={setSelectedSort}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="highest">Highest Rating</SelectItem>
            <SelectItem value="lowest">Lowest Rating</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedRating} onValueChange={setSelectedRating}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by rating..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="1">1 Star</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {filteredReviews.length === 0 ? (
        <div className="text-gray-500">No reviews found.</div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map(review => (
            <div key={review.id} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{review.author}</h3>
                  <div className="text-gray-500 text-sm">{getTimeAgo(review.date)}</div>
                  <div className="flex items-center mt-1">
                    {renderRatingStars(review.rating)}
                  </div>
                </div>
                <div className="text-right">
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
                    <Flag className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 text-black">{review.comment}</div>
              
              <div className="mt-4">
                <span className="font-medium">Property:</span> {review.property}
              </div>
              
              <div className="flex justify-end items-center mt-4 space-x-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  Helpful ({review.helpfulVotes})
                </Button>
                <Button variant="secondary" size="sm">Respond</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default HostReviews;
