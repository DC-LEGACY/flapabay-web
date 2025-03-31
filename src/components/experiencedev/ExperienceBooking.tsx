
import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { addDays, format, isAfter, isBefore, parseISO, startOfTomorrow } from 'date-fns';
import { ArrowRight, Calendar as CalendarIcon, Check, Clock, Star, Users } from 'lucide-react';

import { toast } from '@/hooks/use-toast';
import { Card } from '@/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { Button } from '@/ui/button';
import { Calendar } from '@/ui/calendar';
import { Badge } from '@/ui/badge';

interface ExperienceBookingProps {
  price: number;
  currency?: string;
  rating: number;
  reviewCount: number;
  duration: string;
  groupSize: number;
  availableDates?: {
    start: string;
    end: string;
    bookedDates: string[];
    availableTimeSlots?: Record<string, string[]>;
  };
  instantBook?: boolean;
}

const ExperienceBooking: React.FC<ExperienceBookingProps> = ({
  price,
  currency = 'USD',
  rating,
  reviewCount,
  duration,
  groupSize,
  availableDates,
  instantBook = true
}) => {
  const tomorrow = startOfTomorrow();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [participants, setParticipants] = useState(1);
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  // Preprocess available dates
  const startDate = availableDates ? parseISO(availableDates.start) : tomorrow;
  const endDate = availableDates ? parseISO(availableDates.end) : addDays(tomorrow, 365);
  const bookedDates = availableDates?.bookedDates.map(date => parseISO(date)) || [];
  
  const isDateDisabled = (date: Date) => {
    // Disable dates before tomorrow
    if (isBefore(date, tomorrow)) return true;
    
    // Disable dates outside available range
    if (isBefore(date, startDate) || isAfter(date, endDate)) return true;
    
    // Disable booked dates
    return bookedDates.some(bookedDate => 
      date.getDate() === bookedDate.getDate() && 
      date.getMonth() === bookedDate.getMonth() && 
      date.getFullYear() === bookedDate.getFullYear()
    );
  };
  
  // Get available time slots for the selected date
  const getAvailableTimeSlots = () => {
    if (!selectedDate || !availableDates?.availableTimeSlots) return [];
    
    const dateString = format(selectedDate, 'yyyy-MM-dd');
    return availableDates.availableTimeSlots[dateString] || [
      '09:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM' // Default time slots
    ];
  };
  
  const timeSlots = getAvailableTimeSlots();
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(undefined); // Reset time when date changes
    if (date) {
      setCalendarOpen(false);
    }
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const resetSelection = () => {
    setSelectedDate(undefined);
    setSelectedTime(undefined);
  };
  
  const increaseParticipants = () => {
    if (participants < groupSize) {
      setParticipants(participants + 1);
    }
  };
  
  const decreaseParticipants = () => {
    if (participants > 1) {
      setParticipants(participants - 1);
    }
  };
  
  const subTotal = price * participants;
  const serviceFee = Math.round(subTotal * 0.10); // 10% service fee
  const total = subTotal + serviceFee;
  
  const handleReserve = () => {
    if (!selectedDate) {
      toast({
        title: "Please select a date",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedTime) {
      toast({
        title: "Please select a time slot",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Booking request sent!",
      description: `Your experience for ${participants} ${participants > 1 ? 'people' : 'person'} on ${format(selectedDate, 'MMM d, yyyy')} at ${selectedTime} has been ${instantBook ? 'confirmed' : 'requested'}. ${instantBook ? 'Check your email for confirmation details.' : "You'll hear back from the host soon."}`,
    });
  };
  
  return (
    <Card className="sticky top-24 p-6 border border-gray-200 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-2xl font-bold">${price}</span>
          <span className="text-gray-600"> / person</span>
        </div>
        
        <div className="flex items-center">
          <Star className="h-4 w-4 text-primary fill-primary mr-1" />
          <span className="font-medium">{rating}</span>
          <span className="text-gray-600 mx-1">·</span>
          <span className="text-gray-600">{reviewCount} reviews</span>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        {/* Date Selector */}
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between border border-gray-300 h-auto py-4"
            >
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <span className={cn(
                  !selectedDate && "text-gray-400"
                )}>
                  {selectedDate ? format(selectedDate, "EEEE, MMM d, yyyy") : "Select date"}
                </span>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={isDateDisabled}
              fromDate={tomorrow}
              toDate={endDate}
              className="border-0 pointer-events-auto"
            />
            {selectedDate && (
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 text-center">
                <p className="text-sm font-medium text-gray-700">
                  Available on {format(selectedDate, 'EEEE, MMM d')}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetSelection}
                  className="mt-2 text-primary"
                >
                  Reset date
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
        
        {/* Time Slots */}
        {selectedDate && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-3">Available times:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {timeSlots.map((time, index) => (
                <Button
                  key={index}
                  variant={selectedTime === time ? "default" : "outline"} 
                  size="sm"
                  className={selectedTime === time ? "border-primary" : ""}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Guests */}
        <div className="mt-6">
          <div className="flex justify-between items-center border border-gray-300 rounded-lg p-4">
            <div>
              <p className="text-sm font-medium">Guests</p>
              <div className="flex items-center gap-1 mt-1">
                <Users className="h-4 w-4 text-gray-400" />
                <p className="text-base">{participants} {participants === 1 ? 'person' : 'people'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={decreaseParticipants}
                disabled={participants <= 1}
              >
                -
              </Button>
              <span className="w-6 text-center">{participants}</span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={increaseParticipants}
                disabled={participants >= groupSize}
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full py-6 text-base font-medium"
        onClick={handleReserve}
        disabled={!selectedDate || !selectedTime}
      >
        {instantBook ? 'Instant Book' : 'Request to Book'}
      </Button>
      
      <p className="text-center text-sm text-gray-500 mt-2">
        {instantBook 
          ? "You won't be charged until after your experience" 
          : "You won't be charged until the host accepts"
        }
      </p>
      
      {selectedDate && selectedTime && (
        <motion.div 
          className="mt-6 space-y-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-between">
            <p className="underline">${price} × {participants} {participants > 1 ? 'guests' : 'guest'}</p>
            <p>${subTotal}</p>
          </div>
          
          <div className="flex justify-between">
            <p className="underline">Service fee</p>
            <p>${serviceFee}</p>
          </div>
          
          <div className="pt-4 border-t border-gray-200 flex justify-between font-bold">
            <p>Total</p>
            <p>${total}</p>
          </div>
        </motion.div>
      )}
      
      <div className="mt-6 flex items-center justify-center gap-2">
        <Badge variant="outline" className="rounded-full py-1 px-3 font-normal text-xs">
          <Clock className="h-3 w-3 mr-1" /> {duration}
        </Badge>
        {instantBook && (
          <Badge variant="outline" className="rounded-full py-1 px-3 font-normal text-xs">
            <Check className="h-3 w-3 mr-1" /> Instant Book
          </Badge>
        )}
      </div>
    </Card>
  );
};

export default ExperienceBooking;
