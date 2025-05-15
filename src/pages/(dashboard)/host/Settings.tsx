
import Dashboard from "@/components/dashboard/Dashboard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Settings = () => {
  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved!");
  };

  const handleSaveGeneral = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <Dashboard>
      <h2 className="text-3xl font-bold mb-6">Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="booking-email" className="font-medium">New Booking Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified when you receive a new booking</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="booking-email" defaultChecked />
                      <Label htmlFor="booking-email" className="text-sm">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="booking-sms" defaultChecked />
                      <Label htmlFor="booking-sms" className="text-sm">SMS</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="payment-email" className="font-medium">Payment Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified about payments and withdrawals</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="payment-email" defaultChecked />
                      <Label htmlFor="payment-email" className="text-sm">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="payment-sms" defaultChecked />
                      <Label htmlFor="payment-sms" className="text-sm">SMS</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="review-email" className="font-medium">Review Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified when you receive a new review</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="review-email" defaultChecked />
                      <Label htmlFor="review-email" className="text-sm">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="review-sms" />
                      <Label htmlFor="review-sms" className="text-sm">SMS</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing-email" className="font-medium">Marketing & Promotions</Label>
                    <p className="text-sm text-muted-foreground">Receive tips, updates, and promotion offers</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="marketing-email" />
                      <Label htmlFor="marketing-email" className="text-sm">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="marketing-sms" />
                      <Label htmlFor="marketing-sms" className="text-sm">SMS</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications}>Save Preferences</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Customize your dashboard experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select Timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                    <SelectItem value="est">Eastern Time (GMT-5)</SelectItem>
                    <SelectItem value="pst">Pacific Time (GMT-8)</SelectItem>
                    <SelectItem value="cet">Central European Time (GMT+1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="jpy">JPY (¥)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Use dark theme for your dashboard</p>
                </div>
                <Switch id="dark-mode" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral}>Save Settings</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Manage your connected platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">A</div>
                  <div>
                    <p className="font-medium">Airbnb</p>
                    <p className="text-xs text-muted-foreground">Connected since April 2022</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Disconnect</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">B</div>
                  <div>
                    <p className="font-medium">Booking.com</p>
                    <p className="text-xs text-muted-foreground">Connected since June 2022</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Disconnect</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">V</div>
                  <div>
                    <p className="font-medium">VRBO</p>
                    <p className="text-xs text-muted-foreground">Not connected</p>
                  </div>
                </div>
                <Button size="sm">Connect</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Add New Connection</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Data</CardTitle>
              <CardDescription>Manage your data and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-collection" className="font-medium">Data Collection</Label>
                  <p className="text-sm text-muted-foreground">Allow us to collect usage data to improve your experience</p>
                </div>
                <Switch id="data-collection" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="third-party" className="font-medium">Third-Party Sharing</Label>
                  <p className="text-sm text-muted-foreground">Allow sharing data with trusted third parties</p>
                </div>
                <Switch id="third-party" />
              </div>
              
              <Separator />
              
              <Button variant="outline" className="w-full" onClick={() => toast.info("Data download request submitted. You'll receive an email shortly.")}>Download My Data</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Dashboard>
  );
};

export default Settings;
