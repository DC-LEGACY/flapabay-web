
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Dashboard from "@/components/dashboard/Dashboard";
import { DollarSign, AlertCircle, Check, Download } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PayoutMethods } from "@/components/payments/PayoutMethods";
import { WithdrawFunds } from "@/components/payments/WithdrawFunds";
import { PaymentHistory } from "@/components/payments/PaymentHistory";
import { getExchangeRates } from "@/lib/countries";

// Monthly earnings data
const monthlyEarnings = [
  { month: "April 2023", amount: 3240 },
  { month: "May 2023", amount: 3980 },
  { month: "June 2023", amount: 3580 },
  { month: "July 2023", amount: 4120 },
  { month: "August 2023", amount: 3870 },
  { month: "September 2023", amount: 4350 },
];

// Pending earnings details
const pendingEarnings = [
  { 
    id: 1, 
    type: "Booking Payment",
    reservation: "#92345",
    guest: "Jane Smith",
    checkIn: "2023-04-16",
    checkOut: "2023-04-20", 
    amount: 720,
    releaseDate: "2023-04-22" 
  },
  { 
    id: 2, 
    type: "Experience Payment",
    reservation: "#92401",
    guest: "Michael Brown",
    checkIn: "2023-04-18",
    checkOut: "2023-04-18", 
    amount: 520,
    releaseDate: "2023-04-23" 
  }
];

const Payments = () => {
  const [availableBalance, setAvailableBalance] = useState(3580);
  const [showEarningsReport, setShowEarningsReport] = useState(false);
  const [showPendingDetails, setShowPendingDetails] = useState(false);
  const [feeModel, setFeeModel] = useState("host"); // host or flex
  
  // Get exchange rates from the countries utility
  const exchangeRates = getExchangeRates();
  const [selectedCurrency, setSelectedCurrency] = useState(exchangeRates[0]);
  
  // Default payout method
  const defaultPayoutMethod = {
    type: "Mobile Money",
    provider: "MTN Mobile Money",
    number: "+233 20 123 4567"
  };

  // Convert amount based on selected currency
  const convertAmount = (amount: number): string => {
    return `${selectedCurrency.symbol}${(amount * selectedCurrency.rate).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const handleChangeCurrency = (currency: string) => {
    const newCurrency = exchangeRates.find(rate => rate.currency === currency);
    if (newCurrency) {
      setSelectedCurrency(newCurrency);
    }
  };

  const handleWithdrawSuccess = (amount: number) => {
    // Update the balance
    setAvailableBalance(prev => Math.max(0, prev - amount));
  };
  
  // Handle CSV export for earnings report
  const handleExportCSV = () => {
    // Prepare data for CSV
    const csvHeader = "Month,Amount\n";
    const csvRows = monthlyEarnings.map(item => 
      `${item.month},${item.amount}`
    ).join("\n");
    const csvContent = csvHeader + csvRows;
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'earnings_report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Earnings report downloaded successfully");
  };

  return (
    <Dashboard>
      <div className="mb-6 flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold">Payments & Payouts</h2>
          <p className="text-muted-foreground">Manage your earnings and payout methods</p>
        </div>
        
        <div className="flex items-center gap-2 rounded-lg border bg-white p-2 shadow-sm">
          <div className="text-sm font-medium">Exchange rates:</div>
          <select 
            className="h-8 rounded-md border-none bg-transparent text-sm focus:outline-none focus:ring-0"
            value={selectedCurrency.currency}
            onChange={(e) => handleChangeCurrency(e.target.value)}
          >
            {exchangeRates.map((rate) => (
              <option key={rate.currency} value={rate.currency}>
                {rate.currency} ({rate.symbol})
              </option>
            ))}
          </select>
          <div className="text-xs text-muted-foreground">
            1 USD = {selectedCurrency.currency !== "USD" ? `${selectedCurrency.rate} ${selectedCurrency.currency}` : "1 USD"}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-amber-600" />
              Available Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-700">{convertAmount(availableBalance)}</p>
          </CardContent>
          <CardFooter>
            <WithdrawFunds 
              balance={availableBalance} 
              selectedCurrency={selectedCurrency}
              defaultPayoutMethod={defaultPayoutMethod}
              onSuccess={handleWithdrawSuccess} 
            />
          </CardFooter>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-blue-600" />
              Pending Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-700">{convertAmount(1240)}</p>
            <p className="text-sm text-muted-foreground">Available in 2 days</p>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full border-blue-200 hover:bg-blue-100"
              onClick={() => setShowPendingDetails(true)}
            >
              View Details
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Check className="mr-2 h-5 w-5 text-green-600" />
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-700">{convertAmount(17100)}</p>
            <p className="text-sm text-muted-foreground">Year to date</p>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full border-green-200 hover:bg-green-100"
              onClick={() => setShowEarningsReport(true)}
            >
              View Reports
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Tabs defaultValue="methods" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="methods">Payout Methods</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="fees">Service Fees</TabsTrigger>
        </TabsList>
        
        <TabsContent value="methods" className="mt-0">
          <PayoutMethods />
        </TabsContent>
        
        <TabsContent value="history" className="mt-0">
          <PaymentHistory 
            currencies={exchangeRates}
            selectedCurrency={selectedCurrency}
          />
        </TabsContent>

        <TabsContent value="fees" className="mt-0">
          <Card className="shadow-lg border-[#ffc500]/20">
            <CardHeader>
              <CardTitle>Service Fee Settings</CardTitle>
              <CardDescription>Choose how service fees are distributed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <RadioGroup 
                  value={feeModel} 
                  onValueChange={setFeeModel} 
                  className="grid gap-4"
                >
                  <div className={`flex items-center space-x-4 rounded-lg border p-4 cursor-pointer transition-all ${feeModel === "host" ? "border-[#ffc500] bg-[#ffc500]/5 shadow-md" : "hover:shadow-md"}`}>
                    <RadioGroupItem value="host" id="host" />
                    <Label htmlFor="host" className="flex-1 cursor-pointer">
                      <div className="font-medium mb-1">Host Fee Model</div>
                      <div className="text-sm text-muted-foreground">You pay a flat 11% service fee of the booking subtotal. Guests pay no service fees.</div>
                      
                      <div className="mt-4 bg-gray-50 p-3 rounded-md">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Booking amount</span>
                          <span>{convertAmount(100)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-red-500 mb-1">
                          <span>Service fee (11%)</span>
                          <span>-{convertAmount(11)}</span>
                        </div>
                        <div className="flex justify-between font-medium pt-2 border-t">
                          <span>You earn</span>
                          <span>{convertAmount(89)}</span>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className={`flex items-center space-x-4 rounded-lg border p-4 cursor-pointer transition-all ${feeModel === "flex" ? "border-[#ffc500] bg-[#ffc500]/5 shadow-md" : "hover:shadow-md"}`}>
                    <RadioGroupItem value="flex" id="flex" />
                    <Label htmlFor="flex" className="flex-1 cursor-pointer">
                      <div className="font-medium mb-1">Flex Fee Model</div>
                      <div className="text-sm text-muted-foreground">You pay 3% service fee. Guests pay 8% service fee of the booking subtotal.</div>
                      
                      <div className="mt-4 bg-gray-50 p-3 rounded-md">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Booking amount</span>
                          <span>{convertAmount(100)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-red-500 mb-1">
                          <span>Service fee (3%)</span>
                          <span>-{convertAmount(3)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-green-500 mb-1">
                          <span>Guest service fee (8%)</span>
                          <span className="text-muted-foreground">+{convertAmount(8)} (paid by guest)</span>
                        </div>
                        <div className="flex justify-between font-medium pt-2 border-t">
                          <span>You earn</span>
                          <span>{convertAmount(97)}</span>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                <Alert className="bg-amber-50 border-amber-200">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertTitle>Service Fee Information</AlertTitle>
                  <AlertDescription>
                    Service fees help us run the platform and provide support to hosts and guests. 
                    Changes to your service fee model will apply to new bookings only.
                  </AlertDescription>
                </Alert>

                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      toast.success(`Service fee model updated to ${feeModel === "host" ? "Host Fee Model (11%)" : "Flex Fee Model (3% host, 8% guest)"}`)
                    }}
                    className="bg-[#ffc500] hover:bg-amber-500 text-black"
                  >
                    Save Fee Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Pending Earnings Sheet */}
      <Sheet open={showPendingDetails} onOpenChange={setShowPendingDetails}>
        <SheetContent className="sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>Pending Earnings</SheetTitle>
            <SheetDescription>
              Funds that will be available in your balance soon
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-6">
            <div className="space-y-6">
              <div className="grid gap-4">
                {pendingEarnings.map((earning) => (
                  <div 
                    key={earning.id} 
                    className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-white"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{earning.type}</span>
                      <span className="text-xl font-bold text-blue-600">{convertAmount(earning.amount)}</span>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Reservation</span>
                        <span>{earning.reservation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Guest</span>
                        <span>{earning.guest}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{earning.type === "Experience Payment" ? "Date" : "Check-in"}</span>
                        <span>{new Date(earning.checkIn).toLocaleDateString()}</span>
                      </div>
                      {earning.type !== "Experience Payment" && (
                        <div className="flex justify-between">
                          <span>Check-out</span>
                          <span>{new Date(earning.checkOut).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-medium text-green-600 mt-2 pt-2 border-t">
                        <span>Available on</span>
                        <span>{new Date(earning.releaseDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Alert className="bg-blue-50 border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertTitle>About Pending Earnings</AlertTitle>
                <AlertDescription>
                  Payments are held for 24 hours after guest check-out to ensure everything goes smoothly. 
                  They'll be automatically added to your available balance after this holding period.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Earnings Report Sheet */}
      <Sheet open={showEarningsReport} onOpenChange={setShowEarningsReport}>
        <SheetContent className="sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>Earnings Report</SheetTitle>
            <SheetDescription>
              Overview of your earnings for the last 6 months
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-6">
            <div className="space-y-6">
              <div className="grid gap-4">
                {monthlyEarnings.map((month) => (
                  <div 
                    key={month.month} 
                    className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-[#ffc500]/5 to-white"
                  >
                    <span className="font-medium">{month.month}</span>
                    <span className="text-xl font-bold">{convertAmount(month.amount)}</span>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-[#ffc500]/10 rounded-lg flex justify-between items-center">
                <span className="font-semibold">Total Earnings (Last 6 Months)</span>
                <span className="text-2xl font-bold text-[#ffc500] drop-shadow-sm">
                  {convertAmount(monthlyEarnings.reduce((total, month) => total + month.amount, 0))}
                </span>
              </div>
              
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Pro Tip</AlertTitle>
                <AlertDescription>
                  Complete your profile and improve your listings to increase your earnings potential.
                </AlertDescription>
              </Alert>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline"
                  onClick={handleExportCSV}
                  className="flex items-center"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download CSV
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Dashboard>
  );
};

export default Payments;
