
import React, { useState } from 'react';
import { Bot, MessageSquare, Calendar, BarChart2, Star, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface AICohostProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const AICohost: React.FC<AICohostProps> = ({ isEnabled, onToggle }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [enabledFeatures, setEnabledFeatures] = useState({
    messages: true,
    listings: false,
    reservations: true,
    calendar: false,
    experiences: false,
    reviews: true
  });

  const handleEnableAI = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would call an API to enable the AI Co-host
      await new Promise(resolve => setTimeout(resolve, 1000));
      onToggle(true);
      toast({
        title: "AI Co-host enabled",
        description: "Your AI assistant is now helping manage your properties",
      });
    } catch (error) {
      toast({
        title: "Error enabling AI Co-host",
        description: "There was a problem enabling your AI assistant",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDisableAI = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would call an API to disable the AI Co-host
      await new Promise(resolve => setTimeout(resolve, 1000));
      onToggle(false);
      toast({
        title: "AI Co-host disabled",
        description: "Your AI assistant has been turned off",
      });
    } catch (error) {
      toast({
        title: "Error disabling AI Co-host",
        description: "There was a problem disabling your AI assistant",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFeatureToggle = (feature: keyof typeof enabledFeatures) => {
    setEnabledFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  // Feature cards data
  const features = [
    {
      id: 'messages',
      title: 'Messaging',
      description: 'Auto-reply to guest inquiries and follow-ups',
      icon: MessageSquare
    },
    {
      id: 'listings',
      title: 'Listings',
      description: 'Optimize descriptions and suggest pricing adjustments',
      icon: BarChart2
    },
    {
      id: 'reservations',
      title: 'Reservations',
      description: 'Manage bookings and coordinate with guests',
      icon: Calendar
    },
    {
      id: 'calendar',
      title: 'Calendar',
      description: 'Suggest open/blocked dates optimization',
      icon: Calendar
    },
    {
      id: 'experiences',
      title: 'Experiences',
      description: 'Manage activity bookings and reminders',
      icon: Star
    },
    {
      id: 'reviews',
      title: 'Reviews',
      description: 'Send review requests and respond to guest reviews',
      icon: MessageSquare
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">AI Co-host</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Let our AI assistant help manage your properties
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="ai-toggle" className="font-medium">
            {isEnabled ? 'Enabled' : 'Disabled'}
          </Label>
          <Switch
            id="ai-toggle"
            checked={isEnabled}
            onCheckedChange={isEnabled ? handleDisableAI : handleEnableAI}
            disabled={loading}
          />
        </div>
      </div>

      {!isEnabled ? (
        <Card className="bg-gray-50 dark:bg-gray-900 border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="mr-2 h-6 w-6 text-flapabay-yellow" />
              Get Started with AI Co-host
            </CardTitle>
            <CardDescription>
              Automate your hosting duties and save time with our AI assistant
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <MessageSquare className="h-5 w-5 text-flapabay-yellow mt-0.5" />
                <div>
                  <h3 className="font-medium">Automated Messaging</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Respond to inquiries and check-ins automatically
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-flapabay-yellow mt-0.5" />
                <div>
                  <h3 className="font-medium">Reservation Management</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Handle booking details and guest information
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <BarChart2 className="h-5 w-5 text-flapabay-yellow mt-0.5" />
                <div>
                  <h3 className="font-medium">Pricing Optimization</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get suggestions for pricing based on market trends
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Star className="h-5 w-5 text-flapabay-yellow mt-0.5" />
                <div>
                  <h3 className="font-medium">Review Management</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Prompt guests for reviews and prepare responses
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-flapabay-yellow hover:bg-flapabay-yellow/90 text-black"
              disabled={loading}
              onClick={handleEnableAI}
            >
              {loading ? "Enabling..." : "Enable AI Co-host"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => {
              const FeatureIcon = feature.icon;
              const isFeatureEnabled = enabledFeatures[feature.id as keyof typeof enabledFeatures];
              
              return (
                <Card 
                  key={feature.id} 
                  className={`transition-colors ${
                    isFeatureEnabled ? 'border-flapabay-yellow' : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <FeatureIcon className={`mr-2 h-5 w-5 ${
                        isFeatureEnabled ? 'text-flapabay-yellow' : 'text-gray-400 dark:text-gray-500'
                      }`} />
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Label htmlFor={`feature-${feature.id}`} className="text-sm font-medium">
                      {isFeatureEnabled ? 'Enabled' : 'Disabled'}
                    </Label>
                    <Switch
                      id={`feature-${feature.id}`}
                      checked={isFeatureEnabled}
                      onCheckedChange={() => handleFeatureToggle(feature.id as keyof typeof enabledFeatures)}
                    />
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                Privacy Note
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                The AI Co-host will have access to your messages, listings, and bookings data to assist you.
                You can disable specific features or turn off the AI assistant completely at any time.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AICohost;
