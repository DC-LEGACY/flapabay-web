// Mock data for experiences
const experiences = [
  {
    id: 1,
    title: "Sunset Kayaking Adventure",
    location: "Miami Beach, Florida",
    price: 65,
    rating: 4.9,
    reviewCount: 152,
    image: "https://images.unsplash.com/photo-1580979206775-26a475b4c44d?q=80&w=2071&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1580979206775-26a475b4c44d?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577989078196-df5647eba02c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605106702842-01a887a31122?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531022744002-70c7c104c6f7?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622163642998-1ea3e0eeaf41?q=80&w=2070&auto=format&fit=crop"
    ],
    tags: ["Outdoor", "Water sports", "Nature"],
    category: "Water Adventure",
    type: "experience",
    duration: "2 hours",
    groupSize: 10,
    languages: ["English", "Spanish"],
    ageRestriction: "Ages 12 and up",
    skillLevel: "Beginner friendly",
    instantBook: true,
    host: {
      name: "Michael",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=2074&auto=format&fit=crop",
      profession: "Professional Kayak Instructor",
      responseRate: 99,
      responseTime: "within an hour",
      isSuperhost: true,
      joinedDate: "2019",
      totalReviews: 431,
      languages: ["English", "Spanish"],
      verifications: ["ID", "Email"]
    },
    description: "Experience the magic of Miami's waters at sunset with our guided kayaking tour. Paddle through calm waters as the sun paints the sky with vibrant colors, offering breathtaking photo opportunities and a chance to spot marine wildlife in their natural habitat.\n\nThis tour is designed for all experience levels, with professional guides providing instruction and ensuring your safety throughout the journey. We'll explore hidden coves and mangrove forests while sharing interesting facts about the local ecosystem.",
    whatToExpect: [
      "Meet at our beachfront location for a brief safety orientation and paddling instruction",
      "Launch from our private beach and follow your guide across the bay",
      "Paddle through mangrove tunnels and keep an eye out for dolphins, manatees, and exotic birds",
      "Pause in a secluded cove to watch the spectacular sunset over the water",
      "Return to shore under the early evening sky"
    ],
    included: [
      "Kayaking equipment (kayak, paddle, life jacket)",
      "Professional guide",
      "Safety briefing",
      "Bottled water",
      "Waterproof bag for personal items"
    ],
    notIncluded: [
      "Transportation to meeting point",
      "Gratuities",
      "Photos (available for purchase)",
      "Meals"
    ],
    requirements: [
      "Basic swimming ability required",
      "Minimum age of 12 years",
      "Maximum weight of 250 lbs per person",
      "Not suitable for pregnant women or people with back problems"
    ],
    bringingItems: [
      "Sunscreen and hat",
      "Sunglasses with retention strap",
      "Quick-dry clothing",
      "Water shoes or sandals with back strap",
      "Change of clothes for after the tour"
    ],
    houseRules: [
      "No alcohol consumption before or during the tour",
      "Children under 16 must be accompanied by an adult",
      "Please arrive 15 minutes before tour start time",
      "Tours may be cancelled in case of severe weather",
      "No refunds for late arrivals or no-shows"
    ],
    cancellationPolicy: {
      type: "Flexible",
      description: "Cancel up to 24 hours before the experience for a full refund.",
      fullRefundBefore: "24 hours",
      partialRefundBefore: "12 hours"
    },
    highlights: [
      "Paddle through stunning mangrove forests",
      "Watch the spectacular Miami sunset from the water",
      "Potential wildlife sightings including dolphins and manatees",
      "Beginner-friendly with full instruction provided"
    ],
    meetingPoint: "Miami Beach Watersports Center, 3500 Ocean Drive, Miami Beach, FL. Please arrive 15 minutes before your scheduled time.",
    meetingTime: "30 minutes before sunset (varies by season)",
    transportOptions: [
      "Public parking available at Miami Beach Parking Garage ($5 per hour)",
      "Rideshare drop-off point available at the main entrance",
      "Public transit: Take the Miami Beach Trolley to Ocean Drive stop"
    ],
    coordinates: {
      lat: 25.7912,
      lng: -80.1309
    },
    availableDates: {
      start: "2023-06-01",
      end: "2023-12-31",
      bookedDates: ["2023-06-15", "2023-06-16", "2023-07-04"],
      availableTimeSlots: {
        "2023-06-01": ["5:00 PM", "6:30 PM"],
        "2023-06-02": ["5:00 PM", "6:30 PM"]
      }
    },
    reviews: [
      {
        id: 1,
        user: "Jennifer",
        userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop",
        rating: 5,
        date: "May 2023",
        comment: "Amazing experience! The sunset was breathtaking and our guide Michael was knowledgeable and fun. We even saw dolphins! Highly recommend for anyone visiting Miami."
      },
      {
        id: 2,
        user: "Carlos",
        userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop",
        rating: 5,
        date: "April 2023",
        comment: "Perfect evening activity. The water was calm and the sunset views were incredible. Good instruction for beginners like myself."
      },
      {
        id: 3,
        user: "Emma",
        userImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop",
        rating: 4,
        date: "March 2023",
        comment: "Great adventure! The guide was patient and helpful. Only reason for 4 stars instead of 5 is that it was a bit crowded that day."
      }
    ],
    similarExperiences: [2, 3, 4]
  },
  {
    id: 2,
    title: "Authentic Pasta Making Workshop",
    location: "Little Italy, New York",
    price: 85,
    rating: 4.8,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551218372-a8789b81b253?q=80&w=2070&auto=format&fit=crop"
    ],
    tags: ["Food & Drink", "Cooking Class", "Italian"],
    category: "Culinary",
    type: "experience",
    duration: "3 hours",
    groupSize: 8,
    languages: ["English", "Italian"],
    instantBook: true,
    ageRestriction: "Ages 10 and up",
    skillLevel: "All levels welcome",
    host: {
      name: "Sofia",
      image: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=2787&auto=format&fit=crop",
      profession: "Chef & Culinary Instructor",
      isSuperhost: true,
      joinedDate: "2018",
      totalReviews: 312,
      responseRate: 100,
      responseTime: "within a few hours",
      languages: ["English", "Italian"],
      verifications: ["ID", "Email", "Phone"]
    },
    description: "Join me for an authentic Italian pasta making workshop in the heart of Little Italy! In this hands-on class, you'll learn traditional techniques passed down through generations as we create two types of pasta from scratch along with delicious homemade sauces.\n\nWe'll start with a brief introduction to Italian culinary history while enjoying a glass of wine. Then, roll up your sleeves as we mix, knead, roll, and shape our pasta dough. By the end of the workshop, you'll sit down to enjoy the fruits of your labor - a complete Italian meal that you made yourself!",
    whatToExpect: [
      "Welcome drinks and introduction to Italian pasta traditions",
      "Hands-on instruction in making basic pasta dough from scratch",
      "Learn to shape various pasta types (usually fettuccine and ravioli)",
      "Create traditional sauce pairings for your pasta",
      "Enjoy a family-style dinner with wine featuring your creations"
    ],
    included: [
      "All ingredients and cooking equipment",
      "Written recipes to take home",
      "Complimentary glass of wine or non-alcoholic beverage",
      "Full dinner with your freshly made pasta",
      "Pasta making certificate"
    ],
    notIncluded: [
      "Transportation to and from the venue",
      "Additional alcoholic beverages (available for purchase)",
      "Gratuities",
      "Take-home cooking equipment"
    ],
    requirements: [
      "No experience necessary - beginners welcome!",
      "Participants under 16 must be accompanied by an adult",
      "Please inform us of any food allergies or dietary restrictions in advance"
    ],
    bringingItems: [
      "Apron (optional - we provide if needed)",
      "Hair tie for long hair",
      "Camera for food photos",
      "Appetite!"
    ],
    houseRules: [
      "Please wash hands thoroughly before class",
      "No outside food or drink",
      "Arrive 10 minutes before start time",
      "Please respect other participants and the instructor"
    ],
    cancellationPolicy: {
      type: "Moderate",
      description: "Full refund with 7 days notice, 50% refund with 48 hours notice.",
      fullRefundBefore: "7 days",
      partialRefundBefore: "48 hours"
    },
    highlights: [
      "Learn authentic Italian pasta-making techniques from a professional chef",
      "Create two types of pasta and sauces from scratch",
      "Enjoy the pasta you made in a convivial dinner setting",
      "Take home recipes to recreate your dishes"
    ],
    meetingPoint: "La Cucina Italiana Cooking School, 237 Mulberry Street, New York, NY",
    meetingTime: "Classes start promptly at scheduled time (various times available)",
    transportOptions: [
      "Subway: Take the 6 train to Spring St station, 5 minute walk",
      "Street parking available but limited (metered)",
      "Several parking garages within 2 blocks"
    ],
    coordinates: {
      lat: 40.7230,
      lng: -73.9954
    },
    availableDates: {
      start: "2023-07-01",
      end: "2023-12-31",
      bookedDates: ["2023-07-04", "2023-07-05"],
      availableTimeSlots: {
        "2023-07-01": ["11:00 AM", "5:00 PM"],
        "2023-07-02": ["11:00 AM", "5:00 PM"]
      }
    },
    reviews: [
      {
        id: 1,
        user: "Michael",
        userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop",
        rating: 5,
        date: "June 2023",
        comment: "Sofia was a fantastic teacher! The pasta was incredible and I've already made it twice at home following her recipes. Highly recommend this class!"
      },
      {
        id: 2,
        user: "Priya",
        userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop",
        rating: 5,
        date: "May 2023",
        comment: "Such a wonderful experience! Sofia made everyone feel welcome regardless of cooking ability. The pasta was delicious and I learned so much about Italian cuisine."
      }
    ],
    similarExperiences: [3, 4, 5]
  },
  {
    id: 3,
    title: "Desert Stargazing & Astronomy Tour",
    location: "Sedona, Arizona",
    price: 55,
    rating: 4.9,
    reviewCount: 212,
    image: "https://images.unsplash.com/photo-1534374769903-79cc693b1bdf?q=80&w=2070&auto=format&fit=crop",
    tags: ["Outdoor", "Night", "Science"],
    category: "Nature",
    type: "experience",
    duration: "2.5 hours",
    groupSize: 12,
    host: {
      name: "David",
      image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2776&auto=format&fit=crop",
      isSuperhost: false
    }
  },
  {
    id: 4,
    title: "Urban Street Art & Graffiti Tour",
    location: "Brooklyn, New York",
    price: 40,
    rating: 4.7,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1571406252241-db0960e545f4?q=80&w=2070&auto=format&fit=crop",
    tags: ["Art", "Walking", "Photography"],
    category: "Arts & Culture",
    type: "experience",
    duration: "2 hours",
    groupSize: 15,
    host: {
      name: "Marcus",
      image: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?q=80&w=2769&auto=format&fit=crop",
      isSuperhost: true
    }
  },
  {
    id: 5,
    title: "Aerial Yoga in the Rainforest",
    location: "Ubud, Bali",
    price: 45,
    rating: 4.8,
    reviewCount: 87,
    image: "https://images.unsplash.com/photo-1598033270830-8777c18709a7?q=80&w=1925&auto=format&fit=crop",
    tags: ["Yoga", "Wellness", "Nature"],
    category: "Wellness",
    type: "experience",
    duration: "1.5 hours",
    groupSize: 6,
    host: {
      name: "Ayu",
      image: "https://images.unsplash.com/photo-1579633661635-bd8f88f0a358?q=80&w=2070&auto=format&fit=crop",
      isSuperhost: true
    }
  }
];

// Get an experience by ID
export const getExperienceById = (id: number) => {
  return experiences.find(experience => experience.id === id);
};

// Get similar experiences based on the current experience ID
export const getSimilarExperiences = (id: number) => {
  const experience = getExperienceById(id);
  if (!experience || !experience.similarExperiences) {
    // Return a few random experiences if no similar ones are specified
    return experiences
      .filter(exp => exp.id !== id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }
  
  return experience.similarExperiences
    .map(similarId => getExperienceById(similarId))
    .filter(Boolean); // Remove any undefined results
};

// Get all experiences
export const getAllExperiences = () => {
  return experiences;
};

// Get experiences by category
export const getExperiencesByCategory = (category: string) => {
  return experiences.filter(experience => 
    experience.category && experience.category.toLowerCase() === category.toLowerCase()
  );
};

export default experiences;
