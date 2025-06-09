import { AlertTriangle, ArrowDownIcon, ArrowUpIcon, CalendarDays, XCircle } from 'lucide-react';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

interface ExperienceDescriptionProps {
  description: string;
  whatToExpect?: string[];
  highlights?: string[];
  requirements?: string[];
  bringingItems?: string[];
  houseRules?: string[];
  cancellationPolicy?: {
    type: string;
    description: string;
    fullRefundBefore?: string;
    partialRefundBefore?: string;
  };
}

const ExperienceDescription: React.FC<ExperienceDescriptionProps> = ({
  description,
  whatToExpect = [],
  highlights = [],
  requirements = [],
  bringingItems = [],
  houseRules = [],
  cancellationPolicy
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <motion.div 
      className="mt-6 border-b border-gray-200 pb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="rules">Rules</TabsTrigger>
          <TabsTrigger value="cancellation">Cancellation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description">
          {highlights && highlights.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Experience Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="bg-[#ffc500]/10 rounded-full p-2">
                      <span className="text-[#ffc500] text-xs font-medium">★</span>
                    </div>
                    <span className="text-black">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* What to expect section */}
          {whatToExpect && whatToExpect.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">What you'll do</h3>
              <ul className="space-y-3">
                {whatToExpect.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="bg-[#ffc500]/10 rounded-full min-w-6 h-6 flex items-center justify-center text-[#ffc500] font-medium">
                      {index + 1}
                    </span>
                    <span className="text-black">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className={`relative ${!isExpanded && 'max-h-40 overflow-hidden'}`}>
            <h3 className="text-lg font-semibold mb-3">About this experience</h3>
            <p className="text-black whitespace-pre-line">
              {description}
            </p>
            
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
            )}
          </div>
          
          <Button 
            variant="link" 
            onClick={toggleExpanded}
            className="mt-4 p-0 h-auto font-medium"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </Button>
        </TabsContent>
        
        <TabsContent value="requirements">
          <div className="space-y-6">
            {requirements && requirements.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-black">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {bringingItems && bringingItems.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">What to bring</h3>
                <ul className="space-y-2">
                  {bringingItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#ffc500] mr-1">•</span>
                      <span className="text-black">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="rules">
          {houseRules && houseRules.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Experience rules</h3>
              <ul className="space-y-3">
                {houseRules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-black">{rule}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
              <p className="text-sm text-gray-500">
                By booking, you agree to follow all experience rules and acknowledge that you meet all requirements.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="cancellation">
          {cancellationPolicy && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays className="h-5 w-5 text-[#ffc500]" />
                <h3 className="text-lg font-semibold">{cancellationPolicy.type} cancellation policy</h3>
              </div>
              
              <p className="text-black mb-4">{cancellationPolicy.description}</p>
              
              {cancellationPolicy.fullRefundBefore && (
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-[#ffc500] font-medium">•</span>
                  <p className="text-black">Full refund if canceled {cancellationPolicy.fullRefundBefore} before the experience</p>
                </div>
              )}
              
              {cancellationPolicy.partialRefundBefore && (
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-[#ffc500] font-medium">•</span>
                  <p className="text-black">Partial refund if canceled {cancellationPolicy.partialRefundBefore} before the experience</p>
                </div>
              )}
              
              <Separator className="my-4" />
              <p className="text-sm text-gray-500">
                Our experiences are designed to be enjoyable and memorable. If you need to cancel, please do so as early as possible to allow other guests to book.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ExperienceDescription;
