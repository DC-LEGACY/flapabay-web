import { useState, useEffect } from "react";
import { usePage } from "@/contexts/PageContext";
import { Button } from "@/components/dashboard/host/ui/button";
import { Input } from "@/components/dashboard/host/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/dashboard/host/ui/card";
import { Label } from "@/components/dashboard/host/ui/label";
import { Separator } from "@/components/dashboard/host/ui/separator";
import { Switch } from "@/components/dashboard/host/ui/switch";
import { toast } from "sonner";
import { ArrowLeft, Check, MailCheck, Phone, Shield, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/dashboard/host/ui/input-otp";

const LoginSecurity = () => {
  const { setPageTitle, setPageSubtitle } = usePage();

  useEffect(() => {
    setPageTitle("Login & Security");
    setPageSubtitle("Manage your password, two-factor authentication, and active sessions");
  }, [setPageTitle, setPageSubtitle]);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [otp, setOtp] = useState("");

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all password fields");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    // Simulate password change
    toast.success("Password updated successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleTwoFactorToggle = () => {
    if (!twoFactorEnabled) {
      // Starting 2FA setup
      setShowTwoFactorSetup(true);
    } else {
      // Turning off 2FA
      setTwoFactorEnabled(false);
      toast("Two-factor authentication disabled");
    }
  };

  const verifyTwoFactor = () => {
    if (otp === "123456") {
      setTwoFactorEnabled(true);
      setShowTwoFactorSetup(false);
      toast.success("Two-factor authentication enabled successfully");
    } else {
      toast.error("Invalid verification code. For this demo, use: 123456");
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Password Section */}
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input 
                    id="current-password" 
                    type="password" 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="mt-2">Update Password</Button>
              </form>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent>
              {!showTwoFactorSetup ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">Two-factor authentication</div>
                      <div className="text-sm text-muted-foreground">
                        Protect your account with an extra verification step when logging in
                      </div>
                    </div>
                    <Switch 
                      checked={twoFactorEnabled} 
                      onCheckedChange={handleTwoFactorToggle} 
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Set up two-factor authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll send a verification code to your phone when you log in on a new device.
                    </p>
                  </div>
                  
                  <div className="flex items-center p-4 border rounded-md bg-muted/20">
                    <Smartphone className="h-10 w-10 text-[#ffc500] mr-4" />
                    <div>
                      <div className="font-medium">Via SMS or Phone Call</div>
                      <div className="text-sm">+260 97 123 4567</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm">
                      We've sent a verification code to your phone.
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
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowTwoFactorSetup(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={verifyTwoFactor}>
                        Verify and Enable
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Linked Accounts */}
          <Card>
            <CardHeader>
              <CardTitle>Linked Accounts</CardTitle>
              <CardDescription>Connect your social accounts for easier login</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <div className="bg-blue-500 text-white p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </div>
                    <div>Facebook</div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <div className="bg-black text-white p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                    </div>
                    <div>GitHub</div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <div className="bg-red-500 text-white p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </div>
                    <div>Google</div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>Manage where you're currently logged in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-start space-x-4">
                    <Shield className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <div className="font-medium">Chrome on Windows</div>
                      <div className="text-sm text-muted-foreground">
                        Current active session • Lusaka, Zambia
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Last active: Just now
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Current
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-start space-x-4">
                    <Smartphone className="h-6 w-6 text-[#ffc500] mt-1" />
                    <div>
                      <div className="font-medium">Safari on iPhone</div>
                      <div className="text-sm text-muted-foreground">
                        Lusaka, Zambia
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Last active: 2 days ago
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Log out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginSecurity;
