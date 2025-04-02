
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Heart, MessageSquare, Star, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [counts, setCounts] = useState({
    trips: 0,
    wishlist: 0,
    messages: 0,
    unreadMessages: 0,
    reviews: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // Count trips
        const { count: tripsCount, error: tripsError } = await supabase
          .from('trips')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);
          
        if (tripsError) throw tripsError;
        
        // Count wishlist items
        const { count: wishlistCount, error: wishlistError } = await supabase
          .from('wishlists')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);
          
        if (wishlistError) throw wishlistError;
        
        // Count conversations
        const { count: conversationsCount, error: conversationsError } = await supabase
          .from('conversations')
          .select('*', { count: 'exact', head: true })
          .eq('guest_id', user.id);
          
        if (conversationsError) throw conversationsError;
        
        // Count unread messages
        const { count: unreadCount, error: unreadError } = await supabase
          .from('messages')
          .select('*', { count: 'exact', head: true })
          .eq('receiver_id', user.id)
          .eq('is_read', false);
          
        if (unreadError) throw unreadError;
        
        // For reviews, we'll just use a placeholder since we don't have that table yet
        const reviewsCount = 0;
        
        setCounts({
          trips: tripsCount || 0,
          wishlist: wishlistCount || 0,
          messages: conversationsCount || 0,
          unreadMessages: unreadCount || 0,
          reviews: reviewsCount,
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCounts();
  }, [user]);

  if (!user) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Authentication Required</AlertTitle>
        <AlertDescription>
          Please sign in to access your dashboard.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Guest Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Briefcase className="mr-2 h-5 w-5 text-[#ffc500]" />
              Your Trips
            </CardTitle>
            <CardDescription>
              Manage your upcoming and past stays
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold">
                {isLoading ? '...' : counts.trips}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#ffc500] hover:text-[#ffc500]/80 hover:bg-[#ffc500]/10"
                onClick={() => navigate('/dashboard/guest/trips')}
              >
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Heart className="mr-2 h-5 w-5 text-[#ffc500]" />
              Your Wishlist
            </CardTitle>
            <CardDescription>
              Properties you've saved for later
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold">
                {isLoading ? '...' : counts.wishlist}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#ffc500] hover:text-[#ffc500]/80 hover:bg-[#ffc500]/10"
                onClick={() => navigate('/dashboard/guest/wishlist')}
              >
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <MessageSquare className="mr-2 h-5 w-5 text-[#ffc500]" />
              Messages
              {counts.unreadMessages > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {counts.unreadMessages}
                </span>
              )}
            </CardTitle>
            <CardDescription>
              Communication with hosts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold">
                {isLoading ? '...' : counts.messages}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#ffc500] hover:text-[#ffc500]/80 hover:bg-[#ffc500]/10"
                onClick={() => navigate('/dashboard/guest/messages')}
              >
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Star className="mr-2 h-5 w-5 text-[#ffc500]" />
              Reviews
            </CardTitle>
            <CardDescription>
              Your reviews and ratings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold">
                {isLoading ? '...' : counts.reviews}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#ffc500] hover:text-[#ffc500]/80 hover:bg-[#ffc500]/10"
                onClick={() => navigate('/dashboard/guest/reviews')}
              >
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Calendar className="mr-2 h-5 w-5 text-[#ffc500]" />
              Upcoming Trips
            </CardTitle>
            <CardDescription>
              Your next scheduled stays
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold">
                {isLoading ? '...' : '0'}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#ffc500] hover:text-[#ffc500]/80 hover:bg-[#ffc500]/10"
                onClick={() => navigate('/dashboard/guest/trips')}
              >
                View Calendar <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-[#ffc500]/10 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Need Help?</h2>
        <p className="text-sm mb-4">
          Our support team is always here to assist you with any questions about your bookings, 
          payments, or any other concerns you might have.
        </p>
        <Button 
          variant="outline"
          className="bg-[#ffc500] hover:bg-[#ffc500]/90 text-black border-none"
          onClick={() => navigate('/help')}
        >
          Contact Support
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
