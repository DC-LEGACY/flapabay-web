import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Card, CardContent } from '@/ui/card';
import { Medal, MessageCircle, Star, User } from 'lucide-react';

import { Button } from '@/ui/button';
import React from 'react';
import { motion } from 'framer-motion';

interface ExperienceHostProps {
  host: {
    name: string;
    image: string;
    bio?: string;
    profession?: string;
    responseRate?: number;
    responseTime?: string;
    isSuperhost?: boolean;
    joinedDate?: string;
    totalReviews?: number;
    languages?: string[];
    verifications?: string[];
  };
}

const ExperienceHost: React.FC<ExperienceHostProps> = ({ host }) => {
  return (
    <motion.div 
      className="mt-8 border-b border-gray-200 pb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.25 }}
    >
      <h3 className="text-xl font-semibold mb-4">Meet your host</h3>
      
      <Card className="rounded-[20px] overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_40px_rgba(255,197,0,0.15)] transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center text-center md:text-left md:items-start">
              <Avatar className="h-24 w-24 border-2 border-[#ffc500] shadow-md mb-2">
                <AvatarImage src={host.image} alt={host.name} />
                <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
              </Avatar>
              
              <h3 className="text-lg font-semibold">{host.name}</h3>
              
              {host.profession && (
                <p className="text-sm text-gray-600 mt-1">{host.profession}</p>
              )}
              
              <p className="text-sm text-gray-500 mt-1">
                {host.joinedDate && `Joined in ${host.joinedDate}`}
              </p>
              
              {host.isSuperhost && (
                <div className="flex items-center gap-1 mt-2 bg-[#fff8e1] px-2 py-1 rounded-full">
                  <Medal className="h-4 w-4 text-[#ffc500]" />
                  <span className="text-xs font-medium">Superhost</span>
                </div>
              )}
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {host.totalReviews && (
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-[#fff8e1]">
                      <Star className="h-4 w-4 text-[#ffc500]" />
                    </div>
                    <div>
                      <span className="text-sm font-medium">{host.totalReviews} reviews</span>
                    </div>
                  </div>
                )}
                
                {host.verifications && host.verifications.length > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-[#fff8e1]">
                      <User className="h-4 w-4 text-[#ffc500]" />
                    </div>
                    <div>
                      <span className="text-sm font-medium">Identity verified</span>
                    </div>
                  </div>
                )}
                
                {host.responseRate && (
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-[#fff8e1]">
                      <MessageCircle className="h-4 w-4 text-[#ffc500]" />
                    </div>
                    <div>
                      <span className="text-sm font-medium">{host.responseRate}% response rate</span>
                    </div>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-black py-2 border-t border-gray-100 mt-3">
                {host.bio || "I'm passionate about sharing authentic local experiences with travelers from around the world! I've been hosting experiences for years and love helping visitors discover the hidden gems of this region."}
                {host.languages && host.languages.length > 0 && (
                  <>
                    <br />
                    <br />
                    <span className="font-medium">Languages:</span> {host.languages.join(', ')}
                  </>
                )}
              </p>
              
              <Button className="mt-3 bg-[#ffc500] text-black hover:bg-[#e6b000] w-full md:w-auto">
                Contact host
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExperienceHost;
