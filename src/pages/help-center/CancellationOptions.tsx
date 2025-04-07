
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { FileText, Shield, Clock, Calendar, ArrowRight, AlertCircle, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const CancellationOptions = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-flapabay-yellow py-12">
          <div className="flapabay-container">
            <div className="flex items-center mb-8">
              <Button 
                variant="ghost" 
                className="mr-4 p-0 hover:bg-transparent"
                onClick={() => navigate('/help')}
              >
                <ChevronLeft className="mr-1 h-5 w-5" />
                <span>Back to Help Center</span>
              </Button>
            </div>
            
            <div className="max-w-3xl">
              <motion.h1 
                className="text-3xl md:text-4xl font-bold mb-4 text-black"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Cancellation Policies & Options
              </motion.h1>
              <motion.p 
                className="text-lg mb-0 text-gray-800"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Everything you need to know about cancelling a reservation on FlapaBay
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Policy Types Section */}
        <section className="py-12 bg-white">
          <div className="flapabay-container">
            <h2 className="text-2xl font-bold mb-8">Cancellation Policy Types</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  title: "Flexible", 
                  description: "Full refund if canceled at least 24 hours before check-in. Partial refund thereafter.",
                  color: "bg-green-500/10",
                  textColor: "text-green-600",
                  icon: <Clock className="h-5 w-5" />
                },
                { 
                  title: "Moderate", 
                  description: "Full refund if canceled at least 5 days before check-in. Partial refund thereafter.",
                  color: "bg-yellow-500/10",
                  textColor: "text-yellow-600",
                  icon: <Calendar className="h-5 w-5" />
                },
                { 
                  title: "Strict", 
                  description: "50% refund if canceled at least 7 days before check-in. No refund thereafter.",
                  color: "bg-red-500/10",
                  textColor: "text-red-600",
                  icon: <Shield className="h-5 w-5" />
                }
              ].map((policy, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className={`${policy.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                        <div className={policy.textColor}>
                          {policy.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{policy.title}</h3>
                      <p className="text-gray-600 mb-4">{policy.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <ArrowRight className="h-3 w-3 mr-2 text-flapabay-yellow" />
                          <span>24-hour grace period after booking</span>
                        </div>
                        {policy.title === "Flexible" && (
                          <>
                            <div className="flex items-center text-sm">
                              <ArrowRight className="h-3 w-3 mr-2 text-flapabay-yellow" />
                              <span>Full refund 24+ hours before check-in</span>
                            </div>
                          </>
                        )}
                        {policy.title === "Moderate" && (
                          <>
                            <div className="flex items-center text-sm">
                              <ArrowRight className="h-3 w-3 mr-2 text-flapabay-yellow" />
                              <span>Full refund 5+ days before check-in</span>
                            </div>
                          </>
                        )}
                        {policy.title === "Strict" && (
                          <>
                            <div className="flex items-center text-sm">
                              <ArrowRight className="h-3 w-3 mr-2 text-flapabay-yellow" />
                              <span>50% refund 7+ days before check-in</span>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How to Cancel Section */}
        <section className="py-12 bg-gray-50">
          <div className="flapabay-container">
            <h2 className="text-2xl font-bold mb-8">How to Cancel a Reservation</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                {[
                  { 
                    title: "Go to Trips", 
                    description: "Navigate to your Trips page in your FlapaBay account.",
                    number: "1"
                  },
                  { 
                    title: "Find your reservation", 
                    description: "Locate the booking you want to cancel in your upcoming trips.",
                    number: "2"
                  },
                  { 
                    title: "Click 'Cancel reservation'", 
                    description: "Select the option to cancel your reservation.",
                    number: "3"
                  },
                  { 
                    title: "Select reason and confirm", 
                    description: "Choose your reason for cancelling and confirm your decision.",
                    number: "4"
                  },
                  { 
                    title: "Check refund amount", 
                    description: "Review the refund amount based on the property's cancellation policy.",
                    number: "5"
                  }
                ].map((step, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4">
                      <div className="w-10 h-10 bg-flapabay-yellow rounded-full flex items-center justify-center text-black font-bold">
                        {step.number}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center mb-4">
                  <AlertCircle className="text-flapabay-yellow mr-2 h-5 w-5" />
                  <h3 className="text-lg font-semibold">Important Notes</h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-700">
                    The refund amount you'll receive depends on several factors:
                  </p>
                  
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>The property's cancellation policy (Flexible, Moderate, or Strict)</li>
                    <li>How far in advance you're cancelling before check-in</li>
                    <li>Whether you're within the 24-hour grace period after booking</li>
                    <li>Any extenuating circumstances that may apply</li>
                  </ul>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mt-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> Service fees are typically non-refundable unless you cancel within the 24-hour grace period after booking, provided your check-in is at least 48 hours away.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Extenuating Circumstances Section */}
        <section className="py-12 bg-white">
          <div className="flapabay-container">
            <h2 className="text-2xl font-bold mb-6">Extenuating Circumstances Policy</h2>
            <p className="text-gray-600 max-w-3xl mb-8">
              In certain situations, you may be eligible for a full refund under our Extenuating Circumstances Policy, regardless of the property's standard cancellation policy.
            </p>
            
            <Card>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="ec-1">
                    <AccordionTrigger className="text-left font-medium">
                      What situations qualify as extenuating circumstances?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Government-declared disasters or emergencies</li>
                        <li>Serious illness or injury for you or a travel companion</li>
                        <li>Death of a host, guest, or immediate family member</li>
                        <li>Urgent travel restrictions or security advisories</li>
                        <li>Severe property damage or other issues making it uninhabitable</li>
                        <li>Certain transportation disruptions</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="ec-2">
                    <AccordionTrigger className="text-left font-medium">
                      How do I submit an extenuating circumstances claim?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Go to your Trips and find the affected reservation</li>
                        <li>Select "Cancel reservation" and choose "Extenuating Circumstances" as your reason</li>
                        <li>Complete the form explaining your situation</li>
                        <li>Submit any required documentation to support your claim (medical documents, official notices, etc.)</li>
                        <li>Our support team will review your case within 48-72 hours</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="ec-3">
                    <AccordionTrigger className="text-left font-medium">
                      What documentation will I need to provide?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <p className="mb-3">Documentation requirements vary depending on the circumstances, but may include:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Medical documentation from a healthcare provider</li>
                        <li>Death certificates or obituaries</li>
                        <li>Government-issued notices or alerts</li>
                        <li>Transportation cancellation or delay notices</li>
                        <li>Police reports or insurance claims for property damage</li>
                      </ul>
                      <p className="mt-3 text-sm">All documentation must be official, dated, and clearly show the names of affected parties and relevant dates.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-12 bg-gray-50">
          <div className="flapabay-container">
            <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
            
            <Tabs defaultValue="guest" className="w-full">
              <TabsList className="w-full max-w-md mx-auto mb-8">
                <TabsTrigger value="guest" className="flex-1">For Guests</TabsTrigger>
                <TabsTrigger value="host" className="flex-1">For Hosts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="guest">
                <Card>
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-g-1">
                        <AccordionTrigger className="text-left font-medium">
                          Can I get a full refund if I cancel my booking?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          Whether you receive a full refund depends on the property's cancellation policy and how far in advance you cancel. Each listing clearly displays its cancellation policy. You'll always receive a full refund if you cancel within 48 hours of booking, provided your check-in is at least 14 days away.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="faq-g-2">
                        <AccordionTrigger className="text-left font-medium">
                          How long does it take to receive my refund?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          After a cancellation is processed, refunds typically take 5-7 business days to appear in your account. The exact timing depends on your payment method and financial institution. Credit card refunds may take 5-15 business days, while bank transfers may take 3-7 business days.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="faq-g-3">
                        <AccordionTrigger className="text-left font-medium">
                          Can I modify my reservation instead of cancelling?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          Yes, if you need to change dates or the number of guests, you can request a modification instead of cancelling. Go to your Trips, find your reservation, and select "Modify reservation." The host will need to approve any changes, and price adjustments may apply based on the new dates and guest count.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="faq-g-4">
                        <AccordionTrigger className="text-left font-medium">
                          What if the host cancels my reservation?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          If a host cancels your reservation, you'll automatically receive a full refund, including all fees. Our team will also assist you in finding a new place to stay. Hosts who cancel reservations may incur penalties, including financial charges and impact to their listing's visibility and Superhost status.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="host">
                <Card>
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-h-1">
                        <AccordionTrigger className="text-left font-medium">
                          How do I set my cancellation policy?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          You can set your cancellation policy when creating or editing your listing. Go to "Listing Details," then "Policies," and select the cancellation policy that works best for you. Consider your property type, location, and seasonal demand when choosing a policy.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="faq-h-2">
                        <AccordionTrigger className="text-left font-medium">
                          What happens if I need to cancel a reservation?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          Host cancellations should be avoided whenever possible as they significantly impact guests' travel plans. If you must cancel, you may incur penalties including a cancellation fee, blocked calendar dates, automated review noting the cancellation, and potential loss of Superhost status. Extenuating circumstances may apply in certain cases.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="faq-h-3">
                        <AccordionTrigger className="text-left font-medium">
                          Do I get paid if a guest cancels their reservation?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          Your payout for a cancelled reservation depends on your cancellation policy and when the guest cancels. If you have a Strict policy and a guest cancels after the full refund period, you'll receive the non-refundable portion of their payment according to your policy terms.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="faq-h-4">
                        <AccordionTrigger className="text-left font-medium">
                          Can I offer exceptions to my cancellation policy?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          Yes, you can make exceptions to your cancellation policy on a case-by-case basis. If a guest requests a refund outside of your policy terms, you can approve a full or partial refund at your discretion. This can be done through the reservation management section in your hosting dashboard.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Contact Support Section */}
        <section className="py-12 bg-flapabay-yellow">
          <div className="flapabay-container text-center">
            <h2 className="text-2xl font-bold mb-4 text-black">Still have questions?</h2>
            <p className="text-gray-800 mb-8 max-w-2xl mx-auto">
              Our support team is available 24/7 to help with any questions about cancellations or refunds
            </p>
            
            <Button size="lg" className="bg-black hover:bg-black/90 text-white px-8">
              Contact Support
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CancellationOptions;
