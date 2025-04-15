import {
  ArrowRight,
  Award,
  Calendar,
  Download,
  ExternalLink,
  FileText,
  Globe,
  Mail,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Footer from "@/components/common/default-footer";
import Header from "@/components/common/DefaultHeader";
import MobileMenu from "@/components/common/mobile-menu";
import React from "react";
import { motion } from "framer-motion";

const MediaRoom = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      <Header />
      <MobileMenu />
      <main className="items-center flex-1">
        {/* Hero Section */}
        <section className="px-6 py-20 pb-10 lg:pt-36 md:pt-16 bg-flapabay-yellow">
          <div className="flapabay-container">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h1
                className="text-3xl md:text-4xl font-bold pb-4 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                FlapaBay Media Room
              </motion.h1>
              <motion.p
                className="text-lg pb-8 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Access press releases, media resources, and the latest news
                about FlapaBay
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button className="bg-black text-white hover:bg-gray-800">
                  Media Inquiries
                </Button>
                <Button variant="outline" className="bg-white">
                  Download Press Kit
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Company Facts Section */}
        <section className="py-16 bg-white">
          <div className="flapabay-container">
            <h2 className="text-2xl font-bold pb-8 text-center">
              Company Facts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Calendar className="text-flapabay-yellow" />,
                  label: "Founded",
                  value: "2020",
                  detail: "Launched in Miami, Florida",
                },
                {
                  icon: <Globe className="text-flapabay-yellow" />,
                  label: "Global Presence",
                  value: "60+ Countries",
                  detail: "Focus on African destinations",
                },
                {
                  icon: <Users className="text-flapabay-yellow" />,
                  label: "Team Members",
                  value: "250+",
                  detail: "Across 12 global offices",
                },
                {
                  icon: <Award className="text-flapabay-yellow" />,
                  label: "Experiences",
                  value: "15,000+",
                  detail: "Authentic local activities",
                },
              ].map((fact, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-gray-200">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-flapabay-yellow/10 flex items-center justify-center pb-4">
                        {fact.icon}
                      </div>
                      <p className="text-gray-500 text-sm uppercase tracking-wider">
                        {fact.label}
                      </p>
                      <h3 className="text-2xl font-bold pt-1 pb-2">
                        {fact.value}
                      </h3>
                      <p className="text-gray-600 text-sm">{fact.detail}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Press Releases Section - Now with black background */}
        <section className="py-16 bg-black text-white">
          <div className="flapabay-container">
            <h2 className="text-2xl text-white font-bold pb-8 text-center">
              Latest Press Releases
            </h2>

            <div className="space-y-6 max-w-4xl mx-auto">
              {[
                {
                  date: "June 15, 2023",
                  title: "FlapaBay Expands to 10 New African Countries",
                  summary:
                    "FlapaBay announces major expansion across Africa, bringing its unique accommodation and experience platform to 10 new countries including Ghana, Rwanda, and Mozambique.",
                  tag: "Expansion",
                },
                {
                  date: "April 28, 2023",
                  title: "FlapaBay Launches Sustainable Tourism Initiative",
                  summary:
                    "New program partners with local communities to develop eco-friendly accommodations and experiences, with a $2 million investment fund to support sustainable tourism projects.",
                  tag: "Sustainability",
                },
                {
                  date: "March 5, 2023",
                  title: "FlapaBay Raises $50M in Series B Funding",
                  summary:
                    "Investment led by Global Ventures Partners will accelerate growth and technology development, with focus on enhancing the host and guest experience across the platform.",
                  tag: "Investment",
                },
                {
                  date: "January 12, 2023",
                  title:
                    "FlapaBay Announces Strategic Partnership with African Tourism Board",
                  summary:
                    "Collaboration aims to promote authentic African travel experiences and support local economies through responsible tourism initiatives.",
                  tag: "Partnership",
                },
              ].map((release, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-gray-800 bg-gray-900 hover:shadow-md hover:shadow-black transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-32 bg-gray-800 p-4 flex flex-col items-center justify-center text-center">
                          <FileText className="h-6 w-6 text-flapabay-yellow pb-2" />
                          <p className="text-sm text-gray-400">
                            {release.date}
                          </p>
                        </div>

                        <div className="p-6 flex-1">
                          <div className="flex justify-between items-start pb-2">
                            <h3 className="text-xl font-semibold text-white">
                              {release.title}
                            </h3>
                            <Badge
                              variant="outline"
                              className="bg-flapabay-yellow/10 text-flapabay-yellow border-flapabay-yellow ml-2 whitespace-nowrap"
                            >
                              {release.tag}
                            </Badge>
                          </div>
                          <p className="text-gray-300 pb-4">
                            {release.summary}
                          </p>
                          <Button
                            variant="ghost"
                            className="text-flapabay-yellow hover:text-flapabay-yellow hover:bg-flapabay-yellow/10 p-0 flex items-center"
                          >
                            <span>Read full release</span>
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center pt-10">
              <Button
                variant="outline"
                className="text-black border-white hover:bg-white/10"
              >
                View All Press Releases
              </Button>
            </div>
          </div>
        </section>

        {/* Media Resources - Now with #ffc500 background */}
        <section className="py-16 bg-[#ffc500]">
          <div className="flapabay-container">
            <h2 className="text-2xl font-bold pb-2 text-center text-black">
              Media Resources
            </h2>
            <p className="text-gray-800 text-center pb-10 max-w-2xl mx-auto">
              Download official FlapaBay brand assets and find useful
              information for media coverage
            </p>

            <Tabs defaultValue="brand" className="w-full">
              <TabsList className="w-full justify-center pb-8 bg-black/10">
                <TabsTrigger
                  value="brand"
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Brand Assets
                </TabsTrigger>
                <TabsTrigger
                  value="photos"
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Photos
                </TabsTrigger>
                <TabsTrigger
                  value="factsheets"
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Fact Sheets
                </TabsTrigger>
                <TabsTrigger
                  value="bios"
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Executive Bios
                </TabsTrigger>
              </TabsList>

              <TabsContent value="brand">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Logo Package",
                      description:
                        "Various formats of the FlapaBay logo, including PNG, SVG, and EPS files with different color variations.",
                      fileType: "ZIP (12MB)",
                    },
                    {
                      title: "Brand Guidelines",
                      description:
                        "Comprehensive guide to the FlapaBay brand, including color palette, typography, and usage rules.",
                      fileType: "PDF (8MB)",
                    },
                    {
                      title: "Icon Library",
                      description:
                        "Collection of FlapaBay icons used across our platform and marketing materials.",
                      fileType: "ZIP (5MB)",
                    },
                  ].map((resource, index) => (
                    <Card
                      key={index}
                      className="border-gray-800 bg-white shadow-lg"
                    >
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold pb-2">
                          {resource.title}
                        </h3>
                        <p className="text-gray-600 text-sm pb-4">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {resource.fileType}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center bg-black text-white hover:bg-black/80 border-none"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="photos">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Product Screenshots", count: 25 },
                    { title: "Office & Team Photos", count: 40 },
                    { title: "Featured Properties", count: 50 },
                    { title: "African Experiences", count: 35 },
                    { title: "User Testimonials", count: 20 },
                    { title: "Event Photography", count: 30 },
                  ].map((album, index) => (
                    <Card
                      key={index}
                      className="border-gray-800 bg-white shadow-lg overflow-hidden"
                    >
                      <div className="h-40 bg-gray-200"></div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{album.title}</h3>
                          <Badge
                            variant="outline"
                            className="bg-black text-white border-black"
                          >
                            {album.count} photos
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="pt-2 p-0 flex items-center text-sm text-black"
                        >
                          <span>View album</span>
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="factsheets">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {[
                    {
                      title: "Company Overview",
                      description:
                        "Key facts and figures about FlapaBay's mission, growth, and global presence.",
                      updated: "Last updated: May 2023",
                    },
                    {
                      title: "Impact Report",
                      description:
                        "Data and insights on FlapaBay's economic and social impact across African communities.",
                      updated: "Last updated: April 2023",
                    },
                    {
                      title: "User Demographics",
                      description:
                        "Breakdown of guest and host demographics, booking trends, and platform usage statistics.",
                      updated: "Last updated: June 2023",
                    },
                    {
                      title: "Sustainability Initiatives",
                      description:
                        "Details on FlapaBay's environmental programs, carbon offset efforts, and sustainable tourism practices.",
                      updated: "Last updated: March 2023",
                    },
                  ].map((sheet, index) => (
                    <Card
                      key={index}
                      className="border-gray-800 bg-white shadow-lg"
                    >
                      <CardContent className="p-6">
                        <FileText className="h-8 w-8 text-black pb-3" />
                        <h3 className="text-lg font-semibold pb-2">
                          {sheet.title}
                        </h3>
                        <p className="text-gray-600 text-sm pb-4">
                          {sheet.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {sheet.updated}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center bg-black text-white hover:bg-black/80 border-none"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="bios">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {[
                    {
                      name: "Sarah Johnson",
                      title: "Chief Executive Officer",
                      photo: "",
                      bio: "Sarah leads FlapaBay's global strategy and operations. With 15+ years in travel tech, she previously held executive roles at major hospitality companies.",
                    },
                    {
                      name: "Daniel Okafor",
                      title: "Chief Operating Officer",
                      photo: "",
                      bio: "Daniel oversees day-to-day operations and African market expansion. His background includes leadership positions in African tourism development.",
                    },
                    {
                      name: "Mei Lin",
                      title: "Chief Technology Officer",
                      photo: "",
                      bio: "Mei leads FlapaBay's engineering and product teams, focusing on platform innovation and user experience improvement.",
                    },
                  ].map((exec, index) => (
                    <Card
                      key={index}
                      className="border-gray-800 bg-white shadow-lg"
                    >
                      <CardContent className="p-6">
                        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto pb-4"></div>
                        <h3 className="text-lg font-semibold text-center pb-1">
                          {exec.name}
                        </h3>
                        <p className="text-black text-center pb-4">
                          {exec.title}
                        </p>
                        <p className="text-gray-600 text-sm text-center pb-4">
                          {exec.bio}
                        </p>
                        <div className="flex justify-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center bg-black text-white hover:bg-black/80 border-none"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Full Bio
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* In The News Section - Now with black background and pictures */}
        <section className="py-16 bg-black text-white">
          <div className="flapabay-container">
            <h2 className="text-2xl font-bold text-white pb-8 text-center">
              FlapaBay In The News
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  source: "Travel Weekly",
                  date: "July 8, 2023",
                  title:
                    "FlapaBay Revolutionizes African Tourism with Local-First Approach",
                  url: "#",
                  image:
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2080&auto=format&fit=crop",
                },
                {
                  source: "Tech Insider",
                  date: "June 22, 2023",
                  title:
                    "How FlapaBay's AI Matching System Connects Travelers with Perfect Experiences",
                  url: "#",
                  image:
                    "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop",
                },
                {
                  source: "Business Africa",
                  date: "May 15, 2023",
                  title:
                    "FlapaBay Secures $50M to Expand Authentic Travel Experiences Across Africa",
                  url: "#",
                  image:
                    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop",
                },
                {
                  source: "Sustainable Travel Times",
                  date: "April 30, 2023",
                  title:
                    "FlapaBay's Eco-Initiative Empowers Local Communities While Protecting Environments",
                  url: "#",
                  image:
                    "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1972&auto=format&fit=crop",
                },
                {
                  source: "Global Tourism Review",
                  date: "April 15, 2023",
                  title:
                    "FlapaBay Named Among Top 10 Innovative Travel Platforms of 2023",
                  url: "#",
                  image:
                    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2032&auto=format&fit=crop",
                },
                {
                  source: "African Business Journal",
                  date: "March 28, 2023",
                  title:
                    "How FlapaBay is Transforming Tourism Economies Across Africa",
                  url: "#",
                  image:
                    "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2072&auto=format&fit=crop",
                },
              ].map((article, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-gray-800 bg-gray-900 hover:shadow-md hover:shadow-black transition-shadow overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between pb-4">
                        <span className="font-medium text-flapabay-yellow">
                          {article.source}
                        </span>
                        <span className="text-xs text-gray-400">
                          {article.date}
                        </span>
                      </div>
                      <h3 className="font-semibold pb-4 text-white">
                        {article.title}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center text-flapabay-yellow hover:bg-flapabay-yellow/10 hover:text-white"
                      >
                        <span>Read article</span>
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center pt-10">
              <Button
                variant="outline"
                className="text-black border-white hover:bg-white/70"
              >
                View Full News Archive
              </Button>
            </div>
          </div>
        </section>

        {/* Media Contact Section */}
        <section className="py-16 bg-black text-white">
          <div className="flapabay-container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl text-white font-bold pb-4">Media Inquiries</h2>
              <p className="text-gray-300 pb-8">
                For press inquiries, interview requests, or additional
                information, please contact our media relations team
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
                <div className="bg-gray-900 p-6 rounded-lg">
                  <h3 className="font-semibold pb-3 flex items-center">
                    <Mail className="h-5 w-5 text-flapabay-yellow mr-2" />
                    Press Inquiries
                  </h3>
                  <p className="text-gray-300 pb-3">
                    For general media questions and information
                  </p>
                  <p className="text-flapabay-yellow font-medium">
                    press@flapabay.com
                  </p>
                </div>

                <div className="bg-gray-900 p-6 rounded-lg">
                  <h3 className="font-semibold pb-3 flex items-center">
                    <Users className="h-5 w-5 text-flapabay-yellow mr-2" />
                    Interview Requests
                  </h3>
                  <p className="text-gray-300 pb-3">
                    To schedule interviews with our executives
                  </p>
                  <p className="text-flapabay-yellow font-medium">
                    media@flapabay.com
                  </p>
                </div>
              </div>

              <div className="pt-12">
                <Button className="bg-flapabay-yellow text-white hover:bg-flapabay-yellow/90">
                  Contact Media Team
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="pb-0 footer-style1 pt60">
        <Footer />
      </section>
    </>
  );
};

export default MediaRoom;
