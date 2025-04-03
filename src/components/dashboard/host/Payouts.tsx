
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, CreditCard, Smartphone, Calendar, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { Button } from '@/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';

// Mock data for earnings
const earnings = {
  available: 850,
  pending: 320,
  total: 1170,
  currency: 'USD'
};

const transactions = [
  {
    id: 1,
    amount: 320,
    status: 'pending',
    property: 'Lagos Beach Villa',
    date: 'Sep 21, 2023',
    type: 'Booking',
    guest: 'John Doe'
  },
  {
    id: 2,
    amount: 450,
    status: 'completed',
    property: 'Mountain View Apartment',
    date: 'Sep 14, 2023',
    type: 'Booking',
    guest: 'Sarah Johnson'
  },
  {
    id: 3,
    amount: 400,
    status: 'completed',
    property: 'Lagos Beach Villa',
    date: 'Aug 30, 2023',
    type: 'Booking',
    guest: 'Michael Smith'
  }
];

const payoutMethods = [
  {
    id: 1,
    name: 'Stripe',
    icon: <CreditCard className="h-5 w-5" />,
    description: 'Connect your Stripe account for instant payouts',
    isConnected: false
  },
  {
    id: 2,
    name: 'Mobile Money (PawaPay)',
    icon: <Smartphone className="h-5 w-5" />,
    description: 'Connect your mobile money account for quick transfers',
    isConnected: false
  }
];

const Payouts = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('earnings');
  
  const handleRequestPayout = () => {
    toast({
      title: "Payout requested",
      description: "Your payout request has been submitted and is being processed.",
    });
  };
  
  const handleConnectPayoutMethod = (methodId: number) => {
    toast({
      title: "Connect payout method",
      description: `Connecting ${payoutMethods.find(m => m.id === methodId)?.name}...`,
    });
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Earnings & Payouts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <EarningsCard 
          title="Available for Payout" 
          amount={earnings.available} 
          currency={earnings.currency} 
          icon={<DollarSign className="h-5 w-5 text-green-500" />}
          className="bg-green-50 border-green-100"
        />
        <EarningsCard 
          title="Pending Earnings" 
          amount={earnings.pending} 
          currency={earnings.currency} 
          icon={<Calendar className="h-5 w-5 text-yellow-500" />}
          className="bg-yellow-50 border-yellow-100"
        />
        <EarningsCard 
          title="Total Earnings" 
          amount={earnings.total} 
          currency={earnings.currency} 
          icon={<DollarSign className="h-5 w-5 text-blue-500" />}
          className="bg-blue-50 border-blue-100"
        />
      </div>
      
      <Tabs defaultValue="earnings" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="payoutMethods">Payout Methods</TabsTrigger>
          <TabsTrigger value="taxDocuments">Tax Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="earnings">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">Recent Transactions</h3>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" /> Export
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Description</th>
                    <th className="px-4 py-3 text-left">Guest</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {transactions.map(transaction => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{transaction.date}</td>
                      <td className="px-4 py-3 text-sm font-medium">{transaction.property}</td>
                      <td className="px-4 py-3 text-sm">{transaction.guest}</td>
                      <td className="px-4 py-3 text-sm">{transaction.type}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium">
                        ${transaction.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t bg-gray-50">
              <Button onClick={handleRequestPayout} disabled={earnings.available <= 0}>
                Request Payout (${earnings.available})
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="payoutMethods">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {payoutMethods.map(method => (
              <Card key={method.id} className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-md font-medium flex items-center">
                    <span className="bg-gray-100 p-2 rounded-full mr-3">
                      {method.icon}
                    </span>
                    {method.name}
                  </CardTitle>
                  {method.isConnected && (
                    <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full">
                      Connected
                    </span>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{method.description}</p>
                  <Button 
                    variant={method.isConnected ? "outline" : "default"} 
                    size="sm"
                    onClick={() => handleConnectPayoutMethod(method.id)}
                  >
                    {method.isConnected ? 'Manage' : 'Connect'}
                  </Button>
                </CardContent>
              </Card>
            ))}
            
            <Card className="overflow-hidden border-dashed">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <h3 className="font-medium text-center mb-2">Wire Transfer</h3>
                <p className="text-sm text-gray-600 text-center mb-4">
                  Request a manual payout to your bank account
                </p>
                <Button variant="outline">Contact Support</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="taxDocuments">
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <Download className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No tax documents yet</h3>
            <p className="text-sm text-gray-600 max-w-sm mx-auto mb-6">
              Your annual tax documents will be available here at the end of the tax year
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface EarningsCardProps {
  title: string;
  amount: number;
  currency: string;
  icon: React.ReactNode;
  className?: string;
}

const EarningsCard: React.FC<EarningsCardProps> = ({ 
  title, 
  amount, 
  currency, 
  icon,
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`overflow-hidden ${className}`}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <h3 className="text-2xl font-bold mt-1">{currency} {amount}</h3>
            </div>
            <div className="bg-white p-2 rounded-full shadow-sm">
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Payouts;
