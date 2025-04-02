
import React from 'react';
import { Heart } from 'lucide-react';
import EmptyState from '@/components/dashboard/EmptyState';

const Wishlist = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      
      <EmptyState 
        icon={Heart}
        title="Your wishlist is empty"
        description="Save properties and experiences you love by tapping the heart icon when browsing"
        actionLabel="Explore FlapaBay"
        actionHref="/"
      />
    </div>
  );
};

export default Wishlist;
