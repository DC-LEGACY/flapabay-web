
import React, { useState } from 'react';
import { Star, Search, Filter, Pencil, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { format, subDays } from 'date-fns';
import { toast } from '@/hooks/use-toast';

interface Review {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyLocation: string;
  propertyImage: string;
  hostName: string;
  hostImage?: string;
  rating: number;
  comment: string;
  date: Date;
  hostResponse?: string;
  hostResponseDate?: Date;
  stayDate: Date;
  status: 'published' | 'pending' | 'draft';
}

interface Property {
  id: string;
  name: string;
  location: string;
  image: string;
  host: string;
  hostImage?: string;
  stayDate: Date;
  hasReview: boolean;
}

const GuestReviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [reviewRating, setReviewRating] = useState('5');
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  
  // Sample review data
  const reviews: Review[] = [
    {
      id: 'rev1',
      propertyId: 'prop1',
      propertyName: 'Beachfront Villa',
      propertyLocation: 'Miami, FL',
      propertyImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80',
      hostName: 'Michael Richards',
      hostImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      comment: "Absolutely stunning property with incredible beach views! The villa was immaculate, modern, and had every amenity we could ask for. Michael was an attentive host who provided excellent recommendations for local restaurants and activities. The private beach access was the highlight of our stay. Would definitely book again!",
      date: subDays(new Date(), 45),
      hostResponse: "Thank you for the wonderful review! It was a pleasure hosting you and I'm thrilled you enjoyed the beach access. Looking forward to welcoming you back soon!",
      hostResponseDate: subDays(new Date(), 43),
      stayDate: subDays(new Date(), 50),
      status: 'published'
    },
    {
      id: 'rev2',
      propertyId: 'prop2',
      propertyName: 'Mountain Cabin',
      propertyLocation: 'Aspen, CO',
      propertyImage: 'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=300&q=80',
      hostName: 'Sarah Johnson',
      hostImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 4,
      comment: "We had a great time at this cozy cabin! The views were breathtaking and we loved hiking the nearby trails. The cabin was well-equipped with everything we needed. The only reason for 4 stars instead of 5 is the spotty WiFi, but that's understandable given the remote location. Sarah was responsive and helpful throughout our stay.",
      date: subDays(new Date(), 30),
      stayDate: subDays(new Date(), 35),
      status: 'published'
    },
    {
      id: 'rev3',
      propertyId: 'prop3',
      propertyName: 'City Apartment',
      propertyLocation: 'New York, NY',
      propertyImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=300&q=80',
      hostName: 'David Wilson',
      hostImage: 'https://randomuser.me/api/portraits/men/62.jpg',
      rating: 5,
      comment: "Perfect location in the heart of Manhattan! The apartment was clean, modern, and had everything we needed for our week-long stay. We could walk to so many attractions, restaurants, and shops. David was an excellent host who provided detailed check-in instructions and great local tips. Would definitely recommend to anyone visiting NYC!",
      date: subDays(new Date(), 15),
      hostResponse: "Thanks for the kind words! I'm so glad you enjoyed your stay and were able to take advantage of the central location. Hope to host you again on your next visit to the city!",
      hostResponseDate: subDays(new Date(), 14),
      stayDate: subDays(new Date(), 20),
      status: 'published'
    },
    {
      id: 'rev4',
      propertyId: 'prop4',
      propertyName: 'Lakeside Cottage',
      propertyLocation: 'Lake Tahoe, CA',
      propertyImage: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=300&q=80',
      hostName: 'Jennifer Smith',
      hostImage: 'https://randomuser.me/api/portraits/women/22.jpg',
      rating: 3,
      comment: "This property has a beautiful location right on the lake. The views were amazing and we enjoyed using the kayaks provided. However, the cottage itself needed some updates and maintenance. The bathroom fixtures were old, and we had issues with hot water. Jennifer was apologetic and tried to help, but it did impact our stay somewhat.",
      date: subDays(new Date(), 60),
      hostResponse: "Thank you for your feedback. I apologize for the issues you experienced with the hot water. We've since replaced the water heater and updated the bathroom fixtures. I'd love to welcome you back to experience these improvements!",
      hostResponseDate: subDays(new Date(), 59),
      stayDate: subDays(new Date(), 65),
      status: 'published'
    },
    {
      id: 'rev5',
      propertyId: 'prop5',
      propertyName: 'Desert Oasis',
      propertyLocation: 'Scottsdale, AZ',
      propertyImage: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=300&q=80',
      hostName: 'Robert Thompson',
      hostImage: 'https://randomuser.me/api/portraits/men/86.jpg',
      rating: 4,
      comment: "",
      date: new Date(),
      stayDate: subDays(new Date(), 10),
      status: 'draft'
    }
  ];
  
  // Sample properties without reviews yet
  const pendingReviewProperties: Property[] = [
    {
      id: 'prop6',
      name: 'Vineyard Villa',
      location: 'Napa Valley, CA',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=300&q=80',
      host: 'Elizabeth Parker',
      hostImage: 'https://randomuser.me/api/portraits/women/56.jpg',
      stayDate: subDays(new Date(), 5),
      hasReview: false
    },
    {
      id: 'prop7',
      name: 'Historic Downtown Loft',
      location: 'Charleston, SC',
      image: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=300&q=80',
      host: 'Thomas Miller',
      hostImage: 'https://randomuser.me/api/portraits/men/42.jpg',
      stayDate: subDays(new Date(), 15),
      hasReview: false
    }
  ];
  
  const filteredReviews = reviews
    .filter(review => {
      if (filter === 'all') return review.status === 'published';
      if (filter === 'draft') return review.status === 'draft';
      if (filter === 'pending') return review.status === 'pending';
      return true;
    })
    .filter(review => 
      review.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.hostName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  const handleSubmitReview = async () => {
    if (!selectedProperty) return;
    
    try {
      setIsSubmittingReview(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Review submitted",
        description: "Your review has been published successfully",
      });
      
      setShowReviewDialog(false);
      setReviewComment('');
      setReviewRating('5');
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
  
  const handleSaveDraft = async () => {
    if (!selectedProperty) return;
    
    try {
      setIsSubmittingReview(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Draft saved",
        description: "Your review draft has been saved",
      });
      
      setShowReviewDialog(false);
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: "Failed to save draft",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingReview(false);
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Reviews</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold">{reviews.filter(r => r.status === 'published').length}</div>
              <div className="text-sm text-gray-500 mt-2">Published Reviews</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-yellow-500">{reviews.filter(r => r.status === 'draft').length}</div>
              <div className="text-sm text-gray-500 mt-2">Draft Reviews</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-blue-500">{pendingReviewProperties.length}</div>
              <div className="text-sm text-gray-500 mt-2">Awaiting Your Review</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search reviews..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter reviews" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Published Reviews</SelectItem>
            <SelectItem value="draft">Draft Reviews</SelectItem>
            <SelectItem value="pending">Pending Reviews</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="reviews" className="mb-6">
        <TabsList>
          <TabsTrigger value="reviews">Your Reviews</TabsTrigger>
          <TabsTrigger value="pending">Awaiting Your Review</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <div className="text-center py-12">
                <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No reviews found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingReviewProperties.length > 0 ? (
              pendingReviewProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 relative">
                    <img 
                      src={property.image} 
                      alt={property.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg">{property.name}</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {property.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        Stay Date: {format(property.stayDate, 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        Host: {property.host}
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button 
                        className="w-full" 
                        onClick={() => {
                          setSelectedProperty(property);
                          setShowReviewDialog(true);
                        }}
                      >
                        <Pencil className="mr-2 h-4 w-4" /> Write a Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No pending reviews</h3>
                <p className="text-gray-500 mt-2">You've reviewed all your past stays!</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedProperty ? `Review Your Stay at ${selectedProperty.name}` : 'Write a Review'}
            </DialogTitle>
            <DialogDescription>
              Share your experience to help future guests and hosts.
            </DialogDescription>
          </DialogHeader>
          
          {selectedProperty && (
            <div className="py-4 space-y-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={selectedProperty.image} 
                  alt={selectedProperty.name} 
                  className="w-20 h-20 rounded-md object-cover" 
                />
                <div>
                  <h3 className="font-medium">{selectedProperty.name}</h3>
                  <p className="text-sm text-gray-500">{selectedProperty.location}</p>
                  <p className="text-sm text-gray-500">
                    Stay Date: {format(selectedProperty.stayDate, 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              
              <div>
                <Label className="text-base mb-2 block">Rate your stay</Label>
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
                  rows={6}
                />
              </div>
            </div>
          )}
          
          <DialogFooter className="flex space-x-2 justify-between sm:justify-end">
            <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
              Cancel
            </Button>
            <div className="space-x-2">
              <Button 
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isSubmittingReview}
              >
                Save as Draft
              </Button>
              <Button 
                onClick={handleSubmitReview}
                disabled={isSubmittingReview || !reviewComment.trim()}
              >
                {isSubmittingReview ? "Submitting..." : "Publish Review"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRating, setEditedRating] = useState(String(review.rating));
  const [editedComment, setEditedComment] = useState(review.comment);
  
  const handleUpdateReview = () => {
    setIsEditing(false);
    // In a real app, we would save the updated review to the database
    
    toast({
      title: "Review updated",
      description: "Your review has been updated successfully",
    });
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        {!isEditing ? (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${review.rating >= star ? 'text-[#ffc500] fill-[#ffc500]' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500">{format(review.date, 'MMM d, yyyy')}</div>
              </div>
              
              <div className="flex items-center mb-4">
                <img 
                  src={review.propertyImage} 
                  alt={review.propertyName} 
                  className="w-16 h-16 rounded-md object-cover mr-3"
                />
                <div>
                  <div className="font-medium text-sm">{review.propertyName}</div>
                  <div className="text-xs text-gray-500">{review.propertyLocation}</div>
                  <div className="text-xs text-gray-500">
                    Stay Date: {format(review.stayDate, 'MMM d, yyyy')}
                  </div>
                </div>
              </div>
              
              {review.status === 'published' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditing(true)}
                  className="w-full mt-4"
                >
                  <Pencil className="h-4 w-4 mr-2" /> Edit Review
                </Button>
              )}
              
              {review.status === 'draft' && (
                <div className="space-y-2 mt-4">
                  <Button 
                    size="sm" 
                    className="w-full"
                  >
                    <Pencil className="h-4 w-4 mr-2" /> Complete & Publish
                  </Button>
                  <Badge className="w-full flex justify-center py-1">Draft</Badge>
                </div>
              )}
            </div>
            
            <div className="md:w-3/4">
              <div className="mb-6">
                <div className="text-lg font-semibold mb-2">Your Review</div>
                <p className="text-gray-700">
                  {review.comment || (
                    <span className="text-gray-400 italic">
                      {review.status === 'draft' ? "Draft review - no content yet" : "No review content"}
                    </span>
                  )}
                </p>
              </div>
              
              {review.hostResponse && (
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                      <img 
                        src={review.hostImage || 'https://www.gravatar.com/avatar/?d=mp'} 
                        alt={review.hostName} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{review.hostName}</div>
                      <div className="text-xs text-gray-500">
                        {review.hostResponseDate ? format(review.hostResponseDate, 'MMM d, yyyy') : ''}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.hostResponse}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img 
                src={review.propertyImage} 
                alt={review.propertyName} 
                className="w-20 h-20 rounded-md object-cover" 
              />
              <div>
                <h3 className="font-medium">{review.propertyName}</h3>
                <p className="text-sm text-gray-500">{review.propertyLocation}</p>
                <p className="text-sm text-gray-500">
                  Stay Date: {format(review.stayDate, 'MMM d, yyyy')}
                </p>
              </div>
            </div>
            
            <div>
              <Label className="text-base mb-2 block">Rating</Label>
              <RadioGroup value={editedRating} onValueChange={setEditedRating} className="flex gap-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div key={rating} className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value={String(rating)} id={`edit-rating-${rating}`} className="sr-only" />
                    <Label
                      htmlFor={`edit-rating-${rating}`}
                      className={`cursor-pointer p-2 rounded-full ${
                        editedRating === String(rating) ? 'bg-[#ffc500]/20' : ''
                      }`}
                    >
                      <Star
                        className={`h-8 w-8 ${
                          parseInt(editedRating) >= rating
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
              <Label className="text-base">Your Review</Label>
              <Textarea
                className="mt-2"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                rows={6}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateReview} disabled={!editedComment.trim()}>
                Update Review
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const User = ({ className, ...props }: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-user ${className}`}
    {...props}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default GuestReviews;
