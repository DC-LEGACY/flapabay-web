
import React from 'react';
import { MapPin, Plus, Star, Calendar, Users, Heart } from 'lucide-react';

import { motion } from 'framer-motion';
import { Button } from '@/ui/button';
import EmptyState from '@/components/dashboardtwo/EmptyState';
import { Link } from 'react-router-dom';

const HostExperiences = () => {
  // This would be replaced with actual data from an API or context
  const hasExperiences = false;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Experiences</h1>
        <Link to={"/dashboard-experience"}>
        <Button className="bg-[#FFC500] hover:bg-[#e6b000] text-black gap-2">
          <Plus size={16} />
          Create Experience
        </Button>
        </Link>
      </div>
      
      {hasExperiences ? (
        <div className="space-y-8">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 h-48 md:h-auto rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5" 
                  alt="Kayaking Experience" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Sunset Kayaking Adventure</h3>
                    <p className="text-gray-600 flex items-center mb-4">
                      <MapPin size={16} className="mr-1" />
                      San Diego, California
                    </p>
                  </div>
                  
                  <div className="flex items-center text-amber-500">
                    <Star size={16} className="fill-amber-500" />
                    <span className="ml-1 text-sm font-medium">4.9 (34 reviews)</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                    <Calendar size={12} className="inline mr-1" />
                    Weekends
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                    <Users size={12} className="inline mr-1" />
                    Up to 8 people
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">$60/person</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Calendar</Button>
                    <Button variant="outline" size="sm">Deactivate</Button>
                  </div>
                  
                  <div className="flex items-center text-gray-500">
                    <Heart size={16} className="mr-1" />
                    <span className="text-sm">12 saves</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <EmptyState 
            icon={MapPin}
            title="No experiences yet"
            description="Start hosting unique cultural experiences for FlapaBay guests"
            actionLabel="Create Experience"
            onAction={() => alert('Create experience feature coming soon!')}
          />

          <div className="mt-12 bg-gradient-to-br from-[#FFC500]/10 to-[#FFC500]/5 p-8 rounded-2xl">
            <h2 className="text-xl font-semibold mb-4">Why Host Experiences?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-[#FFC500]/20 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-[#FFC500]" />
                </div>
                <h3 className="font-medium mb-2">Share Your Passion</h3>
                <p className="text-gray-600 text-sm">Create memorable activities around your interests, skills, or local expertise.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-[#FFC500]/20 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-[#FFC500]" />
                </div>
                <h3 className="font-medium mb-2">Earn Extra Income</h3>
                <p className="text-gray-600 text-sm">Set your own prices and schedule to maximize your hosting potential.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-[#FFC500]/20 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-[#FFC500]" />
                </div>
                <h3 className="font-medium mb-2">Meet New People</h3>
                <p className="text-gray-600 text-sm">Connect with travelers from around the world and create lasting memories.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 p-6 border border-gray-200 rounded-xl">
            <h3 className="font-medium mb-4">Popular Experience Categories</h3>
            <div className="flex flex-wrap gap-3">
              {["Cooking", "Outdoor Adventure", "Arts & Crafts", "Music", "Tours", "Wellness", "Photography", "History", "Food & Drink"].map((category, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 hover:bg-[#FFC500]/10 rounded-full text-sm cursor-pointer transition-colors">
                  {category}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HostExperiences;
