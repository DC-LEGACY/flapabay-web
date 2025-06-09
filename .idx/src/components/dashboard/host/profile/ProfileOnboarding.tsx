
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Camera, Check, Mail, Phone, Upload, User as UserIcon, Bell, MessageSquare, Globe, Music, Utensils, Code, Camera as CameraIcon } from "lucide-react";
import { toast } from "sonner";

interface ProfileOnboardingProps {
  accountType: "Guest" | "Host";
  onComplete: () => void;
  onCancel: () => void;
}

export const ProfileOnboarding = ({ accountType, onComplete, onCancel }: ProfileOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
  const stepTitles = [
    "Upload Profile Photo",
    "Personal Information",
    "About You",
    "Contact Information",
    "Notification Preferences"
  ];
  
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

  // Sample data for the demo
  const demoData = {
    name: "Mbolela Muluba",
    email: "mbolela@example.com",
    phone: "+260 97 123 4567",
    location: "Lusaka, Zambia",
    bio: "Digital entrepreneur, foodie, and tech enthusiast from Zambia with a passion for connecting people through technology and great experiences.",
    skills: [
      { name: "Digital Marketing", icon: <Globe className="h-5 w-5 text-[#ffc500]" /> },
      { name: "Photography", icon: <CameraIcon className="h-5 w-5 text-[#ffc500]" /> },
      { name: "Cooking", icon: <Utensils className="h-5 w-5 text-[#ffc500]" /> },
      { name: "Web Design", icon: <Code className="h-5 w-5 text-[#ffc500]" /> },
      { name: "Music Production", icon: <Music className="h-5 w-5 text-[#ffc500]" /> }
    ]
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Profile Setup</h2>
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}</span>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <Card className="shadow-lg border-[#ffc500]/20 hover:shadow-xl transition-shadow">
        <CardHeader className="bg-gradient-to-r from-[#ffc500]/10 to-transparent">
          <CardTitle>{stepTitles[currentStep - 1]}</CardTitle>
          <CardDescription>
            {currentStep === 1 && "Upload a clear photo to help others recognize you"}
            {currentStep === 2 && "Tell us a bit about yourself"}
            {currentStep === 3 && "Share what makes you unique as a " + accountType}
            {currentStep === 4 && "Add your contact information"}
            {currentStep === 5 && "Set up how you want to receive notifications"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {currentStep === 1 && (
            <div className="flex flex-col items-center space-y-6">
              <Avatar className="h-32 w-32 cursor-pointer hover:opacity-90 transition-opacity border-4 border-[#ffc500]/30">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
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
                  Your profile photo helps create trust with other members. Choose a clear, friendly headshot.
                </p>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" defaultValue="Mbolela" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" defaultValue="Muluba" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthdate">Date of Birth</Label>
                <Input id="birthdate" type="date" defaultValue="1992-04-15" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, Country" defaultValue={demoData.location} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Input 
                  id="shortDescription" 
                  placeholder="A brief one-liner about yourself"
                  defaultValue="Digital entrepreneur, foodie, and tech enthusiast from Zambia"
                />
                <p className="text-xs text-muted-foreground">This will appear on your profile cards</p>
              </div>
              
              <p className="text-sm text-gray-500">
                Your name will be visible to other members. Your birthdate won't be publicly visible.
              </p>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio">About You</Label>
                <Textarea 
                  id="bio" 
                  placeholder={`Share what you love about ${accountType === "Host" ? "hosting" : "traveling"}, your interests, or anything that helps others get to know you...`}
                  className="min-h-[150px]"
                  defaultValue={demoData.bio}
                />
              </div>
              
              {accountType === "Host" && (
                <div className="space-y-2">
                  <Label htmlFor="hostingStyle">Your Hosting Style</Label>
                  <Textarea 
                    id="hostingStyle" 
                    placeholder="Describe your approach to hosting, what guests can expect, and what makes your space special..."
                    className="min-h-[100px]"
                    defaultValue="I love creating authentic experiences that showcase the best of Zambian hospitality. My guests always leave with new friends and memories."
                  />
                </div>
              )}
              
              {accountType === "Guest" && (
                <div className="space-y-2">
                  <Label htmlFor="travelStyle">Your Travel Style</Label>
                  <Textarea 
                    id="travelStyle" 
                    placeholder="Tell hosts about how you like to travel, what you look for in a stay, and what makes a great experience for you..."
                    className="min-h-[100px]"
                    defaultValue="I love immersing myself in local cultures and experiencing authentic food and traditions. I prefer staying in places where I can connect with locals and get off-the-beaten-path recommendations."
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>My Top Skills</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {demoData.skills.map((skill, i) => (
                    <div key={i} className="flex items-center p-3 border rounded-md bg-[#ffc500]/5 border-[#ffc500]/20">
                      {skill.icon}
                      <span className="ml-2">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex">
                  <Input id="email" type="email" placeholder="your.email@example.com" defaultValue={demoData.email} />
                  <Button variant="outline" className="ml-2 whitespace-nowrap bg-[#ffc500]/10 border-[#ffc500]/30 hover:bg-[#ffc500]/20">Verify</Button>
                </div>
                <p className="text-xs text-muted-foreground">(Demo OTP code: 123456)</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex">
                  <Input id="phone" type="tel" placeholder="+1 234 567 8901" defaultValue={demoData.phone} />
                  <Button variant="outline" className="ml-2 whitespace-nowrap bg-[#ffc500]/10 border-[#ffc500]/30 hover:bg-[#ffc500]/20">Verify</Button>
                </div>
                <p className="text-xs text-muted-foreground">(Demo OTP code: 123456)</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact (Optional)</Label>
                <Input id="emergencyContact" placeholder="Name and phone number" defaultValue="James Muluba, +260 96 765 4321" />
              </div>
              
              <p className="text-sm text-gray-500">
                Your contact information is only shared with confirmed bookings and for important account notifications.
              </p>
            </div>
          )}
          
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md bg-[#ffc500]/5 border-[#ffc500]/20">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#ffc500]" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">Booking confirmations, messages, and updates</p>
                  </div>
                </div>
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#ffc500] focus:ring-[#ffc500]" />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-md hover:bg-[#ffc500]/5 hover:border-[#ffc500]/20 transition-colors">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Booking alerts and time-sensitive updates</p>
                  </div>
                </div>
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#ffc500] focus:ring-[#ffc500]" />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-md hover:bg-[#ffc500]/5 hover:border-[#ffc500]/20 transition-colors">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive alerts on your device</p>
                  </div>
                </div>
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#ffc500] focus:ring-[#ffc500]" />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-md hover:bg-[#ffc500]/5 hover:border-[#ffc500]/20 transition-colors">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Message Notifications</p>
                    <p className="text-sm text-gray-500">Get notified when you receive messages</p>
                  </div>
                </div>
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#ffc500] focus:ring-[#ffc500]" />
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
