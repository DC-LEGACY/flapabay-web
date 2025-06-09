
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  GraduationCap, 
  Heart, 
  LightbulbIcon, 
  Clock, 
  Dog, 
  Pencil,
  MessageCircle,
  Coffee, 
  Music, 
  Code, 
  Utensils, 
  BookOpen,
  Star,
  Globe,
  MapPin,
  Calendar,
  Home
} from "lucide-react";

interface PublicProfileContentProps {
  profileType: "Host" | "Guest";
  aboutMe?: string;
  education?: string;
  work?: string;
  pets?: string;
  spendsTooMuchTime?: string;
  funFact?: string;
  uselessSkill?: string;
  obsession?: string;
  skills?: Array<{
    name: string;
    icon: JSX.Element;
    level: string;
  }>;
  interests?: string[];
  hostingDetails?: {
    hostingStyle?: string;
    neighborhood?: string;
    houseRules?: string;
  };
  reviews?: Array<{
    id: string;
    author: string;
    avatarUrl?: string;
    rating: number;
    date: string;
    comment: string;
  }>;
}

export const PublicProfileContent = ({
  profileType,
  aboutMe = "I'm a passionate digital entrepreneur from Lusaka with a love for technology, good food, and connecting people. I believe in the power of community and enjoy helping others discover hidden gems in our beautiful country.",
  education = "University of Zambia, Business Administration",
  work = "Digital Marketing Consultant & Food Blogger",
  pets = "Two rescue dogs, Zazu and Kiki",
  spendsTooMuchTime = "Exploring new restaurants and cafés around Lusaka",
  funFact = "I've visited 14 countries in Africa and documented local cuisines",
  uselessSkill = "I can recite every capital city in Africa",
  obsession = "Finding the perfect coffee shop with fast WiFi",
  skills = [
    { name: "Digital Marketing", icon: <Globe className="h-5 w-5 text-[#ffc500]" />, level: "Expert" },
    { name: "Photography", icon: <Camera className="h-5 w-5 text-[#ffc500]" />, level: "Intermediate" },
    { name: "Cooking", icon: <Utensils className="h-5 w-5 text-[#ffc500]" />, level: "Expert" },
    { name: "Web Development", icon: <Code className="h-5 w-5 text-[#ffc500]" />, level: "Beginner" },
    { name: "Music Production", icon: <Music className="h-5 w-5 text-[#ffc500]" />, level: "Intermediate" }
  ],
  interests = ['Food', 'Technology', 'Travel', 'Photography', 'Coffee', 'Local Culture', 'Entrepreneurship'],
  hostingDetails = {
    hostingStyle: "I love creating authentic experiences that showcase the best of Zambian hospitality. Guests can expect thoughtful recommendations, a welcoming atmosphere, and special touches that make their stay memorable.",
    neighborhood: "My place is located in a vibrant area of Lusaka with easy access to restaurants, cafés, and local markets. Just a 10-minute walk to Manda Hill Shopping Centre and close to the beautiful Lusaka National Park. Public transport is easily accessible.",
    houseRules: "Treat my home as your own. Respect quiet hours after 10 PM, no smoking indoors, and please clean up shared spaces after use. My home is pet-friendly, just let me know in advance."
  },
  reviews = [
    {
      id: "1",
      author: "Jane Cooper",
      avatarUrl: "https://i.pravatar.cc/150?u=jane",
      rating: 5,
      date: "March 2023",
      comment: "Mbolela was an amazing host! The place was exactly as described and the local recommendations were spot on. Would definitely stay again."
    },
    {
      id: "2",
      author: "Alex Thompson",
      avatarUrl: "https://i.pravatar.cc/150?u=alex",
      rating: 5,
      date: "February 2023",
      comment: "Great experience from start to finish. Communication was excellent and the place was perfect for my needs."
    },
    {
      id: "3",
      author: "Sarah Johnson",
      avatarUrl: "https://i.pravatar.cc/150?u=sarah",
      rating: 4,
      date: "January 2023",
      comment: "Wonderful host with great local knowledge. The apartment was clean and well-located. Just a bit noisy from the street at night."
    }
  ]
}: PublicProfileContentProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="about">About</TabsTrigger>
          {skills.length > 0 && <TabsTrigger value="skills">Skills & Interests</TabsTrigger>}
          {profileType === "Host" && <TabsTrigger value="hosting">Hosting Details</TabsTrigger>}
          {reviews && reviews.length > 0 && <TabsTrigger value="reviews">Reviews</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">About Me</h3>
              <p className="text-gray-700 mb-6">{aboutMe}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {education && (
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <GraduationCap className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Where I went to school</h4>
                      <p className="text-gray-600">{education}</p>
                    </div>
                  </div>
                )}
                
                {work && (
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Briefcase className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">My work</h4>
                      <p className="text-gray-600">{work}</p>
                    </div>
                  </div>
                )}
                
                {pets && (
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Dog className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Pets</h4>
                      <p className="text-gray-600">{pets}</p>
                    </div>
                  </div>
                )}
                
                {spendsTooMuchTime && (
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Clock className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">I spend too much time</h4>
                      <p className="text-gray-600">{spendsTooMuchTime}</p>
                    </div>
                  </div>
                )}
                
                {funFact && (
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <LightbulbIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Fun fact</h4>
                      <p className="text-gray-600">{funFact}</p>
                    </div>
                  </div>
                )}
                
                {uselessSkill && (
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Pencil className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Most useless skill</h4>
                      <p className="text-gray-600">{uselessSkill}</p>
                    </div>
                  </div>
                )}
                
                {obsession && (
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Heart className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">I'm obsessed with</h4>
                      <p className="text-gray-600">{obsession}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Skills & Expertise</h3>
              <p className="text-gray-700 mb-4">What I can help you with:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-start p-3 border rounded-md hover:border-[#ffc500]/50 hover:bg-[#ffc500]/5 transition-colors">
                    <div className="mr-3 mt-1">{skill.icon}</div>
                    <div>
                      <p className="font-medium">{skill.name}</p>
                      <p className="text-sm text-muted-foreground">{skill.level}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <h3 className="text-xl font-bold mb-4">My Interests</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {interests.map((interest, i) => (
                  <div key={i} className="px-3 py-1 bg-[#ffc500]/10 rounded-full text-sm border border-[#ffc500]/20">
                    {interest}
                  </div>
                ))}
              </div>
              
              <p className="text-gray-600">
                Ask me about the best local restaurants in Lusaka, digital marketing strategies for small businesses, 
                tips for traveling around Zambia, and my favorite coffee spots with great WiFi for remote work.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {profileType === "Host" && (
          <TabsContent value="hosting" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Hosting Style</h3>
                <p className="text-gray-700 mb-6">{hostingDetails.hostingStyle}</p>
                
                <h3 className="text-xl font-bold mb-4">About The Neighborhood</h3>
                <p className="text-gray-700 mb-6">{hostingDetails.neighborhood}</p>
                
                <h3 className="text-xl font-bold mb-4">House Rules</h3>
                <p className="text-gray-700">{hostingDetails.houseRules}</p>
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        <TabsContent value="reviews" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-6">Reviews</h3>
              
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={review.avatarUrl} alt={review.author} />
                        <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h4 className="font-medium">{review.author}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < review.rating ? 'text-[#ffc500] fill-[#ffc500]' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <span>·</span>
                              <span>{review.date}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="mt-2 text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

import { Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
