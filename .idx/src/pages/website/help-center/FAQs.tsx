import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/composite/accordion";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  ChevronDown,
  FileQuestion,
  Search,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/layout/card";
import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/composite/tabs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import MobileMenu from "@/components/common/mobile-menu";
import { Progress } from "@/components/ui/progress";
import { SearchNormal } from "iconsax-react";

const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("general");
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [progress, setProgress] = useState(0);
  const aiResponseRef = useRef<HTMLDivElement>(null);

  // Simulated FAQ data
  const faqCategories = [
    {
      id: "general",
      name: "General",
      faqs: [
        {
          question: "What is FlapaBay?",
          answer:
            "FlapaBay is a platform that connects travelers with authentic local experiences and accommodations. We focus on providing unique stays and activities that allow you to experience destinations like a local.",
        },
        {
          question: "How do I create an account?",
          answer:
            "To create an account, click on the 'Sign Up' button in the top right corner of the homepage. You can sign up using your email address, or through your Google, Facebook, or Apple account for a quicker registration process.",
        },
        {
          question: "Is FlapaBay available worldwide?",
          answer:
            "FlapaBay is available in most countries worldwide, with a particular focus on African experiences. We're constantly expanding to new regions. Check our Supported Countries page for the most up-to-date information.",
        },
        {
          question: "How do I contact customer support?",
          answer:
            "You can contact our customer support team through the Help Center, by clicking on 'Contact Us', sending an email to support@flapabay.com, or calling our 24/7 support line at +1 (305) 555-0123.",
        },
      ],
    },
    {
      id: "booking",
      name: "Booking & Reservations",
      faqs: [
        {
          question: "How do I book a property?",
          answer:
            "To book a property, search for your destination and dates, select a property from the results, review the details, and click 'Reserve.' Follow the prompts to complete your booking, including payment information and any special requests.",
        },
        {
          question: "Can I book for someone else?",
          answer:
            "Yes, you can book on behalf of someone else. During the booking process, you'll have the option to specify the guest names. However, you'll be responsible for the booking as the account holder.",
        },
        {
          question: "What payment methods are accepted?",
          answer:
            "FlapaBay accepts major credit cards (Visa, Mastercard, American Express), debit cards, PayPal, and in select regions, Apple Pay and Google Pay. Some locations may offer additional local payment options.",
        },
        {
          question: "How do I modify or cancel a reservation?",
          answer:
            "To modify or cancel a reservation, go to 'Trips' in your account, find the booking you want to change, and select 'Modify Reservation' or 'Cancel Reservation.' The refund amount will depend on the property's cancellation policy.",
        },
      ],
    },
    {
      id: "payments",
      name: "Payments & Pricing",
      faqs: [
        {
          question: "When am I charged for a booking?",
          answer:
            "For most bookings, you'll be charged the full amount at the time of booking. For some longer stays or higher-priced accommodations, you may have the option to pay in installments, with the first payment due at booking.",
        },
        {
          question: "What is included in the total price?",
          answer:
            "The total price includes the base rate for the accommodation or experience, plus applicable taxes, cleaning fees (for properties), FlapaBay service fees, and any additional fees specified by the host.",
        },
        {
          question: "How do refunds work?",
          answer:
            "Refund eligibility and amount depend on the cancellation policy of the specific property or experience. Refunds are typically processed within 5-7 business days, though it may take longer for the funds to appear in your account depending on your payment method.",
        },
        {
          question: "Can I change the currency display?",
          answer:
            "Yes, you can change the currency displayed on FlapaBay. Look for the currency selector in the footer of the website or in your account settings to choose from available currencies.",
        },
      ],
    },
    {
      id: "hosting",
      name: "Hosting",
      faqs: [
        {
          question: "How do I become a host on FlapaBay?",
          answer:
            "To become a host, click on 'FlapaBay Your Home' in the navigation menu. You'll be guided through the process of creating a listing, including uploading photos, setting pricing, and establishing house rules.",
        },
        {
          question: "How much does it cost to list on FlapaBay?",
          answer:
            "It's free to create a listing on FlapaBay. We charge a service fee (typically 3-5%) when you receive a booking. This fee varies based on your location and property type.",
        },
        {
          question: "How do I set my pricing?",
          answer:
            "When creating your listing, you'll be able to set your base price. Our Smart Pricing tool can also provide recommendations based on demand, seasonality, and similar listings in your area to help maximize your earning potential.",
        },
        {
          question: "When do I get paid for bookings?",
          answer:
            "Hosts typically receive payment 24 hours after the guest's scheduled check-in. Payments are sent to your selected payout method, which can be a bank account, PayPal, or other options depending on your country.",
        },
      ],
    },
    {
      id: "account",
      name: "Account Management",
      faqs: [
        {
          question: "How do I reset my password?",
          answer:
            "To reset your password, click on 'Login' and then 'Forgot Password.' Enter the email associated with your account, and we'll send you a link to create a new password.",
        },
        {
          question: "Can I have multiple payment methods on my account?",
          answer:
            "Yes, you can add multiple payment methods to your FlapaBay account. Go to 'Account Settings' > 'Payment Methods' to add, remove, or update your payment options.",
        },
        {
          question: "How do I update my contact information?",
          answer:
            "You can update your contact information in 'Account Settings' > 'Personal Information.' It's important to keep your email and phone number current for booking confirmations and security alerts.",
        },
        {
          question: "How do I delete my account?",
          answer:
            "To delete your account, go to 'Account Settings' > 'Privacy' > 'Delete Account.' Note that this action is permanent and will cancel any active reservations you have.",
        },
      ],
    },
  ];

  const popularFaqs = [
    {
      question: "How do I cancel a reservation?",
      categoryId: "booking",
    },
    {
      question: "What is FlapaBay's refund policy?",
      categoryId: "payments",
    },
    {
      question: "How do I contact my host?",
      categoryId: "booking",
    },
    {
      question: "Is my payment information secure?",
      categoryId: "account",
    },
    {
      question: "How do I become a host?",
      categoryId: "hosting",
    },
  ];

  // For AI response simulation
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

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setIsTyping(true);

    // Simulate AI thinking and responding
    setTimeout(() => {
      let response = "";

      if (aiQuery.toLowerCase().includes("cancel")) {
        response =
          "To cancel a reservation on FlapaBay, go to 'Trips' in your account, find the booking you want to cancel, and click 'Cancel Reservation.' The refund amount will depend on the property's cancellation policy. Most properties offer full refunds if canceled 48 hours before check-in, but this varies by listing. Would you like me to explain more about specific cancellation policies?";
      } else if (aiQuery.toLowerCase().includes("refund")) {
        response =
          "FlapaBay's refund policy varies by property. Generally, cancellations made 48+ hours before check-in receive a full refund minus service fees. For cancellations within 48 hours, the refund amount depends on the specific property's policy, which can be Flexible (full refund up to 24 hours before), Moderate (full refund up to 5 days before), or Strict (50% refund up to 7 days before). You can find each property's specific policy on its listing page.";
      } else if (
        aiQuery.toLowerCase().includes("payment") ||
        aiQuery.toLowerCase().includes("card")
      ) {
        response =
          "Yes, your payment information is secure on FlapaBay. We use industry-standard encryption and security protocols to protect all sensitive data. We never store complete credit card information on our servers. All payment processing is handled through secure, PCI-compliant payment processors. We also offer secure payment options like PayPal and Apple Pay for additional security.";
      } else {
        response = `Thank you for your question about "${aiQuery}". Based on FlapaBay's policies and features, I can provide the following information: \n\nFlapaBay offers a comprehensive platform for booking authentic local experiences and accommodations worldwide, with a focus on African destinations. For your specific query, I recommend checking the relevant section in our Help Center or contacting our 24/7 customer support team for personalized assistance. Is there anything specific about this topic you'd like me to elaborate on?`;
      }

      setAiResponse(response);
      setIsTyping(false);

      // Scroll to the response
      setTimeout(() => {
        aiResponseRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 2000);
  };

  const filteredFaqs = faqCategories.map((category) => ({
    ...category,
    faqs: category.faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  const handlePopularFaqClick = (question: string, categoryId: string) => {
    setSearchTerm(question);
    setActiveCategory(categoryId);

    // Scroll to the relevant section
    document
      .getElementById("faq-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuickQuestionClick = (question: string) => {
    setAiQuery(question);

    // Trigger the form submission
    const form = document.getElementById("ai-form") as HTMLFormElement;
    if (form) form.dispatchEvent(new Event("submit", { cancelable: true }));
  };

  return (
    <>
        {/* Hero Section */}
        <section className="px-6 py-20 pb-10 lg:pt-36 md:pt-16 bg-flapabay-yellow">
          <div className="flapabay-container">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="text-4xl font-bold text-white md:text-5xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Frequently Asked Questions
              </motion.h1>
              <motion.p
                className="pt-2 pb-6 text-lg text-white md:text-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Find answers to common questions about FlapaBay
              </motion.p>

              <motion.div
                className="relative w-full max-w-3xl mx-auto "
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  className="w-full px-4 py-8 border rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#FFC500]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button className="ud-btn btn-thm p-2.5 right-3 search-tbn search-btn absolute top-1/2 transform -translate-y-1/2 bg-[#FFC500] text-white rounded-2xl">
                  <SearchNormal color="white" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Popular Questions */}
        <section className="py-12 bg-white">
          <div className="flapabay-container">
            <h2 className="pt-8 pb-12 text-2xl font-bold text-center">
              Popular Questions
            </h2>

            <div className="grid max-w-5xl grid-cols-1 gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
              {popularFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="cursor-pointer"
                  onClick={() =>
                    handlePopularFaqClick(faq.question, faq.categoryId)
                  }
                >
                  <Card className="h-full transition-shadow border-l-4 shadow-sm hover:shadow-md border-l-flapabay-yellow">
                    <CardContent className="p-5">
                      <div className="flex items-start">
                        <FileQuestion className="flex-shrink-0 w-5 h-5 mt-1 mr-3 text-flapabay-yellow" />
                        <div>
                          <h3 className="pt-2 font-medium">{faq.question}</h3>
                          <div className="flex items-center text-sm text-flapabay-yellow">
                            <span>View answer</span>
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Categories Section */}
        <section id="faq-section" className="py-16 bg-gray-50">
          <div className="flapabay-container">
            <Tabs
              className="p-3"
              defaultValue={activeCategory}
              value={activeCategory}
              onValueChange={setActiveCategory}
            >
              <TabsList className="flex justify-start w-full pt-8 overflow-x-auto flex-nowrap">
                {faqCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {faqCategories.map((category) => (
                <TabsContent
                  key={category.id}
                  value={category.id}
                  className="mt-0"
                >
                  <Card>
                    <CardContent className="p-6">
                      <Accordion type="single" collapsible className="w-full">
                        {filteredFaqs
                          .find((c) => c.id === category.id)
                          ?.faqs.map((faq, index) => (
                            <AccordionItem
                              key={index}
                              value={`faq-${category.id}-${index}`}
                            >
                              <AccordionTrigger className="font-medium text-left">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-gray-600">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}

                        {filteredFaqs.find((c) => c.id === category.id)?.faqs
                          .length === 0 && (
                          <div className="py-8 text-center">
                            <p className="text-gray-500">
                              No FAQs found matching "{searchTerm}"
                            </p>
                            <Button
                              variant="outline"
                              className="mt-4"
                              onClick={() => setSearchTerm("")}
                            >
                              Clear Search
                            </Button>
                          </div>
                        )}
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* AI Assistant Section */}
        <section className="py-16 text-white bg-black">
          <div className="flapabay-container">
            <div className="flex flex-col items-center gap-12 lg:flex-row">
              <div className="lg:w-1/2">
                <div className="flex items-center pt-6">
                  <Bot className="w-10 h-10 mr-3 text-flapabay-yellow" />
                  <h2 className="text-3xl font-bold text-white">
                    AI FAQ Assistant
                  </h2>
                </div>
                <p className="pt-8 pb-3 text-lg text-gray-300">
                  Can't find what you're looking for? Our AI assistant can help
                  answer your specific questions about FlapaBay.
                </p>

                <form
                  id="ai-form"
                  onSubmit={handleAiSubmit}
                  className="space-y-4"
                >
                  <div className="relative">
                    <textarea
                      className="w-full p-4 text-white bg-gray-900 border border-black rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-flapabay-yellow"
                      placeholder="Ask me anything about FlapaBay..."
                      rows={3}
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    className="flex items-center px-6 py-3 font-medium text-black transition-all rounded-lg bg-flapabay-yellow hover:bg-opacity-90"
                    disabled={!aiQuery.trim() || isTyping}
                  >
                    {isTyping ? (
                      <>
                        <span className="mr-2">Processing</span>
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 bg-black rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-black rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-black rounded-full animate-bounce"
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
                  </Button>
                </form>

                {isTyping && (
                  <div className="mt-4">
                    <Progress value={progress} className="h-1" />
                  </div>
                )}

                <div ref={aiResponseRef}>
                  <AnimatePresence>
                    {aiResponse && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-5 mt-6 bg-gray-900 border border-black rounded-lg"
                      >
                        <div className="flex items-center pt-3">
                          <Bot className="w-5 h-5 mr-2 text-flapabay-yellow" />
                          <p className="text-sm font-medium text-gray-400">
                            FlapaBay Assistant
                          </p>
                        </div>
                        <p className="text-gray-300 whitespace-pre-line">
                          {aiResponse}
                        </p>
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
                  </AnimatePresence>
                </div>
              </div>

              <div className="lg:w-1/2">
                <Card className="bg-gray-900 border-gray-800 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="pt-4 text-xl font-bold text-white">
                      Try asking about:
                    </h3>

                    <div className="grid grid-cols-1 gap-3 pt-6 md:grid-cols-2">
                      {[
                        "How do I cancel a reservation?",
                        "What is the refund policy?",
                        "Is my payment information secure?",
                        "How do I contact my host?",
                        "Can I change my reservation dates?",
                        "How do I leave a review?",
                      ].map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start text-auto w-auto py-3 text-left text-white border-flapabay-yellow bg-flapabay-yellow hover:text-white hover:bg-gray-800"
                          onClick={() => handleQuickQuestionClick(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>

                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h4 className="pt-2 font-medium text-flapabay-yellow">
                        Pro Tip
                      </h4>
                      <p className="text-sm text-gray-300">
                        For the most accurate answers, be specific in your
                        questions. Include details about what aspect of FlapaBay
                        you're asking about.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Still Need Help Section */}
        <section className="py-16 bg-white">
          <div className="flapabay-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="pt-4 text-2xl font-bold">Still Need Help?</h2>
              <p className="pt-8 pb-2 text-gray-600">
                Our support team is available 24/7 to assist you with any
                questions or issues
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button className="w-full h-auto px-6 py-6 text-black bg-flapabay-yellow hover:bg-flapabay-yellow/90 sm:w-auto">
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-auto px-6 py-6 sm:w-auto"
                >
                  Visit Help Center
                </Button>
              </div>
            </div>
          </div>
        </section>
    </>
  );
};

export default FAQs;
