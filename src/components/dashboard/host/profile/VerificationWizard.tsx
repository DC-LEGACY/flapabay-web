import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Camera, Check, FileText, Globe, Lock, Shield, Upload, UserCheck, X, Phone } from "lucide-react";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface VerificationWizardProps {
  onComplete: (isVerified: boolean) => void;
  onCancel: () => void;
}

export const VerificationWizard = ({ onComplete, onCancel }: VerificationWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [otpValue, setOtpValue] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [idFrontFile, setIdFrontFile] = useState<File | null>(null);
  const [idBackFile, setIdBackFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [docsVerified, setDocsVerified] = useState(false);
  const [isVerificationComplete, setIsVerificationComplete] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const stepTitles = [
    "Identity Verification",
    "Profile Confirmation",
    "Security Check"
  ];
  
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    if (idFrontFile && idBackFile && selfieFile && !docsVerified) {
      const verifyTimeout = setTimeout(() => {
        setDocsVerified(true);
        toast.success("Documents verified successfully!");
      }, 2000);
      
      return () => clearTimeout(verifyTimeout);
    }
  }, [idFrontFile, idBackFile, selfieFile, docsVerified]);
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      toast.success(`${stepTitles[currentStep - 1]} completed!`);
    } else {
      setIsVerificationComplete(true);
      
      const verificationStatus = emailVerified && phoneVerified && docsVerified;
      toast.success("Verification process completed!");
      
      setTimeout(() => {
        onComplete(verificationStatus);
      }, 1500);
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

  const handleIdFrontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdFrontFile(e.target.files[0]);
      toast.success("Front ID uploaded successfully");
    }
  };

  const handleIdBackUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdBackFile(e.target.files[0]);
      toast.success("Back ID uploaded successfully");
    }
  };

  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      toast.error("Unable to access camera");
      console.error("Error accessing camera:", err);
    }
  };

  const takeSelfie = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "selfie.jpg", { type: "image/jpeg" });
            setSelfieFile(file);
            toast.success("Selfie captured successfully");
            
            const stream = video.srcObject as MediaStream;
            if (stream) {
              stream.getTracks().forEach(track => track.stop());
            }
            setShowCamera(false);
          }
        }, 'image/jpeg');
      }
    }
  };

  const verifyPhone = () => {
    toast.success("Verification code sent to your phone");
  };

  const verifyOTP = () => {
    if (otpValue === "123456") {
      setPhoneVerified(true);
      toast.success("Phone verified successfully!");
    } else {
      toast.error("Invalid OTP. Try 123456 for demo");
    }
  };

  const verifyEmail = () => {
    setEmailVerified(true);
    toast.success("Email verified successfully!");
  };
  
  if (isVerificationComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="overflow-hidden rounded-[29px]">
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Verification Complete!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for completing the verification process. Your account has been successfully verified.
              </p>
              <Button 
                onClick={() => onComplete(true)} 
                className="bg-[#ffc500] hover:bg-[#ffc500]/90 text-white px-8 ring-2 ring-white"
              >
                Return to Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Get Verified</h2>
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
            {currentStep === 1 && "Verify your identity to build trust in the community"}
            {currentStep === 2 && "Review and confirm your profile information"}
            {currentStep === 3 && "Set up security measures to protect your account"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="bg-[#ffc500]/5">
          {currentStep === 1 && (
            <div className="space-y-6">
              {docsVerified && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4 text-green-800 mb-4">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 mt-0.5 mr-2" />
                    <div>
                      <p className="font-medium">Identity documents verified successfully!</p>
                      <p className="text-sm mt-1">
                        Your identity has been verified. You can proceed to the next step.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 mt-0.5 mr-2" />
                  <div>
                    <p className="font-medium">Why verify your identity?</p>
                    <p className="text-sm mt-1">
                      Identity verification helps build trust between hosts and guests. 
                      Your ID information is handled securely and never shared publicly.
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
                  <div className="relative">
                    <input 
                      type="file" 
                      id="id-front" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleIdFrontUpload}
                    />
                    <label 
                      htmlFor="id-front"
                      className={`flex flex-col items-center justify-center h-36 rounded-md cursor-pointer border-2 border-dashed 
                      ${idFrontFile ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'} 
                      transition-colors p-4`}
                    >
                      {idFrontFile ? (
                        <>
                          <Check className="h-8 w-8 text-green-500 mb-2" />
                          <p className="font-medium text-sm">Front of ID uploaded</p>
                          <p className="text-xs text-gray-500 mt-1">{idFrontFile.name}</p>
                        </>
                      ) : (
                        <>
                          <FileText className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="font-medium text-sm">Front of ID</p>
                          <p className="text-xs text-gray-500 mt-1">Click to upload</p>
                        </>
                      )}
                    </label>
                  </div>
                  
                  <div className="relative">
                    <input 
                      type="file" 
                      id="id-back" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleIdBackUpload}
                    />
                    <label 
                      htmlFor="id-back"
                      className={`flex flex-col items-center justify-center h-36 rounded-md cursor-pointer border-2 border-dashed 
                      ${idBackFile ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'} 
                      transition-colors p-4`}
                    >
                      {idBackFile ? (
                        <>
                          <Check className="h-8 w-8 text-green-500 mb-2" />
                          <p className="font-medium text-sm">Back of ID uploaded</p>
                          <p className="text-xs text-gray-500 mt-1">{idBackFile.name}</p>
                        </>
                      ) : (
                        <>
                          <FileText className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="font-medium text-sm">Back of ID</p>
                          <p className="text-xs text-gray-500 mt-1">Click to upload</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>
                
                <div className="space-y-2 mt-4">
                  <Label>Selfie Verification</Label>
                  {showCamera ? (
                    <div className="border rounded-md p-4 space-y-4">
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        className="w-full rounded-md"
                      />
                      <div className="flex justify-center">
                        <Button onClick={takeSelfie} className="bg-[#ffc500] hover:bg-[#ffc500]/90 text-white">
                          <Camera className="mr-2 h-4 w-4" /> Take Photo
                        </Button>
                      </div>
                      <canvas ref={canvasRef} className="hidden" />
                    </div>
                  ) : (
                    <div 
                      className={`border-2 border-dashed ${selfieFile ? 'border-green-500 bg-green-50' : 'border-gray-200'} 
                      rounded-md p-6 flex flex-col items-center justify-center h-40 cursor-pointer hover:bg-gray-50 transition-colors`}
                      onClick={() => !selfieFile && startCamera()}
                    >
                      {selfieFile ? (
                        <>
                          <Check className="h-8 w-8 text-green-500 mb-2" />
                          <p className="font-medium text-sm">Selfie captured successfully</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelfieFile(null);
                              startCamera();
                            }}
                          >
                            Retake
                          </Button>
                        </>
                      ) : (
                        <>
                          <Camera className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="font-medium text-sm">Take a selfie</p>
                          <p className="text-xs text-gray-500 mt-1 text-center">
                            We'll compare this with your ID photo to verify it's you
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name (as on ID)</Label>
                  <Input id="fullName" placeholder="Mbolela" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Lusaka" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <Input id="country" placeholder="Zambia" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shortBio">Short Bio</Label>
                  <Input id="shortBio" placeholder="Tell us a bit about yourself" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phoneVerification" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Phone Verification
                  </Label>
                  <div className="space-y-3">
                    <div className="flex">
                      <Input id="phoneVerification" placeholder="+260 97 123 4567" />
                      <Button 
                        variant="outline" 
                        className="ml-2 whitespace-nowrap"
                        onClick={verifyPhone}
                      >
                        Send Code
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Enter verification code (use 123456 for demo)</Label>
                      <div className="flex justify-between items-center">
                        <InputOTP 
                          maxLength={6} 
                          value={otpValue} 
                          onChange={setOtpValue}
                          render={({ slots }) => (
                            <InputOTPGroup>
                              {slots.map((slot, index) => (
                                <InputOTPSlot key={index} {...slot} index={index} />
                              ))}
                            </InputOTPGroup>
                          )}
                        />
                        <Button 
                          onClick={verifyOTP} 
                          className="ml-4"
                          disabled={otpValue.length < 6}
                        >
                          Verify
                        </Button>
                      </div>
                      {phoneVerified && (
                        <div className="flex items-center text-green-600 text-sm mt-2">
                          <Check className="h-4 w-4 mr-1" /> Phone verified successfully
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
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
                      <p className="font-medium">Confirm email address</p>
                      <p className="text-sm text-gray-500">We'll send a verification code to your email</p>
                    </div>
                    <Button 
                      size="sm"
                      onClick={verifyEmail}
                      disabled={emailVerified}
                      className={emailVerified ? "bg-green-500" : ""}
                    >
                      {emailVerified ? "Verified" : "Verify"}
                    </Button>
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
                      <p className="font-medium">Accept terms & conditions</p>
                      <p className="text-sm text-gray-500">Review and agree to our policies</p>
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
          
          <Button 
            onClick={handleNext} 
            className="bg-[#ffc500] hover:bg-[#ffc500]/90 text-white ring-2 ring-white"
            disabled={currentStep === 1 && (!idFrontFile || !idBackFile || !selfieFile)}
          >
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
