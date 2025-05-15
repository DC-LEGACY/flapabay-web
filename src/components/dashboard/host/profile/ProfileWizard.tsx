
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Briefcase, Camera, Check, Clock, GraduationCap, 
  Globe, Heart, LightbulbIcon, Mail, MapPin, Dog, Pencil, Phone, Upload, User as UserIcon, Coffee, Music, Code, Utensils, BookOpen } from "lucide-react";

interface ProfileWizardProps {
  accountType: "Guest" | "Host";
  onComplete: () => void;
  onCancel: () => void;
}

export const ProfileWizard = ({ accountType, onComplete, onCancel }: ProfileWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = accountType === "Host" ? 6 : 5;
  
  const stepTitles = [
    "Profile Photo",
    "Basic Information",
    "About You",
    "Contact Information",
    "My Skills & Expertise"
  ];
  
  if (accountType === "Host") {
    stepTitles.push("Hosting Preferences");
  }
  
  const progress = (currentStep / totalSteps) * 100;
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onComplete();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onCancel();
    }
  };

  // Sample skills for Mbolela
  const skills = [
    { name: "Digital Marketing", icon: <Globe className="h-5 w-5 text-[#ffc500]" />, level: "Expert" },
    { name: "Photography", icon: <Camera className="h-5 w-5 text-[#ffc500]" />, level: "Intermediate" },
    { name: "Cooking", icon: <Utensils className="h-5 w-5 text-[#ffc500]" />, level: "Expert" },
    { name: "Web Development", icon: <Code className="h-5 w-5 text-[#ffc500]" />, level: "Beginner" },
    { name: "Music Production", icon: <Music className="h-5 w-5 text-[#ffc500]" />, level: "Intermediate" }
  ];
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Complete Your Profile</h2>
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}</span>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <Card className="shadow-lg border-[#ffc500]/20 hover:shadow-xl transition-shadow rounded-[29px]">
        <CardHeader className="bg-gradient-to-r from-[#ffc500]/10 to-transparent">
          <CardTitle>{stepTitles[currentStep - 1]}</CardTitle>
          <CardDescription>
            {currentStep === 1 && "Add a clear photo to help others recognize you"}
            {currentStep === 2 && "Tell us a bit about yourself"}
            {currentStep === 3 && "Share what makes you unique"}
            {currentStep === 4 && "Add your contact information"}
            {currentStep === 5 && "Tell us about your skills and what people can ask you about"}
            {currentStep === 6 && "Set up your hosting preferences"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {currentStep === 1 && (
            <div className="flex flex-col items-center space-y-6">
              <Avatar className="h-32 w-32 cursor-pointer hover:opacity-90 transition-opacity border-4 border-[#ffc500]/30">
                <AvatarImage src="https://i.pravatar.cc/150?u=mbolela" />
                <AvatarFallback>
                  <UserIcon className="h-12 w-12 text-gray-400" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex flex-col items-center gap-4 w-full">
                <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  <Camera className="h-4 w-4" /> Take a Photo
                </Button>
                <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  <Upload className="h-4 w-4" /> Upload Photo
                </Button>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Clear photos help hosts and guests recognize each other. Make sure your face is clearly visible.
                </p>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Mbolela" defaultValue="Mbolela" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Muluba" defaultValue="Muluba" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthdate">Date of Birth</Label>
                <Input id="birthdate" type="date" defaultValue="1992-04-15" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Lusaka, Zambia" defaultValue="Lusaka, Zambia" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Languages</Label>
                <Input id="language" placeholder="English, Bemba" defaultValue="English, Bemba, Nyanja" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Bio</Label>
                <Input 
                  id="shortDescription" 
                  placeholder="A brief one-liner about yourself"
                  defaultValue="Tech enthusiast building digital solutions in Zambia"
                />
                <p className="text-xs text-muted-foreground">This will appear on your profile cards</p>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio">About Me</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Share your story..."
                  className="min-h-[120px]"
                  defaultValue="I'm a passionate digital entrepreneur from Lusaka with a love for technology, good food, and connecting people. I believe in the power of community and enjoy helping others discover hidden gems in our beautiful country."
                />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2" htmlFor="school">
                    <GraduationCap className="h-4 w-4" /> Where I went to school
                  </Label>
                  <Input id="school" placeholder="Chikola Secondary School" defaultValue="University of Zambia, Business Administration" />
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2" htmlFor="work">
                    <Briefcase className="h-4 w-4" /> My work
                  </Label>
                  <Input id="work" placeholder="Entrepreneur" defaultValue="Digital Marketing Consultant & Food Blogger" />
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2" htmlFor="pets">
                    <Dog className="h-4 w-4" /> Pets
                  </Label>
                  <Input id="pets" placeholder="Dogs" defaultValue="Two rescue dogs, Zazu and Kiki" />
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2" htmlFor="hobby">
                    <Clock className="h-4 w-4" /> I spend too much time
                  </Label>
                  <Input id="hobby" placeholder="Watching video on TikTok" defaultValue="Exploring new restaurants and cafés around Lusaka" />
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2" htmlFor="funFact">
                    <LightbulbIcon className="h-4 w-4" /> Fun fact
                  </Label>
                  <Input id="funFact" placeholder="I love ice cream" defaultValue="I've visited 14 countries in Africa and documented local cuisines" />
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2" htmlFor="skill">
                    <Pencil className="h-4 w-4" /> Most useless skill
                  </Label>
                  <Input id="skill" placeholder="Designing" defaultValue="I can recite every capital city in Africa" />
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2" htmlFor="obsession">
                    <Heart className="h-4 w-4" /> I'm obsessed with
                  </Label>
                  <Input id="obsession" placeholder="Travel" defaultValue="Finding the perfect coffee shop with fast WiFi" />
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2" htmlFor="email">
                  <Mail className="h-4 w-4" /> Email Address
                </Label>
                <div className="flex">
                  <Input id="email" type="email" placeholder="your.email@example.com" defaultValue="mbolela@example.com" />
                  <Button variant="outline" className="ml-2 whitespace-nowrap">Verify</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2" htmlFor="phone">
                  <Phone className="h-4 w-4" /> Phone Number
                </Label>
                <div className="flex">
                  <Input id="phone" type="tel" placeholder="+1 234 567 8901" defaultValue="+260 97 123 4567" />
                  <Button variant="outline" className="ml-2 whitespace-nowrap">Verify</Button>
                </div>
              </div>
              
              {accountType === "Host" && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2" htmlFor="workEmail">
                    <Briefcase className="h-4 w-4" /> Work Email
                  </Label>
                  <div className="flex">
                    <Input id="workEmail" type="email" placeholder="work.email@company.com" defaultValue="m.muluba@business.com" />
                    <Button variant="outline" className="ml-2 whitespace-nowrap">Verify</Button>
                  </div>
                </div>
              )}
              
              <p className="text-sm text-gray-500">
                Your contact information is only shared with confirmed bookings and for important account notifications.
              </p>
            </div>
          )}
          
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>My Expertise (What people can ask me about)</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-start p-3 border rounded-md hover:border-[#ffc500]/50 hover:bg-[#ffc500]/5 transition-colors">
                      <div className="mr-3 mt-1">{skill.icon}</div>
                      <div>
                        <p className="font-medium">{skill.name}</p>
                        <p className="text-sm text-muted-foreground">{skill.level}</p>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="flex items-center justify-center h-full border-dashed">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="askMe">What People Can Ask Me About</Label>
                <Textarea 
                  id="askMe" 
                  placeholder="Let people know what topics you're knowledgeable about..."
                  className="min-h-[100px]"
                  defaultValue="Ask me about the best local restaurants in Lusaka, digital marketing strategies for small businesses, tips for traveling around Zambia, and my favorite coffee spots with great WiFi for remote work."
                />
              </div>
              
              <div className="space-y-2">
                <Label>My Top Interests</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Food', 'Technology', 'Travel', 'Photography', 'Coffee', 'Local Culture', 'Entrepreneurship'].map((interest, i) => (
                    <div key={i} className="px-3 py-1 bg-[#ffc500]/10 rounded-full text-sm border border-[#ffc500]/20">
                      {interest}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 6 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hostingStyle">Your Hosting Style</Label>
                <Textarea 
                  id="hostingStyle" 
                  placeholder="Describe how you host guests, what they can expect, and what makes your space special..."
                  className="min-h-[100px]"
                  defaultValue="I love creating authentic experiences that showcase the best of Zambian hospitality. Guests can expect thoughtful recommendations, a welcoming atmosphere, and special touches that make their stay memorable."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="houseRules">House Rules</Label>
                <Textarea 
                  id="houseRules" 
                  placeholder="What should guests know about staying at your place..."
                  className="min-h-[100px]"
                  defaultValue="Treat my home as your own. Respect quiet hours after 10 PM, no smoking indoors, and please clean up shared spaces after use. My home is pet-friendly, just let me know in advance."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="neighborhood">About Your Neighborhood</Label>
                <Textarea 
                  id="neighborhood" 
                  placeholder="Tell guests about your neighborhood, nearby attractions, and local tips..."
                  className="min-h-[100px]"
                  defaultValue="My place is located in a vibrant area of Lusaka with easy access to restaurants, cafés, and local markets. Just a 10-minute walk to Manda Hill Shopping Centre and close to the beautiful Lusaka National Park. Public transport is easily accessible."
                />
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between bg-gradient-to-r from-transparent to-[#ffc500]/10">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {currentStep === 1 ? "Cancel" : "Back"}
          </Button>
          
          <Button onClick={handleNext} className="bg-[#ffc500] hover:bg-amber-500 text-black">
            {currentStep < totalSteps ? (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Complete
                <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

import { PlusCircle } from "lucide-react";
