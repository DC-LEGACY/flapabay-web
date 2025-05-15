
import Dashboard from "@/components/dashboard/Dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Globe, Languages } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Preferences = () => {
  return (
    <Dashboard>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/account" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Global Preferences</h1>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Language</CardTitle>
              <CardDescription>Choose your preferred language</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Languages className="h-5 w-5 text-[#ffc500]" />
                  <div className="font-medium">Preferred Language</div>
                </div>
                <Select defaultValue="en">
                  <SelectTrigger className="w-full md:w-[300px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Currency</CardTitle>
              <CardDescription>Select your preferred currency for payments and pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="h-5 w-5 text-[#ffc500]" />
                  <div className="font-medium">Currency Format</div>
                </div>
                <Select defaultValue="usd">
                  <SelectTrigger className="w-full md:w-[300px]">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($) - US Dollar</SelectItem>
                    <SelectItem value="eur">EUR (€) - Euro</SelectItem>
                    <SelectItem value="gbp">GBP (£) - British Pound</SelectItem>
                    <SelectItem value="cad">CAD ($) - Canadian Dollar</SelectItem>
                    <SelectItem value="aud">AUD ($) - Australian Dollar</SelectItem>
                    <SelectItem value="jpy">JPY (¥) - Japanese Yen</SelectItem>
                    <SelectItem value="cny">CNY (¥) - Chinese Yuan</SelectItem>
                    <SelectItem value="inr">INR (₹) - Indian Rupee</SelectItem>
                    <SelectItem value="zmw">ZMW (K) - Zambian Kwacha</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Time & Date</CardTitle>
              <CardDescription>Customize your timezone and date format preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="h-5 w-5 text-[#ffc500]" />
                    <div className="font-medium">Timezone</div>
                  </div>
                  <Select defaultValue="africa/lusaka">
                    <SelectTrigger className="w-full md:w-[300px]">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="africa/lusaka">Africa/Lusaka (UTC+2)</SelectItem>
                      <SelectItem value="america/new_york">America/New York (UTC-5/4)</SelectItem>
                      <SelectItem value="america/los_angeles">America/Los Angeles (UTC-8/7)</SelectItem>
                      <SelectItem value="europe/london">Europe/London (UTC+0/1)</SelectItem>
                      <SelectItem value="europe/paris">Europe/Paris (UTC+1/2)</SelectItem>
                      <SelectItem value="asia/tokyo">Asia/Tokyo (UTC+9)</SelectItem>
                      <SelectItem value="australia/sydney">Australia/Sydney (UTC+10/11)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Calendar className="h-5 w-5 text-[#ffc500]" />
                    <div className="font-medium">Date Format</div>
                  </div>
                  <RadioGroup defaultValue="mm-dd-yyyy">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mm-dd-yyyy" id="mm-dd-yyyy" />
                      <Label htmlFor="mm-dd-yyyy">MM/DD/YYYY (e.g., 04/08/2025)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dd-mm-yyyy" id="dd-mm-yyyy" />
                      <Label htmlFor="dd-mm-yyyy">DD/MM/YYYY (e.g., 08/04/2025)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yyyy-mm-dd" id="yyyy-mm-dd" />
                      <Label htmlFor="yyyy-mm-dd">YYYY/MM/DD (e.g., 2025/04/08)</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="h-5 w-5 text-[#ffc500]" />
                    <div className="font-medium">Time Format</div>
                  </div>
                  <RadioGroup defaultValue="12h">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="12h" id="12h" />
                      <Label htmlFor="12h">12-hour (e.g., 2:30 PM)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="24h" id="24h" />
                      <Label htmlFor="24h">24-hour (e.g., 14:30)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Dashboard>
  );
};

export default Preferences;
