
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Briefcase, MapPin, Upload, Languages, HelpCircle, Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface GuestOnboardingWizardProps {
  onComplete: () => void;
  onCancel: () => void;
}

const steps = [
  { id: 'basic', title: 'Basic Info', description: 'Let\'s start with the essentials' },
  { id: 'preferences', title: 'Travel Preferences', description: 'Tell us what you like' },
  { id: 'verification', title: 'Identity Verification', description: 'Help us keep the community safe' },
  { id: 'safety', title: 'Trust & Safety', description: 'Important information for your security' },
];

const basicInfoSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  bio: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  occupation: z.string().optional(),
});

const preferencesSchema = z.object({
  accommodationTypes: z.array(z.string()).optional(),
  travelInterests: z.array(z.string()).optional(),
  budgetMin: z.string().optional(),
  budgetMax: z.string().optional(),
  mustHaveAmenities: z.array(z.string()).optional(),
});

const verificationSchema = z.object({
  idType: z.string().optional(),
  idAgree: z.boolean().optional(),
});

const safetySchema = z.object({
  emergencyName: z.string().optional(),
  emergencyPhone: z.string().optional(),
  agreementCheck: z.boolean().optional(),
});

const GuestOnboardingWizard: React.FC<GuestOnboardingWizardProps> = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const { user } = useAuth();

  const basicForm = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      fullName: user?.user_metadata?.full_name || "",
      bio: "",
      phone: "",
      location: "",
      occupation: "",
    },
  });

  const preferencesForm = useForm<z.infer<typeof preferencesSchema>>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      accommodationTypes: [],
      travelInterests: [],
      budgetMin: "",
      budgetMax: "",
      mustHaveAmenities: [],
    },
  });

  const verificationForm = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      idType: "passport",
      idAgree: false,
    },
  });

  const safetyForm = useForm<z.infer<typeof safetySchema>>({
    resolver: zodResolver(safetySchema),
    defaultValues: {
      emergencyName: "",
      emergencyPhone: "",
      agreementCheck: false,
    },
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onCancel();
    }
  };

  const handleComplete = () => {
    toast({
      title: "Profile updated successfully!",
      description: "Your guest profile has been updated with the new information.",
    });
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Guest Profile</CardTitle>
          <CardDescription>Let's personalize your experience on FlapaBay</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          {/* Progress Steps */}
          <div className="mb-8 px-6">
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      index < currentStep 
                        ? 'bg-primary text-flapabay-yellow-foreground' 
                        : index === currentStep 
                        ? 'bg-primary text-flapabay-yellow-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className={`text-xs mt-2 ${index === currentStep ? 'font-medium' : 'text-muted-foreground'}`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-0 h-1 bg-muted w-full rounded-full"></div>
              <div 
                className="absolute top-0 left-0 h-1 bg-primary rounded-full transition-all" 
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Step Content */}
          <div className="px-6">
            {currentStep === 0 && (
              <Form {...basicForm}>
                <form className="space-y-6">
                  <div className="flex items-center justify-center mb-8">
                    <div className="relative group">
                      <Avatar className="h-24 w-24 border-2 border-primary">
                        <AvatarImage src={user?.user_metadata?.avatar_url || "/placeholder.svg"} alt="Profile" />
                        <AvatarFallback>
                          {user?.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                        <Upload className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <FormField
                    control={basicForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={basicForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell others about yourself" {...field} />
                        </FormControl>
                        <FormDescription>
                          Share a little about yourself, your travel style, and interests.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={basicForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 555-5555" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={basicForm.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="City, Country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={basicForm.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occupation</FormLabel>
                        <FormControl>
                          <Input placeholder="What do you do?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}
            
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Accommodation Types</h3>
                  <p className="text-sm text-muted-foreground mb-4">Select all that you prefer</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Entire homes', 'Private rooms', 'Shared rooms', 'Luxury', 'Budget', 'Pet-friendly', 
                      'Beach houses', 'Mountain cabins', 'City apartments', 'Unique stays'].map((type) => (
                      <div 
                        key={type}
                        className="border rounded-lg p-3 cursor-pointer hover:bg-primary/5 transition-colors flex items-center gap-2"
                      >
                        <input type="checkbox" id={type} className="rounded" />
                        <label htmlFor={type} className="text-sm cursor-pointer">{type}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Travel Interests</h3>
                  <p className="text-sm text-muted-foreground mb-4">What do you enjoy when traveling?</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Food & Wine', 'Nature', 'Photography', 'Cultural', 'Adventure', 'Relaxation', 
                      'Nightlife', 'Shopping', 'Family activities', 'History', 'Art', 'Music'].map((interest) => (
                      <div 
                        key={interest}
                        className="border rounded-lg p-3 cursor-pointer hover:bg-primary/5 transition-colors flex items-center gap-2"
                      >
                        <input type="checkbox" id={interest} className="rounded" />
                        <label htmlFor={interest} className="text-sm cursor-pointer">{interest}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Budget Range</h3>
                  <p className="text-sm text-muted-foreground mb-4">Your typical nightly budget</p>
                  <div className="flex items-center gap-4">
                    <div className="w-1/2">
                      <label className="text-sm">Minimum ($)</label>
                      <Input type="number" placeholder="50" />
                    </div>
                    <div className="w-1/2">
                      <label className="text-sm">Maximum ($)</label>
                      <Input type="number" placeholder="250" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Must-have Amenities</h3>
                  <p className="text-sm text-muted-foreground mb-4">Select your essentials</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['WiFi', 'Kitchen', 'Washer', 'Air conditioning', 'Heating', 'Pool', 'Free parking', 
                      'Gym', 'Hot tub', 'Workspace', 'TV', 'BBQ grill'].map((amenity) => (
                      <div 
                        key={amenity}
                        className="border rounded-lg p-3 cursor-pointer hover:bg-primary/5 transition-colors flex items-center gap-2"
                      >
                        <input type="checkbox" id={amenity} className="rounded" />
                        <label htmlFor={amenity} className="text-sm cursor-pointer">{amenity}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="bg-primary/5 p-4 rounded-lg mb-6">
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-flapabay-yellow" />
                    <div>
                      <h3 className="font-medium">Why verify your identity?</h3>
                      <p className="text-sm text-muted-foreground">Identity verification helps keep our community safe and builds trust between guests and hosts.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Choose ID Type</h3>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-4 cursor-pointer hover:bg-primary/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          id="passport" 
                          name="idType" 
                          value="passport"
                          defaultChecked
                        />
                        <label htmlFor="passport" className="cursor-pointer">
                          <div>
                            <h4 className="font-medium">Passport</h4>
                            <p className="text-sm text-muted-foreground">International travel document</p>
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 cursor-pointer hover:bg-primary/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          id="drivers-license" 
                          name="idType" 
                          value="drivers-license"
                        />
                        <label htmlFor="drivers-license" className="cursor-pointer">
                          <div>
                            <h4 className="font-medium">Driver's License</h4>
                            <p className="text-sm text-muted-foreground">Government-issued photo ID</p>
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 cursor-pointer hover:bg-primary/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          id="national-id" 
                          name="idType" 
                          value="national-id" 
                        />
                        <label htmlFor="national-id" className="cursor-pointer">
                          <div>
                            <h4 className="font-medium">National ID</h4>
                            <p className="text-sm text-muted-foreground">National identity document</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Upload ID Document</h3>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-primary/5 transition-colors">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Upload ID photo</p>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG or PDF up to 10MB</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 mt-6">
                  <input type="checkbox" id="idAgree" className="mt-1" />
                  <label htmlFor="idAgree" className="text-sm">
                    I confirm that all information provided is accurate and the ID document matches my profile information.
                  </label>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-primary/5 p-4 rounded-lg mb-6">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-6 w-6 text-flapabay-yellow" />
                    <div>
                      <h3 className="font-medium">Emergency Contact Information</h3>
                      <p className="text-sm text-muted-foreground">We'll only use this information in case of emergencies during your trips.</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Emergency Contact Name</label>
                    <Input placeholder="Full name" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Emergency Contact Phone</label>
                    <Input placeholder="Phone number" />
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">FlapaBay Community Guidelines</h3>
                  <div className="border rounded-lg p-4 space-y-4">
                    <div>
                      <h4 className="font-medium">Respect</h4>
                      <p className="text-sm text-muted-foreground">Treat hosts and their properties with care and consideration.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Communication</h4>
                      <p className="text-sm text-muted-foreground">Keep open lines of communication with hosts during your stay.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Honesty</h4>
                      <p className="text-sm text-muted-foreground">Be forthright about your party size and intentions for your stay.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">House Rules</h4>
                      <p className="text-sm text-muted-foreground">Always follow the specific rules set by your host.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 mt-6">
                  <input type="checkbox" id="agreementCheck" className="mt-1" />
                  <label htmlFor="agreementCheck" className="text-sm">
                    I agree to follow FlapaBay's community guidelines and understand that violations may affect my ability to book on the platform.
                  </label>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious}>
            {currentStep === 0 ? "Cancel" : "Previous"}
          </Button>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? "Complete Setup" : "Continue"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default GuestOnboardingWizard;
