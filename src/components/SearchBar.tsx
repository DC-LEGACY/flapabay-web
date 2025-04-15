
import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, SlidersHorizontal } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const SearchBar = () => {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [guestCount, setGuestCount] = useState(0);
  const [isGuestPopoverOpen, setIsGuestPopoverOpen] = useState(false);

  const handleGuestIncrement = () => {
    setGuestCount(prev => prev + 1);
  };

  const handleGuestDecrement = () => {
    setGuestCount(prev => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 rounded-full border border-gray-200 p-2 bg-white">
      {/* Search Location */}
      <div className="w-full md:flex-1 px-4">
        <Input 
          type="text" 
          placeholder="Search destinations" 
          className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
        />
      </div>
      
      {/* Divider */}
      <div className="hidden md:block h-8 w-px bg-gray-200"></div>
      
      {/* Checkin Date */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="w-full md:w-auto px-4 cursor-pointer">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Check in</span>
              <span className="text-sm text-gray-500">
                {checkInDate ? format(checkInDate, "MMM d, yyyy") : "Add date"}
              </span>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="single"
            selected={checkInDate}
            onSelect={setCheckInDate}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
      
      {/* Divider */}
      <div className="hidden md:block h-8 w-px bg-gray-200"></div>
      
      {/* Checkout Date */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="w-full md:w-auto px-4 cursor-pointer">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Check out</span>
              <span className="text-sm text-gray-500">
                {checkOutDate ? format(checkOutDate, "MMM d, yyyy") : "Add date"}
              </span>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="single"
            selected={checkOutDate}
            onSelect={setCheckOutDate}
            disabled={(date) => !checkInDate || date < checkInDate}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
      
      {/* Divider */}
      <div className="hidden md:block h-8 w-px bg-gray-200"></div>
      
      {/* Guests */}
      <Popover open={isGuestPopoverOpen} onOpenChange={setIsGuestPopoverOpen}>
        <PopoverTrigger asChild>
          <div className="w-full md:w-auto px-4 cursor-pointer">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Guests</span>
              <span className="text-sm text-gray-500">
                {guestCount > 0 ? `${guestCount} guest${guestCount !== 1 ? 's' : ''}` : 'Add guests'}
              </span>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Guests</span>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={handleGuestDecrement}
                  disabled={guestCount === 0}
                >
                  -
                </Button>
                <span className="text-sm w-4 text-center">{guestCount}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={handleGuestIncrement}
                >
                  +
                </Button>
              </div>
            </div>
            
            <Button 
              className="w-full mt-2 bg-[#FFC500] text-black hover:bg-[#e6b000]"
              onClick={() => setIsGuestPopoverOpen(false)}
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      
      {/* Filters */}
      <div className="hidden md:flex items-center px-4 gap-2">
        <div className="flex items-center gap-2 border-r pr-3">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="text-sm font-medium">Filters</span>
        </div>
      </div>
      
      {/* Search Button */}
      <button className="bg-[#FFC500] h-12 w-12 rounded-full flex items-center justify-center">
        <Search className="text-black w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;
