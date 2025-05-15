
import Dashboard from "@/components/dashboard/Dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Gift, Share2, Users } from "lucide-react";
import { toast } from "sonner";

const Referrals = () => {
  const copyReferralLink = () => {
    navigator.clipboard.writeText("https://hosthaven.com/refer/mbolela123")
      .then(() => toast.success("Referral link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link. Please try again."));
  };

  return (
    <Dashboard>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/account" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Referral Credit & Coupon</h1>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Referral Program</CardTitle>
              <CardDescription>Invite friends to Host Haven and earn credits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-6 border rounded-md bg-amber-50">
                    <Users className="h-8 w-8 mb-2 text-[#ffc500]" />
                    <p className="text-xl font-bold mb-1">0</p>
                    <p className="text-sm text-center text-muted-foreground">Friends Invited</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-6 border rounded-md bg-amber-50">
                    <Gift className="h-8 w-8 mb-2 text-[#ffc500]" />
                    <p className="text-xl font-bold mb-1">$0</p>
                    <p className="text-sm text-center text-muted-foreground">Credits Earned</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-6 border rounded-md bg-amber-50">
                    <Share2 className="h-8 w-8 mb-2 text-[#ffc500]" />
                    <p className="text-xl font-bold mb-1">$25</p>
                    <p className="text-sm text-center text-muted-foreground">Per Referral</p>
                  </div>
                </div>
                
                <div className="p-6 border rounded-md">
                  <h3 className="text-lg font-medium mb-4">Share your referral link</h3>
                  <div className="flex items-center space-x-2">
                    <Input 
                      readOnly 
                      value="https://hosthaven.com/refer/mbolela123" 
                      className="bg-gray-50"
                    />
                    <Button onClick={copyReferralLink} variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button 
                      className="gap-2 bg-[#1877F2] hover:bg-[#1865D3]"
                      onClick={() => toast.success("Facebook sharing dialog would open")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg>
                      Share on Facebook
                    </Button>
                    
                    <Button 
                      className="gap-2 bg-[#1DA1F2] hover:bg-[#0D8DDB]"
                      onClick={() => toast.success("Twitter sharing dialog would open")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.8a8.49 8.49 0 0 1-2.36.64 4.13 4.13 0 0 0 1.81-2.27 8.21 8.21 0 0 1-2.61 1 4.1 4.1 0 0 0-7 3.74 11.64 11.64 0 0 1-8.45-4.29 4.16 4.16 0 0 0-.55 2.07 4.09 4.09 0 0 0 1.82 3.41 4.05 4.05 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.3 4 3.93 3.93 0 0 1-1.1.15 4.13 4.13 0 0 1-.77-.07 4.1 4.1 0 0 0 3.83 2.84A8.22 8.22 0 0 1 3 18.34a7.93 7.93 0 0 1-1-.06 11.57 11.57 0 0 0 6.29 1.85A11.59 11.59 0 0 0 20 8.45v-.53a8.43 8.43 0 0 0 2-2.12Z"/></svg>
                      Share on Twitter
                    </Button>
                    
                    <Button 
                      className="gap-2 bg-[#25D366] hover:bg-[#20BD5A]"
                      onClick={() => toast.success("WhatsApp sharing dialog would open")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 14.4l-2.9-1.4c-.3-.2-.7 0-.8.3l-.6 1.4c-.1.3-.4.5-.7.4-1-.3-3.2-2.4-3.8-3.4-.1-.3 0-.6.2-.8l1.1-1c.3-.2.3-.6.2-.9L8.1 6.7c-.2-.3-.6-.5-.9-.2-1 .6-2.3 1.9-2 3.6.5 2.6 3.5 6.8 6.2 8 2.6 1.2 4.5.5 5.3-.1.3-.2.3-.6.1-.9l-2.2-2.7z"/><path d="M12 1.9a9.92 9.92 0 0 1 9.9 9.82c0 5.5-4.5 10-10 10-1.8 0-3.5-.5-5-1.3l-4.9 1.6 1.6-4.7a9.8 9.8 0 0 1-1.6-5.5c0-5.5 4.4-9.9 10-9.9m0-1.9C5.4 0 0 5.3 0 11.8c0 2.1.5 4.1 1.6 5.9L0 24l6.5-1.7c1.7 1 3.7 1.5 5.8 1.5 6.6 0 12-5.3 12-11.8S18.7 0 12 0z"/></svg>
                      Share on WhatsApp
                    </Button>
                    
                    <Button 
                      className="gap-2 bg-gray-800 hover:bg-gray-700"
                      onClick={() => toast.success("Email client would open")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                      Share via Email
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>Learn about our referral program</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col">
                    <div className="bg-amber-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold text-[#ffc500]">1</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Invite Friends</h3>
                    <p className="text-sm text-muted-foreground">
                      Share your unique referral link with friends who haven't used Host Haven before.
                    </p>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="bg-amber-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold text-[#ffc500]">2</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">They Sign Up</h3>
                    <p className="text-sm text-muted-foreground">
                      Your friends create an account using your referral link and complete their first booking.
                    </p>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="bg-amber-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold text-[#ffc500]">3</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Earn Credits</h3>
                    <p className="text-sm text-muted-foreground">
                      You both receive $25 in travel credits once their stay is completed.
                    </p>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md bg-gray-50">
                  <h3 className="font-medium mb-2">Program Rules:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>Referral credits are valid for 12 months from the date they're issued</li>
                    <li>You can refer up to 10 friends per calendar year</li>
                    <li>The referred friend must be new to Host Haven</li>
                    <li>Credits will be issued after your friend completes their first stay</li>
                    <li>Host Haven reserves the right to modify or terminate the referral program at any time</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Coupons</CardTitle>
              <CardDescription>View and manage your available coupons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center">
                <Gift className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium mb-2">No coupons available</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You don't have any active coupons at the moment. Refer friends to earn credits.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Dashboard>
  );
};

export default Referrals;
