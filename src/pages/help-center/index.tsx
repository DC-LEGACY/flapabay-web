import {
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  Bot,
  Briefcase,
  Calendar,
  Clock,
  ExternalLink,
  FileQuestion,
  FileText,
  Globe,
  Heart,
  HelpCircle,
  LifeBuoy,
  Lightbulb,
  Mail,
  Map,
  MessageSquare,
  Phone,
  Search,
  Shield,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Book,
  Briefcase as BriefcaseIcon,
  Calendar as CalendarIcon,
  Call,
  DocumentText,
  Global,
  I24Support,
  Message,
  MessageQuestion,
  Profile2User,
  ShieldTick,
  Sms,
  Timer,
  Warning2,
} from "iconsax-react";
import { Card, CardContent } from "@/components/ui/card";
import { FiFileText, FiSearch } from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import ExperienceHost from "./ExperienceHost";
import Footer from "@/common/default-footer";
import Guest from "./Guest";
import Header from "@/components/common/DefaultHeader";
import Host from "./Host";
import { Input } from "@/components/ui/input";
import MobileMenu from "../common/mobile-menu";
import { Progress } from "@/components/ui/progress";
import { SearchNormal } from "iconsax-react";
import TravelAdmin from "./TravelAdmin";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const suggestions = [
  "How to book a trip?",
  "Cancel a reservation",
  "Change account settings",
  "Refund policies",
  "Host payment options",
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLinks, setFilteredLinks] = useState<any[]>([]);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const handleSelectSuggestion = (text) => {
    setSearchText(text);
    setShowSuggestions(false);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  const quickLinks = [
    {
      icon: <Warning2 variant="Outline" size="20" />,
      title: "Report Neighborhood Concern",
      path: "/help/neighborhood",
    },
    {
      icon: <Global variant="Outline" size="20" />,
      title: "Supported Countries",
      path: "/help/countries",
    },
    {
      icon: <BriefcaseIcon variant="Outline" size="20" />,
      title: "Careers",
      path: "/careers",
    },
    {
      icon: <DocumentText variant="Outline" size="20" />,
      title: "FAQs",
      path: "/help/faqs",
    },
    {
      icon: <CalendarIcon variant="Outline" size="20" />,
      title: "Cancellation Options",
      path: "/help/cancellation",
    },
    {
      icon: <Profile2User variant="Outline" size="20" />,
      title: "Media Room",
      path: "/media",
    },
  ];

  // Mock tutorials data - in a real app, this would come from an admin dashboard
  const tutorialVideos = [
    {
      id: 1,
      title: "How to Book a Property",
      duration: "2:45",
      youtubeId: "dQw4w9WgXcQ", // Example YouTube ID
      thumbnail: "https://i3.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    },
    {
      id: 2,
      title: "Managing Your Reservations",
      duration: "3:12",
      youtubeId: "ZVOmv_vMIbA",
      thumbnail: "https://i3.ytimg.com/vi/ZVOmv_vMIbA/maxresdefault.jpg",
    },
    {
      id: 3,
      title: "FlapaBay Mobile App Guide",
      duration: "4:03",
      youtubeId: "LACbVhgtx9I",
      thumbnail: "https://i3.ytimg.com/vi/LACbVhgtx9I/maxresdefault.jpg",
    },
    {
      id: 4,
      title: "How to Become a Host",
      duration: "5:17",
      youtubeId: "aJOTlE1K90k",
      thumbnail: "https://i3.ytimg.com/vi/aJOTlE1K90k/maxresdefault.jpg",
    },
    {
      id: 5,
      title: "FlapaBay Payment Options",
      duration: "2:53",
      youtubeId: "kJQP7kiw5Fk",
      thumbnail: "https://i3.ytimg.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
    },
    {
      id: 6,
      title: "Safety Tips for Travelers",
      duration: "3:48",
      youtubeId: "JGwWNGJdvx8",
      thumbnail: "https://i3.ytimg.com/vi/JGwWNGJdvx8/maxresdefault.jpg",
    },
  ];

  const categories = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Getting Started",
      description:
        "Learn how to set up your account and make your first booking",
      color: "bg-flapabay-yellow/20",
      textColor: "text-black",
    },
    {
      icon: <HelpCircle className="w-6 h-6" />,
      title: "Booking & Reservations",
      description:
        "Everything you need to know about booking properties and experiences",
      color: "bg-flapabay-yellow/20",
      textColor: "text-black",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Support",
      description:
        "Contact our dedicated support team for personalized assistance",
      color: "bg-flapabay-yellow/20",
      textColor: "text-black",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Account & Payments",
      description: "Manage your payment methods, profile and security settings",
      color: "bg-flapabay-yellow/20",
      textColor: "text-black",
    },
  ];

  const popularQuestions = [
    "How do I cancel a reservation?",
    "What is FlapaBay's refund policy?",
    "How do I contact my host?",
    "Is my payment information secure?",
    "Can I change my reservation dates?",
    "How do I leave a review?",
  ];

  useEffect(() => {
    if (isTyping) {
      let progressValue = 0;
      const interval = setInterval(() => {
        progressValue += 5;
        setProgress(progressValue);
        if (progressValue >= 100) clearInterval(interval);
      }, 75);

      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isTyping]);

  useEffect(() => {
    // Filter quick links based on search query
    if (searchQuery.trim()) {
      const filtered = quickLinks.filter((link) =>
        link.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLinks(filtered);
    } else {
      setFilteredLinks([]);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      // Show search results toast
      toast({
        title: "Search Results",
        description: filteredLinks.length
          ? `Found ${filteredLinks.length} results for "${searchQuery}"`
          : `No results found for "${searchQuery}"`,
      });

      // If we have matches, navigate to the first result
      if (filteredLinks.length > 0) {
        navigate(filteredLinks[0].path);
      }
    }
  };

  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = "";

      switch (aiQuestion.toLowerCase()) {
        case "how do i cancel a reservation?":
          response =
            "To cancel a reservation, go to 'Trips' in your account, find the booking you want to cancel, and click 'Cancel reservation'. The refund amount will depend on the property's cancellation policy.";
          break;
        case "what is flapabay's refund policy?":
          response =
            "FlapaBay's refund policy varies by property. Generally, cancellations made 48 hours before check-in receive a full refund minus service fees. Check the specific listing's cancellation policy for details.";
          break;
        case "how do i contact my host?":
          response =
            "You can message your host through the FlapaBay messaging system. Go to 'Trips', select your booking, and click 'Message Host'. All communication should stay on the platform for security.";
          break;
        case "is my payment information secure?":
          response =
            "Yes, your payment information is secure on FlapaBay. We use industry-standard encryption, never store complete credit card information, and process all payments through secure, PCI-compliant payment processors.";
          break;
        case "can i change my reservation dates?":
          response =
            "Yes, you can request to change your reservation dates. Go to 'Trips', select the booking you want to modify, and click 'Change Reservation'. Note that this is subject to host approval and availability.";
          break;
        case "how do i leave a review?":
          response =
            "You can leave a review after your stay. Go to 'Trips', find your completed stay, and click 'Leave a Review'. You'll have 14 days after checkout to share your experience with the host and property.";
          break;
        default:
          response =
            "I'd be happy to help with your question about '" +
            aiQuestion +
            "'. Based on my knowledge of FlapaBay's services, I can provide the following information: \n\nTo get the most accurate and up-to-date answer, I recommend checking our detailed FAQs section or contacting our support team directly for personalized assistance. Is there anything specific about this topic you'd like me to explain further?";
      }

      setAiResponse(response);
      setIsTyping(false);
    }, 2000);
  };

  const handleVideoClick = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, "_blank");
  };

  const handleQuickQuestionClick = (question: string) => {
    setAiQuestion(question);

    // Trigger the form submission
    const form = document.getElementById("ai-form") as HTMLFormElement;
    if (form) form.dispatchEvent(new Event("submit", { cancelable: true }));
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Header />
      <MobileMenu />

      <main className="items-center flex-1">
        {/* <div className="flex flex-col items-center pt-6 lg:pt-36"> */}
        {/* Hero Section */}

        <section className="px-6 py-20 pb-10 mx-auto max-w-screen-4xl lg:pt-36 md:pt-16 bg-flapabay-yellow">
          <div className="flapabay-container">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                className="text-4xl font-bold text-white md:text-5xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                How can we help you?
              </motion.h1>
              <motion.p
                className="pt-2 pb-6 text-lg text-white md:text-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Find answers to your questions or contact our support team
              </motion.p>

              {/* Search Bar with Suggestions */}
              <div className="relative w-full max-w-3xl mx-auto ">
                <input
                  type="text"
                  placeholder="Search how-tos and more"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-full px-4 py-3 border rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#FFC500]"
                />
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#FFC500] text-white p-2 rounded-full">
                  <SearchNormal size={18} />
                </button>

                {showSuggestions && (
                  <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSelectSuggestion(suggestion)}
                      >
                        <FiFileText className="mr-3 text-gray-500" size={18} />
                        <span>{suggestion}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        {/* Quick Links Section */}
        <section className="py-16 bg-black">
          <div className="flapabay-container">
            <h2 className="pb-12 text-3xl font-bold text-center text-white md:text-3xl">
              Quick Links
            </h2>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="cursor-pointer"
                  onClick={() => navigate(link.path)}
                >
                  <Card className="h-full text-white transition-colors bg-black border-gray-700 rounded-2 xl hover:border-flapabay-yellow">
                    <CardContent className="flex flex-col items-center p-4 text-center">
                      <div className="flex items-center justify-center w-12 h-12 mt-3 mb-3 rounded-full bg-flapabay-yellow/90">
                        <span className="text-black">{link.icon}</span>
                      </div>
                      <h3 className="text-sm font-medium text-white">
                        {link.title}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-[#ffc500]">
          <div className="flapabay-container">
            <h2 className="pb-12 text-3xl font-bold text-center text-black md:text-3xl">
              Browse by Category
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  className="relative transition-all bg-white border border-gray-100 cursor-pointer rounded-2xl"
                  onClick={() => setSelectedCategory(category.title)}
                >
                  <div className="p-6 pb-4 ">
                    <div
                      className={`${category.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}
                    >
                      <div className={category.textColor}>{category.icon}</div>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{category.title}</h3>
                    <p className="mb-4 text-dark">{category.description}</p>
                  </div>
                  <br></br>
                  <div className="w-full mt-5 border-t-[1px] border-black/10 left-0 pl-6 pt-2 absolute flex font-medium text-flapabay-yellow bottom-4 ">
                    <div className="flex items-center left-6">
                      <span>View articles</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Category Details - Appears when a category is selected */}
            <AnimatePresence>
              {selectedCategory && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-6 pt-6 overflow-hidden bg-white border border-gray-100 rounded-2xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">{selectedCategory}</h3>
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedCategory(null)}
                    >
                      Close
                    </Button>
                  </div>

                  <Tabs defaultValue="all">
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="articles">Articles</TabsTrigger>
                      <TabsTrigger value="videos">Videos</TabsTrigger>
                      <TabsTrigger value="faqs">FAQs</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-2">
                      <div className="grid gap-4 md:grid-cols-2">
                        {[1, 2, 3, 4].map((item) => (
                          <Card
                            key={item}
                            className="transition-colors cursor-pointer rounded-2xl hover:border-flapabay-yellow"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <FileText className="flex-shrink-0 w-5 h-5 mt-1 text-flapabay-yellow" />
                                <div>
                                  <h4 className="font-medium">
                                    How to{" "}
                                    {selectedCategory === "Getting Started"
                                      ? "create your account"
                                      : selectedCategory ===
                                        "Booking & Reservations"
                                      ? "book a property"
                                      : selectedCategory === "Support"
                                      ? "contact our team"
                                      : "update payment info"}
                                  </h4>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Learn the basics in this step-by-step guide
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="articles">
                      <p className="text-gray-500">
                        Detailed articles about {selectedCategory}
                      </p>
                    </TabsContent>

                    <TabsContent value="videos">
                      <p className="text-gray-500">
                        Video tutorials about {selectedCategory}
                      </p>
                    </TabsContent>

                    <TabsContent value="faqs">
                      <p className="text-gray-500">
                        Frequently asked questions about {selectedCategory}
                      </p>
                    </TabsContent>
                  </Tabs>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Popular Questions - Enhanced */}
        <section className="py-16 bg-white">
          <div className="flapabay-container">
            <h2 className="pb-12 text-3xl font-bold text-center md:text-3xl">
              Popular Questions
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {popularQuestions.map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="h-full transition-all border-l-4 cursor-pointer hover:shadow-md border-l-flapabay-yellow">
                    <CardContent className="flex items-start p-6">
                      <Lightbulb className="flex-shrink-0 w-5 h-5 mt-1 mr-3 text-flapabay-yellow" />
                      <div>
                        <h3 className="mb-2 font-medium">{question}</h3>
                        <p className="mb-3 text-sm text-gray-500">
                          Get a quick answer to this common question
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={() => handleQuickQuestionClick(question)}
                        >
                          View Answer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Highlights Section */}
        <section className="py-16 bg-[#ffc500]">
          <div className="flapabay-container">
            <h2 className="mb-4 text-3xl font-bold text-center text-black md:text-3xl">
              We're Here to Help
            </h2>
            <p className="max-w-2xl mx-auto mb-12 text-center text-gray-800">
              Our support team is available 24/7 to assist with any issues or
              questions you might have
            </p>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <I24Support variant="Outline" size="24" />,
                  title: "24/7 Support",
                  desc: "Our team is always available",
                },
                {
                  icon: <Global variant="Outline" size="24" />,
                  title: "Global Assistance",
                  desc: "Help in multiple languages",
                },
                {
                  icon: <ShieldTick variant="Outline" size="24" />,
                  title: "Secure Platform",
                  desc: "Your safety is our priority",
                },
                {
                  icon: <Heart variant="Outline" size="24" />,
                  title: "Traveler Guarantee",
                  desc: "Worry-free experiences",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="h-full p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
                    <div className="flex items-center justify-center mx-auto mb-4 bg-black rounded-full w-14 h-14">
                      <span className="text-flapabay-yellow">{item.icon}</span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                    <p className="text-dark">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive AI Assistant */}
        <section className="py-16 text-white bg-black">
          <div className="flapabay-container">
            <div className="flex flex-col items-center gap-10 lg:flex-row">
              <div className="lg:w-1/2">
                <div className="flex items-center mb-4">
                  <Bot className="w-10 h-10 mr-3 text-flapabay-yellow" />
                  <h2 className="text-3xl font-bold text-white">
                    AI Assistant
                  </h2>
                </div>
                <p className="pb-6 text-lg text-gray-300">
                  Get instant answers to your questions with our AI-powered
                  assistant. Ask anything about bookings, properties, payments,
                  or any other FlapaBay service.
                </p>

                <form
                  id="ai-form"
                  onSubmit={handleAISubmit}
                  className="pb-4 space-y-4"
                >
                  <div className="relative">
                    <textarea
                      className="w-full p-4 text-white bg-gray-900 border border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-flapabay-yellow"
                      placeholder="Ask me anything about FlapaBay..."
                      rows={3}
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="flex items-center px-6 py-3 font-[500] text-white transition-all rounded-xl bg-flapabay-yellow hover:bg-opacity-90"
                    disabled={!aiQuestion.trim() || isTyping}
                  >
                    {isTyping ? (
                      <>
                        <span className="mr-2">Processing</span>
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </>
                    ) : (
                      <>
                        Get Answer
                        <Sparkles className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                </form>

                {isTyping && (
                  <div className="pt-4">
                    <Progress value={progress} className="h-1 py-2" />
                  </div>
                )}

                {aiResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 pt-6 bg-gray-900 border border-gray-700 rounded-lg"
                  >
                    <div className="flex items-center mb-3">
                      <Bot className="w-5 h-5 mr-2 text-flapabay-yellow" />
                      <p className="text-sm font-medium text-gray-400">
                        FlapaBay Assistant
                      </p>
                    </div>
                    <p className="text-gray-300">{aiResponse}</p>
                    <div className="flex items-center mt-4 text-sm text-gray-500">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white"
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" /> Helpful
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-4 text-gray-400 hover:text-white"
                      >
                        <ThumbsDown className="w-4 h-4 mr-1" /> Not helpful
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="lg:w-1/2 sm:w-[100%]">
                <div className="p-6 bg-gray-900 border border-gray-800 shadow-lg rounded-2xl">
                  <h3 className="mb-4 text-xl font-bold text-white">
                    Common Topics
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        icon: <Calendar className="w-4 h-4 mr-2" />,
                        title: "Booking and cancellations",
                      },
                      {
                        icon: <CreditCard className="w-4 h-4 mr-2" />,
                        title: "Payment methods and refunds",
                      },
                      {
                        icon: <Shield className="w-4 h-4 mr-2" />,
                        title: "Account security",
                      },
                      {
                        icon: <Home className="w-4 h-4 mr-2" />,
                        title: "Property requirements",
                      },
                      {
                        icon: <MessageSquare className="w-4 h-4 mr-2" />,
                        title: "Host communication",
                      },
                      {
                        icon: <Umbrella className="w-4 h-4 mr-2" />,
                        title: "Travel insurance",
                      },
                    ].map((topic, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 5 }}
                        className="flex items-center p-3 transition-colors bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
                        onClick={() =>
                          setAiQuestion(
                            `Tell me about ${topic.title.toLowerCase()}`
                          )
                        }
                      >
                        {topic.icon}
                        <p className="text-gray-200">{topic.title}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-800">
                    <p className="text-center text-gray-400">
                      Need more help?{" "}
                      <span
                        className="cursor-pointer text-flapabay-yellow hover:underline"
                        onClick={() => navigate("/contact")}
                      >
                        Contact our support team
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Tutorials Section */}
        <section className="py-16 bg-[#ffc500]">
          <div className="flapabay-container">
            <div className="flex items-center justify-between pb-8">
              <div>
                <h2 className="pb-4 text-3xl font-bold text-black md:text-3xl">
                  Video Tutorials
                </h2>
                <p className="max-w-2xl text-gray-800">
                  Watch these short videos to learn how to make the most of
                  FlapaBay
                </p>
              </div>
              <Button
                variant="outline"
                className="text-white bg-black border-none hover:bg-gray-800"
                onClick={() => setShowAllVideos(!showAllVideos)}
              >
                {showAllVideos ? "Show Less" : "View All Videos"}
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {(showAllVideos
                ? tutorialVideos
                : tutorialVideos.slice(0, 3)
              ).map((video, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="overflow-hidden shadow-md cursor-pointer rounded-2xl"
                  onClick={() => handleVideoClick(video.youtubeId)}
                >
                  <div className="relative h-48 bg-gray-200 group">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/40 group-hover:opacity-100">
                      <div className="flex items-center justify-center w-16 h-16 transition-transform rounded-full bg-flapabay-yellow/90 group-hover:scale-110">
                        <Play className="w-6 h-6 ml-1 text-black" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{video.title}</h3>
                      <span className="text-xs text-gray-500">
                        {video.duration}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center p-0 mt-2 text-flapabay-yellow hover:text-flapabay-yellow hover:bg-flapabay-yellow/20"
                    >
                      <span>Watch now</span>
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-16 bg-gray-50">
          <div className="flapabay-container">
            <h2 className="pb-12 text-3xl font-bold text-center md:text-3xl">
              Contact Options
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl"
              >
                <div className="flex items-center justify-center mb-4 rounded-full w-14 h-14 bg-flapabay-yellow/20">
                  <Call
                    variant="Outline"
                    size="24"
                    className="text-flapabay-yellow"
                  />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Call Us</h3>
                <p className="mb-4 text-dark">
                  Speak directly with our customer support team
                </p>
                <p className="text-lg font-medium">+1 (305) 555-0123</p>
                <p className="text-sm text-gray-500">Available 24/7</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl"
              >
                <div className="flex items-center justify-center mb-4 rounded-full w-14 h-14 bg-flapabay-yellow/20">
                  <Sms
                    variant="Outline"
                    size="24"
                    className="text-flapabay-yellow"
                  />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Email Us</h3>
                <p className="mb-4 text-dark">
                  Send us a detailed message about your issue
                </p>
                <p className="text-lg font-medium">support@flapabay.com</p>
                <p className="text-sm text-gray-500">
                  Response within 24 hours
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl"
              >
                <div className="flex items-center justify-center mb-4 rounded-full w-14 h-14 bg-flapabay-yellow/20">
                  <Message
                    variant="Outline"
                    size="24"
                    className="text-flapabay-yellow"
                  />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Live Chat</h3>
                <p className="mb-4 text-dark">
                  Chat with our team in real-time for quick help
                </p>
                <Button className="font-semibold text-white bg-flapabay-yellow hover:bg-flapabay-yellow/90">
                  Start Chat
                </Button>
                <p className="mt-2 text-sm text-gray-500">
                  Typical response time: 2 minutes
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Active Tab Content */}
        {/* </div>*/}
      </main>

      <section className="pb-0 footer-style1 pt60">
        <Footer />
      </section>
    </>
  );
}
const Play = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const ThumbsUp = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7 10v12"></path>
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
  </svg>
);

const ThumbsDown = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17 14V2"></path>
    <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"></path>
  </svg>
);

const CreditCard = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="14" x="2" y="5" rx="2"></rect>
    <line x1="2" x2="22" y1="10" y2="10"></line>
  </svg>
);

const Home = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const Umbrella = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 19a6 6 0 0 0-6 6"></path>
    <path d="M12 12a6 6 0 0 0-6 6"></path>
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
);

//   Icons Fetched Successfully

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const HelpPage = () => {
//   const [icons, setIcons] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchIcons = async () => {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const token = user?.token;

//       if (!token) {
//         setError("Unauthorized: No token found.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           "http://localhost/flapabay-engine-main/api/v1/icons",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setIcons(response.data);
//         console.log("Icons fetched:", response.data);
//       } catch (err) {
//         setError("Failed to load icons. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchIcons();
//   }, []);

//   return (
//     <div className="p-4 bg-white rounded-md shadow">
//       <h2 className="mb-3 text-lg font-semibold">Available Icons</h2>

//       {loading ? (
//         <div className="flex justify-center">
//           <div className="w-8 h-8 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
//         </div>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : icons.length === 0 ? (
//         <p>No icons found.</p>
//       ) : (
//         <div className="grid grid-cols-4 gap-4">
//           {icons.map((icon, index) => (
//             <div key={index} className="flex flex-col items-center">
//               <img
//                 src={icon.icon_image_url || "images/default-icon.png"} // Fallback Image
//                 alt={icon.black_icon || "Icon"}
//                 className="object-contain w-16 h-16"
//                 onError={(e) => (e.target.src = "images/default-icon.png")} // Handle Broken Images
//               />
//               <p className="mt-1 text-sm">{icon.black_icon || "No Name"}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HelpPage;

//  Categories Fetched Successfully

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const HelpPage = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const token = user?.token;

//       if (!token) {
//         setError("Unauthorized: No token found.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           "http://localhost/flapabay-engine-main/api/v1/categories",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.data.status === "success") {
//           setCategories(response.data.data);
//           console.log("Categories fetched:", response.data.data);
//         } else {
//           setError("Failed to fetch categories.");
//         }
//       } catch (err) {
//         setError("Error fetching categories.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <div className="p-4 bg-white rounded-md shadow">
//       <h2 className="mb-3 text-lg font-semibold">Categories</h2>

//       {loading ? (
//         <div className="flex justify-center">
//           <div className="w-8 h-8 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
//         </div>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : categories.length === 0 ? (
//         <p>No categories found.</p>
//       ) : (
//         <div className="grid grid-cols-3 gap-4">
//           {categories.map((category) => (
//             <div key={category.id} className="p-3 bg-gray-100 rounded-md">
//               <h3 className="font-semibold text-md">{category.name}</h3>
//               <p className="text-sm text-dark">{category.description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HelpPage;

//  bookings Fetched Successfully

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const HelpPage = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const token = user?.token;

//       if (!token) {
//         setError("Unauthorized: No token found.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           "http://localhost/flapabay-engine-main/api/v1/bookings",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.data.success) {
//           setBookings(response.data.booking);
//           console.log("Bookings fetched:", response.data.booking);
//         } else {
//           setError("Failed to fetch bookings.");
//         }
//       } catch (err) {
//         setError("Error fetching bookings.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   return (
//     <div className="p-4 bg-white rounded-md shadow">
//       <h2 className="mb-3 text-lg font-semibold">Bookings</h2>

//       {loading ? (
//         <div className="flex justify-center">
//           <div className="w-8 h-8 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
//         </div>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm border border-collapse border-gray-200">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-2 border">ID</th>
//                 <th className="p-2 border">Booking Number</th>
//                 <th className="p-2 border">User ID</th>
//                 <th className="p-2 border">Property ID</th>
//                 <th className="p-2 border">Amount</th>
//                 <th className="p-2 border">Guest Count</th>
//                 <th className="p-2 border">Start Date</th>
//                 <th className="p-2 border">End Date</th>
//                 <th className="p-2 border">Booking Status</th>
//                 <th className="p-2 border">Booking Type</th>
//                 <th className="p-2 border">Payment Status</th>
//                 <th className="p-2 border">Payment Method</th>
//                 <th className="p-2 border">Payment Date</th>
//                 <th className="p-2 border">Cancellation Date</th>
//                 <th className="p-2 border">Cancellation Reason</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking) => (
//                 <tr key={booking.id} className="text-center">
//                   <td className="p-2 border">{booking.id}</td>
//                   <td className="p-2 border">{booking.booking_number}</td>
//                   <td className="p-2 border">{booking.user_id}</td>
//                   <td className="p-2 border">{booking.property_id}</td>
//                   <td className="p-2 border">${booking.amount}</td>
//                   <td className="p-2 border">{booking.guest_count}</td>
//                   <td className="p-2 border">{booking.start_date}</td>
//                   <td className="p-2 border">{booking.end_date}</td>
//                   <td className="p-2 border">{booking.booking_status}</td>
//                   <td className="p-2 border">{booking.booking_type}</td>
//                   <td className="p-2 border">{booking.payment_status}</td>
//                   <td className="p-2 border">{booking.payment_method}</td>
//                   <td className="p-2 border">{booking.payment_date}</td>
//                   <td className="p-2 border">{booking.cancellation_date || "N/A"}</td>
//                   <td className="p-2 border">{booking.cancellation_reason || "N/A"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HelpPage;

//   locations Fetched Successfully

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const HelpPage = () => {
//   const [locations, setLocations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchLocations = async () => {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const token = user?.token;

//       if (!token) {
//         setError("Unauthorized: No token found.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           "http://localhost/flapabay-engine-main/api/v1/locations",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setLocations(response.data);
//         console.log("Locations fetched:", response.data);
//       } catch (err) {
//         setError("Error fetching locations.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLocations();
//   }, []);

//   return (
//     <div className="p-4 bg-white rounded-md shadow">
//       <h2 className="mb-3 text-lg font-semibold">Available Locations</h2>

//       {loading ? (
//         <div className="flex justify-center">
//           <div className="w-8 h-8 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
//         </div>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : locations.length === 0 ? (
//         <p>No locations found.</p>
//       ) : (
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {locations.map((location) => (
//             <div key={location.id} className="p-4 bg-gray-100 rounded-lg shadow">
//               <img
//                 src={location.placeholder_img}
//                 alt={location.name}
//                 className="object-cover w-full h-40 rounded-md"
//               />
//               <h3 className="mt-2 text-lg font-bold">{location.name} ({location.code})</h3>
//               <p className="mt-1 text-sm text-dark">{location.description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HelpPage;

// payment status Fetched Successfully

// import React, { useState } from "react";
// import axios from "axios";

// const HelpPage = () => {
//   const [paymentId, setPaymentId] = useState("");
//   const [status, setStatus] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchPaymentStatus = async () => {
//     if (!paymentId) {
//       setError("Please enter a valid Payment ID.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     const user = JSON.parse(localStorage.getItem("user"));
//     const token = user?.token;

//     if (!token) {
//       setError("Unauthorized: No token found.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost/flapabay-engine-main/api/v1/payments/status",
//         { payment_id: parseInt(paymentId) },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setStatus(response.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch payment status.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 bg-white rounded-md shadow">
//       <h2 className="mb-3 text-lg font-semibold">Check Payment Status</h2>

//       <div className="flex items-center gap-2">
//         <input
//           type="number"
//           value={paymentId}
//           onChange={(e) => setPaymentId(e.target.value)}
//           placeholder="Enter Payment ID"
//           className="w-full p-2 border rounded"
//         />
//         <button
//           onClick={fetchPaymentStatus}
//           className="px-4 py-2 text-white bg-blue-500 rounded"
//           disabled={loading}
//         >
//           {loading ? "Checking..." : "Check"}
//         </button>
//       </div>

//       {error && <p className="mt-2 text-red-500">{error}</p>}

//       {status && (
//         <div className="p-3 mt-4 bg-gray-100 rounded">
//           <h3 className="font-bold text-green-600">Payment Status</h3>
//           <p className="text-sm">
//             <strong>Status:</strong> {status.status}
//           </p>
//           <p className="text-sm">
//             <strong>Message:</strong> {status.message}
//           </p>
//           {status.data && (
//             <div className="mt-2">
//               <p><strong>Amount:</strong> {status.data.amount}</p>
//               <p><strong>Payment Method:</strong> {status.data.payment_method}</p>
//               <p><strong>Payment Date:</strong> {status.data.payment_date}</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HelpPage;

// payment payout option Fetched Successfully

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const HelpPage = () => {
//   const [payoutOptions, setPayoutOptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPayoutOptions = async () => {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const token = user?.token;

//       try {
//         const response = await axios.get(
//           "http://localhost/flapabay-engine-main/api/v1/payments/payout-options",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setPayoutOptions(response.data.data); // Accessing `data` inside response
//       } catch (err) {
//         setError("Failed to load payout options.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayoutOptions();
//   }, []);

//   return (
//     <div className="p-4 bg-white rounded-md shadow">
//       <h2 className="mb-3 text-lg font-semibold">Payout Options</h2>

//       {loading ? (
//         <div className="flex justify-center">
//           <div className="w-8 h-8 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
//         </div>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : payoutOptions.length === 0 ? (
//         <p>No payout options available.</p>
//       ) : (
//         <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//           {payoutOptions.map((option) => (
//             <div key={option.id} className="p-4 border rounded-lg shadow-md">
//               <h3 className="font-semibold text-md">{option.name}</h3>
//               <p className="text-sm text-dark">{option.description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HelpPage;

// get user detail payment Fetched Successfully

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const HelpPage = () => {
//   const [paymentDetails, setPaymentDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserPaymentDetails = async () => {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       console.log("User from localStorage:", storedUser); // Debugging

//       const token = storedUser?.token;
//       const userId = storedUser?.user?.id; // Fix: Extract correct user ID

//       if (!userId) {
//         console.error("User ID is missing");
//         setError("User ID is missing.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `http://localhost/flapabay-engine-main/api/v1/payments/user-payment-details`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         console.log("API Response:", response.data);
//         setPaymentDetails(response.data.data);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load payment details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserPaymentDetails();
//   }, []);

//   return (
//     <div className="p-4 bg-white rounded-md shadow">
//       <h2 className="mb-3 text-lg font-semibold">User Payment Details</h2>

//       {loading ? (
//         <div className="flex justify-center">
//           <div className="w-8 h-8 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
//         </div>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : paymentDetails.length === 0 ? (
//         <p>No payment details available.</p>
//       ) : (
//         <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//           {paymentDetails.map((detail) => (
//             <div key={detail.id} className="p-4 border rounded-lg shadow-md">
//               <h3 className="font-semibold text-md">{detail.method_name}</h3>
//               <p className="text-sm text-dark">Account: {detail.account_number}</p>
//               <p className="text-sm text-dark">Status: {detail.status}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HelpPage;
