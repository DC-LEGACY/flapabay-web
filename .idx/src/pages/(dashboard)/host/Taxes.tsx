import React, { useState, useEffect } from "react";
import { Button } from "@/components/dashboard/host/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/dashboard/host/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/dashboard/host/ui/dialog";
import { Input } from "@/components/dashboard/host/ui/input";
import { Label } from "@/components/dashboard/host/ui/label";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Upload, X, Check, Calendar, Flag } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboard/host/ui/select";
import { usePage } from '@/contexts/PageContext';

const Taxes = () => {
  const { setPageTitle, setPageSubtitle } = usePage();

  useEffect(() => {
    setPageTitle("Taxes");
    setPageSubtitle("Manage your tax documents and information");
  }, [setPageTitle, setPageSubtitle]);

  const [taxFile, setTaxFile] = useState<File | null>(null);
  const [isEditingResidence, setIsEditingResidence] = useState(false);
  const [isEditingTaxID, setIsEditingTaxID] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Zambia");
  const [taxID, setTaxID] = useState("");
  const [taxIDType, setTaxIDType] = useState("individual");
  const [weekendPricing, setWeekendPricing] = useState("standard");
  const [isEditingWeekendPricing, setIsEditingWeekendPricing] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTaxFile(e.target.files[0]);
      toast.success("Tax document uploaded successfully");
    }
  };
  
  const handleSaveResidence = () => {
    setIsEditingResidence(false);
    toast.success("Tax residence updated successfully");
  };
  
  const handleSaveTaxID = () => {
    setIsEditingTaxID(false);
    toast.success("Tax ID saved successfully");
  };

  const handleSaveWeekendPricing = () => {
    setIsEditingWeekendPricing(false);
    toast.success("Weekend pricing updated successfully");
  };
  
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", 
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", 
    "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", 
    "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", 
    "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", 
    "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", 
    "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", 
    "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", 
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", 
    "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", 
    "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", 
    "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", 
    "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", 
    "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", 
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", 
    "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", 
    "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", 
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", 
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
    "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", 
    "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", 
    "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", 
    "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", 
    "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

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
          <Card className="rounded-[29px]">
            <CardHeader>
              <CardTitle>Tax Documents</CardTitle>
              <CardDescription>Access and download your tax documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxFile ? (
                  <div className="flex items-center justify-between p-4 border rounded-md bg-green-50">
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">{taxFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date().toLocaleDateString()} • {(taxFile.size / 1024).toFixed(0)} KB
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        setTaxFile(null);
                        toast.success("Document removed");
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="p-6 border rounded-md text-center">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium mb-2">No tax documents yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Your tax documents will appear here once they're available.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[29px]">
            <CardHeader>
              <CardTitle>Tax Information</CardTitle>
              <CardDescription>Manage your tax information and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Flag className="h-5 w-5 text-[#ffc500]" />
                    <div>
                      <h3 className="font-medium">Tax Residence</h3>
                      <p className="text-sm text-muted-foreground">{selectedCountry}</p>
                    </div>
                  </div>
                  
                  <Dialog open={isEditingResidence} onOpenChange={setIsEditingResidence}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Tax Residence</DialogTitle>
                        <DialogDescription>
                          Select your country of tax residence.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Select
                            value={selectedCountry}
                            onValueChange={setSelectedCountry}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditingResidence(false)}>Cancel</Button>
                        <Button onClick={handleSaveResidence}>Save</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-[#ffc500]" />
                    <div>
                      <h3 className="font-medium">Tax ID Information</h3>
                      <p className="text-sm text-muted-foreground">{taxID || "Not provided"}</p>
                      {taxID && (
                        <p className="text-xs text-gray-500">
                          Type: {taxIDType === "individual" ? "Individual Taxpayer ID" : 
                                taxIDType === "business" ? "Business Tax ID" : 
                                taxIDType === "ssn" ? "Social Security Number" : "Other"}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Dialog open={isEditingTaxID} onOpenChange={setIsEditingTaxID}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">{taxID ? "Edit" : "Add"}</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Tax ID Information</DialogTitle>
                        <DialogDescription>
                          Add your tax identification number.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="taxId">Tax ID Number</Label>
                          <Input 
                            id="taxId" 
                            value={taxID} 
                            onChange={(e) => setTaxID(e.target.value)}
                            placeholder="Enter your tax ID number" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="taxIDType">Tax ID Type</Label>
                          <Select 
                            value={taxIDType} 
                            onValueChange={setTaxIDType}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select tax ID type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="individual">Individual Taxpayer ID</SelectItem>
                              <SelectItem value="business">Business Tax ID</SelectItem>
                              <SelectItem value="ssn">Social Security Number</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditingTaxID(false)}>Cancel</Button>
                        <Button onClick={handleSaveTaxID}>Save</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-[#ffc500]" />
                    <div>
                      <h3 className="font-medium">Weekend Pricing & Availability</h3>
                      <p className="text-sm text-muted-foreground">
                        {weekendPricing === "standard" ? "Standard pricing" : 
                         weekendPricing === "premium" ? "Premium weekend rates" : 
                         "Custom weekend pricing"}
                      </p>
                    </div>
                  </div>
                  
                  <Dialog open={isEditingWeekendPricing} onOpenChange={setIsEditingWeekendPricing}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Weekend Pricing & Availability</DialogTitle>
                        <DialogDescription>
                          Configure how you price your weekends.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="weekendPricing">Weekend Pricing Strategy</Label>
                          <Select
                            value={weekendPricing}
                            onValueChange={setWeekendPricing}
                          >
                            <SelectTrigger id="weekendPricing" className="w-full">
                              <SelectValue placeholder="Select pricing strategy" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard pricing (same as weekdays)</SelectItem>
                              <SelectItem value="premium">Premium weekend rates (+15%)</SelectItem>
                              <SelectItem value="custom">Custom weekend pricing</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {weekendPricing === "custom" && (
                          <div className="space-y-2">
                            <Label htmlFor="customPercentage">Custom Weekend Price Adjustment (%)</Label>
                            <Input 
                              id="customPercentage" 
                              type="number" 
                              placeholder="e.g. 20 for +20%"
                              defaultValue="20"
                            />
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <Label htmlFor="weekendAvailability">Weekend Availability</Label>
                          <Select defaultValue="always">
                            <SelectTrigger id="weekendAvailability" className="w-full">
                              <SelectValue placeholder="Select availability" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="always">Always available</SelectItem>
                              <SelectItem value="sometimes">Sometimes available (per calendar)</SelectItem>
                              <SelectItem value="never">Never available</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditingWeekendPricing(false)}>Cancel</Button>
                        <Button onClick={handleSaveWeekendPricing}>Save</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-[#ffc500]" />
                    <div>
                      <h3 className="font-medium">W-8BEN / W-9 Form</h3>
                      <p className="text-sm text-muted-foreground">Required for US tax purposes</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Complete</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="rounded-[29px]">
            <CardHeader>
              <CardTitle>Upload Tax Document</CardTitle>
              <CardDescription>Upload additional tax documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <input 
                  type="file" 
                  id="tax-document"
                  className="hidden" 
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label 
                  htmlFor="tax-document"
                  className="block border-2 border-dashed rounded-md p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-3" />
                  <p className="font-medium mb-1">Drop file here or click to upload</p>
                  <p className="text-sm text-muted-foreground">
                    Accepts PDF, JPG, or PNG (max. 10MB)
                  </p>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Taxes;
