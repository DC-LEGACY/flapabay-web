
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Users, Clock, Star, CheckCircle, Ban, MessageSquare, ArrowLeft, Printer, Share2, Download } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface TripDetailsProps {}

interface Trip {
  id: string;
  title: string;
  location: string;
  dates: {
    checkIn: string;
    checkOut: string;
  };
  image: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  propertyId: string;
  hostId?: string;
  checkInCode?: string;
  hasCheckedIn?: boolean;
  hasCheckedOut?: boolean;
}

interface PropertyData {
  id: string;
  host_id: string;
  title: string;
}

const isValidProperty = (property: any): property is PropertyData => {
  return property && typeof property !== 'string' && !('error' in property) && property.host_id;
};

const TripDetails: React.FC<TripDetailsProps> = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!tripId || !user) return;
    
    const fetchTripDetails = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('trips')
          .select(`
            *,
            property:property_id(id, host_id, title)
          `)
          .eq('id', tripId)
          .eq('user_id', user.id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          const hostId = isValidProperty(data.property) ? data.property.host_id : undefined;
          
          setTrip({
            id: data.id,
            title: data.title || '',
            location: data.location || '',
            dates: {
              checkIn: data.check_in,
              checkOut: data.check_out,
            },
            image: data.image_url || '/placeholder.svg',
            guests: data.guests || 1,
            status: data.status as Trip['status'],
            propertyId: data.property_id,
            hostId: hostId,
            checkInCode: data.check_in_code,
            hasCheckedIn: data.has_checked_in,
            hasCheckedOut: data.has_checked_out,
          });
        }
      } catch (err) {
        console.error('Error fetching trip details:', err);
        setError('Failed to load trip details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTripDetails();
  }, [tripId, user]);
  
  const handleGoBack = () => {
    navigate('/dashboard/guest/trips');
  };
  
  const handleMessageHost = async () => {
    if (!trip?.hostId) return;
    
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('id')
        .eq('guest_id', user?.id)
        .eq('host_id', trip.hostId)
        .eq('property_id', trip.propertyId)
        .single();
      
      if (error) throw error;
      
      if (data) {
        navigate(`/dashboard/guest/messages/${data.id}`);
      }
    } catch (error) {
      console.error('Error finding conversation:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffc500]"></div>
      </div>
    );
  }
  
  if (error || !trip) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
        <p className="text-gray-600 mb-6">{error || 'Trip not found'}</p>
        <Button onClick={handleGoBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Trips
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handleGoBack} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Trip Details</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{trip.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" /> {trip.location}
                  </CardDescription>
                </div>
                <TripStatusBadge status={trip.status} />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="aspect-video rounded-md overflow-hidden mb-6">
                <img 
                  src={trip.image} 
                  alt={trip.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-sm text-gray-500 mb-1 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" /> Check-in
                  </div>
                  <div className="font-medium">{format(new Date(trip.dates.checkIn), 'EEEE, MMM d, yyyy')}</div>
                  <div className="text-sm">After 3:00 PM</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-sm text-gray-500 mb-1 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" /> Check-out
                  </div>
                  <div className="font-medium">{format(new Date(trip.dates.checkOut), 'EEEE, MMM d, yyyy')}</div>
                  <div className="text-sm">Before 11:00 AM</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-sm text-gray-500 mb-1 flex items-center">
                    <Users className="h-4 w-4 mr-2" /> Guests
                  </div>
                  <div className="font-medium">{trip.guests} {trip.guests === 1 ? 'guest' : 'guests'}</div>
                  <div className="text-sm">{trip.guests > 1 ? 'Max 6 guests allowed' : 'Max 2 guests allowed'}</div>
                </div>
              </div>
              
              {trip.checkInCode && (
                <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-md">
                  <div className="font-semibold text-green-800 mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" /> Check-in Code
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200 text-center">
                    <span className="text-xl font-mono tracking-widest">{trip.checkInCode}</span>
                  </div>
                  <p className="text-sm text-green-600 mt-2">
                    Use this code at the property's keypad or provide it to the check-in staff.
                  </p>
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Reservation Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Reservation ID</span>
                      <span className="font-medium">{trip.id}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Booking Date</span>
                      <span className="font-medium">June 15, 2023</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Total Nights</span>
                      <span className="font-medium">7 nights</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Property Type</span>
                      <span className="font-medium">Entire villa</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Cancellation Policy</span>
                      <span className="font-medium">Moderate - 50% refund up to 7 days before check-in</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3">Host Information</h3>
                  <div className="flex items-center p-4 bg-gray-50 rounded-md">
                    <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                    <div>
                      <div className="font-medium">Michael Host</div>
                      <div className="text-sm text-gray-500">Joined FlapaBay in 2020</div>
                      <div className="flex items-center text-sm mt-1">
                        <Star className="h-4 w-4 text-[#ffc500] fill-[#ffc500] mr-1" />
                        <span>4.97 · 128 reviews</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="ml-auto"
                      onClick={handleMessageHost}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" /> Message
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3">Payment Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">$180 x 7 nights</span>
                      <span>$1,260.00</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Cleaning fee</span>
                      <span>$120.00</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Service fee</span>
                      <span>$196.00</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Taxes</span>
                      <span>$157.60</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between py-2 font-semibold">
                      <span>Total (USD)</span>
                      <span>$1,733.60</span>
                    </div>
                    <div className="flex justify-between py-2 text-sm text-gray-500">
                      <span>Paid on June 15, 2023</span>
                      <span>Visa ****4242</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 pt-0">
              {trip.status === 'pending' && (
                <Button variant="destructive" className="w-full">
                  <Ban className="mr-2 h-4 w-4" /> Cancel Reservation
                </Button>
              )}
              
              {trip.status === 'confirmed' && !trip.hasCheckedIn && (
                <Button variant="destructive" className="w-full">
                  <Ban className="mr-2 h-4 w-4" /> Cancel Reservation
                </Button>
              )}
              
              {trip.status === 'confirmed' && trip.hasCheckedIn && !trip.hasCheckedOut && (
                <Button className="w-full">
                  <CheckCircle className="mr-2 h-4 w-4" /> Complete Check-out
                </Button>
              )}
              
              {trip.status === 'completed' && (
                <Button className="w-full">
                  <Star className="mr-2 h-4 w-4" /> Leave a Review
                </Button>
              )}
              
              <Button variant="outline" className="w-full">
                <Printer className="mr-2 h-4 w-4" /> Print Confirmation
              </Button>
              
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download Receipt
              </Button>
              
              <Button variant="outline" className="w-full">
                <Share2 className="mr-2 h-4 w-4" /> Share Itinerary
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" /> Message Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4" /> Get Directions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" /> Request Early Check-in
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" /> Request Late Check-out
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Local Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80" 
                  alt="Local restaurant" 
                  className="w-full h-40 object-cover"
                />
                <div className="p-3 bg-gray-50">
                  <h4 className="font-medium">Seaside Restaurant</h4>
                  <p className="text-sm text-gray-500">0.3 miles from property</p>
                  <p className="text-sm mt-1">Amazing seafood with ocean views</p>
                </div>
              </div>
              
              <div className="rounded-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1468581264429-2548ef9eb732?auto=format&fit=crop&w=300&q=80" 
                  alt="Local beach" 
                  className="w-full h-40 object-cover"
                />
                <div className="p-3 bg-gray-50">
                  <h4 className="font-medium">South Beach</h4>
                  <p className="text-sm text-gray-500">0.1 miles from property</p>
                  <p className="text-sm mt-1">Beautiful sandy beach with clear water</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface TripStatusBadgeProps {
  status: Trip['status'];
}

const TripStatusBadge: React.FC<TripStatusBadgeProps> = ({ status }) => {
  let color = '';
  let label = '';
  let icon = null;
  
  switch (status) {
    case 'pending':
      color = 'bg-yellow-100 text-yellow-800 border-yellow-200';
      label = 'Pending Approval';
      icon = <Clock className="h-4 w-4 mr-1" />;
      break;
    case 'confirmed':
      color = 'bg-green-100 text-green-800 border-green-200';
      label = 'Confirmed';
      icon = <CheckCircle className="h-4 w-4 mr-1" />;
      break;
    case 'completed':
      color = 'bg-blue-100 text-blue-800 border-blue-200';
      label = 'Completed';
      icon = <CheckCircle className="h-4 w-4 mr-1" />;
      break;
    case 'cancelled':
      color = 'bg-red-100 text-red-800 border-red-200';
      label = 'Cancelled';
      icon = <Ban className="h-4 w-4 mr-1" />;
      break;
  }
  
  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${color}`}>
      {icon}
      {label}
    </div>
  );
};

export default TripDetails;
