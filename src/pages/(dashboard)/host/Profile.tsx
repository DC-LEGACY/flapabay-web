import { useState } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import { Button } from "@/components/dashboard/host/ui/button";
import { Input } from "@/components/dashboard/host/ui/input";
import { Separator } from "@/components/dashboard/host/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboard/host/ui/avatar";
import { Badge } from "@/components/dashboard/host/ui/badge";
import { Card, CardContent } from "@/components/dashboard/host/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/dashboard/host/ui/dialog";
import { ProfileWizard } from "@/components/dashboard/host/profile/ProfileWizard";
import { VerificationWizard } from "@/components/dashboard/host/profile/VerificationWizard";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { BookOpen, Briefcase, Camera, Check, Clock, Edit, Globe, GraduationCap, Heart, Home, LightbulbIcon, MapPin, Dog, Pencil, BadgeCheck } from "lucide-react";
import { Textarea } from "@/components/dashboard/host/ui/textarea";

const Profile = () => {
  const [showProfileWizard, setShowProfileWizard] = useState(false);
  const [showVerificationWizard, setShowVerificationWizard] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [accountType, setAccountType] = useState<"Guest" | "Host">("Guest");
  const isMobile = useIsMobile();
  
  const [profileInfo, setProfileInfo] = useState({
    name: "Mbolela",
    location: "Lusaka, Zambia",
    bio: "Digital entrepreneur, foodie, and tech enthusiast from Zambia",
    shortBio: "Tech enthusiast building digital solutions in Zambia",
    school: "Chikola Secondary School",
    work: "Entrepreneur",
    pets: "Dogs",
    tooMuchTime: "Watching video on TikTok",
    funFact: "I love ice cream",
    uselessSkill: "Designing",
    obsession: "Travel",
    languages: "English"
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({...profileInfo});

  const handleProfileComplete = () => {
    setShowProfileWizard(false);
    toast.success("Profile setup completed! 🎉");
  };

  const handleVerificationComplete = (verificationStatus: boolean) => {
    setShowVerificationWizard(false);
    setIsVerified(verificationStatus);
    toast.success("Verification completed successfully! 🎉");
  };
  
  const handleSaveProfile = () => {
    setProfileInfo(editedProfile);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <>
      {showProfileWizard ? (
        <ProfileWizard 
          accountType={accountType} 
          onComplete={handleProfileComplete} 
          onCancel={() => setShowProfileWizard(false)} 
        />
      ) : showVerificationWizard ? (
        <VerificationWizard 
          onComplete={handleVerificationComplete} 
          onCancel={() => setShowVerificationWizard(false)} 
        />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="overflow-hidden shadow-sm border border-gray-100 rounded-[29px]">
                <CardContent className="p-0 bg-[#ffc500]/10 rounded-[29px]">
                  <div className="flex flex-col items-center p-8">
                    <div className="h-36 w-36 rounded-[30px] bg-[#ffc500] border-2 border-[#ffc500] shadow-lg flex items-center justify-center mb-4 overflow-hidden relative">
                      <Avatar className="h-32 w-32 border-2 border-white shadow-md">
                        <AvatarImage src="https://i.pravatar.cc/150?u=mbolela" alt="Mbolela" />
                        <AvatarFallback>MB</AvatarFallback>
                      </Avatar>
                      {isVerified && (
                        <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 shadow-md border-2 border-white">
                          <BadgeCheck className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold">{profileInfo.name}</h2>
                      {isVerified && (
                        <Badge className="bg-green-500 text-white">Verified</Badge>
                      )}
                    </div>
                    <p className="text-gray-500">{accountType}</p>
                    
                    <div className="mt-2">
                      <p className="text-center text-gray-700">{profileInfo.shortBio}</p>
                    </div>
                    
                    <div className="mt-4 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-700 font-medium">11</span>
                      <span className="text-gray-500 ml-1">Months on Airbnb</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6 overflow-hidden shadow-sm border border-gray-100 rounded-[29px]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Mbolela's confirmed information</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3 text-green-600">
                        <Check className="h-5 w-5" />
                      </div>
                      <span>Email address</span>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3 text-green-600">
                        <Check className="h-5 w-5" />
                      </div>
                      <span>Phone number</span>
                    </div>
                    
                    {accountType === "Host" && (
                      <div className="flex items-start">
                        <div className="mt-0.5 mr-3 text-green-600">
                          <Check className="h-5 w-5" />
                        </div>
                        <span>Work email</span>
                      </div>
                    )}
                    
                    {isVerified && (
                      <div className="flex items-start">
                        <div className="mt-0.5 mr-3 text-green-600">
                          <Check className="h-5 w-5" />
                        </div>
                        <span>Identity verification</span>
                      </div>
                    )}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  {!isVerified && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold">Verify your identity</h3>
                      <p className="text-gray-600">Before you book or host on Airbnb, you'll need to complete this step.</p>
                      <Button 
                        onClick={() => setShowVerificationWizard(true)}
                        className="w-full bg-[#ffc500] hover:bg-[#ffc500]/90 text-white ring-2 ring-white"
                      >
                        Get verified
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">About {profileInfo.name}</h1>
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Pencil className="h-4 w-4" />
                      Edit profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right">
                          Name
                        </label>
                        <Input 
                          id="name" 
                          value={editedProfile.name} 
                          onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                          className="col-span-3" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="location" className="text-right">
                          Location
                        </label>
                        <Input 
                          id="location" 
                          value={editedProfile.location} 
                          onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                          className="col-span-3" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="shortBio" className="text-right">
                          Short Bio
                        </label>
                        <Input 
                          id="shortBio" 
                          value={editedProfile.shortBio} 
                          onChange={(e) => setEditedProfile({...editedProfile, shortBio: e.target.value})}
                          className="col-span-3" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="bio" className="text-right">
                          Bio
                        </label>
                        <Textarea 
                          id="bio" 
                          value={editedProfile.bio} 
                          onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                          className="col-span-3" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="school" className="text-right">
                          School
                        </label>
                        <Input 
                          id="school" 
                          value={editedProfile.school} 
                          onChange={(e) => setEditedProfile({...editedProfile, school: e.target.value})}
                          className="col-span-3" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="work" className="text-right">
                          Work
                        </label>
                        <Input 
                          id="work" 
                          value={editedProfile.work} 
                          onChange={(e) => setEditedProfile({...editedProfile, work: e.target.value})}
                          className="col-span-3" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="pets" className="text-right">
                          Pets
                        </label>
                        <Input 
                          id="pets" 
                          value={editedProfile.pets} 
                          onChange={(e) => setEditedProfile({...editedProfile, pets: e.target.value})}
                          className="col-span-3" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="tooMuchTime" className="text-right">
                          Too Much Time
                        </label>
                        <Input 
                          id="tooMuchTime" 
                          value={editedProfile.tooMuchTime} 
                          onChange={(e) => setEditedProfile({...editedProfile, tooMuchTime: e.target.value})}
                          className="col-span-3" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="funFact" className="text-right">
                          Fun Fact
                        </label>
                        <Input 
                          id="funFact" 
                          value={editedProfile.funFact} 
                          onChange={(e) => setEditedProfile({...editedProfile, funFact: e.target.value})}
                          className="col-span-3" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="uselessSkill" className="text-right">
                          Useless Skill
                        </label>
                        <Input 
                          id="uselessSkill" 
                          value={editedProfile.uselessSkill} 
                          onChange={(e) => setEditedProfile({...editedProfile, uselessSkill: e.target.value})}
                          className="col-span-3" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="obsession" className="text-right">
                          Obsession
                        </label>
                        <Input 
                          id="obsession" 
                          value={editedProfile.obsession} 
                          onChange={(e) => setEditedProfile({...editedProfile, obsession: e.target.value})}
                          className="col-span-3" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="languages" className="text-right">
                          Languages
                        </label>
                        <Input 
                          id="languages" 
                          value={editedProfile.languages} 
                          onChange={(e) => setEditedProfile({...editedProfile, languages: e.target.value})}
                          className="col-span-3" 
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
                      <Button onClick={handleSaveProfile}>Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <Card className="mb-6 rounded-[29px] border-[#ffc500]/20">
                <CardContent className="p-6 bg-[#ffc500]/5 rounded-[29px]">
                  <h3 className="text-xl font-bold mb-4">Bio</h3>
                  <p className="text-gray-700">{profileInfo.bio}</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start">
                  <GraduationCap className="h-6 w-6 mr-3 text-gray-700 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700">Where I went to school:</p>
                    <p className="font-medium">{profileInfo.school}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Briefcase className="h-6 w-6 mr-3 text-gray-700 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700">My work:</p>
                    <p className="font-medium">{profileInfo.work}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Dog className="h-6 w-6 mr-3 text-gray-700 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700">Pets:</p>
                    <p className="font-medium">{profileInfo.pets}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 mr-3 text-gray-700 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700">I spend too much time:</p>
                    <p className="font-medium">{profileInfo.tooMuchTime}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <LightbulbIcon className="h-6 w-6 mr-3 text-gray-700 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700">Fun fact:</p>
                    <p className="font-medium">{profileInfo.funFact}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Pencil className="h-6 w-6 mr-3 text-gray-700 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700">Most useless skill:</p>
                    <p className="font-medium">{profileInfo.uselessSkill}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Heart className="h-6 w-6 mr-3 text-gray-700 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700">I'm obsessed with:</p>
                    <p className="font-medium">{profileInfo.obsession}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Globe className="h-6 w-6 mr-3 text-gray-700 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700">Speaks:</p>
                    <p className="font-medium">{profileInfo.languages}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-3 text-gray-700 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700">Lives in:</p>
                    <p className="font-medium">{profileInfo.location}</p>
                  </div>
                </div>
              </div>
              
              <Separator className="my-8" />
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Ask Mbolela about</h2>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="py-2 px-4 bg-white border-gray-300 text-gray-800 flex items-center gap-2 rounded-full hover:bg-gray-50">
                    <Camera className="h-4 w-4" />
                    Photography
                  </Badge>
                  <Badge variant="outline" className="py-2 px-4 bg-white border-gray-300 text-gray-800 flex items-center gap-2 rounded-full hover:bg-gray-50">
                    <Home className="h-4 w-4" />
                    Architecture
                  </Badge>
                  <Badge variant="outline" className="py-2 px-4 bg-white border-gray-300 text-gray-800 flex items-center gap-2 rounded-full hover:bg-gray-50">
                    <BookOpen className="h-4 w-4" />
                    Local culture
                  </Badge>
                </div>
              </div>
              
              {!isVerified && (
                <Card className="overflow-hidden shadow-sm border border-gray-200 mb-8 rounded-[29px]">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h3 className="text-xl font-bold">Complete your profile</h3>
                        <p className="text-gray-600">Add more information to help hosts or guests know you better.</p>
                      </div>
                      <Button 
                        onClick={() => setShowProfileWizard(true)} 
                        className="whitespace-nowrap bg-[#ffc500] hover:bg-[#ffc500]/90 text-white"
                      >
                        Complete Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
