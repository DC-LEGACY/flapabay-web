import { ArrowRight, Briefcase, Check, Filter, MapPin, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import Footer from "@/components/common/default-footer";
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const Careers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('all');
  const [department, setDepartment] = useState('all');
  
  const jobListings = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Miami, FL",
      type: "Full-time",
      remote: true,
      posted: "2 days ago",
      description: "Join our engineering team to build and enhance our platform's features and performance."
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "Full-time",
      remote: true,
      posted: "1 week ago",
      description: "Lead product development initiatives and drive our product roadmap forward."
    },
    {
      title: "Customer Support Specialist",
      department: "Customer Service",
      location: "Amsterdam, Netherlands",
      type: "Full-time",
      remote: true,
      posted: "3 days ago",
      description: "Help our users have the best experience with our platform through exceptional support."
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Los Angeles, CA",
      type: "Full-time",
      remote: true,
      posted: "1 day ago",
      description: "Create beautiful, intuitive interfaces that delight our users."
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Cape Town, South Africa",
      type: "Full-time",
      remote: false,
      posted: "2 weeks ago",
      description: "Develop and execute marketing strategies to grow our user base in Africa."
    },
    {
      title: "Data Scientist",
      department: "Data",
      location: "Singapore",
      type: "Full-time",
      remote: true,
      posted: "5 days ago",
      description: "Analyze user behavior and business metrics to inform strategic decisions."
    },
    {
      title: "Finance Analyst",
      department: "Finance",
      location: "Miami, FL",
      type: "Full-time",
      remote: false,
      posted: "3 weeks ago",
      description: "Help us maintain financial health and plan for future growth."
    },
    {
      title: "Operations Coordinator",
      department: "Operations",
      location: "Dubai, UAE",
      type: "Full-time",
      remote: false,
      posted: "1 week ago",
      description: "Ensure smooth day-to-day operations of our Middle East office."
    }
  ];
  
  const filterJobs = () => {
    return jobListings.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           job.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = location === 'all' || job.location.includes(location);
      const matchesDepartment = department === 'all' || job.department === department;
      
      return matchesSearch && matchesLocation && matchesDepartment;
    });
  };
  
  const departments = [...new Set(jobListings.map(job => job.department))];
  const locations = [...new Set(jobListings.map(job => job.location.split(',')[0].trim()))];
  
  return (
    <div className="min-h-screen flex flex-col">
      <DefaultHeader />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-flapabay-yellow py-16">
          <div className="flapabay-container">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h1 
                className="text-3xl md:text-4xl font-bold mb-4 text-black"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Join Our Team
              </motion.h1>
              <motion.p 
                className="text-lg mb-8 text-gray-800"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Help us connect travelers with authentic experiences around the world
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <div className="relative w-full max-w-md">
                  <SearchNormal className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input 
                    type="text" 
                    placeholder="Search for jobs..." 
                    className="pl-10 py-6 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Button className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto px-6 py-6">
                  Find Jobs
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Job Categories */}
        <section className="py-16 bg-white">
          <div className="flapabay-container">
            <h2 className="text-2xl font-bold mb-8 text-center">Explore by Department</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { name: "Engineering", icon: "💻", count: 15 },
                { name: "Product", icon: "📊", count: 8 },
                { name: "Design", icon: "🎨", count: 6 },
                { name: "Marketing", icon: "📣", count: 7 },
                { name: "Customer Service", icon: "🤝", count: 12 },
                { name: "Operations", icon: "⚙️", count: 9 },
                { name: "Finance", icon: "💰", count: 4 },
                { name: "Data", icon: "📈", count: 5 }
              ].map((dept, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    className="cursor-pointer hover:border-flapabay-yellow transition-colors h-full"
                    onClick={() => setDepartment(dept.name)}
                  >
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <span className="text-4xl mb-3">{dept.icon}</span>
                      <h3 className="text-lg font-medium mb-1">{dept.name}</h3>
                      <p className="text-sm text-gray-500">{dept.count} open positions</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Job Listings */}
        <section className="py-16 bg-gray-50">
          <div className="flapabay-container">
            <div className="flex flex-col md:flex-row justify-between items-start mb-8">
              <h2 className="text-2xl font-bold mb-4 md:mb-0">Open Positions</h2>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map((loc, index) => (
                      <SelectItem key={index} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept, index) => (
                      <SelectItem key={index} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              {filterJobs().length > 0 ? (
                filterJobs().map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <div className="flex flex-wrap gap-2 mb-2">
                              <Badge variant="outline" className="bg-flapabay-yellow/10 text-flapabay-yellow border-flapabay-yellow">
                                {job.department}
                              </Badge>
                              <Badge variant="outline" className={job.remote ? 'bg-green-50 text-green-600 border-green-200' : ''}>
                                {job.remote ? 'Remote' : 'On-site'}
                              </Badge>
                            </div>
                            
                            <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                            
                            <div className="flex items-center text-gray-500 mb-3">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span className="text-sm">{job.location}</span>
                              <span className="mx-2">•</span>
                              <span className="text-sm">{job.type}</span>
                              <span className="mx-2">•</span>
                              <span className="text-sm">Posted {job.posted}</span>
                            </div>
                            
                            <p className="text-gray-600">{job.description}</p>
                          </div>
                          
                          <Button 
                            className="mt-4 md:mt-0 bg-black hover:bg-gray-800 text-white shrink-0"
                          >
                            Apply Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg">
                  <Briefcase className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No matching jobs found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setLocation('all');
                      setDepartment('all');
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Why FlapaBay */}
        <section className="py-16 bg-white">
          <div className="flapabay-container">
            <h2 className="text-2xl font-bold mb-4 text-center">Why Work at FlapaBay?</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Join a team that's passionate about connecting travelers with authentic experiences around the world
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Growth & Development",
                  description: "We invest in your growth with learning stipends, mentorship programs, and clear career paths."
                },
                {
                  title: "Global Impact",
                  description: "Your work will help create meaningful travel experiences and support local communities worldwide."
                },
                {
                  title: "Work-Life Balance",
                  description: "Flexible schedules, unlimited PTO, and remote work options to support your wellbeing."
                },
                {
                  title: "Competitive Benefits",
                  description: "Comprehensive health coverage, retirement plans, and competitive compensation packages."
                },
                {
                  title: "Travel Perks",
                  description: "Generous travel credits and discounts to experience our platform as a traveler."
                },
                {
                  title: "Inclusive Culture",
                  description: "A diverse, equitable, and inclusive environment where all employees can thrive."
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Employee Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="flapabay-container">
            <h2 className="text-2xl font-bold mb-12 text-center">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Senior Product Manager",
                  location: "Miami, FL",
                  years: 3,
                  quote: "The collaborative culture and impact we have on creating memorable travel experiences make FlapaBay an incredible place to work."
                },
                {
                  name: "Michael Chen",
                  role: "Software Engineer",
                  location: "Remote",
                  years: 2,
                  quote: "I love the flexibility of remote work combined with the challenging technical problems we get to solve every day."
                },
                {
                  name: "Aisha Mensah",
                  role: "Regional Operations Lead",
                  location: "Cape Town, South Africa",
                  years: 4,
                  quote: "Being able to help showcase the beauty of Africa to the world through our platform is incredibly rewarding."
                }
              ].map((employee, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex flex-col h-full">
                        <div className="mb-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                          <h3 className="text-lg font-semibold">{employee.name}</h3>
                          <p className="text-flapabay-yellow font-medium">{employee.role}</p>
                          <p className="text-sm text-gray-500 mb-4">{employee.location} • {employee.years} years</p>
                        </div>
                        
                        <blockquote className="text-gray-600 italic mb-4 flex-grow">
                          "{employee.quote}"
                        </blockquote>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button className="bg-flapabay-yellow hover:bg-flapabay-yellow/90 text-black">
                View Open Positions
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <section className="pb-0 footer-style1 pt60">
        <Footer />
      </section>
    </div>
  );
};

export default Careers;
