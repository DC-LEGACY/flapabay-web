import { BadgeCheck, BarChart, Bot, Clock, MessageSquare, Shield } from 'lucide-react';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
const AboutAICohost = () => {
  const features = [
    {
      icon: <MessageSquare className="h-6 w-6 text-flapabay-yellow" />,
      title: "Intelligent Guest Communication",
      description: "Automated responses to common questions and 24/7 guest support in multiple languages."
    },
    {
      icon: <BarChart className="h-6 w-6 text-flapabay-yellow" />,
      title: "Smart Pricing Optimization",
      description: "Dynamic pricing suggestions based on market demand, seasonality, and local events."
    },
    {
      icon: <Clock className="h-6 w-6 text-flapabay-yellow" />,
      title: "Automated Scheduling",
      description: "Seamless coordination of cleaning, maintenance, and check-ins without manual intervention."
    },
    {
      icon: <Shield className="h-6 w-6 text-flapabay-yellow" />,
      title: "Risk Assessment",
      description: "Advanced guest screening and booking analysis to prevent potential issues."
    },
    {
      icon: <BadgeCheck className="h-6 w-6 text-flapabay-yellow" />,
      title: "Compliance Assistance",
      description: "Stay updated on local regulations and ensure your property meets all requirements."
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="flapabay-container">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <div className="flex items-center mb-4">
              <Bot className="h-10 w-10 text-flapabay-yellow mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">AI-Powered Co-Host</h2>
            </div>
            
            <div className="w-16 h-1 bg-flapabay-yellow mb-6"></div>
            
            <p className="text-lg text-gray-300 mb-6">
              Revolutionizing property management with our cutting-edge artificial intelligence that acts as your virtual co-host, handling routine tasks so you can focus on creating exceptional guest experiences.
            </p>
            
            <p className="text-lg text-gray-300 mb-8">
              Our AI co-host learns from your preferences and adapts to your hosting style, giving you the perfect balance of automation and personalization.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-800"
                >
                  <div className="flex items-center mb-3">
                    <div className="mr-3 p-2 bg-gray-800 rounded">
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800"
              >
                <div className="flex items-center border-b border-gray-800 pb-4 mb-4">
                  <Bot className="h-8 w-8 text-flapabay-yellow mr-3" />
                  <div>
                    <h3 className="font-bold text-white">FlapaBay AI Assistant</h3>
                    <p className="text-xs text-gray-500">Online • Responding in seconds</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-4">
                  <div className="bg-gray-800 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm text-white">Hello! I'm your AI co-host. I can help manage your property, respond to guests, and optimize your listings.</p>
                  </div>
                  
                  <div className="bg-flapabay-yellow p-3 rounded-lg rounded-tr-none max-w-[80%] ml-auto">
                    <p className="text-sm text-black">Can you help me set dynamic pricing for my beach villa?</p>
                  </div>
                  
                  <div className="bg-gray-800 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm text-white">Absolutely! Based on market data, I recommend increasing weekend rates by 15% and offering a 10% discount for stays longer than 5 nights. This could increase your monthly revenue by approximately 22%.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-4">
                  <input type="text" placeholder="Ask your AI assistant..." className="w-full p-2 border border-black bg-gray-800 text-white rounded-lg text-sm" disabled />
                  <Button className="bg-flapabay-yellow text-black p-2 rounded-lg" disabled>
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
              
              <div className="absolute -bottom-5 -left-5 w-48 h-48 bg-flapabay-yellow rounded-full opacity-20 -z-10"></div>
              <div className="absolute -top-5 -right-5 w-24 h-24 bg-flapabay-yellow rounded-full opacity-20 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAICohost;
