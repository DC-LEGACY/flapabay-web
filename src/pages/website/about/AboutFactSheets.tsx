import { Award, Home, Map, Star, TrendingUp, Users } from 'lucide-react';
import {
  Global,
  Home2,
  Medal,
  People,
  Star1,
  TrendUp
} from "iconsax-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/composite/tabs";

import React from 'react';
import { motion } from 'framer-motion';

const AboutFactSheets = () => {
  const stats = [
    { 
      icon: <People size="32" color="#FFD700"/>, 
      value: "500K+", 
      label: "Active Users" 
    },
    { 
      icon: <Home2 size="32" color="#FFD700"/>, 
      value: "5,000+", 
      label: "Listed Properties" 
    },
    { 
      icon: <Global size="32" color="#FFD700"/>, 
      value: "15", 
      label: "Countries" 
    },
    { 
      icon: <Star1 size="32" color="#FFD700"/>, 
      value: "4.8/5", 
      label: "Average Rating" 
    },
    { 
      icon: <TrendUp size="32" color="#FFD700"/>, 
      value: "200%", 
      label: "YoY Growth" 
    },
       
    { 
      icon: <Map className="w-8 h-8 text-flapabay-yellow" />, 
      value: "15", 
      label: "Countries" 
    },
  
    { 
      icon: <Award className="w-8 h-8 text-flapabay-yellow" />, 
      value: "12", 
      label: "Industry Awards" 
    }
  ];

  const recognitions = [
    { year: "2023", award: "African Travel Innovation Award", organization: "Pan-African Tourism Board" },
    { year: "2022", award: "Best Accommodation Platform", organization: "African Tech Summit" },
    { year: "2022", award: "Sustainable Tourism Initiative", organization: "Global Tourism Alliance" },
    { year: "2021", award: "Top Travel Startup", organization: "TechAfrica Awards" },
    { year: "2020", award: "Customer Service Excellence", organization: "International Hospitality Awards" }
  ];

  const milestones = [
    { year: "2023", event: "Reached 500,000 active users" },
    { year: "2022", event: "Expanded to 5 new countries" },
    { year: "2021", event: "Secured Series B funding of $25M" },
    { year: "2020", event: "Launched experiences marketplace" },
    { year: "2019", event: "Reached 1,000 properties milestone" },
    { year: "2018", event: "FlapaBay founded" }
  ];

  return (
    <section className="py-20 text-white bg-flapabay-black">
      <div className="flapabay-container">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="mb-6 font-bold text-white text- md:text-4xl">Fact Sheet & Achievements</h2>

          <p className="text-lg text-gray-300">
            Our journey in numbers, awards, and key milestones that mark our growth in transforming African hospitality.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-16 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 text-center transition-shadow bg-gray-900 rounded-lg shadow-sm hover:shadow-md"
            >
              <div className="flex justify-center mb-3">
                {stat.icon}
              </div>
              <div className="mb-1 text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="recognition" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900">
            <TabsTrigger value="recognition" className="data-[state=active]:bg-flapabay-yellow data-[state=active]:text-black">Awards & Recognition</TabsTrigger>
            <TabsTrigger value="milestones" className="data-[state=active]:bg-flapabay-yellow data-[state=active]:text-black">Key Milestones</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recognition" className="mt-6">
            <div className="overflow-hidden bg-gray-900 rounded-lg shadow-sm">
              <Table>
                <TableHeader className="bg-gray-800">
                  <TableRow>
                    <TableHead className="text-gray-300">Year</TableHead>
                    <TableHead className="text-gray-300">Award</TableHead>
                    <TableHead className="text-gray-300">Organization</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recognitions.map((item, index) => (
                    <TableRow key={index} className="border-gray-800">
                      <TableCell className="font-medium text-flapabay-yellow">{item.year}</TableCell>
                      <TableCell className="text-white">{item.award}</TableCell>
                      <TableCell className="text-gray-300">{item.organization}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="milestones" className="mt-6">
            <div className="overflow-hidden bg-gray-900 rounded-lg shadow-sm">
              <Table>
                <TableHeader className="bg-gray-800">
                  <TableRow>
                    <TableHead className="text-gray-300">Year</TableHead>
                    <TableHead className="text-gray-300">Milestone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {milestones.map((item, index) => (
                    <TableRow key={index} className="border-gray-800">
                      <TableCell className="font-medium text-flapabay-yellow">{item.year}</TableCell>
                      <TableCell className="text-white">{item.event}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AboutFactSheets;
