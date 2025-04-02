
import React, { useState } from 'react';
import { 
  BarChart2, TrendingUp, DollarSign, Users, CalendarDays, 
  Home, ArrowUpRight, ArrowDownRight, HelpCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card';
import { Button } from '@/ui/button';

const Insights = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedProperty, setSelectedProperty] = useState('all');
  
  // Sample data for charts
  const revenueData = [
    { name: 'Jan', revenue: 4200 },
    { name: 'Feb', revenue: 3800 },
    { name: 'Mar', revenue: 5100 },
    { name: 'Apr', revenue: 6200 },
    { name: 'May', revenue: 7800 },
    { name: 'Jun', revenue: 8500 },
    { name: 'Jul', revenue: 9200 },
    { name: 'Aug', revenue: 8900 },
    { name: 'Sep', revenue: 7600 },
    { name: 'Oct', revenue: 6800 },
    { name: 'Nov', revenue: 5900 },
    { name: 'Dec', revenue: 6400 },
  ];
  
  const occupancyData = [
    { name: 'Jan', occupancy: 65 },
    { name: 'Feb', occupancy: 72 },
    { name: 'Mar', occupancy: 81 },
    { name: 'Apr', occupancy: 78 },
    { name: 'May', occupancy: 85 },
    { name: 'Jun', occupancy: 92 },
    { name: 'Jul', occupancy: 95 },
    { name: 'Aug', occupancy: 94 },
    { name: 'Sep', occupancy: 88 },
    { name: 'Oct', occupancy: 82 },
    { name: 'Nov', occupancy: 76 },
    { name: 'Dec', occupancy: 88 },
  ];
  
  const bookingSourceData = [
    { name: 'Direct', value: 45 },
    { name: 'Search', value: 28 },
    { name: 'Social', value: 12 },
    { name: 'Referral', value: 15 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Sample stats
  const stats = {
    revenue: {
      current: 76500,
      previous: 68900,
      percentChange: 11,
    },
    bookings: {
      current: 132,
      previous: 121,
      percentChange: 9,
    },
    occupancy: {
      current: 84,
      previous: 78,
      percentChange: 8,
    },
    averageStay: {
      current: 4.2,
      previous: 3.8,
      percentChange: 10,
    },
  };
  
  // Properties data
  const properties = [
    { id: 'prop1', name: 'Beachfront Villa', location: 'Miami, FL', revenue: 32500, occupancy: 92 },
    { id: 'prop2', name: 'Mountain Cabin', location: 'Aspen, CO', revenue: 26800, occupancy: 84 },
    { id: 'prop3', name: 'City Apartment', location: 'New York, NY', revenue: 17200, occupancy: 76 },
  ];
  
  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Insights & Analytics</h1>
        
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All properties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All properties</SelectItem>
              {properties.map(property => (
                <SelectItem key={property.id} value={property.id}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Revenue"
          value={`$${stats.revenue.current.toLocaleString()}`}
          change={stats.revenue.percentChange}
          icon={<DollarSign className="h-5 w-5" />}
        />
        
        <StatCard
          title="Total Bookings"
          value={stats.bookings.current}
          change={stats.bookings.percentChange}
          icon={<Users className="h-5 w-5" />}
        />
        
        <StatCard
          title="Occupancy Rate"
          value={`${stats.occupancy.current}%`}
          change={stats.occupancy.percentChange}
          icon={<Home className="h-5 w-5" />}
        />
        
        <StatCard
          title="Average Stay"
          value={`${stats.averageStay.current} nights`}
          change={stats.averageStay.percentChange}
          icon={<CalendarDays className="h-5 w-5" />}
        />
      </div>
      
      <Tabs defaultValue="revenue" className="mb-6">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="ratings">Ratings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                View your revenue trends over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Revenue']}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Bar dataKey="revenue" fill="#ffc500" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-500">Highest Revenue Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">July</div>
                    <div className="text-sm text-gray-500">$9,200</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-500">Average Monthly Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$6,875</div>
                    <div className="text-sm text-green-500 flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      12.4% vs last year
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-500">Projected Annual Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$82,500</div>
                    <div className="text-sm text-green-500 flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      9.8% increase projected
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="occupancy">
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Rates</CardTitle>
              <CardDescription>
                Track your property occupancy rates over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={occupancyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Occupancy Rate']}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="occupancy" 
                      stroke="#ffc500" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Property Occupancy Comparison</h3>
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div key={property.id} className="flex items-center">
                      <div className="w-32 md:w-48 truncate">{property.name}</div>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-[#ffc500] h-2.5 rounded-full" 
                            style={{ width: `${property.occupancy}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">{property.occupancy}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Booking Analysis</CardTitle>
              <CardDescription>
                Understand your booking patterns and guest demographics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Booking Sources</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={bookingSourceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {bookingSourceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Guest Demographics</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Solo Travelers</span>
                        <span>18%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '18%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Couples</span>
                        <span>35%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Families</span>
                        <span>32%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Groups</span>
                        <span>15%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Booking Lead Time</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <StatCard
                    title="Same Day"
                    value="8%"
                    subtitle="of bookings"
                  />
                  <StatCard
                    title="1-7 Days"
                    value="22%"
                    subtitle="of bookings"
                  />
                  <StatCard
                    title="8-30 Days"
                    value="45%"
                    subtitle="of bookings"
                  />
                  <StatCard
                    title="30+ Days"
                    value="25%"
                    subtitle="of bookings"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ratings">
          <Card>
            <CardHeader>
              <CardTitle>Guest Ratings & Reviews</CardTitle>
              <CardDescription>
                Monitor your guest satisfaction and feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="mb-4">
                    <span className="text-6xl font-bold">4.8</span>
                    <span className="text-xl">/5</span>
                  </div>
                  <div className="flex justify-center space-x-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-6 h-6 ${star <= 4.8 ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-gray-500">Based on 128 reviews</div>
                  
                  <div className="mt-8 space-y-2 text-left">
                    <div className="flex items-center">
                      <span className="w-16 text-sm">5 stars</span>
                      <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="w-12 text-sm text-right">85%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-sm">4 stars</span>
                      <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span className="w-12 text-sm text-right">10%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-sm">3 stars</span>
                      <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '3%' }}></div>
                      </div>
                      <span className="w-12 text-sm text-right">3%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-sm">2 stars</span>
                      <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '1%' }}></div>
                      </div>
                      <span className="w-12 text-sm text-right">1%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-sm">1 star</span>
                      <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '1%' }}></div>
                      </div>
                      <span className="w-12 text-sm text-right">1%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Category Ratings</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Cleanliness</span>
                        <span>4.9/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '98%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Communication</span>
                        <span>4.8/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '96%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Check-in</span>
                        <span>4.7/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Accuracy</span>
                        <span>4.6/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Location</span>
                        <span>4.9/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '98%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Value</span>
                        <span>4.5/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Property Performance</CardTitle>
          <CardDescription>
            Compare the performance of your different properties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Property</th>
                  <th className="py-3 px-4 text-left">Revenue</th>
                  <th className="py-3 px-4 text-left">Occupancy</th>
                  <th className="py-3 px-4 text-left">Avg. Daily Rate</th>
                  <th className="py-3 px-4 text-left">Rating</th>
                  <th className="py-3 px-4 text-left">Bookings</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Beachfront Villa</td>
                  <td className="py-3 px-4">$32,500</td>
                  <td className="py-3 px-4">92%</td>
                  <td className="py-3 px-4">$240</td>
                  <td className="py-3 px-4">4.9/5</td>
                  <td className="py-3 px-4">48</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Mountain Cabin</td>
                  <td className="py-3 px-4">$26,800</td>
                  <td className="py-3 px-4">84%</td>
                  <td className="py-3 px-4">$195</td>
                  <td className="py-3 px-4">4.7/5</td>
                  <td className="py-3 px-4">42</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">City Apartment</td>
                  <td className="py-3 px-4">$17,200</td>
                  <td className="py-3 px-4">76%</td>
                  <td className="py-3 px-4">$135</td>
                  <td className="py-3 px-4">4.8/5</td>
                  <td className="py-3 px-4">32</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button variant="outline" className="mx-auto">
            <BarChart2 className="h-4 w-4 mr-2" />
            Generate Detailed Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, subtitle }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
            
            {change !== undefined && (
              <div className={`flex items-center text-sm mt-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {change >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                {Math.abs(change)}% {change >= 0 ? 'increase' : 'decrease'}
              </div>
            )}
          </div>
          
          {icon && (
            <div className="p-2 bg-[#ffc500]/10 rounded-lg">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Insights;
