import React, { useEffect, useState } from 'react';
import { Home, Users, DollarSign, Calendar, ArrowRight, MessageSquare, BarChart2, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const mockData = [
  { name: 'Jan', revenue: 2400, bookings: 5 },
  { name: 'Feb', revenue: 1398, bookings: 3 },
  { name: 'Mar', revenue: 9800, bookings: 12 },
  { name: 'Apr', revenue: 3908, bookings: 7 },
  { name: 'May', revenue: 4800, bookings: 9 },
  { name: 'Jun', revenue: 3800, bookings: 8 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    properties: 5,
    reservations: 12,
    messages: 8,
    unreadMessages: 3,
    earnings: 6240,
  });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className='p-4'>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
        {[{ icon: Home, title: 'Properties', count: counts.properties, link: '/dashboard/host/listings' },
          { icon: Users, title: 'Reservations', count: counts.reservations, link: '/dashboard/host/reservations' },
          { icon: MessageSquare, title: 'Messages', count: counts.messages, link: '/dashboard/host/messages' },
          { icon: DollarSign, title: 'Earnings', count: `$${counts.earnings}`, link: '/dashboard/host/payouts' }].map(({ icon: Icon, title, count, link }) => (
          <Card key={title}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Icon className="mr-2 h-5 w-5 text-[#ffc500]" />
                {title}
              </CardTitle>
              <CardDescription>Your {title.toLowerCase()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">{isLoading ? '...' : count}</div>
                <Button variant="ghost" size="sm" className="text-[#ffc500] hover:text-[#ffc500]/80 hover:bg-[#ffc500]/10" onClick={() => navigate(link)}>
                  View <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Earnings Overview</CardTitle>
            <CardDescription>Revenue and bookings for the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#ffc500" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" fill="#ffc500" name="Revenue ($)" />
                  <Bar yAxisId="right" dataKey="bookings" fill="#82ca9d" name="Bookings" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="mr-2 h-5 w-5 text-[#ffc500]" />
              AI Co-Host
            </CardTitle>
            <CardDescription>Automate your hosting experience</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="bg-[#ffc500] hover:bg-[#ffc500]/90 text-black border-none w-full" onClick={() => navigate('/dashboard/host/ai-cohost')}>
              Set Up AI Co-Host
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {[{ icon: Calendar, title: 'Calendar', link: '/dashboard/host/calendar' },
          { icon: BarChart2, title: 'Performance Insights', link: '/dashboard/host/insights' }].map(({ icon: Icon, title, link }) => (
          <Card key={title}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Icon className="mr-2 h-5 w-5 text-[#ffc500]" />
                {title}
              </CardTitle>
              <CardDescription>Manage your {title.toLowerCase()}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Button variant="outline" className="w-full" onClick={() => navigate(link)}>
                View {title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
