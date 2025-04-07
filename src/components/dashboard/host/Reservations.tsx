import {
  ArrowUpDown,
  BookOpen,
  Calendar,
  CheckCircle,
  Filter,
  Info,
  Loader2,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Search,
  Users,
  XCircle
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Card, CardContent } from '@/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs';
import { format, parseISO } from 'date-fns';

import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Reservation {
  id: string;
  guestId: string;
  guestName: string;
  guestAvatar?: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount?: number;
  createdAt: string;
  conversationId?: string;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-green-100 text-green-800 border-green-200',
  completed: 'bg-blue-100 text-blue-800 border-blue-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const statusIcons = {
  pending: <Info className="w-4 h-4" />,
  confirmed: <CheckCircle className="w-4 h-4" />,
  completed: <CheckCircle className="w-4 h-4" />,
  cancelled: <XCircle className="w-4 h-4" />,
};

const Reservations = () => {
  const mockReservations: Reservation[] = [
    {
      id: '1',
      guestId: 'guest-1',
      guestName: 'John Doe',
      guestAvatar: 'https://i.pravatar.cc/150?u=john',
      propertyId: 'prop-1',
      propertyTitle: 'Luxury Beach Villa',
      propertyLocation: 'Lagos, Nigeria',
      checkIn: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days from now
      checkOut: new Date(Date.now() + 86400000 * 14).toISOString(), // 14 days from now
      guests: 3,
      status: 'pending',
      totalAmount: 1245,
      createdAt: new Date().toISOString(),
      conversationId: 'conv-1',
    },
    {
      id: '2',
      guestId: 'guest-2',
      guestName: 'Maria Garcia',
      guestAvatar: 'https://i.pravatar.cc/150?u=maria',
      propertyId: 'prop-2',
      propertyTitle: 'City Apartment',
      propertyLocation: 'Cape Town, South Africa',
      checkIn: new Date(Date.now() + 86400000 * 14).toISOString(), // 14 days from now
      checkOut: new Date(Date.now() + 86400000 * 21).toISOString(), // 21 days from now
      guests: 2,
      status: 'confirmed',
      totalAmount: 890,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
      conversationId: 'conv-2',
    },
    {
      id: '3',
      guestId: 'guest-3',
      guestName: 'Ahmed Khan',
      guestAvatar: 'https://i.pravatar.cc/150?u=ahmed',
      propertyId: 'prop-3',
      propertyTitle: 'Mountain Cabin',
      propertyLocation: 'Nairobi, Kenya',
      checkIn: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
      checkOut: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
      guests: 4,
      status: 'completed',
      totalAmount: 1120,
      createdAt: new Date(Date.now() - 86400000 * 20).toISOString(), // 20 days ago
      conversationId: 'conv-3',
    },
    {
      id: '4',
      guestId: 'guest-4',
      guestName: 'Sophie Williams',
      guestAvatar: 'https://i.pravatar.cc/150?u=sophie',
      propertyId: 'prop-4',
      propertyTitle: 'Garden Cottage',
      propertyLocation: 'Accra, Ghana',
      checkIn: new Date(Date.now() - 86400000 * 30).toISOString(), // 30 days ago
      checkOut: new Date(Date.now() - 86400000 * 25).toISOString(), // 25 days ago
      guests: 2,
      status: 'cancelled',
      totalAmount: 750,
      createdAt: new Date(Date.now() - 86400000 * 35).toISOString(), // 35 days ago
      conversationId: 'conv-4',
    },
  ];

  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  
  const getFilteredReservations = () => {
    // First filter by tab/status
    let filtered = [...reservations];
    
    if (activeTab !== 'all') {
      filtered = filtered.filter(reservation => reservation.status === activeTab);
    }
    
    // Then filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(reservation => 
        reservation.propertyTitle.toLowerCase().includes(query) ||
        reservation.propertyLocation.toLowerCase().includes(query) ||
        reservation.guestName.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };
  
  const handleApproveReservation = async () => {
    if (!selectedReservation) return;
    
    try {
      setIsProcessing(true);
      
      // Update the reservation in our state
      setReservations(prev => 
        prev.map(res => 
          res.id === selectedReservation.id 
            ? { ...res, status: 'confirmed' } 
            : res
        )
      );
      
      toast({
        title: "Reservation approved",
        description: "The guest has been notified and can now complete payment",
      });
      
      setShowApproveDialog(false);
    } catch (error) {
      console.error('Error approving reservation:', error);
      toast({
        title: "Failed to approve reservation",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleRejectReservation = async () => {
    if (!selectedReservation) return;
    
    try {
      setIsProcessing(true);
      setReservations(prev => 
        prev.map(res => 
          res.id === selectedReservation.id 
            ? { ...res, status: 'cancelled' } 
            : res
        )
      );
      
      toast({
        title: "Reservation rejected",
        description: "The guest has been notified of your decision",
      });
      
      setShowRejectDialog(false);
      setRejectionReason('');
    } catch (error) {
      console.error('Error rejecting reservation:', error);
      toast({
        title: "Failed to reject reservation",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleMessageGuest = (reservation: Reservation) => {
    if (reservation.conversationId) {
      navigate(`/dashboard/host/messages/${reservation.conversationId}`);
    }
  };
  
  const filteredReservations = getFilteredReservations();
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Reservations</h1>
      
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search by guest, property..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex gap-2">
                <Filter size={18} />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Newest First</DropdownMenuItem>
              <DropdownMenuItem>Oldest First</DropdownMenuItem>
              <DropdownMenuItem>Highest Price</DropdownMenuItem>
              <DropdownMenuItem>Lowest Price</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="sm" className="flex gap-2">
            <ArrowUpDown size={18} />
            <span className="hidden sm:inline">Sort</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        {filteredReservations.length === 0 ? (
          <EmptyState 
            icon={BookOpen}
            title={
              searchQuery 
                ? "No reservations match your search" 
                : `No ${activeTab !== 'all' ? activeTab : ''} reservations`
            }
            description={
              searchQuery 
                ? "Try adjusting your search terms" 
                : "When guests book your listings, their reservations will appear here"
            }
            actionLabel="Manage Listings"
            actionHref="/dashboard/host/listings"
          />
        ) : (
          <div className="grid gap-6">
            {filteredReservations.map(reservation => (
              <ReservationCard 
                key={reservation.id}
                reservation={reservation}
                onApprove={(res) => {
                  setSelectedReservation(res);
                  setShowApproveDialog(true);
                }}
                onReject={(res) => {
                  setSelectedReservation(res);
                  setShowRejectDialog(true);
                }}
                onMessage={handleMessageGuest}
              />
            ))}
          </div>
        )}
      </Tabs>
     
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Reservation Request</DialogTitle>
            <DialogDescription>
              {selectedReservation && (
                <>
                  You're approving a booking request from {selectedReservation.guestName} for {selectedReservation.propertyTitle}.
                  Once approved, the guest will be notified to complete payment.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedReservation && (
              <div className="rounded-2xl bg-green-50 border border-green-100 p-4">
                <p className="text-sm font-medium text-green-800">Reservation Details:</p>
                <p className="text-sm mt-2">Check-in: {format(parseISO(selectedReservation.checkIn), 'PP')}</p>
                <p className="text-sm">Check-out: {format(parseISO(selectedReservation.checkOut), 'PP')}</p>
                <p className="text-sm">Guests: {selectedReservation.guests}</p>
                <p className="text-sm mt-2 font-medium">Total Amount: ${selectedReservation.totalAmount}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleApproveReservation}
              disabled={isProcessing}
              className="bg-green-600 hover:bg-green-700"
            >
              {isProcessing ? "Processing..." : "Approve Reservation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Reservation Request</DialogTitle>
            <DialogDescription>
              {selectedReservation && (
                <>
                  You're rejecting a booking request from {selectedReservation.guestName} for {selectedReservation.propertyTitle}.
                  Please provide a reason to help the guest understand your decision.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="e.g., Property unavailable, Maintenance issues, etc."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleRejectReservation}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Reject Reservation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ReservationCardProps {
  reservation: Reservation;
  onApprove: (reservation: Reservation) => void;
  onReject: (reservation: Reservation) => void;
  onMessage: (reservation: Reservation) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ 
  reservation, 
  onApprove, 
  onReject,
  onMessage
}) => {
  return (
    <Card className="overflow-hidden border-gray-200">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Guest info */}
          <div className="p-6 md:border-r border-gray-200 flex flex-row md:flex-col items-center md:justify-center md:w-64 gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={reservation.guestAvatar} alt={reservation.guestName} />
              <AvatarFallback className="bg-[#ffc500]/20 text-[#ffc500]">
                {reservation.guestName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h3 className="font-medium">{reservation.guestName}</h3>
              <p className="text-sm text-gray-500">
                Requested on {format(parseISO(reservation.createdAt), 'MMM d, yyyy')}
              </p>
              
              <Badge 
                className={`mt-2 flex items-center gap-1 w-fit ${statusColors[reservation.status]}`}
                variant="outline"
              >
                {statusIcons[reservation.status]} 
                <span className="capitalize">{reservation.status}</span>
              </Badge>
            </div>
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">{reservation.propertyTitle}</h3>
              <div className="text-right">
                <p className="font-bold">${reservation.totalAmount}</p>
                <p className="text-sm text-gray-500">Total</p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{reservation.propertyLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  {format(parseISO(reservation.checkIn), 'MMM d')} - {format(parseISO(reservation.checkOut), 'MMM d, yyyy')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{reservation.guests} guests</span>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {reservation.status === 'pending' && (
                <>
                  <Button 
                    onClick={() => onApprove(reservation)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" /> Approve
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => onReject(reservation)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <XCircle className="h-4 w-4 mr-2" /> Reject
                  </Button>
                </>
              )}
              
              <Button 
                variant="outline" 
                onClick={() => onMessage(reservation)}
              >
                <MessageSquare className="h-4 w-4 mr-2" /> Message Guest
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>View Property</DropdownMenuItem>
                  <DropdownMenuItem>View Guest Profile</DropdownMenuItem>
                  {reservation.status === 'confirmed' && (
                    <DropdownMenuItem className="text-red-600">Cancel Reservation</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  actionHref 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 mb-4">
        <Icon className="h-8 w-8 text-gray-500" />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-md mb-6">{description}</p>
      <Button asChild>
        <a href={actionHref}>{actionLabel}</a>
      </Button>
    </div>
  );
};

export default Reservations;