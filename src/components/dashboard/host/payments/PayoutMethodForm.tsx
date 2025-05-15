
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { Smartphone, CreditCard, Building, Globe } from "lucide-react";
import { countries, getCountryByCode, getMobileProvidersByCountry } from "@/lib/countries";

interface PayoutMethodFormProps {
  initialData?: {
    id: number;
    type: string;
    provider: string;
    number: string;
    default: boolean;
    country?: string;
  };
  onComplete: (data: any) => void;
  onCancel: () => void;
}

export const PayoutMethodForm = ({ initialData, onComplete, onCancel }: PayoutMethodFormProps) => {
  const isEditing = !!initialData;
  
  // Determine initial method type from initialData
  const getInitialMethodType = () => {
    if (!initialData) return "mobile-money";
    
    if (initialData.type === "Mobile Money") return "mobile-money";
    if (initialData.type === "Credit Card") return "stripe";
    return "wire-transfer";
  };
  
  const [step, setStep] = useState<'country' | 'method' | 'details' | 'verify'>(initialData?.country ? 'method' : 'country');
  const [selectedCountry, setSelectedCountry] = useState(initialData?.country || "GH");
  const [payoutMethod, setPayoutMethod] = useState(getInitialMethodType());
  const [provider, setProvider] = useState(initialData?.provider || "");
  const [number, setNumber] = useState(initialData?.number || "");
  const [otp, setOtp] = useState("");

  // Get available payment methods for the selected country
  const countryData = getCountryByCode(selectedCountry);
  let availablePaymentMethods = countryData?.paymentMethods || ["mobile-money", "wire"];
  
  // Adding specific payment methods for USA and Zambia
  if (selectedCountry === "US") {
    availablePaymentMethods = ["stripe", "wire"];
  } else if (selectedCountry === "ZM") {
    availablePaymentMethods = ["mobile-money", "wire"];
  }
  
  const mobileProviders = getMobileProvidersByCountry(selectedCountry);
  
  // Special case for Zambia mobile providers
  const zambianProviders = [
    { id: "zm1", name: "MTN Money" },
    { id: "zm2", name: "Airtel Money" },
    { id: "zm3", name: "Zamtel Money" }
  ];
  
  // If the selected payment method is not available for the country, select the first available
  useEffect(() => {
    if (countryData && !availablePaymentMethods.includes(payoutMethod as any)) {
      setPayoutMethod(availablePaymentMethods[0]);
    }
  }, [selectedCountry, payoutMethod, availablePaymentMethods]);
  
  const handleContinue = () => {
    if (step === 'country') {
      setStep('method');
    } else if (step === 'method') {
      setStep('details');
    } else if (step === 'details') {
      // Validate fields based on selected method
      if (payoutMethod === "mobile-money") {
        if (!provider || !number) {
          toast.error("Please fill out all fields");
          return;
        }
        
        // Simple validation for phone number format
        if (!/^\+?\d[\d\s-]+$/.test(number)) {
          toast.error("Please enter a valid phone number");
          return;
        }
      } else if (payoutMethod === "wire-transfer") {
        if (!provider || !number) {
          toast.error("Please fill out all fields");
          return;
        }
        
        // Basic validation for account number (should be numeric)
        if (!/^\d+$/.test(number.replace(/[- ]/g, ''))) {
          toast.error("Please enter a valid account number");
          return;
        }
      } else if (payoutMethod === "stripe") {
        if (!provider) {
          toast.error("Please enter a card name");
          return;
        }
      }
      
      // For both new setup and editing, always require OTP verification
      setStep('verify');
    } else if (step === 'verify') {
      // In a real app, verify OTP with backend
      if (otp === "123456") {
        onComplete({
          id: initialData?.id || Date.now(),
          payoutMethod,
          provider,
          number,
          country: selectedCountry
        });
      } else {
        toast.error("Invalid OTP code. For this demo, please use: 123456");
      }
    }
  };
  
  const handleBack = () => {
    if (step === 'method') {
      setStep('country');
    } else if (step === 'details') {
      setStep('method');
    } else if (step === 'verify') {
      setStep('details');
    }
  };
  
  // Helper to get mobile providers based on the current country
  const getCurrentMobileProviders = () => {
    if (selectedCountry === "ZM") {
      return zambianProviders;
    }
    return mobileProviders;
  };
  
  return (
    <div className="space-y-4 py-4">
      {step === 'country' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="country">Select Your Country</Label>
            <Select 
              value={selectedCountry} 
              onValueChange={setSelectedCountry}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {/* Ensure Zambia and USA are included */}
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center">
                      <span className="mr-2">{country.flag}</span>
                      <span>{country.name}</span>
                    </div>
                  </SelectItem>
                ))}
                <SelectItem value="ZM">
                  <div className="flex items-center">
                    <span className="mr-2">🇿🇲</span>
                    <span>Zambia</span>
                  </div>
                </SelectItem>
                <SelectItem value="US">
                  <div className="flex items-center">
                    <span className="mr-2">🇺🇸</span>
                    <span>United States</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-4 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              type="button" 
              className="bg-[#ffc500] hover:bg-amber-500 text-black"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
      
      {step === 'method' && (
        <div className="space-y-4">
          <RadioGroup 
            value={payoutMethod} 
            onValueChange={setPayoutMethod}
            className="space-y-3"
          >
            {availablePaymentMethods.includes("mobile-money") && (
              <div className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 ${payoutMethod === "mobile-money" ? "border-[#ffc500] bg-[#ffc500]/5" : ""}`}>
                <RadioGroupItem value="mobile-money" id="mobile-money" />
                <Label htmlFor="mobile-money" className="flex items-center cursor-pointer flex-1">
                  <Smartphone className="mr-3 h-5 w-5 text-[#ffc500]" />
                  <div>
                    <p className="font-medium">Mobile Money</p>
                    <p className="text-sm text-muted-foreground">Receive funds directly to your mobile wallet</p>
                  </div>
                </Label>
              </div>
            )}
            
            {availablePaymentMethods.includes("wire") && (
              <div className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 ${payoutMethod === "wire-transfer" ? "border-[#ffc500] bg-[#ffc500]/5" : ""}`}>
                <RadioGroupItem value="wire-transfer" id="wire-transfer" />
                <Label htmlFor="wire-transfer" className="flex items-center cursor-pointer flex-1">
                  <Building className="mr-3 h-5 w-5 text-[#ffc500]" />
                  <div>
                    <p className="font-medium">Bank Account</p>
                    <p className="text-sm text-muted-foreground">Connect your bank account for direct deposits</p>
                  </div>
                </Label>
              </div>
            )}
            
            {availablePaymentMethods.includes("stripe") && (
              <div className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 ${payoutMethod === "stripe" ? "border-[#ffc500] bg-[#ffc500]/5" : ""}`}>
                <RadioGroupItem value="stripe" id="stripe" />
                <Label htmlFor="stripe" className="flex items-center cursor-pointer flex-1">
                  <CreditCard className="mr-3 h-5 w-5 text-[#ffc500]" />
                  <div>
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-sm text-muted-foreground">Withdraw funds to your Stripe account</p>
                  </div>
                </Label>
              </div>
            )}
          </RadioGroup>
          
          <div className="pt-4 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button 
              type="button" 
              className="bg-[#ffc500] hover:bg-amber-500 text-black"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
      
      {step === 'details' && (
        <div className="space-y-4">
          {payoutMethod === "mobile-money" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="provider">Mobile Money Provider</Label>
                {getCurrentMobileProviders().length > 0 ? (
                  <Select 
                    value={provider} 
                    onValueChange={setProvider}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {getCurrentMobileProviders().map((p) => (
                        <SelectItem key={p.id} value={p.name}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input 
                    id="provider" 
                    placeholder="e.g., MTN Mobile Money, Vodafone Cash" 
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                  />
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  placeholder={selectedCountry === "ZM" ? "+260 97 123 4567" : selectedCountry === "US" ? "+1 234 567 8901" : "+Country Code Number"}
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
            </>
          )}
          
          {payoutMethod === "wire-transfer" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="bank">Bank Name</Label>
                <Input 
                  id="bank" 
                  placeholder={selectedCountry === "ZM" ? "e.g., Stanbic Bank, Absa Bank" : selectedCountry === "US" ? "e.g., Chase Bank, Bank of America" : "Enter bank name"}
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="account">Account Number</Label>
                <Input 
                  id="account" 
                  placeholder="e.g., 123456789" 
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
            </>
          )}
          
          {payoutMethod === "stripe" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="card-name">Card Nickname</Label>
                <Input 
                  id="card-name" 
                  placeholder="e.g., My Visa Card" 
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                />
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm">
                  This will connect to Stripe for secure payment processing.
                  <br />
                  <span className="text-muted-foreground">(Demo mode: Card details will be simulated)</span>
                </p>
              </div>
            </>
          )}
          
          <div className="pt-4 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button 
              type="button" 
              className="bg-[#ffc500] hover:bg-amber-500 text-black"
              onClick={handleContinue}
            >
              Continue to Verification
            </Button>
          </div>
        </div>
      )}
      
      {step === 'verify' && (
        <div className="space-y-4">
          <p className="text-sm text-center">
            For your security, we need to verify this change.
            <br />
            We've sent a verification code to your registered phone number.
            <br />
            <span className="text-muted-foreground">(For demo, use code: 123456)</span>
          </p>
          
          <div className="flex justify-center py-4">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          <div className="pt-4 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button 
              type="button" 
              className="bg-[#ffc500] hover:bg-amber-500 text-black"
              onClick={handleContinue}
              disabled={otp.length < 6}
            >
              Verify & Complete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
