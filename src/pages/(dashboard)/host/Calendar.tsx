import { useState, useEffect } from "react";
import CalendarComponent from "@/components/dashboard/host/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/dashboard/host/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/dashboard/host/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboard/host/ui/select";
import { Button } from "@/components/dashboard/host/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/dashboard/host/ui/dialog";
import { Input } from "@/components/dashboard/host/ui/input";
import { Switch } from "@/components/dashboard/host/ui/switch";
import { Label } from "@/components/dashboard/host/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/dashboard/host/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/dashboard/host/ui/alert";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format, addDays, startOfWeek, endOfWeek, addMonths, isSameDay, isWithinInterval, isWeekend, parseISO, isBefore, isAfter, differenceInDays } from "date-fns";
import {
  Calendar as CalendarIcon,
  BarChart,
  Clock,
  Link,
  AlertCircle,
  Calendar as CalendarLucide,
  Home,
  MapPin,
  Clock10,
  Clock4,
  ChevronsUpDown,
  Plus,
  Trash,
  Save,
  Check,
  X,
  RefreshCw,
  Pencil,
  CalendarRange,
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/dashboard/host/ui/popover";
import { cn } from "@/lib/utils";

const availabilityRuleSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  minStay: z.number().min(1, { message: "Minimum stay must be at least 1 night" }),
  maxStay: z.number().min(1, { message: "Maximum stay must be at least 1 night" }),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  isRecurring: z.boolean().default(false),
  recurDays: z.array(z.string()).optional(),
});

const dateEditSchema = z.object({
  status: z.enum(["available", "blocked", "booked"]),
  notes: z.string().optional(),
  customPrice: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
});

const syncCalendarSchema = z.object({
  source: z.string().min(1, { message: "Source is required" }),
  url: z.string().url({ message: "Please enter a valid URL" }),
});

const listings = [
  { 
    id: 1, 
    name: "Cozy Beach House", 
    type: "listing",
    pricing: {
      weekday: 120,
      weekend: 180,
      custom: {}
    }
  },
  { 
    id: 2, 
    name: "Mountain Retreat", 
    type: "listing",
    pricing: {
      weekday: 150,
      weekend: 225,
      custom: {}
    }
  },
  { 
    id: 3, 
    name: "Downtown Apartment", 
    type: "listing",
    pricing: {
      weekday: 100,
      weekend: 140,
      custom: {}
    }
  },
  { 
    id: 4, 
    name: "City Tour Experience", 
    type: "experience",
    pricing: {
      weekday: 85,
      weekend: 110,
      custom: {}
    }
  },
  { 
    id: 5, 
    name: "Cooking Class", 
    type: "experience",
    pricing: {
      weekday: 65,
      weekend: 90,
      custom: {}
    }
  },
  { 
    id: 6, 
    name: "Wine Tasting Tour", 
    type: "experience",
    pricing: {
      weekday: 95,
      weekend: 135,
      custom: {}
    }
  },
];

const syncSources = [
  { id: "airbnb", name: "Airbnb" },
  { id: "vrbo", name: "VRBO" },
  { id: "booking", name: "Booking.com" },
  { id: "other", name: "Other" },
];

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [activeView, setActiveView] = useState("month");
  const [selectedListing, setSelectedListing] = useState<string | undefined>();
  const [showDateEditDialog, setShowDateEditDialog] = useState(false);
  const [showRuleDialog, setShowRuleDialog] = useState(false);
  const [showSyncDialog, setShowSyncDialog] = useState(false);
  const [dateBlocks, setDateBlocks] = useState<{ [key: string]: { status: string; notes?: string; price?: number } }>({});
  const [activeListing, setActiveListing] = useState<any>(null);
  const [syncStatus, setSyncStatus] = useState({
    airbnb: { lastSync: "2 hours ago", syncing: false },
    vrbo: { lastSync: "2 hours ago", syncing: false },
    booking: { lastSync: "Never", syncing: false }
  });
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(startOfWeek(new Date()));

  useEffect(() => {
    if (selectedListing && selectedListing !== 'all') {
      const listingData = listings.find(l => l.id.toString() === selectedListing);
      setActiveListing(listingData);
    } else {
      setActiveListing(null);
    }
  }, [selectedListing]);

  const dateEditForm = useForm<z.infer<typeof dateEditSchema>>({
    resolver: zodResolver(dateEditSchema),
    defaultValues: {
      status: "available",
      notes: "",
      customPrice: "",
      startTime: "09:00",
      endTime: "17:00",
    },
  });

  const ruleForm = useForm<z.infer<typeof availabilityRuleSchema>>({
    resolver: zodResolver(availabilityRuleSchema),
    defaultValues: {
      name: "",
      minStay: 1,
      maxStay: 30,
      startTime: "09:00",
      endTime: "17:00",
      isRecurring: false,
      recurDays: [],
    },
  });

  const syncForm = useForm<z.infer<typeof syncCalendarSchema>>({
    resolver: zodResolver(syncCalendarSchema),
    defaultValues: {
      source: "",
      url: "",
    },
  });

  const handleDateClick = (day: Date) => {
    let rangeToEdit: Date[] = [];
    
    if (selectedDateRange.from && selectedDateRange.to) {
      const startDate = selectedDateRange.from;
      const endDate = selectedDateRange.to;
      const daysDiff = differenceInDays(endDate, startDate);
      
      for (let i = 0; i <= daysDiff; i++) {
        rangeToEdit.push(addDays(startDate, i));
      }
    } else if (selectedDateRange.from) {
      rangeToEdit = [selectedDateRange.from];
    }
    
    setSelectedDates(rangeToEdit);
    if (rangeToEdit.length > 0) {
      setShowDateEditDialog(true);
    }
  };

  const handleApplyStatus = (data: z.infer<typeof dateEditSchema>) => {
    const updatedBlocks = { ...dateBlocks };
    selectedDates.forEach(date => {
      const dateStr = format(date, "yyyy-MM-dd");
      const price = data.customPrice ? parseFloat(data.customPrice) : 
                    isWeekend(date) ? activeListing?.pricing.weekend : activeListing?.pricing.weekday;
                    
      updatedBlocks[dateStr] = {
        status: data.status,
        notes: data.notes,
        price: price,
      };
    });
    setDateBlocks(updatedBlocks);
    setShowDateEditDialog(false);
    setSelectedDates([]);
    setSelectedDateRange({ from: undefined, to: undefined });
    toast.success(`Updated ${selectedDates.length} dates`);
  };

  const handleAddRule = (data: z.infer<typeof availabilityRuleSchema>) => {
    console.log("Rule data:", data);
    toast.success(`Rule "${data.name}" has been created`, {
      description: `Min stay: ${data.minStay}, Max stay: ${data.maxStay}`,
    });
    setShowRuleDialog(false);
    ruleForm.reset();
  };

  const syncSpecificCalendar = (source: string) => {
    setSyncStatus(prev => ({
      ...prev,
      [source]: { ...prev[source as keyof typeof prev], syncing: true }
    }));
    
    setTimeout(() => {
      setSyncStatus(prev => ({
        ...prev,
        [source]: { lastSync: "Just now", syncing: false }
      }));
      toast.success(`Successfully synced with ${source}`);
    }, 2000);
  };

  const handleSyncCalendar = (data: z.infer<typeof syncCalendarSchema>) => {
    console.log("Sync data:", data);
    
    setSyncStatus(prev => ({
      ...prev,
      [data.source]: { lastSync: "Just now", syncing: false }
    }));
    
    toast.success(`Calendar synced with ${data.source}`, {
      description: "Your availability has been updated based on the external calendar",
    });
    setShowSyncDialog(false);
    syncForm.reset();
  };

  const getDayStatus = (day: Date) => {
    const dateStr = format(day, "yyyy-MM-dd");
    return dateBlocks[dateStr]?.status || "available";
  };

  const getDayPrice = (day: Date) => {
    const dateStr = format(day, "yyyy-MM-dd");
    
    if (dateBlocks[dateStr]?.price) {
      return dateBlocks[dateStr].price;
    }
    
    if (activeListing) {
      return isWeekend(day) ? activeListing.pricing.weekend : activeListing.pricing.weekday;
    }
    
    return null;
  };

  const isDaySelected = (day: Date) => {
    if (selectedDateRange.from && selectedDateRange.to) {
      return isWithinInterval(day, { 
        start: selectedDateRange.from, 
        end: selectedDateRange.to 
      });
    }
    return selectedDateRange.from && isSameDay(day, selectedDateRange.from);
  };

  const handleRangeSelect = (range: { from: Date | undefined; to: Date | undefined }) => {
    setSelectedDateRange(range);
    
    if (range.from && range.to) {
      const startDate = range.from;
      const endDate = range.to;
      const daysDiff = differenceInDays(endDate, startDate);
      
      const datesInRange = [];
      for (let i = 0; i <= daysDiff; i++) {
        datesInRange.push(addDays(startDate, i));
      }
      
      setSelectedDates(datesInRange);
    } else if (range.from) {
      setSelectedDates([range.from]);
    } else {
      setSelectedDates([]);
    }
  };

  const clearSelection = () => {
    setSelectedDates([]);
    setSelectedDateRange({ from: undefined, to: undefined });
  };

  const calculateTotalPrice = () => {
    if (!activeListing || selectedDates.length === 0) return null;
    
    let total = 0;
    selectedDates.forEach(date => {
      const price = getDayPrice(date);
      if (price) total += price;
    });
    
    return total;
  };

  const goToPreviousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };
  
  const goToNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };
  
  const handleEditRule = (ruleName: string) => {
    setShowRuleDialog(true);
    
    if (ruleName === "Weekend Pricing") {
      ruleForm.reset({
        name: "Weekend Pricing",
        minStay: 2,
        maxStay: 30,
        startTime: "09:00",
        endTime: "17:00",
        isRecurring: true,
        recurDays: ["Fri", "Sat", "Sun"],
      });
    } else if (ruleName === "Weekday Availability") {
      ruleForm.reset({
        name: "Weekday Availability",
        minStay: 1,
        maxStay: 30,
        startTime: "09:00",
        endTime: "17:00",
        isRecurring: true,
        recurDays: ["Mon", "Tue", "Wed", "Thu"],
      });
    }
    
    toast.success(`Editing ${ruleName} rule`);
  };


  return (
    <>
         <div className="mb-6 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold">Calendar Management</h2>
          <p className="text-muted-foreground">Manage your availability for listings and experiences</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={() => setShowRuleDialog(true)}
            className="bg-[#ffc500] text-black hover:bg-amber-500"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Rule
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowSyncDialog(true)}
            className="border-[#ffc500] text-[#ffc500] hover:bg-[#ffc500]/10"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Sync Calendar
          </Button>
        </div>
      </div>

      <Card className="shadow-lg border-[#ffc500]/20 mb-8">
        <CardHeader className="pb-3">
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <CardTitle>Availability Calendar</CardTitle>
            <div className="flex space-x-2">
              <Select value={selectedListing} onValueChange={setSelectedListing}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select a listing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Listings & Experiences</SelectItem>
                  {listings.map(listing => (
                    <SelectItem key={listing.id} value={listing.id.toString()}>
                      {listing.name} ({listing.type === 'listing' ? 'Accommodation' : 'Experience'})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Tabs value={activeView} onValueChange={setActiveView} className="w-[180px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {activeListing && (
            <Alert className="mb-4 bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertTitle>Pricing Information</AlertTitle>
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <span>Standard weekday rate: ${activeListing.pricing.weekday}</span>
                  <span>Weekend rate: ${activeListing.pricing.weekend}</span>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <Alert className="mb-4 bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertTitle>Calendar Sync Status</AlertTitle>
            <AlertDescription>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span>Airbnb: {syncStatus.airbnb.lastSync}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => syncSpecificCalendar('airbnb')}
                    disabled={syncStatus.airbnb.syncing}
                  >
                    {syncStatus.airbnb.syncing ? (
                      <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-1" />
                    )}
                    Sync
                  </Button>
                </div>
                <div className="flex justify-between">
                  <span>VRBO: {syncStatus.vrbo.lastSync}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => syncSpecificCalendar('vrbo')}
                    disabled={syncStatus.vrbo.syncing}
                  >
                    {syncStatus.vrbo.syncing ? (
                      <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-1" />
                    )}
                    Sync
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>

          <div className="relative mt-1 rounded-md">
            <Tabs value={activeView} className="w-full">
              <TabsContent value="month" className="mt-0">
                <div className="overflow-x-auto pb-4">
                  <div className="w-full min-w-[900px]">
                    <CalendarComponent 
                      mode="range"
                      selected={selectedDateRange}
                      onSelect={handleRangeSelect}
                      className="rounded-md border shadow p-4 w-full pointer-events-auto"
                      render={{
                        day: (day) => {
                          if (!day || typeof day === 'string' || !(day instanceof Date)) {
                            return null;
                          }
                          try {
                            const status = getDayStatus(day);
                            const isSelected = isDaySelected(day);
                            const price = getDayPrice(day);
                            const isRangeStart = selectedDateRange.from && isSameDay(day, selectedDateRange.from);
                            const isRangeEnd = selectedDateRange.to && isSameDay(day, selectedDateRange.to); 
                            
                            return (
                              <div
                                className={cn(
                                  "relative h-16 w-16 md:h-20 md:w-20 p-0 cursor-pointer hover:bg-accent rounded-md flex flex-col items-center justify-center mx-1.5",
                                  isSelected && "bg-[#ffc500]/20 ring-2 ring-[#ffc500]",
                                  isRangeStart && "rounded-l-md",
                                  isRangeEnd && "rounded-r-md",
                                  status === "blocked" && "bg-red-100",
                                  status === "booked" && "bg-blue-100",
                                  status === "available" && "bg-green-100",
                                  isWeekend(day) && status === "available" && "bg-green-200"
                                )}
                              >
                                <time dateTime={format(day, 'yyyy-MM-dd')} className="text-lg">
                                  {format(day, 'd')}
                                </time>
                                {price && activeListing && (
                                  <div className="text-xs text-slate-700 font-medium mt-1">
                                    ${price}
                                  </div>
                                )}
                                {status !== "available" && (
                                  <div className={cn(
                                    "absolute bottom-0.5 left-1/2 transform -translate-x-1/2 h-1 w-1 rounded-full",
                                    status === "blocked" && "bg-red-500",
                                    status === "booked" && "bg-blue-500"
                                  )} />
                                )}
                              </div>
                            );
                          } catch (error) {
                            console.error('Error rendering day:', error);
                            return null;
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="week" className="mt-0">
                <div className="flex items-center justify-between mb-2">
                  <Button variant="outline" size="sm" onClick={goToPreviousWeek} className="flex items-center">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous Week
                  </Button>
                  <span className="text-sm font-medium">
                    {format(currentWeekStart, 'MMM d')} - {format(addDays(currentWeekStart, 6), 'MMM d, yyyy')}
                  </span>
                  <Button variant="outline" size="sm" onClick={goToNextWeek} className="flex items-center">
                    Next Week <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 7 }).map((_, index) => {
                    const day = addDays(currentWeekStart, index);
                    const dayPrice = getDayPrice(day);
                    return (
                      <div key={index} className="space-y-1">
                        <div className="text-center font-medium">
                          {format(day, 'EEE')}
                        </div>
                        <div className="text-center text-sm text-muted-foreground">
                          {format(day, 'd MMM')}
                        </div>
                        <div 
                          className={cn(
                            "h-32 rounded-md border p-2 cursor-pointer hover:bg-accent",
                            getDayStatus(day) === "blocked" && "bg-red-100",
                            getDayStatus(day) === "booked" && "bg-blue-100",
                            getDayStatus(day) === "available" && isWeekend(day) && "bg-green-200",
                            getDayStatus(day) === "available" && !isWeekend(day) && "bg-green-100",
                            isDaySelected(day) && "ring-2 ring-[#ffc500] bg-[#ffc500]/20"
                          )}
                          onClick={() => {
                            setSelectedDateRange({
                              from: day,
                              to: undefined
                            });
                            setSelectedDates([day]);
                          }}
                        >
                          <div className="text-xs">9:00 AM - 5:00 PM</div>
                          {dayPrice && activeListing && (
                            <div className="mt-2 text-center">
                              <span className="font-medium">${dayPrice}</span>
                              <span className="text-xs text-muted-foreground block">
                                {isWeekend(day) ? 'Weekend rate' : 'Weekday rate'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="h-3 w-3 rounded-full bg-green-100"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="h-3 w-3 rounded-full bg-green-200"></div>
                <span className="text-sm">Weekend</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="h-3 w-3 rounded-full bg-red-100"></div>
                <span className="text-sm">Blocked</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="h-3 w-3 rounded-full bg-blue-100"></div>
                <span className="text-sm">Booked</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {selectedDates.length > 0 && activeListing && (
                <div className="text-sm mr-2">
                  <span className="font-medium">
                    {selectedDates.length} {selectedDates.length === 1 ? 'night' : 'nights'}:
                  </span>
                  <span className="ml-1 text-green-600 font-bold">${calculateTotalPrice()}</span>
                </div>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearSelection}
                disabled={selectedDates.length === 0}
              >
                Clear Selection
              </Button>
              <Button 
                size="sm"
                className="bg-[#ffc500] text-black hover:bg-amber-500"
                onClick={() => setShowDateEditDialog(true)}
                disabled={selectedDates.length === 0}
              >
                Edit Selected ({selectedDates.length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="shadow-lg border-[#ffc500]/20">
          <CardHeader>
            <CardTitle className="text-lg">Current Rules</CardTitle>
            <CardDescription>Your availability rules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border p-3 shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Weekend Pricing</h4>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={() => handleEditRule("Weekend Pricing")}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Min stay: 2 nights, Fri-Sun</p>
            </div>

            <div className="rounded-md border p-3 shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Weekday Availability</h4>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={() => handleEditRule("Weekday Availability")}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">9:00 AM - 5:00 PM, Mon-Thu</p>
            </div>

            <Button 
              variant="outline" 
              className="w-full border-[#ffc500] text-[#ffc500] hover:bg-[#ffc500]/10"
              onClick={() => setShowRuleDialog(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Rule
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-[#ffc500]/20">
          <CardHeader>
            <CardTitle className="text-lg">Connected Calendars</CardTitle>
            <CardDescription>External calendar sync</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border p-3 shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-2">
                    <Home className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Airbnb</h4>
                    <p className="text-xs text-muted-foreground">Last synced: {syncStatus.airbnb.lastSync}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => syncSpecificCalendar('airbnb')}
                  disabled={syncStatus.airbnb.syncing}
                >
                  {syncStatus.airbnb.syncing ? (
                    <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-1" />
                  )}
                  Sync
                </Button>
              </div>
            </div>

            <div className="rounded-md border p-3 shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                    <CalendarRange className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">VRBO</h4>
                    <p className="text-xs text-muted-foreground">Last synced: {syncStatus.vrbo.lastSync}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => syncSpecificCalendar('vrbo')}
                  disabled={syncStatus.vrbo.syncing}
                >
                  {syncStatus.vrbo.syncing ? (
                    <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-1" />
                  )}
                  Sync
                </Button>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full border-[#ffc500] text-[#ffc500] hover:bg-[#ffc500]/10"
              onClick={() => setShowSyncDialog(true)}
            >
              <Link className="mr-2 h-4 w-4" /> Connect Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showDateEditDialog} onOpenChange={setShowDateEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Dates</DialogTitle>
            <DialogDescription>
              {selectedDates.length} {selectedDates.length === 1 ? 'date' : 'dates'} selected. 
              {selectedDates.length > 0 && (
                <span className="block mt-1">
                  {selectedDateRange.from && format(selectedDateRange.from, 'MMM d, yyyy')} 
                  {selectedDateRange.to && ` - ${format(selectedDateRange.to, 'MMM d, yyyy')}`}
                </span>
              )}
              {activeListing && selectedDates.length > 0 && (
                <span className="block mt-1 font-medium text-green-600">
                  Total: ${calculateTotalPrice()}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <Form {...dateEditForm}>
            <form onSubmit={dateEditForm.handleSubmit(handleApplyStatus)}>
              <div className="grid gap-4 py-4">
                <FormField
                  control={dateEditForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Availability Status</FormLabel>
                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          variant={field.value === 'available' ? 'default' : 'outline'}
                          className={field.value === 'available' ? 'bg-green-500 hover:bg-green-600' : ''}
                          onClick={() => dateEditForm.setValue('status', 'available')}
                        >
                          <Check className="mr-2 h-4 w-4" /> Available
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === 'blocked' ? 'default' : 'outline'}
                          className={field.value === 'blocked' ? 'bg-red-500 hover:bg-red-600' : ''}
                          onClick={() => dateEditForm.setValue('status', 'blocked')}
                        >
                          <X className="mr-2 h-4 w-4" /> Blocked
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === 'booked' ? 'default' : 'outline'}
                          className={field.value === 'booked' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                          onClick={() => dateEditForm.setValue('status', 'booked')}
                        >
                          <User className="mr-2 h-4 w-4" /> Booked
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />

                {selectedListing?.includes('experience') && (
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={dateEditForm.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={dateEditForm.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <FormField
                  control={dateEditForm.control}
                  name="customPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custom Price (optional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input placeholder="0.00" className="pl-8" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Leave empty to use the default price.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={dateEditForm.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Add notes about these dates" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDateEditDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#ffc500] text-black hover:bg-amber-500">
                  Apply to {selectedDates.length} date{selectedDates.length !== 1 ? 's' : ''}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={showRuleDialog} onOpenChange={setShowRuleDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Availability Rule</DialogTitle>
            <DialogDescription>
              Set rules that apply to your availability calendar.
            </DialogDescription>
          </DialogHeader>

          <Form {...ruleForm}>
            <form onSubmit={ruleForm.handleSubmit(handleAddRule)}>
              <div className="grid gap-4 py-4">
                <FormField
                  control={ruleForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rule Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Weekend Rule, Summer Season, etc." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={ruleForm.control}
                    name="minStay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Stay (nights)</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={ruleForm.control}
                    name="maxStay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Stay (nights)</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={ruleForm.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={ruleForm.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={ruleForm.control}
                  name="isRecurring"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Recurring Schedule</FormLabel>
                        <FormDescription>
                          Apply this rule to specific days of the week
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {ruleForm.watch("isRecurring") && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <Button
                        key={day}
                        type="button"
                        variant="outline"
                        className={cn(
                          "rounded-full",
                          ruleForm.watch("recurDays")?.includes(day)
                            ? "bg-[#ffc500] text-black border-[#ffc500]"
                            : ""
                        )}
                        onClick={() => {
                          const currentDays = ruleForm.watch("recurDays") || [];
                          if (currentDays.includes(day)) {
                            ruleForm.setValue(
                              "recurDays",
                              currentDays.filter((d) => d !== day)
                            );
                          } else {
                            ruleForm.setValue("recurDays", [...currentDays, day]);
                          }
                        }}
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowRuleDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#ffc500] text-black hover:bg-amber-500">
                  Create Rule
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={showSyncDialog} onOpenChange={setShowSyncDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Connect External Calendar</DialogTitle>
            <DialogDescription>
              Sync your availability with external platforms like Airbnb, VRBO, or Booking.com
            </DialogDescription>
          </DialogHeader>

          <Form {...syncForm}>
            <form onSubmit={syncForm.handleSubmit(handleSyncCalendar)}>
              <div className="grid gap-4 py-4">
                <FormField
                  control={syncForm.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calendar Source</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {syncSources.map(source => (
                            <SelectItem key={source.id} value={source.id}>
                              {source.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the platform you want to sync with.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={syncForm.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>iCal URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://www.airbnb.com/calendar/ical/..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Paste the iCal URL from your external calendar.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <Alert className="bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertTitle>How to find your iCal URL</AlertTitle>
                  <AlertDescription>
                    <p className="mb-1">
                      For Airbnb: Go to Calendar settings and look for "Export Calendar".
                    </p>
                    <p className="mb-1">
                      For VRBO: Go to Calendar settings and look for "Export Calendar" or "iCal".
                    </p>
                    <p>
                      For Booking.com: Go to Properties → Calendar → Sync calendars.
                    </p>
                  </AlertDescription>
                </Alert>
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowSyncDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#ffc500] text-black hover:bg-amber-500">
                  Connect Calendar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Calendar;
