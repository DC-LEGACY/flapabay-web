import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/composite/accordion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Shield,
  Warning2,
} from "iconsax-react";
import { Card, CardContent } from "@/components/ui/layout/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/composite/tabs";

import { Button } from "@/components/ui/button";
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CancellationOptions = () => {
  const navigate = useNavigate();

  return (
    <>
        {/* Hero Section */}
        <section className="px-6 py-20 pb-10 lg:pt-36 md:pt-16 bg-flapabay-yellow">
          <div className="flapabay-container">
            <div className="max-w-3xl py-3 px-auto">
              <Button
                variant="ghost"
                className="p-2  bg-flapabay-black mr-4 hover:bg-transparent"
                onClick={() => navigate("/help-center")}
              >
                <ArrowLeft className="w-5 h-5 mr-1 text-white" />
                <span className="text-white">Back to Help Center</span>
              </Button>
            </div>

            <div className="max-w-3xl">
              <motion.h1
                className="pb-4 text-3xl font-bold text-white md:text-4xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Cancellation Policies & Options
              </motion.h1>
              <motion.p
                className="pb-0 text-lg text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Everything you need to know about cancelling a reservation on
                FlapaBay
              </motion.p>
            </div>
          </div>
        </section>

        {/* Policy Types Section */}
        <section className="py-12 bg-white">
          <div className="flapabay-container">
            <h2 className="pb-8 text-2xl font-bold">
              Cancellation Policy Types
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  title: "Flexible",
                  description:
                    "Full refund if canceled at least 24 hours before check-in. Partial refund thereafter.",
                  color: "bg-flapabay-yellow/10",
                  textColor: "text-dark",
                  icon: <Clock className="w-5 h-5" />,
                },
                {
                  title: "Moderate",
                  description:
                    "Full refund if canceled at least 5 days before check-in. Partial refund thereafter.",
                  color: "bg-flapabay-yellow/10",
                  textColor: "text-dark",
                  icon: <Calendar className="w-5 h-5" />,
                },
                {
                  title: "Strict",
                  description:
                    "50% refund if canceled at least 7 days before check-in. No refund thereafter.",
                  color: "bg-flapabay-yellow/10",
                  textColor: "text-dark",
                  icon: <Shield className="w-5 h-5" />,
                },
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
                      <div
                        className={`${policy.color} w-12 h-12 rounded-full flex items-center justify-center`}
                      >
                        <div className={policy.textColor}>{policy.icon}</div>
                      </div>
                      <h3 className="pb-2 text-xl font-bold">{policy.title}</h3>
                      <p className="pb-4 text-gray-600">{policy.description}</p>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <ArrowRight className="w-3 h-3 mr-2 text-flapabay-yellow" />
                          <span>24-hour grace period after booking</span>
                        </div>
                        {policy.title === "Flexible" && (
                          <>
                            <div className="flex items-center text-sm">
                              <ArrowRight className="w-3 h-3 mr-2 text-flapabay-yellow" />
                              <span>Full refund 24+ hours before check-in</span>
                            </div>
                          </>
                        )}
                        {policy.title === "Moderate" && (
                          <>
                            <div className="flex items-center text-sm">
                              <ArrowRight className="w-3 h-3 mr-2 text-flapabay-yellow" />
                              <span>Full refund 5+ days before check-in</span>
                            </div>
                          </>
                        )}
                        {policy.title === "Strict" && (
                          <>
                            <div className="flex items-center text-sm">
                              <ArrowRight className="w-3 h-3 mr-2 text-flapabay-yellow" />
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
            <h2 className="pb-8 text-2xl font-bold">
              How to Cancel a Reservation
            </h2>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div className="space-y-6">
                {[
                  {
                    title: "Go to Trips",
                    description:
                      "Navigate to your Trips page in your FlapaBay account.",
                    number: "1",
                  },
                  {
                    title: "Find your reservation",
                    description:
                      "Locate the booking you want to cancel in your upcoming trips.",
                    number: "2",
                  },
                  {
                    title: "Click 'Cancel reservation'",
                    description:
                      "Select the option to cancel your reservation.",
                    number: "3",
                  },
                  {
                    title: "Select reason and confirm",
                    description:
                      "Choose your reason for cancelling and confirm your decision.",
                    number: "4",
                  },
                  {
                    title: "Check refund amount",
                    description:
                      "Review the refund amount based on the property's cancellation policy.",
                    number: "5",
                  },
                ].map((step, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4">
                      <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-flapabay-yellow">
                        {step.number}
                      </div>
                    </div>
                    <div>
                      <h3 className="pb-2 text-lg font-semibold">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <div className="flex items-center pb-4">
                  <Warning2 className="w-5 h-5 mr-2 text-flapabay-yellow" />
                  <h3 className="text-lg font-semibold">Important Notes</h3>
                </div>

                <div className="space-y-4">
                  <p className="text-black">
                    The refund amount you'll receive depends on several factors:
                  </p>

                  <ul className="pl-5 space-y-2 text-black list-disc">
                    <li>
                      The property's cancellation policy (Flexible, Moderate, or
                      Strict)
                    </li>
                    <li>
                      How far in advance you're cancelling before check-in
                    </li>
                    <li>
                      Whether you're within the 24-hour grace period after
                      booking
                    </li>
                    <li>Any extenuating circumstances that may apply</li>
                  </ul>

                  <div className="p-4 pt-4 border border-yellow-200 rounded-lg bg-yellow-50">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> Service fees are typically
                      non-refundable unless you cancel within the 24-hour grace
                      period after booking, provided your check-in is at least
                      48 hours away.
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
            <h2 className="pb-6 text-2xl font-bold">
              Extenuating Circumstances Policy
            </h2>
            <p className="max-w-3xl pb-8 text-gray-600">
              In certain situations, you may be eligible for a full refund under
              our Extenuating Circumstances Policy, regardless of the property's
              standard cancellation policy.
            </p>

            <Card>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="ec-1">
                    <AccordionTrigger className="font-medium text-left">
                      What situations qualify as extenuating circumstances?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <ul className="pl-5 space-y-2 list-disc">
                        <li>Government-declared disasters or emergencies</li>
                        <li>
                          Serious illness or injury for you or a travel
                          companion
                        </li>
                        <li>
                          Death of a host, guest, or immediate family member
                        </li>
                        <li>
                          Urgent travel restrictions or security advisories
                        </li>
                        <li>
                          Severe property damage or other issues making it
                          uninhabitable
                        </li>
                        <li>Certain transportation disruptions</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="ec-2">
                    <AccordionTrigger className="font-medium text-left">
                      How do I submit an extenuating circumstances claim?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <ol className="pl-5 space-y-2 list-decimal">
                        <li>
                          Go to your Trips and find the affected reservation
                        </li>
                        <li>
                          Select "Cancel reservation" and choose "Extenuating
                          Circumstances" as your reason
                        </li>
                        <li>Complete the form explaining your situation</li>
                        <li>
                          Submit any required documentation to support your
                          claim (medical documents, official notices, etc.)
                        </li>
                        <li>
                          Our support team will review your case within 48-72
                          hours
                        </li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="ec-3">
                    <AccordionTrigger className="font-medium text-left">
                      What documentation will I need to provide?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <p className="pb-3">
                        Documentation requirements vary depending on the
                        circumstances, but may include:
                      </p>
                      <ul className="pl-5 space-y-2 list-disc">
                        <li>
                          Medical documentation from a healthcare provider
                        </li>
                        <li>Death certificates or obituaries</li>
                        <li>Government-issued notices or alerts</li>
                        <li>Transportation cancellation or delay notices</li>
                        <li>
                          Police reports or insurance claims for property damage
                        </li>
                      </ul>
                      <p className="pt-3 text-sm">
                        All documentation must be official, dated, and clearly
                        show the names of affected parties and relevant dates.
                      </p>
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
            <h2 className="pb-8 text-2xl font-bold">
              Frequently Asked Questions
            </h2>

            <Tabs defaultValue="guest" className="w-full">
              <TabsList className="w-full max-w-md pb-8 mx-auto">
                <TabsTrigger value="guest" className="flex-1">
                  For Guests
                </TabsTrigger>
                <TabsTrigger value="host" className="flex-1">
                  For Hosts
                </TabsTrigger>
              </TabsList>

              <TabsContent value="guest">
                <Card>
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-g-1">
                        <AccordionTrigger className="font-medium text-left">
                          Can I get a full refund if I cancel my booking?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          Whether you receive a full refund depends on the
                          property's cancellation policy and how far in advance
                          you cancel. Each listing clearly displays its
                          cancellation policy. You'll always receive a full
                          refund if you cancel within 48 hours of booking,
                          provided your check-in is at least 14 days away.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="faq-g-2">
                        <AccordionTrigger className="font-medium text-left">
                          How long does it take to receive my refund?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          After a cancellation is processed, refunds typically
                          take 5-7 business days to appear in your account. The
                          exact timing depends on your payment method and
                          financial institution. Credit card refunds may take
                          5-15 business days, while bank transfers may take 3-7
                          business days.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="faq-g-3">
                        <AccordionTrigger className="font-medium text-left">
                          Can I modify my reservation instead of cancelling?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          Yes, if you need to change dates or the number of
                          guests, you can request a modification instead of
                          cancelling. Go to your Trips, find your reservation,
                          and select "Modify reservation." The host will need to
                          approve any changes, and price adjustments may apply
                          based on the new dates and guest count.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="faq-g-4">
                        <AccordionTrigger className="font-medium text-left">
                          What if the host cancels my reservation?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          If a host cancels your reservation, you'll
                          automatically receive a full refund, including all
                          fees. Our team will also assist you in finding a new
                          place to stay. Hosts who cancel reservations may incur
                          penalties, including financial charges and impact to
                          their listing's visibility and Superhost status.
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
                        <AccordionTrigger className="font-medium text-left">
                          How do I set my cancellation policy?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          You can set your cancellation policy when creating or
                          editing your listing. Go to "Listing Details," then
                          "Policies," and select the cancellation policy that
                          works best for you. Consider your property type,
                          location, and seasonal demand when choosing a policy.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="faq-h-2">
                        <AccordionTrigger className="font-medium text-left">
                          What happens if I need to cancel a reservation?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          Host cancellations should be avoided whenever possible
                          as they significantly impact guests' travel plans. If
                          you must cancel, you may incur penalties including a
                          cancellation fee, blocked calendar dates, automated
                          review noting the cancellation, and potential loss of
                          Superhost status. Extenuating circumstances may apply
                          in certain cases.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="faq-h-3">
                        <AccordionTrigger className="font-medium text-left">
                          Do I get paid if a guest cancels their reservation?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          Your payout for a cancelled reservation depends on
                          your cancellation policy and when the guest cancels.
                          If you have a Strict policy and a guest cancels after
                          the full refund period, you'll receive the
                          non-refundable portion of their payment according to
                          your policy terms.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="faq-h-4">
                        <AccordionTrigger className="font-medium text-left">
                          Can I offer exceptions to my cancellation policy?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          Yes, you can make exceptions to your cancellation
                          policy on a case-by-case basis. If a guest requests a
                          refund outside of your policy terms, you can approve a
                          full or partial refund at your discretion. This can be
                          done through the reservation management section in
                          your hosting dashboard.
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
        <section className="py-12 bg-flapabay-white">
          <div className="text-center flapabay-container">
            <h2 className="pb-4 text-2xl font-bold text-black">
              Still have questions?
            </h2>
            <p className="max-w-2xl pb-8 mx-auto text-gray-800">
              Our support team is available 24/7 to help with any questions
              about cancellations or refunds
            </p>

            <Button
              size="lg"
              className="px-8 text-white bg-black hover:bg-black/90"
            >
              Contact Support
            </Button>
          </div>
        </section>
    </>
  );
};

export default CancellationOptions;
