import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Star, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockSupabaseDataOperations } from "@/components/integrations/supabase/client";
import { format, isPast, isFuture } from 'date-fns';
import WishlistsPlaceholder from '@/components/dashboard/WishlistsPlaceholder';

interface Trip {
  id: string;
  title: string;
  location: string;
  start_date: string;
  end_date: string;
  status: string;
  image_url?: string;
  has_checked_in: boolean;
  has_checked_out: boolean;
}

const Dashboard: React.FC = () => {
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([]);
  const [pastTrips, setPastTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      fetchTrips();
    }
  }, [user]);
  
  const fetchTrips = async () => {
    try {
      setLoading(true);
      
      const { data: trips, error } = await mockSupabaseDataOperations
        .from('trips')
        .select('*')
        .eq('user_id', user?.id)
        .order('start_date', { ascending: true });
      
      if (error) throw error;
      
      if (trips) {
        const upcoming = trips.filter(trip => 
          trip.status !== 'cancelled' && 
          isFuture(new Date(trip.end_date))
        );
        
        const past = trips.filter(trip => 
          isPast(new Date(trip.end_date)) || 
          trip.status === 'cancelled'
        );
        
        setUpcomingTrips(upcoming as Trip[]);
        setPastTrips(past as Trip[]);
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const renderTripCard = (trip: Trip) => (
    <Card 
      key={trip.id} 
      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/dashboard/guest/trips/${trip.id}`)}
    >
      <div className="aspect-video relative">
        <img 
          src={trip.image_url || '/placeholder-property.jpg'} 
          alt={trip.title} 
          className="w-full h-full object-cover"
        />
        {trip.status === 'cancelled' && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-medium text-lg">Cancelled</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{trip.title}</h3>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            trip.status === 'confirmed' ? 'bg-green-100 text-green-800' :
            trip.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            trip.status === 'completed' ? 'bg-blue-100 text-blue-800' :
            'bg-red-100 text-red-800'
          }`}>
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <MapPin className="h-4 w-4 mr-1" /> {trip.location}
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="h-4 w-4 mr-1" /> 
          {format(new Date(trip.start_date), 'MMM d')} - {format(new Date(trip.end_date), 'MMM d, yyyy')}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2 flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/dashboard/guest/trips/${trip.id}`);
          }}
        >
          View Details <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffc500]"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">Upcoming Trips</h2>
          <Button variant="ghost" onClick={() => navigate('/dashboard/guest/trips')}>
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        {upcomingTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTrips.slice(0, 3).map(renderTripCard)}
          </div>
        ) : (
          <Card className="bg-gray-50">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-200 rounded-full p-4 mb-4">
                <Calendar className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">No upcoming trips</h3>
              <p className="text-gray-500 mb-5 max-w-md">
                You don't have any upcoming trips booked. Start exploring destinations and book your next adventure!
              </p>
              <Button 
                onClick={() => navigate('/')}
                className="bg-[#ffc500] hover:bg-[#e0ae00] text-black"
              >
                Explore destinations
              </Button>
            </CardContent>
          </Card>
        )}
      </section>
      
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">Wishlists</h2>
          <Button variant="ghost" disabled>
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <WishlistsPlaceholder />
      </section>
      
      {pastTrips.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">Past Trips</h2>
            <Button variant="ghost" onClick={() => navigate('/dashboard/guest/trips')}>
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastTrips.slice(0, 3).map(renderTripCard)}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
