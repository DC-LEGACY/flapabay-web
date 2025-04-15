
import { PropertyProps } from "@/components/PropertyCard";

export const properties: PropertyProps[] = [
  {
    id: 1,
    title: "Luxury Beach House with Ocean View",
    location: "Miami, Florida",
    price: 250,
    rating: 4.9,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=2070&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2076&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop"
    ],
    tags: ["Beach Front", "Pool", "Ocean View", "Air Conditioning", "WiFi"],
    isSuperhost: true,
    description: "This stunning beachfront property offers panoramic ocean views and direct beach access. Featuring 4 bedrooms, a private pool, and a spacious deck perfect for entertaining. Enjoy breathtaking sunsets from your private terrace or take a short stroll to nearby restaurants and shops.",
    amenities: ["Full Kitchen", "Private Pool", "Beachfront", "4 Bedrooms", "3 Bathrooms", "WiFi", "Air Conditioning", "Washer/Dryer", "Free Parking", "BBQ Grill", "Smart TV", "Outdoor Shower"],
    houseRules: ["No smoking", "No parties or events", "Check-in after 3PM", "Checkout before 11AM", "Not suitable for pets", "Maximum 8 guests"],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in. After that, cancel before check-in and get a 50% refund, minus the service fee.",
    host: {
      name: "Michael",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2487&auto=format&fit=crop",
      responseRate: 98,
      responseTime: "within an hour",
      isSuperhost: true,
      joinedDate: "January 2018",
      totalReviews: 423,
      languages: ["English", "Spanish"],
      verifications: ["Identity", "Email", "Phone"]
    },
    propertyType: "Entire home",
    maxGuests: 8,
    bedrooms: 4,
    beds: 5,
    baths: 3,
    coordinates: {
      lat: 25.7617,
      lng: -80.1918
    },
    highlights: ["Beachfront location", "Private pool", "Stunning ocean views", "Modern luxury design"],
    reviews: [
      {
        id: 1,
        user: "Sarah",
        userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2187&auto=format&fit=crop",
        rating: 5,
        date: "March 2023",
        comment: "Absolutely stunning property with amazing views. The host was very responsive and accommodating. Would definitely stay here again!"
      },
      {
        id: 2,
        user: "David",
        userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2374&auto=format&fit=crop",
        rating: 5,
        date: "February 2023",
        comment: "Perfect location right on the beach. The house is beautifully decorated and has everything you need for a comfortable stay."
      },
      {
        id: 3,
        user: "Emma",
        userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
        rating: 4,
        date: "January 2023",
        comment: "Great property with amazing views. The only issue we had was with the air conditioning in one bedroom, but Michael was quick to address it."
      },
      {
        id: 4,
        user: "James",
        userImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2187&auto=format&fit=crop",
        rating: 5,
        date: "December 2022",
        comment: "This place is a gem! The location is perfect, and the house has everything you need for a luxurious beach vacation."
      },
      {
        id: 5,
        user: "Olivia",
        userImage: "https://images.unsplash.com/photo-1669170023257-4da4bc7adfbe?q=80&w=2187&auto=format&fit=crop",
        rating: 5,
        date: "November 2022",
        comment: "Stunning property and excellent host. Michael was very responsive and made sure our stay was perfect. Will definitely be back!"
      },
      {
        id: 6,
        user: "Daniel",
        userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2487&auto=format&fit=crop",
        rating: 5,
        date: "October 2022",
        comment: "Amazing location and beautiful house. We loved the private pool and direct beach access. Can't wait to return!"
      }
    ],
    similarProperties: [2, 8, 10, 34],
    availableDates: {
      start: "2023-07-01",
      end: "2024-08-31",
      bookedDates: ["2023-07-15", "2023-07-16", "2023-07-17", "2023-08-01", "2023-08-02", "2023-08-03", "2023-08-04", "2023-08-05"]
    }
  },
  {
    id: 2,
    title: "Modern Downtown Apartment",
    location: "New York, New York",
    price: 180,
    rating: 4.7,
    reviewCount: 85,
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542637591-d945418bdec6?q=80&w=2070&auto=format&fit=crop"
    ],
    tags: ["City View", "Modern", "Central"],
    description: "Stylish apartment in the heart of Manhattan with stunning city views. This modern space features high-end finishes, floor-to-ceiling windows, and a fully equipped kitchen. Located within walking distance to major attractions, restaurants, and public transportation.",
    amenities: ["Full Kitchen", "WiFi", "Smart TV", "Washer/Dryer", "Air Conditioning", "Gym Access", "Doorman", "Elevator"],
    host: {
      name: "Jennifer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2187&auto=format&fit=crop",
      responseRate: 95,
      responseTime: "within a few hours",
      isSuperhost: false
    },
    propertyType: "Apartment",
    maxGuests: 3,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    similarProperties: [9, 17, 36, 37]
  },
  {
    id: 3,
    title: "Cozy Mountain Cabin",
    location: "Aspen, Colorado",
    price: 210,
    rating: 4.8,
    reviewCount: 102,
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=2020&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527484500731-790a9f2c8012?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=2150&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1593766788379-68a0bb5be58b?q=80&w=2070&auto=format&fit=crop"
    ],
    tags: ["Mountain View", "Fireplace", "Hot Tub", "WiFi", "Ski-in/Ski-out"],
    isSuperhost: true,
    description: "Escape to this charming log cabin nestled in the heart of the Rockies. Perfect for ski trips or summer mountain adventures, this cozy retreat features stunning mountain views, a wood-burning fireplace, and a private hot tub on the deck. Just minutes from world-class ski slopes and hiking trails.",
    amenities: ["Fireplace", "Hot Tub", "Full Kitchen", "WiFi", "Ski-in/Ski-out Access", "2 Bedrooms", "2 Bathrooms", "Washer/Dryer", "Free Parking", "BBQ Grill", "Smart TV", "Mountain Views"],
    houseRules: ["No smoking", "No parties or events", "Check-in after 4PM", "Checkout before 10AM", "Pets allowed with prior approval", "Maximum 6 guests"],
    cancellationPolicy: "Free cancellation up to 7 days before check-in. After that, cancel before check-in and get a 50% refund, minus the service fee.",
    host: {
      name: "Robert",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2374&auto=format&fit=crop",
      responseRate: 99,
      responseTime: "within a few hours",
      isSuperhost: true,
      joinedDate: "October 2016",
      totalReviews: 367,
      languages: ["English", "German"],
      verifications: ["Identity", "Email", "Phone"]
    },
    propertyType: "Cabin",
    maxGuests: 6,
    bedrooms: 2,
    beds: 3,
    baths: 2,
    coordinates: {
      lat: 39.1911,
      lng: -106.8175
    },
    highlights: ["Stunning mountain views", "Private hot tub", "Wood-burning fireplace", "Ski-in/Ski-out access"],
    reviews: [
      {
        id: 1,
        user: "Jessica",
        userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2187&auto=format&fit=crop",
        rating: 5,
        date: "February 2023",
        comment: "This cabin is absolutely perfect! The views are incredible, and we loved relaxing in the hot tub after a day of skiing. Robert was an excellent host and made sure we had everything we needed."
      },
      {
        id: 2,
        user: "Thomas",
        userImage: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=2028&auto=format&fit=crop",
        rating: 5,
        date: "January 2023",
        comment: "We had an amazing ski trip staying at this cabin. The location is perfect - true ski-in/ski-out access. The cabin itself is cozy and has everything you need. We'll definitely be back!"
      },
      {
        id: 3,
        user: "Michelle",
        userImage: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?q=80&w=2070&auto=format&fit=crop",
        rating: 4,
        date: "December 2022",
        comment: "Beautiful cabin with amazing views. The fireplace and hot tub were highlights of our stay. The only reason for 4 stars is that we had some trouble with the WiFi, but Robert was responsive in helping us fix it."
      }
    ],
    similarProperties: [7, 12, 32, 33],
    availableDates: {
      start: "2023-06-01",
      end: "2024-05-31",
      bookedDates: ["2023-06-15", "2023-06-16", "2023-06-17", "2023-12-22", "2023-12-23", "2023-12-24", "2023-12-25", "2023-12-26", "2024-01-01", "2024-01-02"]
    }
  },
  // Add a few more detailed properties
  {
    id: 4,
    title: "Charming Lakeside Cottage",
    location: "Lake Tahoe, California",
    price: 190,
    rating: 4.6,
    reviewCount: 75,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?q=80&w=2274&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464823063530-08f10ed1a2dd?q=80&w=2070&auto=format&fit=crop"
    ],
    tags: ["Lake View", "Hot Tub", "Private Dock"],
    description: "Enjoy the serenity of Lake Tahoe in this charming waterfront cottage. With direct lake access and a private dock, this property is perfect for water enthusiasts. The cozy interior features rustic decor, a well-equipped kitchen, and panoramic views of the lake and mountains.",
    amenities: ["Waterfront", "Private Dock", "Hot Tub", "Fireplace", "Full Kitchen", "WiFi", "Deck/Patio", "BBQ Grill"],
    propertyType: "Cottage",
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 1,
    host: {
      name: "Laura",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
      responseRate: 97,
      isSuperhost: true
    },
    similarProperties: [7, 15, 18, 27]
  },
  {
    id: 5,
    title: "Tropical Island Bungalow",
    location: "Maui, Hawaii",
    price: 280,
    rating: 4.8,
    reviewCount: 95,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559599189-fe84dea4eb79?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2074&auto=format&fit=crop"
    ],
    tags: ["Beach", "Ocean View", "Tropical"],
    isSuperhost: true,
    description: "Experience paradise in this tropical bungalow just steps from the beach. Surrounded by lush gardens and swaying palm trees, this authentic Hawaiian retreat offers indoor-outdoor living at its finest. Fall asleep to the sound of gentle waves and wake up to stunning ocean views.",
    amenities: ["Beachfront", "Outdoor Shower", "Garden", "Beach Essentials", "WiFi", "Kitchenette"],
    propertyType: "Bungalow",
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    host: {
      name: "Kai",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2187&auto=format&fit=crop",
      responseRate: 100,
      isSuperhost: true
    },
    similarProperties: [10, 13, 28, 29]
  }
  // For brevity, I've only added a few detailed properties; in a real app, you'd want all properties to have complete details
];

export const getPropertyById = (id: number) => {
  return properties.find(property => property.id === id);
};

export const getSimilarProperties = (propertyId: number) => {
  const property = getPropertyById(propertyId);
  if (!property || !property.similarProperties) return [];
  
  return property.similarProperties.map(id => getPropertyById(id)).filter(Boolean) as PropertyProps[];
};

// Add these utility functions to help with property listings
export const getAllProperties = () => properties;

export const getPropertiesByCategory = (category: string) => {
  switch(category.toLowerCase()) {
    case 'beach front':
      return properties.filter(p => p.tags?.includes('Beach Front') || p.tags?.includes('Beachfront'));
    case 'mountain view':
      return properties.filter(p => p.tags?.includes('Mountain View'));
    case 'with pool':
      return properties.filter(p => p.tags?.includes('Pool'));
    case 'apartments':
      return properties.filter(p => p.propertyType === 'Apartment');
    case 'cabins':
      return properties.filter(p => p.propertyType === 'Cabin');
    case 'bungalows':
      return properties.filter(p => p.propertyType === 'Bungalow');
    default:
      return properties;
  }
};

// Helper functions for filtering and sorting
export const getTopRatedProperties = (limit = 4) => {
  return [...properties]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getMostReviewedProperties = (limit = 4) => {
  return [...properties]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
};

export const getSuperhostProperties = () => {
  return properties.filter(p => p.isSuperhost);
};
