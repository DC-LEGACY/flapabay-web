import { AlertCircle, ArrowRight, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import Footer from "@/components/common/default-footer";
import Header from "@/components/common/DefaultHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MobileMenu from "@/components/common/mobile-menu";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

const NeighborhoodConcern = () => {
  const [concernType, setConcernType] = useState("noise");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report Submitted",
        description: "Thank you for your report. We'll review it promptly.",
      });

      // Reset form
      setConcernType("noise");
      setDescription("");
      setLocation("");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <MobileMenu />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-flapabay-yellow">
          <div className="flapabay-container">
            <div className="max-w-3xl mx-auto">
              <motion.h1
                className="pb-4 text-3xl font-bold text-white md:text-4xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Report a Neighborhood Concern
              </motion.h1>
              <motion.p
                className="pb-0 text-lg text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                We take your concerns seriously and work to ensure FlapaBay
                properties are good neighbors
              </motion.p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="flapabay-container">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card className="border-gray-200 shadow-sm">
                  <CardContent className="p-6">
                    <h2 className="pb-6 text-xl font-semibold">
                      Submit Your Concern
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="location" className="text-base">
                          Property Location
                        </Label>
                        <div className="relative mt-1">
                          <MapPin
                            className="absolute text-gray-400 left-3 top-3"
                            size={18}
                          />
                          <Input
                            id="location"
                            placeholder="Street address of the property"
                            className="px-10"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="block pb-3 text-base">
                          Type of Concern
                        </Label>
                        <RadioGroup
                          value={concernType}
                          onValueChange={setConcernType}
                          className="space-y-3"
                        >
                          {[
                            { id: "noise", label: "Noise Disturbance" },
                            { id: "safety", label: "Safety Issue" },
                            {
                              id: "maintenance",
                              label: "Property Maintenance",
                            },
                            { id: "parking", label: "Parking Issue" },
                            { id: "behavior", label: "Guest Behavior" },
                            { id: "other", label: "Other Concern" },
                          ].map((item) => (
                            <div key={item.id} className="flex items-center">
                              <RadioGroupItem value={item.id} id={item.id} />
                              <Label htmlFor={item.id} className="ml-2">
                                {item.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-base">
                          Describe Your Concern
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Please provide specific details about the concern..."
                          className="mt-1 resize-y min-h-[150px]"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="text-white bg-flapabay-yellow hover:bg-flapabay-yellow/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Report"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="h-full border-gray-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center pb-4">
                      <AlertCircle className="mr-2 text-flapabay-yellow" />
                      <h2 className="text-xl font-semibold">
                        What Happens Next?
                      </h2>
                    </div>

                    <ul className="space-y-4">
                      {[
                        "We'll review your report within 24 hours",
                        "Our team will contact the property owner or host",
                        "If necessary, we'll implement corrective actions",
                        "We'll keep you updated on the resolution process",
                      ].map((step, index) => (
                        <li key={index} className="flex">
                          <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-3 font-medium rounded-full bg-flapabay-yellow/20 text-flapabay-yellow">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 mt-6 border-t border-gray-200">
                      <p className="pb-2 font-medium">
                        Need immediate assistance?
                      </p>
                      <p className="pb-4 text-gray-600">
                        For urgent matters requiring immediate attention:
                      </p>
                      <Button variant="outline" className="w-full pb-2">
                        Call Support: (305) 555-0123
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="flapabay-container">
            <h2 className="pb-8 text-2xl font-bold text-center">
              Frequently Asked Questions
            </h2>

            <div className="grid max-w-4xl grid-cols-1 gap-6 mx-auto md:grid-cols-2">
              {[
                {
                  q: "When should I report a neighborhood concern?",
                  a: "You should report a concern when a FlapaBay property is causing persistent issues that affect the neighborhood, such as excessive noise, parking problems, or safety concerns.",
                },
                {
                  q: "Will my report be anonymous?",
                  a: "Yes, we keep your personal information confidential. Property owners and hosts will not know who submitted the report.",
                },
                {
                  q: "How long does it take to resolve reported issues?",
                  a: "Most issues are addressed within 24-48 hours. Complex matters may take longer, but we'll keep you updated throughout the process.",
                },
                {
                  q: "What if the issue continues after my report?",
                  a: "If the issue persists after your initial report, please submit a follow-up report and we'll escalate the matter to our specialized resolution team.",
                },
              ].map((faq, index) => (
                <Card key={index} className="border-gray-200">
                  <CardContent className="p-4">
                    <h3 className="pb-2 text-lg font-semibold">{faq.q}</h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
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

export default NeighborhoodConcern;
