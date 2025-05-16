import { useEffect } from "react";
import { usePage } from "@/contexts/PageContext";
import { Button } from "@/components/dashboard/host/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/dashboard/host/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, Lock, Share2, UserPlus } from "lucide-react";
import { Switch } from "@/components/dashboard/host/ui/switch";

const Privacy = () => {
  const { setPageTitle, setPageSubtitle } = usePage();

  useEffect(() => {
    setPageTitle("Privacy & Sharing");
    setPageSubtitle("Control your information, sharing settings, and connected services");
  }, [setPageTitle, setPageSubtitle]);

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control how your information is shared and used</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Profile Visibility</div>
                    <div className="text-sm text-muted-foreground">
                      Allow your profile to be discoverable by other users
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Show Profile Activity</div>
                    <div className="text-sm text-muted-foreground">
                      Display your reviews and public feedback
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Location Services</div>
                    <div className="text-sm text-muted-foreground">
                      Use your location for personalized recommendations
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Third-Party Data Sharing</div>
                    <div className="text-sm text-muted-foreground">
                      Allow us to share anonymous usage data with trusted partners
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
              <CardDescription>Manage third-party integrations and connections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500 text-white p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </div>
                    <div>
                      <div className="font-medium">Facebook</div>
                      <div className="text-sm text-muted-foreground">Not connected</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-400 text-white p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                    </div>
                    <div>
                      <div className="font-medium">Twitter</div>
                      <div className="text-sm text-muted-foreground">Connected as @mbolepule</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-500 text-white p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                    </div>
                    <div>
                      <div className="font-medium">Google</div>
                      <div className="text-sm text-muted-foreground">Not connected</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data & Personalization</CardTitle>
              <CardDescription>Manage how your data is used for personalization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Personalized Recommendations</div>
                    <div className="text-sm text-muted-foreground">
                      Use your activity to improve recommendations
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Web Tracking</div>
                    <div className="text-sm text-muted-foreground">
                      Allow tracking your activity across other websites
                    </div>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <div>
                    <Button variant="outline" className="mr-2">Download My Data</Button>
                    <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">Delete Account</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Privacy;
