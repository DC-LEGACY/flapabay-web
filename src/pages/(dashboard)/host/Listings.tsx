import { useState, useEffect } from "react";
import { usePage } from "@/contexts/PageContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Calendar, 
  Plus, 
  Search, 
  Home,
  Pencil,
  Trash,
  ArrowUpDown,
  Star,
  Users,
  DollarSign,
  MoreHorizontal,
  Building,
  House,
  Hotel,
  MountainSnow,
  Palmtree,
  Paintbrush,
  Verified,
  FileCheck,
  MapPin
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Sample listing data
const listings = [
  {
    id: 1,
    title: "Cozy Beach House",
    location: "Malibu, CA",
    type: "House",
    price: 120,
    currency: "USD",
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    rating: 4.8,
    reviewCount: 125,
    thumbnail: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=2070",
    status: "active",
    instantBook: true,
    superhost: true,
    verified: true,
    bookings: 18,
    earnings: 2160,
    occupancyRate: 76
  },
  {
    id: 2,
    title: "Mountain Retreat",
    location: "Aspen, CO",
    type: "Cabin",
    price: 200,
    currency: "USD",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    rating: 4.9,
    reviewCount: 87,
    thumbnail: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=2070",
    status: "active",
    instantBook: true,
    superhost: false,
    verified: true,
    bookings: 12,
    earnings: 2400,
    occupancyRate: 65
  },
  {
    id: 3,
    title: "Downtown Apartment",
    location: "New York, NY",
    type: "Apartment",
    price: 150,
    currency: "USD",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    rating: 4.6,
    reviewCount: 56,
    thumbnail: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2070",
    status: "active",
    instantBook: false,
    superhost: false,
    verified: true,
    bookings: 9,
    earnings: 1350,
    occupancyRate: 58
  },
  {
    id: 4,
    title: "Lakefront Villa",
    location: "Lake Tahoe, CA",
    type: "Villa",
    price: 350,
    currency: "USD",
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    rating: 4.9,
    reviewCount: 42,
    thumbnail: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=2032",
    status: "inactive",
    instantBook: false,
    superhost: true,
    verified: true,
    bookings: 5,
    earnings: 1750,
    occupancyRate: 45
  },
  {
    id: 5,
    title: "Coastal Bungalow",
    location: "Mombasa, Kenya",
    type: "Bungalow",
    price: 11000,
    currency: "KES",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.7,
    reviewCount: 31,
    thumbnail: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=2070",
    status: "active",
    instantBook: true,
    superhost: true,
    verified: true,
    bookings: 7,
    earnings: 77000,
    occupancyRate: 62
  },
  {
    id: 6,
    title: "Vineyard Cottage",
    location: "Livingstone, Zambia",
    type: "House",
    price: 1800,
    currency: "ZMW",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    rating: 4.8,
    reviewCount: 26,
    thumbnail: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=2070",
    status: "active",
    instantBook: true,
    superhost: false,
    verified: false,
    bookings: 4,
    earnings: 7200,
    occupancyRate: 38
  }
];

// Property type icons mapping
const propertyTypeIcons: Record<string, React.ReactNode> = {
  "House": <House className="h-4 w-4" />,
  "Apartment": <Building className="h-4 w-4" />,
  "Villa": <Hotel className="h-4 w-4" />,
  "Cabin": <MountainSnow className="h-4 w-4" />,
  "Bungalow": <Palmtree className="h-4 w-4" />
};

const Listings = () => {
  const { setPageTitle, setPageSubtitle } = usePage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [showNewListingDialog, setShowNewListingDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    setPageTitle("Your Listings");
    setPageSubtitle("Manage your accommodations and properties");
  }, [setPageTitle, setPageSubtitle]);

  const filteredListings = listings.filter(listing => {
    // Filter by tab
    if (activeTab === "active" && listing.status !== "active") return false;
    if (activeTab === "inactive" && listing.status !== "inactive") return false;
    if (activeTab === "superhost" && !listing.superhost) return false;

    // Filter by search query
    if (searchQuery && !listing.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !listing.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case "price-high":
        return b.price - a.price;
      case "price-low":
        return a.price - b.price;
      case "rating":
        return b.rating - a.rating;
      case "occupancy":
        return b.occupancyRate - a.occupancyRate;
      case "bookings":
        return b.bookings - a.bookings;
      default:
        // newest
        return b.id - a.id;
    }
  });

  const handleManageCalendar = (listingId: number) => {
    navigate(`/calendar?listing=${listingId}`);
  };

  return (
    <>
      <Card className="shadow-lg border-[#ffc500]/20">
        <CardHeader className="pb-3">
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <CardTitle>Property Listings</CardTitle>
              <CardDescription>You have {listings.length} properties listed</CardDescription>
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search listings..." 
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
                  <SelectItem value="bookings">Most Bookings</SelectItem>
                  <SelectItem value="occupancy">Highest Occupancy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Listings</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="superhost">Superhost</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedListings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={listing.thumbnail}
                        alt={listing.title}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                      <Badge 
                        className={`absolute top-3 right-3 ${
                          listing.status === 'active' 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'bg-gray-500 hover:bg-gray-600'
                        }`}
                      >
                        {listing.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                      {listing.superhost && (
                        <Badge className="absolute top-3 left-3 bg-[#ffc500] text-black hover:bg-amber-600">
                          Superhost
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg font-semibold line-clamp-1">{listing.title}</CardTitle>
                          <CardDescription className="flex items-center text-sm mt-1">
                            <MapPin className="h-3 w-3 mr-1" /> {listing.location}
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
                            <DropdownMenuItem onClick={() => handleManageCalendar(listing.id)}>
                              <Calendar className="h-4 w-4 mr-2" /> Manage Calendar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="h-4 w-4 mr-2" /> Edit Listing
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
                            <span className="text-sm font-medium">{listing.rating}</span>
                            <span className="text-xs text-muted-foreground ml-1">({listing.reviewCount})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {propertyTypeIcons[listing.type] || <Home className="h-4 w-4" />}
                            <span className="text-xs">{listing.type}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold">
                            {listing.currency === "USD" ? "$" : listing.currency === "ZMW" ? "ZMW " : listing.currency === "KES" ? "KES " : ""}
                            {listing.price}
                          </div>
                          <div className="text-xs text-muted-foreground">per night</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                        <div className="text-center p-1 bg-gray-50 rounded">
                          <div className="font-medium">{listing.bedrooms}</div>
                          <div className="text-xs text-muted-foreground">Beds</div>
                        </div>
                        <div className="text-center p-1 bg-gray-50 rounded">
                          <div className="font-medium">{listing.bathrooms}</div>
                          <div className="text-xs text-muted-foreground">Baths</div>
                        </div>
                        <div className="text-center p-1 bg-gray-50 rounded">
                          <div className="font-medium">{listing.maxGuests}</div>
                          <div className="text-xs text-muted-foreground">Guests</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {listing.instantBook && (
                          <Badge variant="outline" className="text-xs py-0 h-6">
                            Instant Book
                          </Badge>
                        )}
                        {listing.verified && (
                          <Badge variant="outline" className="text-xs py-0 h-6">
                            <Verified className="h-3 w-3 mr-1" /> Verified
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <div className="text-sm">
                        <span className="font-medium">{listing.bookings}</span> bookings
                        <span className="text-xs text-muted-foreground ml-1">({listing.occupancyRate}% occupancy)</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-[#ffc500] text-[#ffc500] hover:bg-[#ffc500]/10"
                        onClick={() => handleManageCalendar(listing.id)}
                      >
                        <Calendar className="h-4 w-4 mr-1" /> Calendar
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {filteredListings.length === 0 && (
                <div className="text-center py-10">
                  <Home className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                  <h3 className="mt-4 text-lg font-medium">No listings found</h3>
                  <p className="text-muted-foreground mt-1">
                    {searchQuery ? `No results for "${searchQuery}"` : "Try adding a new listing or adjusting your filters"}
                  </p>
                  <Button 
                    className="mt-4 bg-[#ffc500] text-black hover:bg-amber-500"
                    onClick={() => setShowNewListingDialog(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add New Listing
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* New Listing Dialog */}
      <Dialog open={showNewListingDialog} onOpenChange={setShowNewListingDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Create New Listing</DialogTitle>
            <DialogDescription>
              Add your property details to get started. You can complete the full listing later.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-3">
              <Label htmlFor="listing-title">Listing Title</Label>
              <Input id="listing-title" placeholder="Cozy Beach House, Luxury Apartment, etc." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="listing-type">Property Type</Label>
                <Select>
                  <SelectTrigger id="listing-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="cabin">Cabin</SelectItem>
                    <SelectItem value="bungalow">Bungalow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="listing-location">Location</Label>
                <Input id="listing-location" placeholder="City, Country" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="listing-bedrooms">Bedrooms</Label>
                <Input id="listing-bedrooms" type="number" min="0" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="listing-bathrooms">Bathrooms</Label>
                <Input id="listing-bathrooms" type="number" min="0" step="0.5" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="listing-guests">Max Guests</Label>
                <Input id="listing-guests" type="number" min="1" placeholder="1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="listing-price">Base Price (per night)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input id="listing-price" className="pl-8" placeholder="0.00" />
                </div>
              </div>
              <div>
                <Label htmlFor="listing-currency">Currency</Label>
                <Select>
                  <SelectTrigger id="listing-currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="ZMW">ZMW (Zambian Kwacha)</SelectItem>
                    <SelectItem value="KES">KES (Kenyan Shilling)</SelectItem>
                    <SelectItem value="TZS">TZS (Tanzanian Shilling)</SelectItem>
                    <SelectItem value="NGN">NGN (Nigerian Naira)</SelectItem>
                    <SelectItem value="GHS">GHS (Ghanaian Cedi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="instant-book" />
              <Label htmlFor="instant-book">Enable Instant Book</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewListingDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-[#ffc500] text-black hover:bg-amber-500"
              onClick={() => {
                setShowNewListingDialog(false);
                toast.success("New listing created!", {
                  description: "Your property has been added. Complete the full details to make it visible to guests.",
                });
              }}
            >
              Create Listing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Listings;
