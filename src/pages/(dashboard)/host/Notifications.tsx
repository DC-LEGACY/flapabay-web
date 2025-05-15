import { useEffect } from "react";
import { usePage } from "@/contexts/PageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, BellIcon, Mail, Smartphone } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Notifications = () => {
  const { setPageTitle, setPageSubtitle } = usePage();

  useEffect(() => {
    setPageTitle("Notifications");
    setPageSubtitle("Manage your email and mobile notification preferences");
  }, [setPageTitle, setPageSubtitle]);

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Manage the emails you want to receive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Booking Updates</div>
                    <div className="text-sm text-muted-foreground">
                      Get notified about booking requests and confirmations
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Reminders</div>
                    <div className="text-sm text-muted-foreground">
                      Receive reminders about upcoming trips and check-ins
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Account Activity</div>
                    <div className="text-sm text-muted-foreground">
                      Be alerted about account changes and suspicious activity
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Promotions and Tips</div>
                    <div className="text-sm text-muted-foreground">
                      Receive travel tips, personalized recommendations and promotions
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mobile Notifications</CardTitle>
              <CardDescription>Control push notifications on your devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Push Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Enable notifications on your mobile device
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">SMS Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive time-sensitive alerts via text message
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notification Methods</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 border rounded-md">
                  <Mail className="h-5 w-5 text-[#ffc500]" />
                  <div className="flex-1">
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">
                      mbolepule4@gmail.com
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                
                <div className="flex items-center space-x-4 p-4 border rounded-md">
                  <Smartphone className="h-5 w-5 text-[#ffc500]" />
                  <div className="flex-1">
                    <div className="font-medium">Phone</div>
                    <div className="text-sm text-muted-foreground">
                      +260 97 123 4567
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Notifications;
