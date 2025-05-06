import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Edit, Eye, MapPin, Plus, Trash2, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

// Mock data for listings
const listings = [
  {
    id: 1,
    title: 'Lagos Beach Villa',
    location: 'Lagos, Nigeria',
    image: '/images/f77c0e1a-b334-40f9-bdae-c148d52c1407.png',
    price: 125,
    guests: 4,
    status: 'active'
  },
  {
    id: 2,
    title: 'Mountain View Apartment',
    location: 'Cape Town, South Africa',
    image: '/images/952a1c77-e501-4b8c-a004-db3f13b7e443.png',
    price: 89,
    guests: 2,
    status: 'active'
  },
  {
    id: 3,
    title: 'Serengeti Safari Lodge',
    location: 'Serengeti, Tanzania',
    image: '/images/40f111f4-2fe2-4988-8952-4a9573620263.png',
    price: 210,
    guests: 6,
    status: 'inactive'
  }
];

const Listings = () => {
  const { toast } = useToast();
  
  const handleAddListing = () => {
    toast({
      title: "Create New Listing",
      description: "This feature will be available soon!",
    });
  };
  
  const handleEditListing = (id: number) => {
    toast({
      title: "Edit Listing",
      description: `Editing listing ${id}`,
    });
  };
  
  const handleDeleteListing = (id: number) => {
    toast({
      title: "Delete Listing",
      description: `Listing ${id} will be deleted.`,
      variant: "destructive",
    });
  };
  
  const handleViewListing = (id: number) => {
    toast({
      title: "View Listing",
      description: `Viewing listing ${id}`,
    });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Listings</h1>
      <Link to={"/create-listing"} >  <Button onClick={handleAddListing}>
          <Plus className="mr-2 h-4 w-4" /> Add New Listing
        </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map(listing => (
          <ListingCard 
            key={listing.id} 
            listing={listing} 
            onEdit={() => handleEditListing(listing.id)}
            onDelete={() => handleDeleteListing(listing.id)}
            onView={() => handleViewListing(listing.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface ListingCardProps {
  listing: {
    id: number;
    title: string;
    location: string;
    image: string;
    price: number;
    guests: number;
    status: string;
  };
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ 
  listing, 
  onEdit, 
  onDelete, 
  onView 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-48">
          <img 
            src={listing.image} 
            alt={listing.title} 
            className="w-full h-full object-cover" 
          />
          <div className={`absolute top-2 right-2 ${listing.status === 'active' ? 'bg-green-500' : 'bg-gray-500'} text-white text-xs py-1 px-2 rounded`}>
            {listing.status === 'active' ? 'Active' : 'Inactive'}
          </div>
        </div>
        <CardContent className="p-2">
          <h3 className="font-semibold text-lg">{listing.title}</h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              {listing.location}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              {listing.guests} {listing.guests === 1 ? 'guest' : 'guests'}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="h-4 w-4 mr-2" />
              ${listing.price} per night
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={onView}>
              <Eye className="mr-1 h-4 w-4" /> View
            </Button>
            <Button variant="outline" size="sm" className="flex-1" onClick={onEdit}>
              <Edit className="mr-1 h-4 w-4" /> Edit
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={onDelete}>
              <Trash2 className="mr-1 h-4 w-4" /> Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Listings;
