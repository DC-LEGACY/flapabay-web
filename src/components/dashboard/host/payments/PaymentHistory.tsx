
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ArrowRight } from "lucide-react";

// Demo payment history
const demoPaymentHistory = [
  { 
    id: 1, 
    type: "Booking Payment", 
    date: "2023-06-15", 
    amount: 850, 
    status: "Completed", 
    reservation: "#87654",
    serviceFee: 93.5,
    tax: 42.5
  },
  { 
    id: 2, 
    type: "Payout", 
    date: "2023-05-30", 
    amount: 720, 
    status: "Processed", 
    method: "MTN Mobile Money",
    serviceFee: 0,
    tax: 0
  },
  { 
    id: 3, 
    type: "Booking Payment", 
    date: "2023-05-15", 
    amount: 950, 
    status: "Completed", 
    reservation: "#87123",
    serviceFee: 104.5,
    tax: 47.5
  },
  { 
    id: 4, 
    type: "Payout", 
    date: "2023-04-30", 
    amount: 1100, 
    status: "Processed", 
    method: "Wire Transfer",
    serviceFee: 0,
    tax: 0
  },
  { 
    id: 5, 
    type: "Booking Payment", 
    date: "2023-04-15", 
    amount: 1280, 
    status: "Completed", 
    reservation: "#86755",
    serviceFee: 140.8,
    tax: 64
  },
];

interface PaymentHistoryProps {
  currencies: {
    currency: string;
    symbol: string;
    rate: number;
  }[];
  selectedCurrency: {
    currency: string;
    symbol: string;
    rate: number;
  };
}

export const PaymentHistory = ({ currencies, selectedCurrency }: PaymentHistoryProps) => {
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const handleViewPaymentDetails = (payment: any) => {
    setSelectedPayment(payment);
    setShowPaymentDetails(true);
  };

  // Convert amount based on selected currency
  const convertAmount = (amount: number): string => {
    return `${selectedCurrency.symbol}${(amount * selectedCurrency.rate).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <div>
      <Card className="shadow-lg border-[#ffc500]/20">
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>View your recent payment activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {demoPaymentHistory.map((payment) => (
              <div 
                key={payment.id} 
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 cursor-pointer hover:bg-gray-50 rounded-md p-2 transition-colors"
                onClick={() => handleViewPaymentDetails(payment)}
              >
                <div>
                  <p className="font-medium">{payment.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(payment.date).toLocaleDateString()} • 
                    {payment.type === "Booking Payment" ? ` Reservation ${payment.reservation}` : ` ${payment.method}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${payment.type === "Booking Payment" ? "text-green-600" : "text-amber-600"}`}>
                    {payment.type === "Booking Payment" ? "+" : "-"}{convertAmount(payment.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {payment.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline">View More <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </CardFooter>
      </Card>

      {/* Payment Details Sheet */}
      <Sheet open={showPaymentDetails} onOpenChange={setShowPaymentDetails}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Payment Details</SheetTitle>
            <SheetDescription>
              {selectedPayment ? new Date(selectedPayment.date).toLocaleDateString() : ""}
            </SheetDescription>
          </SheetHeader>
          
          {selectedPayment && (
            <div className="py-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-3 border-b">
                  <div className="font-medium">{selectedPayment.type}</div>
                  <div className={`font-bold ${selectedPayment.type === "Booking Payment" ? "text-green-600" : "text-amber-600"}`}>
                    {selectedPayment.type === "Booking Payment" ? "+" : "-"}{convertAmount(selectedPayment.amount)}
                  </div>
                </div>
                
                {selectedPayment.type === "Booking Payment" ? (
                  <>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Booking Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Reservation</span>
                          <span>{selectedPayment.reservation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Date</span>
                          <span>{new Date(selectedPayment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status</span>
                          <span className="text-green-600">{selectedPayment.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Financial Breakdown</h4>
                      <div className="space-y-2 text-sm bg-gray-50 p-3 rounded">
                        <div className="flex justify-between">
                          <span>Booking amount</span>
                          <span>{convertAmount(selectedPayment.amount)}</span>
                        </div>
                        <div className="flex justify-between text-red-500">
                          <span>Service fee (11%)</span>
                          <span>-{convertAmount(selectedPayment.serviceFee)}</span>
                        </div>
                        <div className="flex justify-between text-red-500">
                          <span>Taxes</span>
                          <span>-{convertAmount(selectedPayment.tax)}</span>
                        </div>
                        <div className="flex justify-between font-medium pt-2 border-t mt-2">
                          <span>Net earnings</span>
                          <span>{convertAmount(selectedPayment.amount - selectedPayment.serviceFee - selectedPayment.tax)}</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Payout Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Method</span>
                          <span>{selectedPayment.method}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Date</span>
                          <span>{new Date(selectedPayment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status</span>
                          <span className="text-amber-600">{selectedPayment.status}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
