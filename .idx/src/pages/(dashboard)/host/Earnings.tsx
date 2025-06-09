import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/dashboard/host/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/dashboard/host/ui/tabs";
import { Button } from "@/components/dashboard/host/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboard/host/ui/select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, Download, TrendingUp, Calendar, HelpCircle, ArrowRight, Home as HomeIcon, Users, Share2 } from "lucide-react";

const monthlyEarnings = [
  { month: 'Jan', earnings: 2100, occupancy: 72 },
  { month: 'Feb', earnings: 1800, occupancy: 68 },
  { month: 'Mar', earnings: 2400, occupancy: 81 },
  { month: 'Apr', earnings: 2200, occupancy: 76 },
  { month: 'May', earnings: 2800, occupancy: 85 },
  { month: 'Jun', earnings: 3200, occupancy: 92 },
  { month: 'Jul', earnings: 3800, occupancy: 95 },
];

const weeklyData = [
  { day: 'Mon', bookings: 2, earnings: 350 },
  { day: 'Tue', bookings: 3, earnings: 520 },
  { day: 'Wed', bookings: 1, earnings: 210 },
  { day: 'Thu', bookings: 4, earnings: 680 },
  { day: 'Fri', bookings: 5, earnings: 850 },
  { day: 'Sat', bookings: 7, earnings: 1200 },
  { day: 'Sun', bookings: 6, earnings: 1050 },
];

const propertyData = [
  { name: 'Beach House', value: 5200, color: '#ffc500' },
  { name: 'Downtown Apartment', value: 3800, color: '#ff8a00' },
  { name: 'Mountain Cabin', value: 4100, color: '#ff4d4d' },
  { name: 'Lakeside Cottage', value: 2800, color: '#5b8def' },
];

const sourceData = [
  { name: 'Direct Bookings', value: 45, color: '#ffc500' },
  { name: 'Airbnb', value: 30, color: '#ff4d4d' },
  { name: 'Booking.com', value: 15, color: '#5b8def' },
  { name: 'VRBO', value: 10, color: '#10b981' },
];

const insights = [
  { title: "Your best month", value: "June", change: "+42% YoY", icon: TrendingUp },
  { title: "Most popular property", value: "Beach House", change: "95% occupancy", icon: HomeIcon },
  { title: "Highest paying guests", value: "Business travelers", change: "+$50 avg/night", icon: Users },
  { title: "Best booking source", value: "Direct bookings", change: "45% of revenue", icon: Share2 },
];

const Earnings = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Earnings Analytics</h2>
        <div className="flex space-x-2">
          <Select defaultValue="year">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {insights.map((insight, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
              <insight.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insight.value}</div>
              <div className="flex items-center text-xs text-green-600 font-medium mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                {insight.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Monthly Earnings</CardTitle>
                <CardDescription>Your earnings over the past 7 months</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyEarnings}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffc500" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ffc500" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="earnings" stroke="#ffc500" fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Property</CardTitle>
            <CardDescription>Distribution of earnings</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={propertyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {propertyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
            <CardDescription>Bookings and earnings this week</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" orientation="left" stroke="#ffc500" />
                <YAxis yAxisId="right" orientation="right" stroke="#000000" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="earnings" name="Earnings ($)" fill="#ffc500" />
                <Bar yAxisId="right" dataKey="bookings" name="Bookings" fill="#000000" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Booking Sources</CardTitle>
            <CardDescription>Where your bookings come from</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Monthly Occupancy Rate</CardTitle>
              <CardDescription>Property occupancy percentage</CardDescription>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> View Calendar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyEarnings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, 'Occupancy Rate']} />
              <Line type="monotone" dataKey="occupancy" stroke="#ffc500" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default Earnings;
