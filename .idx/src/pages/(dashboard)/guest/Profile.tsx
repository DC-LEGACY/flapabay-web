
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, Edit, MapPin, Globe, Award, Clock, CheckCircle, 
  Star, BookOpen, ArrowRight, Shield, Camera
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import GuestOnboardingWizard from '@/components/dashboard/guest/GuestOnboardingWizard';

const Profile = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(65);
  const { user } = useAuth();
  
  return (
    <div className="space-y-8">
      {showOnboarding ? (
        <GuestOnboardingWizard 
          onComplete={() => {
            setShowOnboarding(false);
            setProfileCompletion(100);
          }} 
          onCancel={() => setShowOnboarding(false)}
        />
      ) : (
        <>
          {/* Profile Header */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <Card className="w-full lg:w-3/4">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border-2 border-primary">
                      <AvatarImage src={user?.user_metadata?.avatar_url || "/placeholder.svg"} alt="Profile" />
                      <AvatarFallback className="bg-primary/20 text-flapabay-yellow text-xl">
                        {user?.email?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-2xl font-bold">
                        {user?.user_metadata?.full_name || user?.email || "Guest User"}
                      </h1>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>San Francisco, CA</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <Clock className="h-4 w-4" />
                        <span>Joined April 2023</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setShowOnboarding(true)}>
                      <Edit className="mr-2 h-4 w-4" /> Edit Profile
                    </Button>
                    <Button variant="outline">
                      <Camera className="mr-2 h-4 w-4" /> Change Photo
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Profile Completion</h3>
                      <span className="text-sm font-medium">{profileCompletion}%</span>
                    </div>
                    <Progress value={profileCompletion} className="h-2 mt-2" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center gap-2 bg-primary/5 p-3 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-flapabay-yellow" />
                      <span className="text-sm font-medium">Email Verified</span>
                    </div>
                    <div className="flex items-center gap-2 bg-primary/5 p-3 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-flapabay-yellow" />
                      <span className="text-sm font-medium">ID Verified</span>
                    </div>
                    <div className="flex items-center gap-2 bg-primary/5 p-3 rounded-lg">
                      <Shield className="h-5 w-5 text-flapabay-yellow" />
                      <span className="text-sm font-medium">Emergency Contact</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="w-full lg:w-1/4">
              <CardHeader>
                <CardTitle className="text-lg">Travel Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Trips Completed</span>
                    <span className="font-bold">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Countries Visited</span>
                    <span className="font-bold">4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Reviews Written</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. Rating Received</span>
                    <div className="flex items-center">
                      <span className="font-bold mr-1">4.9</span>
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Travel History
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Profile Content */}
          <Tabs defaultValue="about">
            <TabsList className="grid w-full md:w-[600px] grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Hi there! I'm a tech professional who loves to travel and explore new places. I enjoy hiking, photography, and trying local cuisine wherever I go. I'm a respectful guest who appreciates clean, quiet spaces with good WiFi.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">Edit Bio</Button>
                </CardFooter>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Languages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>English</span>
                        <span className="text-sm text-muted-foreground">Native</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Spanish</span>
                        <span className="text-sm text-muted-foreground">Intermediate</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>French</span>
                        <span className="text-sm text-muted-foreground">Basic</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="text-sm">
                      <Edit className="h-3 w-3 mr-1" /> Edit
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Work & Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <p className="font-medium">Product Manager</p>
                        <p className="text-sm text-muted-foreground">Tech Company Inc.</p>
                      </div>
                      <div>
                        <p className="font-medium">MBA</p>
                        <p className="text-sm text-muted-foreground">Stanford University</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="text-sm">
                      <Edit className="h-3 w-3 mr-1" /> Edit
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="preferences" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Travel Preferences</CardTitle>
                  <CardDescription>Your preferred travel settings and interests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Accommodation Types</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-primary/10 text-flapabay-yellow rounded-full text-sm">Entire homes</span>
                        <span className="px-3 py-1 bg-primary/10 text-flapabay-yellow rounded-full text-sm">Luxury</span>
                        <span className="px-3 py-1 bg-primary/10 text-flapabay-yellow rounded-full text-sm">Beach houses</span>
                        <span className="px-3 py-1 bg-primary/10 text-flapabay-yellow rounded-full text-sm">Unique stays</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Travel Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-primary/10 text-flapabay-yellow rounded-full text-sm">Food & Wine</span>
                        <span className="px-3 py-1 bg-primary/10 text-flapabay-yellow rounded-full text-sm">Nature</span>
                        <span className="px-3 py-1 bg-primary/10 text-flapabay-yellow rounded-full text-sm">Photography</span>
                        <span className="px-3 py-1 bg-primary/10 text-flapabay-yellow rounded-full text-sm">Cultural</span>
                        <span className="px-3 py-1 bg-primary/10 text-flapabay-yellow rounded-full text-sm">Adventure</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Budget Range</h3>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-primary/10 text-flapabay-yellow rounded-full text-sm">$100 - $250 per night</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Must-have Amenities</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-primary/10 text-flapabay-yellow rounded-full text-sm">WiFi</span>
                        <span className="px-3 py-1 bg-primary/10 text-flapabay-yellow rounded-full text-sm">Kitchen</span>
                        <span className="px-3 py-1 bg-primary/10 text-flapabay-yellow rounded-full text-sm">Air conditioning</span>
                        <span className="px-3 py-1 bg-primary/10 text-flapabay-yellow rounded-full text-sm">Workspace</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setShowOnboarding(true)}>Update Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="badges" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Achievement Badges</CardTitle>
                  <CardDescription>Badges earned through your travels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-4 rounded-full mb-3">
                        <Award className="h-10 w-10 text-flapabay-yellow" />
                      </div>
                      <h4 className="font-medium">Super Traveler</h4>
                      <p className="text-xs text-muted-foreground mt-1">5+ trips completed</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-4 rounded-full mb-3">
                        <Globe className="h-10 w-10 text-flapabay-yellow" />
                      </div>
                      <h4 className="font-medium">Globetrotter</h4>
                      <p className="text-xs text-muted-foreground mt-1">Visited 3+ countries</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-4 rounded-full mb-3">
                        <Star className="h-10 w-10 text-flapabay-yellow" />
                      </div>
                      <h4 className="font-medium">5-Star Guest</h4>
                      <p className="text-xs text-muted-foreground mt-1">Maintained 5-star rating</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-4 rounded-full mb-3">
                        <BookOpen className="h-10 w-10 text-flapabay-yellow" />
                      </div>
                      <h4 className="font-medium">Reviewer</h4>
                      <p className="text-xs text-muted-foreground mt-1">10+ detailed reviews</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reviews from Hosts</CardTitle>
                  <CardDescription>What hosts have said about you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-b pb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg" alt="Host" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">Jane Doe</h4>
                          <p className="text-xs text-muted-foreground">Villa Serena · April 2025</p>
                        </div>
                        <div className="ml-auto flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">A fantastic guest! Left the place spotless and was very respectful of house rules. Great communication throughout their stay. Would welcome them back anytime!</p>
                    </div>
                    
                    <div className="border-b pb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg" alt="Host" />
                          <AvatarFallback>MS</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">Mike Smith</h4>
                          <p className="text-xs text-muted-foreground">Mountain Lodge · March 2025</p>
                        </div>
                        <div className="ml-auto flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">Perfect guest! Clean, communicative, and followed all house rules. They treated our home with care and respect. Would be happy to host them again!</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg" alt="Host" />
                          <AvatarFallback>AB</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">Alice Brown</h4>
                          <p className="text-xs text-muted-foreground">City Apartment · February 2025</p>
                        </div>
                        <div className="ml-auto flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">I can't say enough good things about this guest. They were respectful, clean, and friendly. Communication was excellent from booking to check-out. Highly recommend!</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View All Reviews</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default Profile;
