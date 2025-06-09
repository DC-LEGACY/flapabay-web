import React, { useEffect } from 'react';
import { Button } from "@/components/dashboard/host/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/dashboard/host/ui/card";
import { Input } from "@/components/dashboard/host/ui/input";
import { Label } from "@/components/dashboard/host/ui/label";
import { Switch } from "@/components/dashboard/host/ui/switch";
import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase, Building, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { usePage } from '@/contexts/PageContext';

const TravelWork = () => {
  const { setPageTitle, setPageSubtitle } = usePage();

  useEffect(() => {
    setPageTitle("Travel for Work");
    setPageSubtitle("Manage your business travel settings");
  }, [setPageTitle, setPageSubtitle]);

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/account" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Work Email</CardTitle>
              <CardDescription>Connect your work email to enable business travel features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Mail className="h-5 w-5 text-[#ffc500]" />
                  <div className="font-medium">Work Email Address</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Input 
                    type="email" 
                    placeholder="your.name@company.com" 
                    className="w-full md:w-[400px]"
                    defaultValue="m.muluba@business.com"
                  />
                  <Button 
                    onClick={() => toast.success("Verification email sent to your work address")}
                  >
                    Verify
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  We'll send a verification link to this email to confirm it's yours
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
              <CardDescription>Information about your company for business travel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <div className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="company-name" 
                      placeholder="Enter company name"
                      defaultValue="Digital Innovations Ltd."
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-address">Company Address</Label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="company-address" 
                      placeholder="Enter company address"
                      defaultValue="123 Business Park, Lusaka"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="job-title">Job Title</Label>
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="job-title" 
                      placeholder="Enter your job title"
                      defaultValue="Digital Marketing Director"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Business Travel Preferences</CardTitle>
              <CardDescription>Customize your business travel experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Separate Business Trips</div>
                    <div className="text-sm text-muted-foreground">
                      Keep business trips separate from personal trips
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Business Travel Dashboard</div>
                    <div className="text-sm text-muted-foreground">
                      Enable the business travel dashboard view
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Expense Receipts</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically generate expense receipts for business bookings
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Business Travel Policy Compliance</div>
                    <div className="text-sm text-muted-foreground">
                      Show only options that comply with your company's travel policy
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default TravelWork;
