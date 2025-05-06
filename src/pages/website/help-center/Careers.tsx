import {
  ArrowRight,
  Briefcase,
  Check,
  Filter,
  MapPin,
  Search,
} from "lucide-react";
import { SearchNormal } from "iconsax-react";
import { Card, CardContent } from "@/components/ui/layout/card";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/composite/tabs";

import { Badge } from "@/components/ui/primitives/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import { motion } from "framer-motion";
import {
  MonitorMobbile,
  Chart,
  Brush,
  Speaker,
  People,
  Setting2,
  Money,
  TrendUp,
} from "iconsax-react";

const departments = [
  {
    name: "Engineering",
    icon: <MonitorMobbile variant="Outline"  />,
    count: 15,
  },
  { name: "Product", icon: <Chart variant="Outline"  />, count: 8 },
  { name: "Design", icon: <Brush variant="Outline"  />, count: 6 },
  {
    name: "Marketing",
    icon: <Speaker variant="Outline"  />,
    count: 7,
  },
  {
    name: "Customer Service",
    icon: <People variant="Outline"  />,
    count: 12,
  },
  {
    name: "Operations",
    icon: <Setting2 variant="Outline"  />,
    count: 9,
  },
  { name: "Finance", icon: <Money variant="Outline"  />, count: 4 },
  { name: "Data", icon: <TrendUp variant="Outline"  />, count: 5 },
];

const Careers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("all");
  const [department, setDepartment] = useState("all");

  const jobListings = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Miami, FL",
      type: "Full-time",
      remote: true,
      posted: "2 days ago",
      description:
        "Join our engineering team to build and enhance our platform's features and performance.",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "Full-time",
      remote: true,
      posted: "1 week ago",
      description:
        "Lead product development initiatives and drive our product roadmap forward.",
    },
    {
      title: "Customer Support Specialist",
      department: "Customer Service",
      location: "Amsterdam, Netherlands",
      type: "Full-time",
      remote: true,
      posted: "3 days ago",
      description:
        "Help our users have the best experience with our platform through exceptional support.",
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Los Angeles, CA",
      type: "Full-time",
      remote: true,
      posted: "1 day ago",
      description:
        "Create beautiful, intuitive interfaces that delight our users.",
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Cape Town, South Africa",
      type: "Full-time",
      remote: false,
      posted: "2 weeks ago",
      description:
        "Develop and execute marketing strategies to grow our user base in Africa.",
    },
    {
      title: "Data Scientist",
      department: "Data",
      location: "Singapore",
      type: "Full-time",
      remote: true,
      posted: "5 days ago",
      description:
        "Analyze user behavior and business metrics to inform strategic decisions.",
    },
    {
      title: "Finance Analyst",
      department: "Finance",
      location: "Miami, FL",
      type: "Full-time",
      remote: false,
      posted: "3 weeks ago",
      description:
        "Help us maintain financial health and plan for future growth.",
    },
    {
      title: "Operations Coordinator",
      department: "Operations",
      location: "Dubai, UAE",
      type: "Full-time",
      remote: false,
      posted: "1 week ago",
      description:
        "Ensure smooth day-to-day operations of our Middle East office.",
    },
  ];

  const filterJobs = () => {
    return jobListings.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation =
        location === "all" || job.location.includes(location);
      const matchesDepartment =
        department === "all" || job.department === department;

      return matchesSearch && matchesLocation && matchesDepartment;
    });
  };

  const departments = [...new Set(jobListings.map((job) => job.department))];
  const locations = [
    ...new Set(jobListings.map((job) => job.location.split(",")[0].trim())),
  ];

  return (
    <>
        {/* Hero Section */}
        <section className="px-6 py-20 pb-10 lg:pt-36 md:pt-16 bg-flapabay-yellow">
          <div className="flapabay-container">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="pb-4 text-3xl font-bold text-white md:text-4xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Join Our Team
              </motion.h1>
              <motion.p
                className="pb-8 text-lg text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Help us connect travelers with authentic experiences around the
                world
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
              >
                <div className="relative w-full max-w-md">
                  <Input
                    type="text"
                    placeholder="Search for jobs..."
                    className="w-full px-8 py-6 border rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#FFC500]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Button className="w-full px-6 text-white bg-black hover:bg-gray-800 sm:w-auto">
                  <SearchNormal className="transform text-flapabay-white left-3 top-1/2" />
                  <p className="text-white">Find Jobs</p>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Job Categories */}
        <section className="py-16 bg-white">
          <div className="flapabay-container">
            <h2 className="pb-8 text-2xl font-bold text-center">
              Explore by Department
            </h2>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {[
                {
                  name: "Engineering",
                  icon: <MonitorMobbile variant="Outline"  />,
                  count: 15,
                },
                {
                  name: "Product",
                  icon: <Chart variant="Outline"  />,
                  count: 8,
                },
                {
                  name: "Design",
                  icon: <Brush variant="Outline"  />,
                  count: 6,
                },
                {
                  name: "Marketing",
                  icon: <Speaker variant="Outline"  />,
                  count: 7,
                },
                {
                  name: "Customer Service",
                  icon: <People variant="Outline"  />,
                  count: 12,
                },
                {
                  name: "Operations",
                  icon: <Setting2 variant="Outline"  />,
                  count: 9,
                },
                {
                  name: "Finance",
                  icon: <Money variant="Outline"  />,
                  count: 4,
                },
                {
                  name: "Data",
                  icon: <TrendUp variant="Outline"  />,
                  count: 5,
                },
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
                    className="h-full transition-colors cursor-pointer hover:border-flapabay-yellow"
                    onClick={() => setDepartment(dept.name)}
                  >
                    <CardContent className="flex flex-col items-center p-6 text-center">
                      <span className="pb-3 text-4xl">{dept.icon}</span>
                      <h3 className="pb-1 text-lg font-medium">{dept.name}</h3>
                      <p className="text-sm text-gray-500">
                        {dept.count} open positions
                      </p>
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
            <div className="flex flex-col items-start justify-between pb-8 md:flex-row">
              <h2 className="pb-4 text-2xl font-bold md:pb-0">
                Open Positions
              </h2>

              <div className="flex flex-col w-full space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 md:w-auto">
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map((loc, index) => (
                      <SelectItem key={index} value={loc}>
                        {loc}
                      </SelectItem>
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
                      <SelectItem key={index} value={dept}>
                        {dept}
                      </SelectItem>
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
                    <Card className="transition-shadow hover:shadow-md">
                      <CardContent className="p-6">
                        <div className="flex flex-col justify-between md:flex-row md:items-center">
                          <div>
                            <div className="flex flex-wrap gap-2 pb-2">
                              <Badge
                                variant="outline"
                                className="bg-flapabay-yellow/10 text-flapabay-yellow border-flapabay-yellow"
                              >
                                {job.department}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={
                                  job.remote
                                    ? "bg-green-50 text-green-600 border-green-200"
                                    : ""
                                }
                              >
                                {job.remote ? "Remote" : "On-site"}
                              </Badge>
                            </div>

                            <h3 className="pb-1 text-xl font-semibold">
                              {job.title}
                            </h3>

                            <div className="flex items-center pb-3 text-gray-500">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span className="text-sm">{job.location}</span>
                              <span className="mx-2">•</span>
                              <span className="text-sm">{job.type}</span>
                              <span className="mx-2">•</span>
                              <span className="text-sm">
                                Posted {job.posted}
                              </span>
                            </div>

                            <p className="text-gray-600">{job.description}</p>
                          </div>

                          <Button className="mt-4 text-white bg-black md:mt-0 hover:bg-gray-800 shrink-0">
                            Apply Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="py-12 text-center bg-white rounded-lg">
                  <Briefcase className="w-12 h-12 pb-4 mx-auto text-gray-300" />
                  <h3 className="pb-2 text-xl font-medium">
                    No matching jobs found
                  </h3>
                  <p className="pb-4 text-gray-500">
                    Try adjusting your search criteria
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setLocation("all");
                      setDepartment("all");
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
            <h2 className="pb-4 text-2xl font-bold text-center">
              Why Work at FlapaBay?
            </h2>
            <p className="max-w-2xl pb-12 mx-auto text-center text-gray-600">
              Join a team that's passionate about connecting travelers with
              authentic experiences around the world
            </p>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  title: "Growth & Development",
                  description:
                    "We invest in your growth with learning stipends, mentorship programs, and clear career paths.",
                },
                {
                  title: "Global Impact",
                  description:
                    "Your work will help create meaningful travel experiences and support local communities worldwide.",
                },
                {
                  title: "Work-Life Balance",
                  description:
                    "Flexible schedules, unlimited PTO, and remote work options to support your wellbeing.",
                },
                {
                  title: "Competitive Benefits",
                  description:
                    "Comprehensive health coverage, retirement plans, and competitive compensation packages.",
                },
                {
                  title: "Travel Perks",
                  description:
                    "Generous travel credits and discounts to experience our platform as a traveler.",
                },
                {
                  title: "Inclusive Culture",
                  description:
                    "A diverse, equitable, and inclusive environment where all employees can thrive.",
                },
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
                      <h3 className="pb-3 text-xl font-semibold">
                        {benefit.title}
                      </h3>
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
            <h2 className="pb-12 text-2xl font-bold text-center">
              Meet Our Team
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Senior Product Manager",
                  location: "Miami, FL",
                  years: 3,
                  quote:
                    "The collaborative culture and impact we have on creating memorable travel experiences make FlapaBay an incredible place to work.",
                },
                {
                  name: "Michael Chen",
                  role: "Software Engineer",
                  location: "Remote",
                  years: 2,
                  quote:
                    "I love the flexibility of remote work combined with the challenging technical problems we get to solve every day.",
                },
                {
                  name: "Aisha Mensah",
                  role: "Regional Operations Lead",
                  location: "Cape Town, South Africa",
                  years: 4,
                  quote:
                    "Being able to help showcase the beauty of Africa to the world through our platform is incredibly rewarding.",
                },
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
                        <div className="pb-4">
                          <div className="w-16 h-16 pb-4 bg-gray-200 rounded-full"></div>
                          <h3 className="text-lg font-semibold">
                            {employee.name}
                          </h3>
                          <p className="font-medium text-flapabay-yellow">
                            {employee.role}
                          </p>
                          <p className="pb-4 text-sm text-gray-500">
                            {employee.location} • {employee.years} years
                          </p>
                        </div>

                        <blockquote className="flex-grow pb-4 italic text-gray-600">
                          "{employee.quote}"
                        </blockquote>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button className="text-white bg-flapabay-yellow hover:bg-flapabay-yellow/90">
                View Open Positions
              </Button>
            </div>
          </div>
        </section>
    </>
  );
};

export default Careers;
