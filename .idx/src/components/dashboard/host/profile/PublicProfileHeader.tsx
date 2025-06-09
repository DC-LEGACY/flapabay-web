
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Globe, 
  Home, 
  MapPin, 
  MessageCircle, 
  Shield, 
  Star, 
  User as UserIcon,
  Share
} from "lucide-react";

interface PublicProfileHeaderProps {
  profileType: "Host" | "Guest";
  name: string;
  location: string;
  memberSince: string;
  isVerified: boolean;
  avatarUrl?: string;
  bio?: string;
  rating?: number;
  reviewsCount?: number;
  responseRate?: number;
  languages?: string[];
}

export const PublicProfileHeader = ({
  profileType,
  name,
  location,
  memberSince,
  isVerified,
  avatarUrl,
  bio = "Tech enthusiast building digital solutions in Zambia",
  rating = 4.9,
  reviewsCount = 42,
  responseRate = 95,
  languages = ["English", "Bemba", "Nyanja"]
}: PublicProfileHeaderProps) => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  
  const handleMessageClick = () => {
    alert(`Message feature will be implemented soon for ${profileType}: ${name}`);
    // TODO: Implement message feature
  };
  
  const handleShareProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Profile link copied to clipboard!");
  };
  
  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-lg">
            <AvatarImage src={avatarUrl || "https://i.pravatar.cc/150?u=mbolela"} alt={name} />
            <AvatarFallback>
              <UserIcon className="h-12 w-12 text-gray-400" />
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{name}</h1>
                  {isVerified && (
                    <Badge variant="verified" className="text-black">
                      <Shield className="h-3 w-3 mr-1" /> Verified
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 mt-1">{bio}</p>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Member since {memberSince}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-[#ffc500]" />
                    {rating} ({reviewsCount} reviews)
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    {languages.join(", ")}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="default" 
                  onClick={handleMessageClick}
                  className="bg-[#ffc500] hover:bg-[#ffc500]/90 text-black"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message {profileType}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleShareProfile}
                >
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {profileType === "Host" && (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm text-gray-700 bg-amber-50 p-3 rounded-md">
                <div className="flex items-center">
                  <Home className="h-4 w-4 mr-1 text-[#ffc500]" />
                  Superhost
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1 text-[#ffc500]" />
                  {responseRate}% response rate
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
