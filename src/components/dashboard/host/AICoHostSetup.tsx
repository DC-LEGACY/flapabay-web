
import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { Sparkles, Settings, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import AICohost from '@/components/dashboardtwo/AICohost';

const AICoHostSetup = () => {
  const [isAIEnabled, setIsAIEnabled] = useState(false);
  const { toast } = useToast();

  const handleToggleAI = (enabled: boolean) => {
    setIsAIEnabled(enabled);
    
    // In a real implementation, this would update the user's settings in Supabase
    // const updateAISettings = async () => {
    //   const { error } = await supabase
    //     .from('host_settings')
    //     .upsert({ host_id: user.id, ai_cohost_enabled: enabled });
    //     
    //   if (error) throw error;
    // };
    // 
    // updateAISettings();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">AI Co-Host</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Configure your AI assistant to help manage your properties
          </p>
        </div>
        <div className="flex mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Advanced Settings</span>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Setup</span>
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span>About AI Co-Host</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="mt-0 space-y-6">
            <AICohost isEnabled={isAIEnabled} onToggle={handleToggleAI} />
          </TabsContent>

          <TabsContent value="info" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>About AI Co-Host</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  The FlapaBay AI Co-Host is designed to help you manage your properties more efficiently by
                  automating repetitive tasks and providing intelligent suggestions.
                </p>
                
                <h3 className="text-lg font-medium mt-4">How it works</h3>
                <p>
                  Our AI system learns from your hosting style and preferences to provide personalized assistance
                  that feels like an extension of your own hospitality. The AI can handle guest messages,
                  optimize listings, manage reservations, and much more.
                </p>
                
                <h3 className="text-lg font-medium mt-4">Privacy & Control</h3>
                <p>
                  You maintain full control over what the AI can and cannot do. You can enable or disable
                  specific features at any time, and the AI will only act within the boundaries you set.
                  All data is processed securely according to our privacy policy.
                </p>
                
                <h3 className="text-lg font-medium mt-4">Key Benefits</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Save time by automating routine communications with guests</li>
                  <li>Increase booking rates with optimized listings and pricing</li>
                  <li>Never miss a reservation or review opportunity</li>
                  <li>Provide 24/7 response to guest inquiries</li>
                  <li>Get detailed insights on your hosting performance</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default AICoHostSetup;
