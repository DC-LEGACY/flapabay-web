
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { Check, Banknote, CreditCard, Smartphone, AlertCircle } from "lucide-react";

interface WithdrawFundsProps {
  balance: number;
  selectedCurrency: {
    currency: string;
    symbol: string;
    rate: number;
  };
  defaultPayoutMethod?: {
    type: string;
    provider: string;
    number: string;
  };
  onSuccess: (amount: number) => void;
}

export const WithdrawFunds = ({ 
  balance, 
  selectedCurrency, 
  defaultPayoutMethod = { 
    type: "Mobile Money", 
    provider: "MTN Mobile Money", 
    number: "+233 20 123 4567" 
  },
  onSuccess 
}: WithdrawFundsProps) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'amount' | 'confirm' | 'otp' | 'success'>('amount');
  const [amount, setAmount] = useState<number | "">("");
  const [otp, setOtp] = useState("");
  
  // The conversion is now handled using the selectedCurrency from props
  const minimumWithdrawal = 10; // $10 minimum withdrawal in USD
  
  // Format currency with the selected currency symbol
  const formatCurrency = (value: number) => {
    return `${selectedCurrency.symbol}${(value * selectedCurrency.rate).toFixed(2)}`;
  };
  
  // Convert USD amount to selected currency for display
  const convertAmount = (usdAmount: number): number => {
    return usdAmount * selectedCurrency.rate;
  };
  
  // Convert selected currency back to USD for processing
  const convertToUSD = (localAmount: number): number => {
    return localAmount / selectedCurrency.rate;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof amount !== 'number' || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    // Convert to USD for minimum check
    const amountInUSD = convertToUSD(amount);
    
    // Check if amount is below minimum withdrawal
    if (amountInUSD < minimumWithdrawal) {
      toast.error(`Minimum withdrawal amount is ${formatCurrency(minimumWithdrawal)}`);
      return;
    }
    
    if (amountInUSD > balance) {
      toast.error("Withdrawal amount cannot exceed your available balance");
      return;
    }
    
    setStep('confirm');
  };
  
  const handleConfirm = () => {
    setStep('otp');
  };
  
  const handleVerifyOtp = () => {
    // In a real app, this would verify the OTP against the backend
    // For demo purposes, we'll check if OTP is "123456"
    if (otp === "123456") {
      setStep('success');
      
      // Mock processing delay
      setTimeout(() => {
        if (typeof amount === 'number') {
          // Convert back to USD for backend processing
          const amountInUSD = convertToUSD(amount);
          onSuccess(amountInUSD);
          setOpen(false);
          setStep('amount');
          setAmount("");
          setOtp("");
          toast.success(`${formatCurrency(amountInUSD)} has been withdrawn successfully to your default payout method`);
        }
      }, 1000);
    } else {
      toast.error("Invalid OTP code. For this demo, please use: 123456");
    }
  };
  
  // Helper function to get a relevant icon for the payment method
  const getMethodIcon = () => {
    switch (defaultPayoutMethod.type) {
      case "Mobile Money":
        return <Smartphone className="mr-2 h-4 w-4" />;
      case "Credit Card":
        return <CreditCard className="mr-2 h-4 w-4" />;
      default:
        return <Banknote className="mr-2 h-4 w-4" />;
    }
  };
  
  return (
    <>
      <Button 
        onClick={() => setOpen(true)} 
        variant="outline" 
        className="w-full border-amber-200 hover:bg-amber-50"
      >
        Withdraw Funds
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {step === 'amount' && "Withdraw Funds"}
              {step === 'confirm' && "Confirm Withdrawal"}
              {step === 'otp' && "Verify OTP"}
              {step === 'success' && "Withdrawal Successful"}
            </DialogTitle>
            <DialogDescription>
              {step === 'amount' && `Enter the amount you want to withdraw in ${selectedCurrency.currency}`}
              {step === 'confirm' && "Please confirm your withdrawal details"}
              {step === 'otp' && "Enter the verification code sent to your phone"}
              {step === 'success' && "Your withdrawal has been processed"}
            </DialogDescription>
          </DialogHeader>
          
          {step === 'amount' && (
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="text-sm text-muted-foreground">
                    Min: {formatCurrency(minimumWithdrawal)}
                  </div>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {selectedCurrency.symbol}
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    className="pl-8"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
                    min={0}
                    step={0.01}
                    required
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <p className="text-muted-foreground">
                    Available balance: {formatCurrency(balance)}
                  </p>
                </div>
                
                {typeof amount === 'number' && convertToUSD(amount) < minimumWithdrawal && (
                  <div className="flex items-center space-x-2 text-amber-600 text-sm mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>Minimum withdrawal: {formatCurrency(minimumWithdrawal)}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Withdrawal Method</Label>
                <div className="flex items-center space-x-2 rounded-md border p-3 bg-gray-50">
                  {getMethodIcon()}
                  <div>
                    <p className="font-medium">{defaultPayoutMethod.provider} (Default)</p>
                    <p className="text-xs text-muted-foreground">{defaultPayoutMethod.number}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Funds will be sent to your default payout method. You can change your default method in the Payout Methods tab.
                </p>
              </div>
              
              <div className="pt-4 flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-[#ffc500] hover:bg-amber-500 text-black"
                  disabled={typeof amount !== 'number' || amount <= 0}
                >
                  Continue
                </Button>
              </div>
            </form>
          )}
          
          {step === 'confirm' && (
            <div className="space-y-4 pt-4">
              <div className="rounded-md bg-gray-50 p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-medium">
                    {formatCurrency(typeof amount === 'number' ? convertToUSD(amount) : 0)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Method:</span>
                  <span className="font-medium">{defaultPayoutMethod.provider} (Default)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Processing time:</span>
                  <span className="font-medium">Instant</span>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setStep('amount')}>
                  Back
                </Button>
                <Button 
                  type="button" 
                  className="bg-[#ffc500] hover:bg-amber-500 text-black"
                  onClick={handleConfirm}
                >
                  Confirm Withdrawal
                </Button>
              </div>
            </div>
          )}
          
          {step === 'otp' && (
            <div className="space-y-4 pt-4">
              <p className="text-sm text-center">
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
                <Button type="button" variant="outline" onClick={() => setStep('confirm')}>
                  Back
                </Button>
                <Button 
                  type="button" 
                  className="bg-[#ffc500] hover:bg-amber-500 text-black"
                  onClick={handleVerifyOtp}
                  disabled={otp.length < 6}
                >
                  Verify & Complete
                </Button>
              </div>
            </div>
          )}
          
          {step === 'success' && (
            <div className="pt-4 flex flex-col items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              
              <p className="text-center mb-6">
                Your withdrawal of {formatCurrency(typeof amount === 'number' ? convertToUSD(amount) : 0)} has been processed successfully!
              </p>
              
              <Button 
                className="bg-[#ffc500] hover:bg-amber-500 text-black"
                onClick={() => {
                  setOpen(false);
                  setStep('amount');
                  setAmount("");
                }}
              >
                Done
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
