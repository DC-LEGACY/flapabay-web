import { useEffect } from "react";
import { usePage } from "@/contexts/PageContext";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  UserIcon, 
  Shield, 
  CreditCard, 
  FileText, 
  BellIcon, 
  Eye, 
  Globe, 
  Briefcase, 
  Gift 
} from "lucide-react";

const Account = () => {
  const { setPageTitle, setPageSubtitle } = usePage();
  const user = { name: "Mbolela Pule", email: "mbolepule4@gmail.com" }; // Mock user data

  useEffect(() => {
    setPageTitle("Account Settings");
    setPageSubtitle(`Manage your account, ${user.name}, ${user.email}`);
  }, [setPageTitle, setPageSubtitle, user.name, user.email]);

  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Personal Info */}
          <Link to="/profile">
            <Card className="shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <UserIcon className="h-6 w-6 text-[#ffc500]" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">Personal info</CardTitle>
                    <CardDescription>
                      Provide personal details and how we can reach you
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          {/* Login & Security */}
          <Link to="/login-security">
            <Card className="shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-[#ffc500]" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">Login & security</CardTitle>
                    <CardDescription>
                      Update your password and secure your account
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          {/* Payments & Payouts */}
          <Link to="/payments">
            <Card className="shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <CreditCard className="h-6 w-6 text-[#ffc500]" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">Payments & payouts</CardTitle>
                    <CardDescription>
                      Review payments, payouts, coupons, and gift cards
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          {/* Taxes */}
          <Link to="/taxes">
            <Card className="shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-[#ffc500]" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">Taxes</CardTitle>
                    <CardDescription>
                      Manage taxpayer information and tax documents
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          {/* Notifications */}
          <Link to="/notifications">
            <Card className="shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <BellIcon className="h-6 w-6 text-[#ffc500]" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">Notifications</CardTitle>
                    <CardDescription>
                      Choose notification preferences and how you want to be contacted
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          {/* Privacy & Sharing */}
          <Link to="/privacy">
            <Card className="shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <Eye className="h-6 w-6 text-[#ffc500]" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">Privacy & sharing</CardTitle>
                    <CardDescription>
                      Manage your personal data, connected services, and data sharing settings
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          {/* Global Preferences */}
          <Link to="/preferences">
            <Card className="shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <Globe className="h-6 w-6 text-[#ffc500]" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">Global preferences</CardTitle>
                    <CardDescription>
                      Set your default language, currency, and timezone
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          {/* Travel for Work */}
          <Link to="/travel-work">
            <Card className="shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <Briefcase className="h-6 w-6 text-[#ffc500]" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">Travel for work</CardTitle>
                    <CardDescription>
                      Add a work email for business trip benefits
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          {/* Referral Credit & Coupon */}
          <Link to="/referrals">
            <Card className="shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <Gift className="h-6 w-6 text-[#ffc500]" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">Referral credit & coupon</CardTitle>
                    <CardDescription>
                      You have $0 referral credits and coupon. Learn more.
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Account;
