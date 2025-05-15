
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/components/dashboard/Dashboard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Calendar, 
  Plus, 
  Search, 
  ClipboardList,
  Pencil,
  Trash,
  Star,
  Clock,
  DollarSign,
  MoreHorizontal,
  Users,
  Camera,
  Compass,
  Utensils,
  Wine,
  Bike,
  Music,
  Paintbrush,
  Languages,
  MapPin,
  Tag,
  Clock3
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Sample experience data
const experiences = [
  {
    id: 1,
    title: "City Tour Experience",
    location: "Paris, France",
    category: "Tours",
    price: 45,
    currency: "USD",
    duration: 3,  // hours
    maxGuests: 10,
    languages: ["English", "French"],
    rating: 4.8,
    reviewCount: 156,
    thumbnail: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=2070",
    status: "active",
    instantBook: true,
    featured: true,
    verified: true,
    bookings: 28,
    earnings: 1260,
    occupancyRate: 82
  },
  {
    id: 2,
    title: "Cooking Class",
    location: "Rome, Italy",
    category: "Food & Drink",
    price: 65,
    currency: "USD",
    duration: 2,
    maxGuests: 8,
    languages: ["English", "Italian"],
    rating: 4.9,
    reviewCount: 92,
    thumbnail: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&q=80&w=2074",
    status: "active",
    instantBook: true,
    featured: false,
    verified: true,
    bookings: 16,
    earnings: 1040,
    occupancyRate: 74
  },
  {
    id: 3,
    title: "Wine Tasting Tour",
    location: "Stellenbosch, South Africa",
    category: "Food & Drink",
    price: 1250,
    currency: "ZAR",
    duration: 4,
    maxGuests: 12,
    languages: ["English"],
    rating: 4.7,
    reviewCount: 68,
    thumbnail: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=2070",
    status: "active",
    instantBook: false,
    featured: true,
    verified: true,
    bookings: 14,
    earnings: 17500,
    occupancyRate: 65
  },
  {
    id: 4,
    title: "Safari Adventure",
    location: "Nairobi, Kenya",
    category: "Nature",
    price: 8500,
    currency: "KES",
    duration: 6,
    maxGuests: 6,
    languages: ["English", "Swahili"],
    rating: 5.0,
    reviewCount: 42,
    thumbnail: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80&w=2072",
    status: "active",
    instantBook: false,
    featured: true,
    verified: true,
    bookings: 9,
    earnings: 76500,
    occupancyRate: 89
  },
  {
    id: 5,
    title: "Bike Tour",
    location: "Amsterdam, Netherlands",
    category: "Tours",
    price: 30,
    currency: "USD",
    duration: 2.5,
    maxGuests: 8,
    languages: ["English", "Dutch"],
    rating: 4.6,
    reviewCount: 87,
    thumbnail: "https://images.unsplash.com/photo-1566132127697-4424f3151ecc?auto=format&fit=crop&q=80&w=2070",
    status: "inactive",
    instantBook: true,
    featured: false,
    verified: true,
    bookings: 0,
    earnings: 0,
    occupancyRate: 0
  },
  {
    id: 6,
    title: "Local Music Show",
    location: "Livingstone, Zambia",
    category: "Arts & Culture",
    price: 450,
    currency: "ZMW",
    duration: 1.5,
    maxGuests: 20,
    languages: ["English"],
    rating: 4.5,
    reviewCount: 24,
    thumbnail: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=2070",
    status: "active",
    instantBook: true,
    featured: false,
    verified: false,
    bookings: 7,
    earnings: 3150,
    occupancyRate: 40
  }
];

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  "Tours": <Compass className="h-4 w-4" />,
  "Food & Drink": <Utensils className="h-4 w-4" />,
  "Nature": <Bike className="h-4 w-4" />,
  "Arts & Culture": <Paintbrush className="h-4 w-4" />
};

const Experiences = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [showNewExperienceDialog, setShowNewExperienceDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filteredExperiences = experiences.filter(experience => {
    // Filter by tab
    if (activeTab === "active" && experience.status !== "active") return false;
    if (activeTab === "inactive" && experience.status !== "inactive") return false;
    if (activeTab === "featured" && !experience.featured) return false;

    // Filter by search query
    if (searchQuery && !experience.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !experience.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Sort experiences
  const sortedExperiences = [...filteredExperiences].sort((a, b) => {
    switch (sortBy) {
      case "price-high":
        return b.price - a.price;
      case "price-low":
        return a.price - b.price;
      case "rating":
        return b.rating - a.rating;
      case "duration":
        return b.duration - a.duration;
      case "bookings":
        return b.bookings - a.bookings;
      default:
        // newest
        return b.id - a.id;
    }
  });

  const handleManageCalendar = (experienceId: number) => {
    navigate(`/calendar?experience=${experienceId}`);
  };

  return (
    <Dashboard>
      <div className="mb-6 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold">Your Experiences</h2>
          <p className="text-muted-foreground">Manage your tours, classes, and activities</p>
        </div>
        <Button className="bg-[#ffc500] text-black hover:bg-amber-500" onClick={() => setShowNewExperienceDialog(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Experience
        </Button>
      </div>

      <Card className="shadow-lg border-[#ffc500]/20">
        <CardHeader className="pb-3">
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <CardTitle>Experience Listings</CardTitle>
              <CardDescription>You have {experiences.length} experiences listed</CardDescription>
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search experiences..." 
                  className="pl-8 w-full sm:w-[200px]" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-high">Price (High to Low)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="bookings">Most Bookings</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Experiences</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedExperiences.map((experience) => (
                  <Card key={experience.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={experience.thumbnail}
                        alt={experience.title}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                      <Badge 
                        className={`absolute top-3 right-3 ${
                          experience.status === 'active' 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'bg-gray-500 hover:bg-gray-600'
                        }`}
                      >
                        {experience.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                      {experience.featured && (
                        <Badge className="absolute top-3 left-3 bg-[#ffc500] text-black hover:bg-amber-600">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg font-semibold line-clamp-1">{experience.title}</CardTitle>
                          <CardDescription className="flex items-center text-sm mt-1">
                            <MapPin className="h-3 w-3 mr-1" /> {experience.location}
                          </CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleManageCalendar(experience.id)}>
                              <Calendar className="h-4 w-4 mr-2" /> Manage Calendar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="h-4 w-4 mr-2" /> Edit Experience
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <DollarSign className="h-4 w-4 mr-2" /> Update Pricing
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">
                              <Trash className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="flex items-center mr-3">
                            <Star className="h-4 w-4 text-[#ffc500] mr-1" />
                            <span className="text-sm font-medium">{experience.rating}</span>
                            <span className="text-xs text-muted-foreground ml-1">({experience.reviewCount})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {categoryIcons[experience.category] || <Tag className="h-4 w-4" />}
                            <span className="text-xs">{experience.category}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold">
                            {experience.currency === "USD" ? "$" : experience.currency === "ZAR" ? "R " : experience.currency === "ZMW" ? "ZMW " : experience.currency === "KES" ? "KES " : ""}
                            {experience.price}
                          </div>
                          <div className="text-xs text-muted-foreground">per person</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                        <div className="text-center p-1 bg-gray-50 rounded">
                          <div className="font-medium">{experience.duration} hrs</div>
                          <div className="text-xs text-muted-foreground">Duration</div>
                        </div>
                        <div className="text-center p-1 bg-gray-50 rounded">
                          <div className="font-medium">{experience.maxGuests}</div>
                          <div className="text-xs text-muted-foreground">Max Guests</div>
                        </div>
                        <div className="text-center p-1 bg-gray-50 rounded">
                          <div className="font-medium">{experience.languages.length}</div>
                          <div className="text-xs text-muted-foreground">Languages</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {experience.instantBook && (
                          <Badge variant="outline" className="text-xs py-0 h-6">
                            Instant Book
                          </Badge>
                        )}
                        {experience.languages.map((lang, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs py-0 h-6">
                            <Languages className="h-3 w-3 mr-1" /> {lang}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <div className="text-sm">
                        <span className="font-medium">{experience.bookings}</span> bookings
                        <span className="text-xs text-muted-foreground ml-1">({experience.occupancyRate}% occupancy)</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-[#ffc500] text-[#ffc500] hover:bg-[#ffc500]/10"
                        onClick={() => handleManageCalendar(experience.id)}
                      >
                        <Calendar className="h-4 w-4 mr-1" /> Calendar
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {filteredExperiences.length === 0 && (
                <div className="text-center py-10">
                  <Camera className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                  <h3 className="mt-4 text-lg font-medium">No experiences found</h3>
                  <p className="text-muted-foreground mt-1">
                    {searchQuery ? `No results for "${searchQuery}"` : "Try adding a new experience or adjusting your filters"}
                  </p>
                  <Button 
                    className="mt-4 bg-[#ffc500] text-black hover:bg-amber-500"
                    onClick={() => setShowNewExperienceDialog(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add New Experience
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* New Experience Dialog */}
      <Dialog open={showNewExperienceDialog} onOpenChange={setShowNewExperienceDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Create New Experience</DialogTitle>
            <DialogDescription>
              Add your experience details to get started. You can complete the full listing later.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-3">
              <Label htmlFor="experience-title">Experience Title</Label>
              <Input id="experience-title" placeholder="City Tour, Cooking Class, etc." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="experience-category">Category</Label>
                <Select>
                  <SelectTrigger id="experience-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tours">Tours</SelectItem>
                    <SelectItem value="food-drink">Food & Drink</SelectItem>
                    <SelectItem value="nature">Nature</SelectItem>
                    <SelectItem value="arts-culture">Arts & Culture</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="experience-location">Location</Label>
                <Input id="experience-location" placeholder="City, Country" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="experience-duration">Duration (hours)</Label>
                <Input id="experience-duration" type="number" min="0.5" step="0.5" placeholder="1" />
              </div>
              <div>
                <Label htmlFor="experience-guests">Max Guests</Label>
                <Input id="experience-guests" type="number" min="1" placeholder="1" />
              </div>
              <div>
                <Label htmlFor="experience-languages">Languages</Label>
                <Select>
                  <SelectTrigger id="experience-languages">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="swahili">Swahili</SelectItem>
                    <SelectItem value="portuguese">Portuguese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="experience-price">Price (per person)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input id="experience-price" className="pl-8" placeholder="0.00" />
                </div>
              </div>
              <div>
                <Label htmlFor="experience-currency">Currency</Label>
                <Select>
                  <SelectTrigger id="experience-currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="ZMW">ZMW (Zambian Kwacha)</SelectItem>
                    <SelectItem value="KES">KES (Kenyan Shilling)</SelectItem>
                    <SelectItem value="ZAR">ZAR (South African Rand)</SelectItem>
                    <SelectItem value="NGN">NGN (Nigerian Naira)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="experience-description">Brief Description</Label>
              <Textarea id="experience-description" placeholder="Describe your experience in a few sentences..." className="resize-none" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="instant-book" />
              <Label htmlFor="instant-book">Enable Instant Book</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewExperienceDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-[#ffc500] text-black hover:bg-amber-500"
              onClick={() => {
                setShowNewExperienceDialog(false);
                toast.success("New experience created!", {
                  description: "Your experience has been added. Complete the full details to make it visible to guests.",
                });
              }}
            >
              Create Experience
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dashboard>
  );
};

export default Experiences;
