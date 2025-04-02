
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, MapPin, Users, ArrowRight, Star, Loader2, CheckCircle,
  Clock, Ban, AlertTriangle, BadgeCheck, XCircle, MessageSquare
} from 'lucide-react';
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, 
  DialogTitle, DialogTrigger, DialogFooter 
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { format, addDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';

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
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rejected' | 'refunded' | 'checking_in' | 'checking_out';
  propertyId: string;
  hostId?: string;
  checkInCode?: string;
  hasCheckedIn?: boolean;
  hasCheckedOut?: boolean;
  rejectionReason?: string;
  price?: number;
}

interface PropertyData {
  id: string;
  host_id: string;
  title: string;
}

const isValidProperty = (property: any): property is PropertyData => {
  return property && typeof property !== 'string' && !('error' in property) && property.host_id;
};

// Dummy data for trips
const dummyTrips: Trip[] = [
  {
    id: '1',
    title: 'Beachfront Villa',
    location: 'Miami, FL',
    dates: {
      checkIn: new Date().toISOString(),
      checkOut: addDays(new Date(), 7).toISOString(),
    },
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    guests: 4,
    status: 'pending',
    propertyId: 'prop1',
    hostId: 'host1',
    price: 1200
  },
  {
    id: '2',
    title: 'Mountain Cabin',
    location: 'Aspen, CO',
    dates: {
      checkIn: addDays(new Date(), 14).toISOString(),
      checkOut: addDays(new Date(), 21).toISOString(),
    },
    image: 'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    guests: 2,
    status: 'confirmed',
    propertyId: 'prop2',
    hostId: 'host2',
    checkInCode: 'ABC123',
    price: 850
  },
  {
    id: '3',
    title: 'City Apartment',
    location: 'New York, NY',
    dates: {
      checkIn: addDays(new Date(), -10).toISOString(),
      checkOut: addDays(new Date(), -3).toISOString(),
    },
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    guests: 1,
    status: 'completed',
    propertyId: 'prop3',
    hostId: 'host3',
    hasCheckedIn: true,
    hasCheckedOut: true,
    price: 675
  },
  {
    id: '4',
    title: 'Lakeside Cottage',
    location: 'Lake Tahoe, CA',
    dates: {
      checkIn: addDays(new Date(), 30).toISOString(),
      checkOut: addDays(new Date(), 37).toISOString(),
    },
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    guests: 6,
    status: 'cancelled',
    propertyId: 'prop4',
    hostId: 'host4',
    price: 1500
  },
  {
    id: '5',
    title: 'Desert Oasis',
    location: 'Scottsdale, AZ',
    dates: {
      checkIn: addDays(new Date(), 60).toISOString(),
      checkOut: addDays(new Date(), 67).toISOString(),
    },
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80',
    guests: 3,
    status: 'rejected',
    propertyId: 'prop5',
    hostId: 'host5',
    rejectionReason: 'Property unavailable due to maintenance',
    price: 950
  },
  {
    id: '6',
    title: 'Tropical Paradise',
    location: 'Maui, HI',
    dates: {
      checkIn: addDays(new Date(), -30).toISOString(),
      checkOut: addDays(new Date(), -23).toISOString(),
    },
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    guests: 2,
    status: 'refunded',
    propertyId: 'prop6',
    hostId: 'host6',
    price: 2100
  },
  {
    id: '7',
    title: 'Ski Resort Chalet',
    location: 'Park City, UT',
    dates: {
      checkIn: addDays(new Date(), 1).toISOString(),
      checkOut: addDays(new Date(), 8).toISOString(),
    },
    image: 'https://images.unsplash.com/photo-1452784444945-3f422708fe5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
    guests: 8,
    status: 'checking_in',
    propertyId: 'prop7',
    hostId: 'host7',
    checkInCode: 'XYZ789',
    price: 1800
  },
  {
    id: '8',
    title: 'Vineyard Villa',
    location: 'Napa Valley, CA',
    dates: {
      checkIn: addDays(new Date(), -2).toISOString(),
      checkOut: addDays(new Date(), 5).toISOString(),
    },
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    guests: 4,
    status: 'checking_out',
    propertyId: 'prop8',
    hostId: 'host8',
    hasCheckedIn: true,
    price: 1350
  }
];

const Trips = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [trips] = useState<Trip[]>(dummyTrips);
  const [isLoading, setIsLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [reviewRating, setReviewRating] = useState('5');
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const getTrips = () => {
    switch (activeTab) {
      case 'pending':
        return trips.filter(trip => trip.status === 'pending');
      case 'rejected':
        return trips.filter(trip => trip.status === 'rejected');
      case 'confirmed':
        return trips.filter(trip => trip.status === 'confirmed');
      case 'cancelled':
        return trips.filter(trip => trip.status === 'cancelled' || trip.status === 'refunded');
      case 'checkin':
        return trips.filter(trip => trip.status === 'checking_in');
      case 'checkout':
        return trips.filter(trip => trip.status === 'checking_out');
      case 'completed':
        return trips.filter(trip => trip.status === 'completed');
      default:
        return [];
    }
  };
  
  const handleCancelTrip = async () => {
    if (!selectedTrip) return;
    
    try {
      setIsCancelling(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Trip cancelled",
        description: "Your booking has been cancelled successfully",
      });
      
      setShowCancelDialog(false);
    } catch (error) {
      console.error('Error cancelling trip:', error);
      toast({
        title: "Failed to cancel trip",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsCancelling(false);
    }
  };
  
  const handleReviewSubmit = async () => {
    if (!selectedTrip) return;
    
    try {
      setIsSubmittingReview(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Review submitted",
        description: "Thanks for sharing your experience",
      });
      
      setShowReviewDialog(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Failed to submit review",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingReview(false);
    }
  };
  
  const handleViewDetails = (tripId: string) => {
    navigate(`/dashboard/guest/trips/${tripId}`);
  };

  const handlePayment = (tripId: string) => {
    toast({
      title: "Processing payment",
      description: "Redirecting to payment page...",
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-10 w-10 animate-spin text-[#ffc500] mb-4" />
        <p className="text-gray-500">Loading your trips...</p>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Trips</h1>
      
      <Tabs defaultValue="pending" onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid grid-cols-7 sm:grid-cols-7 gap-2">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="checkin">Check-in</TabsTrigger>
          <TabsTrigger value="checkout">Check-out</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-6">
          {getTrips().length === 0 ? (
            <EmptyState 
              title="No pending requests" 
              description="When you request to book a stay, it will appear here awaiting host approval." 
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTrips().map(trip => (
                <TripCard 
                  key={trip.id} 
                  trip={trip} 
                  onViewDetails={handleViewDetails}
                  onCancel={(trip) => {
                    setSelectedTrip(trip);
                    setShowCancelDialog(true);
                  }}
                  onPay={handlePayment}
                  actionType="pending"
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="rejected" className="space-y-6">
          {getTrips().length === 0 ? (
            <EmptyState 
              title="No rejected requests" 
              description="Booking requests that were not approved by hosts will appear here." 
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTrips().map(trip => (
                <TripCard 
                  key={trip.id} 
                  trip={trip} 
                  onViewDetails={handleViewDetails}
                  actionType="rejected"
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="confirmed" className="space-y-6">
          {getTrips().length === 0 ? (
            <EmptyState 
              title="No confirmed trips" 
              description="Your upcoming confirmed trips will appear here." 
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTrips().map(trip => (
                <TripCard 
                  key={trip.id} 
                  trip={trip} 
                  onViewDetails={handleViewDetails}
                  onCancel={(trip) => {
                    setSelectedTrip(trip);
                    setShowCancelDialog(true);
                  }}
                  actionType="confirmed"
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="cancelled" className="space-y-6">
          {getTrips().length === 0 ? (
            <EmptyState 
              title="No cancelled trips" 
              description="Any cancelled or refunded bookings will appear here." 
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTrips().map(trip => (
                <TripCard 
                  key={trip.id} 
                  trip={trip}
                  onViewDetails={handleViewDetails}
                  actionType="cancelled"
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="checkin" className="space-y-6">
          {getTrips().length === 0 ? (
            <EmptyState 
              title="No check-ins" 
              description="Trips ready for check-in will appear here." 
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTrips().map(trip => (
                <TripCard 
                  key={trip.id} 
                  trip={trip}
                  onViewDetails={handleViewDetails}
                  actionType="checkin"
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="checkout" className="space-y-6">
          {getTrips().length === 0 ? (
            <EmptyState 
              title="No check-outs" 
              description="Trips ready for check-out will appear here." 
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTrips().map(trip => (
                <TripCard 
                  key={trip.id} 
                  trip={trip}
                  onViewDetails={handleViewDetails}
                  actionType="checkout"
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-6">
          {getTrips().length === 0 ? (
            <EmptyState 
              title="No completed trips" 
              description="Your past completed trips will appear here." 
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTrips().map(trip => (
                <TripCard 
                  key={trip.id} 
                  trip={trip} 
                  onReview={(trip) => {
                    setSelectedTrip(trip);
                    setShowReviewDialog(true);
                  }}
                  onViewDetails={handleViewDetails}
                  actionType="completed"
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel your trip</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your reservation at {selectedTrip?.title}?
              Please note that refund policies may apply.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label className="text-base">Why are you cancelling? (Optional)</Label>
            <Textarea
              className="mt-2"
              placeholder="Tell us why you're cancelling"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Go Back
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleCancelTrip}
              disabled={isCancelling}
            >
              {isCancelling ? "Cancelling..." : "Confirm Cancellation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate your stay at {selectedTrip?.title}</DialogTitle>
            <DialogDescription>
              Your feedback helps our community and the host improve.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div>
              <Label className="text-base mb-2 block">How was your stay?</Label>
              <RadioGroup value={reviewRating} onValueChange={setReviewRating} className="flex gap-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div key={rating} className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value={String(rating)} id={`rating-${rating}`} className="sr-only" />
                    <Label
                      htmlFor={`rating-${rating}`}
                      className={`cursor-pointer p-2 rounded-full ${
                        reviewRating === String(rating) ? 'bg-[#ffc500]/20' : ''
                      }`}
                    >
                      <Star
                        className={`h-8 w-8 ${
                          parseInt(reviewRating) >= rating
                            ? 'text-[#ffc500] fill-[#ffc500]'
                            : 'text-gray-300'
                        }`}
                      />
                    </Label>
                    <span className="text-xs">{rating}</span>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div>
              <Label className="text-base">Share your experience</Label>
              <Textarea
                className="mt-2"
                placeholder="What did you like? What could have been better?"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleReviewSubmit}
              disabled={isSubmittingReview || !reviewComment.trim()}
            >
              {isSubmittingReview ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface TripCardProps {
  trip: Trip;
  onCancel?: (trip: Trip) => void;
  onReview?: (trip: Trip) => void;
  onViewDetails: (tripId: string) => void;
  onPay?: (tripId: string) => void;
  actionType: string;
}

const TripCard: React.FC<TripCardProps> = ({ 
  trip, 
  onCancel, 
  onReview, 
  onViewDetails,
  onPay,
  actionType
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-48">
          <img 
            src={trip.image} 
            alt={trip.title} 
            className="w-full h-full object-cover" 
          />
          {trip.status === 'pending' && (
            <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
              <Clock className="w-3 h-3 mr-1" /> Pending Approval
            </Badge>
          )}
          {trip.status === 'confirmed' && (
            <Badge className="absolute top-2 right-2 bg-green-500 text-white">
              <CheckCircle className="w-3 h-3 mr-1" /> Confirmed
            </Badge>
          )}
          {trip.status === 'completed' && (
            <Badge className="absolute top-2 right-2 bg-blue-500 text-white">
              <BadgeCheck className="w-3 h-3 mr-1" /> Completed
            </Badge>
          )}
          {trip.status === 'cancelled' && (
            <Badge className="absolute top-2 right-2 bg-red-500 text-white">
              <XCircle className="w-3 h-3 mr-1" /> Cancelled
            </Badge>
          )}
          {trip.status === 'rejected' && (
            <Badge className="absolute top-2 right-2 bg-red-500 text-white">
              <Ban className="w-3 h-3 mr-1" /> Rejected
            </Badge>
          )}
          {trip.status === 'refunded' && (
            <Badge className="absolute top-2 right-2 bg-purple-500 text-white">
              <Badge className="w-3 h-3 mr-1" /> Refunded
            </Badge>
          )}
          {trip.status === 'checking_in' && (
            <Badge className="absolute top-2 right-2 bg-emerald-500 text-white">
              <Calendar className="w-3 h-3 mr-1" /> Ready for Check-in
            </Badge>
          )}
          {trip.status === 'checking_out' && (
            <Badge className="absolute top-2 right-2 bg-orange-500 text-white">
              <Calendar className="w-3 h-3 mr-1" /> Ready for Check-out
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg">{trip.title}</h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              {trip.location}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              {format(new Date(trip.dates.checkIn), 'MMM d')} - {format(new Date(trip.dates.checkOut), 'MMM d, yyyy')}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              {trip.guests} {trip.guests === 1 ? 'guest' : 'guests'}
            </div>
            {trip.price && (
              <div className="text-sm font-semibold">${trip.price.toLocaleString()} total</div>
            )}
            {trip.status === 'rejected' && trip.rejectionReason && (
              <div className="mt-2 p-2 bg-red-50 rounded-md text-sm text-red-600">
                <p className="font-semibold">Rejection reason:</p>
                <p>{trip.rejectionReason}</p>
              </div>
            )}
            {trip.status === 'checking_in' && trip.checkInCode && (
              <div className="mt-2 p-2 bg-emerald-50 rounded-md text-sm text-emerald-600">
                <p className="font-semibold">Check-in code:</p>
                <p className="text-lg font-mono tracking-wider">{trip.checkInCode}</p>
              </div>
            )}
          </div>
          <div className="mt-4 space-y-2">
            <Button 
              className="w-full" 
              variant={trip.status === 'cancelled' || trip.status === 'rejected' ? 'outline' : 'default'}
              onClick={() => onViewDetails(trip.id)}
            >
              View Details <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            
            {actionType === 'pending' && (
              <Button 
                variant="outline" 
                className="w-full text-green-600 border-green-200 hover:bg-green-50"
                onClick={() => onPay && onPay(trip.id)}
              >
                <CheckCircle className="mr-1 h-4 w-4" /> Pay Now
              </Button>
            )}
            
            {(actionType === 'pending' || actionType === 'confirmed') && onCancel && (
              <Button 
                variant="outline" 
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => onCancel(trip)}
              >
                <Ban className="mr-1 h-4 w-4" /> Cancel Reservation
              </Button>
            )}
            
            {actionType === 'completed' && onReview && (
              <Button 
                variant="outline" 
                className="w-full text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                onClick={() => onReview(trip)}
              >
                <Star className="mr-1 h-4 w-4" /> Leave a Review
              </Button>
            )}
            
            {actionType === 'checkin' && trip.checkInCode && (
              <Button 
                variant="outline" 
                className="w-full text-emerald-600 border-emerald-200 hover:bg-emerald-50"
              >
                <CheckCircle className="mr-1 h-4 w-4" /> Complete Check-in
              </Button>
            )}
            
            {actionType === 'checkout' && (
              <Button 
                variant="outline" 
                className="w-full text-orange-600 border-orange-200 hover:bg-orange-50"
              >
                <CheckCircle className="mr-1 h-4 w-4" /> Complete Check-out
              </Button>
            )}
            
            {actionType === 'pending' && (
              <p className="text-xs text-center text-gray-500 mt-2">
                <AlertTriangle className="inline h-3 w-3 mr-1" /> 
                Awaiting host approval. You won't be charged until approved.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => {
  return (
    <div className="text-center py-12 px-4">
      <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
        <Calendar className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600 max-w-sm mx-auto mb-6">{description}</p>
      <Button asChild>
        <a href="/">Explore FlapaBay</a>
      </Button>
    </div>
  );
};

export default Trips;
