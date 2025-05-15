import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Camera, Check, CreditCard, FileText, Home, Lock, Shield, Upload, UserCheck } from "lucide-react";
import { toast } from "sonner";

interface HostVerificationProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const HostVerification = ({ onComplete, onCancel }: HostVerificationProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const stepTitles = [
    "Identity Verification",
    "Address Verification", 
    "Payment Setup",
    "Security Check"
  ];
  
  const progress = (currentStep / totalSteps) * 100;
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Show success toast for completing each step
      toast.success(`${stepTitles[currentStep - 1]} completed!`);
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
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Host Verification</h2>
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}</span>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <Card className="rounded-[29px]">
        <CardHeader>
          <CardTitle>{stepTitles[currentStep - 1]}</CardTitle>
          <CardDescription>
            {currentStep === 1 && "Verify your identity to build trust on the platform"}
            {currentStep === 2 && "Verify your address to confirm your location"}
            {currentStep === 3 && "Set up your payment methods to receive payments"}
            {currentStep === 4 && "Complete security checks to protect your account"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="bg-[#ffc500]/5">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 mt-0.5 mr-2" />
                  <div>
                    <p className="font-medium">Why do we need to verify your identity?</p>
                    <p className="text-sm mt-1">
                      Identity verification helps create trust and safety in our community. Your information is securely encrypted and never shared with other users.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="idType">ID Type</Label>
                  <select id="idType" className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option>Passport</option>
                    <option>Driver's License</option>
                    <option>National ID Card</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-gray-200 rounded-md p-4 flex flex-col items-center justify-center min-h-[140px] cursor-pointer hover:bg-gray-50 transition-colors">
                    <FileText className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="font-medium text-sm">Front of ID</p>
                    <p className="text-xs text-gray-500 mt-1">Click to upload</p>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-200 rounded-md p-4 flex flex-col items-center justify-center min-h-[140px] cursor-pointer hover:bg-gray-50 transition-colors">
                    <FileText className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="font-medium text-sm">Back of ID</p>
                    <p className="text-xs text-gray-500 mt-1">Click to upload</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Selfie Verification</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-md p-6 flex flex-col items-center justify-center min-h-[140px] cursor-pointer hover:bg-gray-50 transition-colors">
                    <Camera className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="font-medium text-sm">Take a selfie</p>
                    <p className="text-xs text-gray-500 mt-1 text-center">
                      We'll compare this with your ID photo to verify it's you
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address1">Address Line 1</Label>
                  <Input id="address1" placeholder="123 Main St" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address2">Address Line 2 (Optional)</Label>
                  <Input id="address2" placeholder="Apt 4B" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="San Francisco" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" placeholder="California" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip/Postal Code</Label>
                    <Input id="zipCode" placeholder="94103" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" placeholder="United States" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Proof of Address</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-md p-4 flex flex-col items-center justify-center min-h-[100px] cursor-pointer hover:bg-gray-50 transition-colors">
                    <Upload className="h-6 w-6 text-gray-400 mb-2" />
                    <p className="font-medium text-sm">Upload document</p>
                    <p className="text-xs text-gray-500 mt-1 text-center">
                      Utility bill, bank statement, or rental agreement (issued within last 3 months)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type</Label>
                  <select id="accountType" className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option>Bank Account</option>
                    <option>PayPal</option>
                    <option>Stripe Connect</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Holder Name</Label>
                  <Input id="accountName" placeholder="John Doe" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input id="accountNumber" placeholder="XXXX-XXXX-XXXX-XXXX" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="routingNumber">Routing Number</Label>
                    <Input id="routingNumber" placeholder="123456789" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input id="bankName" placeholder="Bank of America" />
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-blue-800">
                  <div className="flex items-start">
                    <Lock className="h-5 w-5 mt-0.5 mr-2" />
                    <div>
                      <p className="font-medium">Secure Payment Processing</p>
                      <p className="text-sm mt-1">
                        Your banking information is encrypted and processed securely. We follow industry-standard practices to protect your financial data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Almost Done!</h3>
                <p className="text-center text-gray-500 mb-6">Complete these final security steps to finish your verification</p>
                
                <div className="w-full space-y-4">
                  <div className="flex items-center p-4 border rounded-md">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                      <UserCheck className="h-4 w-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Confirm your contact details</p>
                      <p className="text-sm text-gray-500">We'll send a verification code to your phone</p>
                    </div>
                    <Button size="sm">Verify</Button>
                  </div>
                  
                  <div className="flex items-center p-4 border rounded-md">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                      <Lock className="h-4 w-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Set up two-factor authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Button size="sm">Set up</Button>
                  </div>
                  
                  <div className="flex items-center p-4 border rounded-md">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Accept host terms & conditions</p>
                      <p className="text-sm text-gray-500">Review and agree to our hosting policies</p>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {currentStep === 1 ? "Cancel" : "Back"}
          </Button>
          
          <Button onClick={handleNext} className="bg-[#ffc500] hover:bg-[#ffc500]/90 text-white ring-2 ring-white">
            {currentStep < totalSteps ? (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Complete Verification
                <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
