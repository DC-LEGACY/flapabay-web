import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, ArrowUp, Activity, DollarSign, Calendar, Home as HomeIcon } from "lucide-react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { usePage } from '@/contexts/PageContext';
import { DayPicker } from "@/components/ui/calendar";

const earningsData = [
  { month: 'Jan', earnings: 1200 },
  { month: 'Feb', earnings: 1900 },
  { month: 'Mar', earnings: 2400 },
  { month: 'Apr', earnings: 1800 },
  { month: 'May', earnings: 2800 },
  { month: 'Jun', earnings: 3200 },
  { month: 'Jul', earnings: 3800 },
];

const bookingsData = [
  { month: 'Jan', bookings: 8 },
  { month: 'Feb', bookings: 10 },
  { month: 'Mar', bookings: 12 },
  { month: 'Apr', bookings: 9 },
  { month: 'May', bookings: 15 },
  { month: 'Jun', bookings: 18 },
  { month: 'Jul', bookings: 20 },
];

const Index = () => {
  const { setPageTitle, setPageSubtitle } = usePage();

  useEffect(() => {
    setPageTitle("Host Overview");
    setPageSubtitle("Welcome to your host dashboard");
  }, [setPageTitle, setPageSubtitle]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$17,100</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            <Progress value={70} className="h-1 mt-3" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
            <Progress value={60} className="h-1 mt-3" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Occupancy</CardTitle>
            <HomeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
            <Progress value={78} className="h-1 mt-3" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,240</div>
            <div className="flex items-center pt-1">
              <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-xs text-green-500">Processed in 2 days</span>
            </div>
            <Progress value={40} className="h-1 mt-3" />
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="earnings" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="earnings" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="earnings" stroke="#ffc500" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookings" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Bookings Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#ffc500" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Index;
