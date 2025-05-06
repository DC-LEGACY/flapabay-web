
import React, { useState, useEffect } from 'react';
import PropertyCard, { PropertyProps } from './PropertyCard';
import { motion } from 'framer-motion';

interface CategoryPropertiesProps {
  selectedCategory: string;
}

// Sample property data per category
const propertiesByCategory: Record<string, PropertyProps[]> = {
  "Apartments": [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      location: "New York, New York",
      price: 180,
      rating: 4.7,
      reviewCount: 85,
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2070&auto=format&fit=crop"
      ],
      tags: ["City View", "2 Bedrooms"],
    },
    {
      id: 9,
      title: "Luxury Studio Apartment",
      location: "Chicago, Illinois",
      price: 195,
      rating: 4.8,
      reviewCount: 67,
      image: "https://images.unsplash.com/photo-1556784344-ad913a7d33d3?q=80&w=2069&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1556784344-ad913a7d33d3?q=80&w=2069&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1533044309907-0fa3413da946?q=80&w=2069&auto=format&fit=crop"
      ],
      tags: ["Studio", "City View"],
    },
    {
      id: 20,
      title: "Spacious 3BR Apartment with Balcony",
      location: "Seattle, Washington",
      price: 210,
      rating: 4.9,
      reviewCount: 124,
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1617098900591-3f90928e8c54?q=80&w=2071&auto=format&fit=crop"
      ],
      tags: ["3 Bedrooms", "Balcony", "Mountain View"],
      isSuperhost: true
    },
    {
      id: 21,
      title: "Cozy Urban Loft in Arts District",
      location: "Portland, Oregon",
      price: 165,
      rating: 4.6,
      reviewCount: 91,
      image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1489171078254-c3365d6e359f?q=80&w=2069&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?q=80&w=2071&auto=format&fit=crop"
      ],
      tags: ["Loft", "Arts District", "1 Bedroom"],
    }
  ],
  "Experiences": [
    {
      id: 2,
      title: "Mountain Hiking Adventure",
      location: "Denver, Colorado",
      price: 120,
      rating: 4.9,
      reviewCount: 42,
      image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?q=80&w=2274&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1464278533981-50106e6176b1?q=80&w=2274&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?q=80&w=2070&auto=format&fit=crop"
      ],
      tags: ["Mountain", "Adventure", "Outdoors"],
      isSuperhost: true,
      type: "experience",
      date: "Available tomorrow",
      duration: "6 hours",
      host: {
        name: "Michael R.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2374&auto=format&fit=crop"
      }
    },
    {
      id: 10,
      title: "Local Food Tasting Tour",
      location: "New Orleans, Louisiana",
      price: 85,
      rating: 4.8,
      reviewCount: 93,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2070&auto=format&fit=crop"
      ],
      tags: ["Food", "Tour", "Local Cuisine"],
      type: "experience",
      date: "Available today",
      duration: "3 hours",
      host: {
        name: "Sophie L.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
      }
    },
    {
      id: 22,
      title: "Sunset Kayaking Experience",
      location: "San Diego, California",
      price: 95,
      rating: 4.9,
      reviewCount: 128,
      image: "https://images.unsplash.com/photo-1640448709256-62c9e6924f6b?q=80&w=2108&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1640448709256-62c9e6924f6b?q=80&w=2108&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511608170415-b97c70de8770?q=80&w=2069&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop"
      ],
      tags: ["Water", "Kayaking", "Sunset"],
      type: "experience",
      date: "Available Mon, Wed, Fri",
      duration: "2 hours",
      host: {
        name: "Carlos M.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2487&auto=format&fit=crop"
      },
      isSuperhost: true
    },
    {
      id: 23,
      title: "Craft Cocktail Masterclass",
      location: "Austin, Texas",
      price: 75,
      rating: 4.7,
      reviewCount: 86,
      image: "https://images.unsplash.com/photo-1563223771-375783ee91ad?q=80&w=2127&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1563223771-375783ee91ad?q=80&w=2127&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2125&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1585621386002-d89e6d214b4e?q=80&w=2069&auto=format&fit=crop"
      ],
      tags: ["Mixology", "Cocktails", "Indoor"],
      type: "experience",
      date: "Available weekends",
      duration: "3 hours",
      host: {
        name: "Jamie B.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2187&auto=format&fit=crop"
      }
    }
  ],
  "Events": [
    {
      id: 3,
      title: "Beach Music Festival",
      location: "Miami, Florida",
      price: 150,
      rating: 4.6,
      reviewCount: 78,
      image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop"
      ],
      tags: ["Festival", "Beach", "Music"],
      type: "event",
      date: "Jun 15-17"
    },
    {
      id: 11,
      title: "Art Exhibition Showcase",
      location: "Los Angeles, California",
      price: 75,
      rating: 4.5,
      reviewCount: 62,
      image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2160&auto=format&fit=crop"
      ],
      tags: ["Art", "Exhibition", "Indoor"],
      type: "event",
      date: "Apr 22-30"
    },
    {
      id: 24,
      title: "Tech Innovation Summit",
      location: "San Francisco, California",
      price: 120,
      rating: 4.8,
      reviewCount: 104,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2120&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2120&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2080&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
      ],
      tags: ["Tech", "Conference", "Networking"],
      type: "event",
      date: "May 5-8"
    },
    {
      id: 25,
      title: "Wine Tasting Festival",
      location: "Napa Valley, California",
      price: 95,
      rating: 4.9,
      reviewCount: 132,
      image: "https://images.unsplash.com/photo-1561461056-77e08b3683c4?q=80&w=2074&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1561461056-77e08b3683c4?q=80&w=2074&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2070&auto=format&fit=crop"
      ],
      tags: ["Wine", "Tasting", "Outdoor"],
      type: "event",
      date: "Jul 8-10"
    }
  ],
  "National Parks": [
    {
      id: 4,
      title: "Cabin Near Yellowstone",
      location: "Wyoming",
      price: 220,
      rating: 4.9,
      reviewCount: 115,
      image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1527484500731-790a9f2c8012?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1539710920598-94eca6d4c787?q=80&w=2070&auto=format&fit=crop"
      ],
      tags: ["National Park", "Cabin", "Wildlife"],
      isSuperhost: true
    },
    {
      id: 12,
      title: "Glamping at Grand Canyon",
      location: "Arizona",
      price: 195,
      rating: 4.7,
      reviewCount: 83,
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1563299796-17596ed6b017?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=2070&auto=format&fit=crop"
      ],
      tags: ["Glamping", "National Park", "Stargazing"],
    },
    {
      id: 26,
      title: "Luxury Lodge Near Yosemite",
      location: "California",
      price: 310,
      rating: 4.9,
      reviewCount: 97,
      image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1587290246348-47156af3dd66?q=80&w=2069&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1497906539264-eb74442e37a9?q=80&w=2071&auto=format&fit=crop"
      ],
      tags: ["Lodge", "Luxury", "Mountain View"],
      isSuperhost: true
    },
    {
      id: 27,
      title: "Riverside Cabin at Olympic",
      location: "Washington",
      price: 175,
      rating: 4.8,
      reviewCount: 76,
      image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=2080&auto=format&fit=crop"
      ],
      tags: ["River", "Cabin", "Forest"],
    }
  ],
  "Islands": [
    {
      id: 5,
      title: "Tropical Island Bungalow",
      location: "Hawaii",
      price: 280,
      rating: 4.8,
      reviewCount: 95,
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1559599189-fe84dea4eb79?q=80&w=2069&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2074&auto=format&fit=crop"
      ],
      tags: ["Island", "Beachfront", "Ocean View"],
      isSuperhost: true
    },
    {
      id: 13,
      title: "Private Island Villa",
      location: "Florida Keys",
      price: 450,
      rating: 5.0,
      reviewCount: 37,
      image: "https://images.unsplash.com/photo-1682553064441-b3dd52663602?ixlib=rb-4.0.3&q=85&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1682553064441-b3dd52663602?ixlib=rb-4.0.3&q=85&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1528913775512-624d24b27b96?q=80&w=2069&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511312817743-0bb4e8363e91?q=80&w=2120&auto=format&fit=crop"
      ],
      tags: ["Private Island", "Luxury", "Entire Island"],
      isSuperhost: true
    },
    {
      id: 28,
      title: "Overwater Bungalow",
      location: "Maldives",
      price: 520,
      rating: 4.9,
      reviewCount: 48,
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=2073&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=2073&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=2058&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1612149328936-82e00c957816?q=80&w=2069&auto=format&fit=crop"
      ],
      tags: ["Overwater", "Luxury", "Honeymoon"],
    },
    {
      id: 29,
      title: "Beachfront Cottage",
      location: "Bahamas",
      price: 295,
      rating: 4.8,
      reviewCount: 64,
      image: "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=2066&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=2066&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?q=80&w=2070&auto=format&fit=crop"
      ],
      tags: ["Beach", "Cottage", "Oceanfront"],
      isSuperhost: true
    }
  ],
  "Bungalows": [
    {
      id: 6,
      title: "Beachside Bungalow",
      location: "Malibu, California",
      price: 310,
      rating: 4.8,
      reviewCount: 72,
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518050346340-aa2ec3bb424b?q=80&w=2017&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"
      ],
      tags: ["Bungalow", "Beach", "Private"],
    },
    {
      id: 14,
      title: "Garden Bungalow Retreat",
      location: "Key West, Florida",
      price: 235,
      rating: 4.6,
      reviewCount: 58,
      image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2074&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1574739782594-db4ead022697?q=80&w=2070&auto=format&fit=crop"
      ],
      tags: ["Bungalow", "Garden", "Quiet"],
    },
    {
      id: 30,
      title: "Tropical Bungalow with Pool",
      location: "Bali, Indonesia",
      price: 180,
      rating: 4.9,
      reviewCount: 115,
      image: "https://images.unsplash.com/photo-1537344778430-d0d952a11ff3?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1537344778430-d0d952a11ff3?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?q=80&w=2021&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop"
      ],
      tags: ["Bungalow", "Pool", "Tropical"],
      isSuperhost: true
    },
    {
      id: 31,
      title: "Mountain View Bungalow",
      location: "Costa Rica",
      price: 215,
      rating: 4.7,
      reviewCount: 87,
      image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=2080&auto=format&fit=crop"
      ],
      tags: ["Bungalow", "Mountain View", "Private"],
    }
  ],
  "Cabins": [
    {
      id: 7,
      title: "Cozy Mountain Cabin",
      location: "Aspen, Colorado",
      price: 210,
      rating: 4.8,
      reviewCount: 102,
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1593766788379-68a0bb5be58b?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=2150&auto=format&fit=crop"
      ],
      tags: ["Mountain View", "Fireplace"],
      isSuperhost: true
    },
    {
      id: 15,
      title: "Lakeside Log Cabin",
      location: "Lake Tahoe, California",
      price: 190,
      rating: 4.7,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1586374579358-9d19d632b6df?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1586374579358-9d19d632b6df?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1433883669848-fa8a7ce070b2?q=80&w=2072&auto=format&fit=crop"
      ],
      tags: ["Cabin", "Lake View"],
    },
    {
      id: 32,
      title: "Rustic Forest Cabin",
      location: "Vermont",
      price: 175,
      rating: 4.9,
      reviewCount: 94,
      image: "https://images.unsplash.com/photo-1573611030146-ff6916c398fa?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1573611030146-ff6916c398fa?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1587061633457-5ccabb9ed0ff?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1513977055326-8ae6272d90a7?q=80&w=2070&auto=format&fit=crop"
      ],
      tags: ["Rustic", "Forest", "Secluded"],
      isSuperhost: true
    },
    {
      id: 33,
      title: "A-Frame Mountain Cabin",
      location: "Montana",
      price: 230,
      rating: 4.8,
      reviewCount: 68,
      image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1567636788276-40a47795ba4e?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1673876843985-34aaa06d6054?q=80&w=2048&auto=format&fit=crop"
      ],
      tags: ["A-Frame", "Snowy", "Private"],
    }
  ],
  "Entire Home": [
    {
      id: 8,
      title: "Luxury Beach House",
      location: "Miami, Florida",
      price: 250,
      rating: 4.9,
      reviewCount: 128,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop"
      ],
      tags: ["Beach Front", "Pool"],
      isSuperhost: true
    },
    {
      id: 16,
      title: "Modern Countryside Villa",
      location: "Napa Valley, California",
      price: 320,
      rating: 4.8,
      reviewCount: 76,
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2015&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2015&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2076&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=2069&auto=format&fit=crop"
      ],
      tags: ["Entire Home", "Vineyard"],
    },
    {
      id: 34,
      title: "Oceanfront Mansion",
      location: "Hamptons, New York",
      price: 595,
      rating: 4.9,
      reviewCount: 45,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=2020&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2080&auto=format&fit=crop"
      ],
      tags: ["Luxury", "Oceanfront", "Mansion"],
      isSuperhost: true
    },
    {
      id: 35,
      title: "Desert Adobe Home",
      location: "Sedona, Arizona",
      price: 280,
      rating: 4.7,
      reviewCount: 79,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2074&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2074&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?q=80&w=2047&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=2069&auto=format&fit=crop"
      ],
      tags: ["Desert", "Adobe", "Mountain View"],
    }
  ],
  "Private Room": [
    {
      id: 9,
      title: "Private Room in Victorian House",
      location: "San Francisco, California",
      price: 120,
      rating: 4.7,
      reviewCount: 85,
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1617098900591-3f90928e8c54?q=80&w=2071&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop"
      ],
      tags: ["Private Room", "Historic"],
    },
    {
      id: 17,
      title: "Cozy Guest Room with View",
      location: "Seattle, Washington",
      price: 95,
      rating: 4.6,
      reviewCount: 63,
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1614965326824-a776d59d40b7?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1553454193-57c71957601b?q=80&w=2070&auto=format&fit=crop"
      ],
      tags: ["Private Room", "City View"],
    },
    {
      id: 36,
      title: "Artist's Loft Room",
      location: "Brooklyn, New York",
      price: 110,
      rating: 4.8,
      reviewCount: 91,
      image: "https://images.unsplash.com/photo-1501876725168-00c445821c9e?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1501876725168-00c445821c9e?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1499955085172-a104c9463ece?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1585128792020-803d29415281?q=80&w=2148&auto=format&fit=crop"
      ],
      tags: ["Artistic", "Loft", "Creative"],
      isSuperhost: true
    },
    {
      id: 37,
      title: "Luxury Room in Modern Home",
      location: "Austin, Texas",
      price: 135,
      rating: 4.9,
      reviewCount: 47,
      image: "https://images.unsplash.com/photo-1605346434674-a440ca4997bc?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1605346434674-a440ca4997bc?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560185008-b033106af5c3?q=80&w=2070&auto=format&fit=crop"
      ],
      tags: ["Luxury", "Private Bath", "Modern"],
    }
  ],
  "Beach Front": [
    {
      id: 10,
      title: "Oceanfront Beach House",
      location: "Malibu, California",
      price: 380,
      rating: 4.9,
      reviewCount: 107,
      image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1468581264429-2548ef9eb732?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop"
      ],
      tags: ["Beach Front", "Luxury"],
      isSuperhost: true
    },
    {
      id: 18,
      title: "Beachside Cottage",
      location: "Outer Banks, North Carolina",
      price: 220,
      rating: 4.7,
      reviewCount: 92,
      image: "https://images.unsplash.com/photo-1505081598304-3bee85f930d4?q=80&w=2062&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1505081598304-3bee85f930d4?q=80&w=2062&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1591017403272-fd1bc2292341?q=80&w=1972&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1520342868574-5fa3804e551c?q=80&w=2069&auto=format&fit=crop"
      ],
      tags: ["Beach Front", "Cottage"],
    },
    {
      id: 38,
      title: "Beachfront Villa with Staff",
      location: "Phuket, Thailand",
      price: 420,
      rating: 5.0,
      reviewCount: 64,
      image: "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?q=80&w=2020&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?q=80&w=2020&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551172851-5a85379d5ba6?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
      ],
      tags: ["Beachfront", "Luxury", "Staff"],
      isSuperhost: true
    },
    {
      id: 39,
      title: "Oceanview Beach Condo",
      location: "Maui, Hawaii",
      price: 295,
      rating: 4.8,
      reviewCount: 112,
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=2074&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542736694-1b2bb8914d1e?q=80&w=2070&auto=format&fit=crop"
      ],
      tags: ["Oceanview", "Condo", "Beach Access"],
    }
  ],
  "With Pool": [
    {
      id: 11,
      title: "Villa with Private Pool",
      location: "Palm Springs, California",
      price: 290,
      rating: 4.8,
      reviewCount: 73,
      image: "https://images.unsplash.com/photo-1623718649591-311775a30c43?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1623718649591-311775a30c43?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop"
      ],
      tags: ["Pool", "Villa"],
      isSuperhost: true
    },
    {
      id: 19,
      title: "Modern Home with Infinity Pool",
      location: "Scottsdale, Arizona",
      price: 340,
      rating: 4.9,
      reviewCount: 56,
      image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=2080&auto=format&fit=crop"
      ],
      tags: ["Pool", "Modern"],
    },
    {
      id: 40,
      title: "Mediterranean Villa with Pool",
      location: "Santorini, Greece",
      price: 390,
      rating: 4.9,
      reviewCount: 83,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2080&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2080&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1527384025924-f30fc2ac98e3?q=80&w=2370&auto=format&fit=crop"
      ],
      tags: ["Pool", "Mediterranean", "Sea View"],
      isSuperhost: true
    },
    {
      id: 41,
      title: "Tropical Villa with Saltwater Pool",
      location: "Tulum, Mexico",
      price: 275,
      rating: 4.8,
      reviewCount: 94,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=2187&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=2020&auto=format&fit=crop"
      ],
      tags: ["Saltwater Pool", "Tropical", "Jungle"],
    }
  ],
};

// Default properties for when no category is selected
const defaultProperties: PropertyProps[] = [
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
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2076&auto=format&fit=crop"
    ],
    tags: ["Beach Front", "Pool"],
    isSuperhost: true
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
    tags: ["City View"]
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
      "https://images.unsplash.com/photo-1527484500731-790a9f2c8012?q=80&w=2070&auto=format&fit=crop"
    ],
    tags: ["Mountain View", "Fireplace"],
    isSuperhost: true
  },
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
    tags: ["Lake View", "Hot Tub"]
  },
  {
    id: 42,
    title: "Mountain Hideaway with Hot Tub",
    location: "Blue Ridge, Georgia",
    price: 195,
    rating: 4.8,
    reviewCount: 64,
    image: "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop"
    ],
    tags: ["Hot Tub", "Mountain", "Secluded"],
    isSuperhost: true
  },
  {
    id: 43,
    title: "Luxury Treehouse Retreat",
    location: "Woodstock, New York",
    price: 275,
    rating: 4.9,
    reviewCount: 48,
    image: "https://images.unsplash.com/photo-1506404215726-058e7e6327b3?q=80&w=2370&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1506404215726-058e7e6327b3?q=80&w=2370&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533044309907-0fa3413da946?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?q=80&w=2070&auto=format&fit=crop"
    ],
    tags: ["Treehouse", "Unique", "Forest"],
  },
  {
    id: 44,
    title: "Vineyard Cottage",
    location: "Sonoma, California",
    price: 230,
    rating: 4.7,
    reviewCount: 82,
    image: "https://images.unsplash.com/photo-1537140369417-0399cd563e62?q=80&w=2156&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1537140369417-0399cd563e62?q=80&w=2156&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop"
    ],
    tags: ["Vineyard", "Cottage", "Wine Country"],
  },
  {
    id: 45,
    title: "Oceanfront Beach Bungalow",
    location: "San Diego, California",
    price: 245,
    rating: 4.8,
    reviewCount: 97,
    image: "https://images.unsplash.com/photo-1520450202858-df8a0aff3871?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1520450202858-df8a0aff3871?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop"
    ],
    tags: ["Beachfront", "Bungalow", "Sunset Views"],
    isSuperhost: true
  }
];

const CategoryProperties: React.FC<CategoryPropertiesProps> = ({ selectedCategory }) => {
  const [properties, setProperties] = useState<PropertyProps[]>(defaultProperties);

  useEffect(() => {
    if (selectedCategory && propertiesByCategory[selectedCategory]) {
      setProperties(propertiesByCategory[selectedCategory]);
    } else {
      setProperties(defaultProperties);
    }
  }, [selectedCategory]);

  return (
    <div className="py-10">
      <div className="flapabay-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory ? `${selectedCategory} Properties` : 'Featured Properties'}
          </h2>
          <p className="text-gray-600 mt-2">
            {selectedCategory
              ? `Explore our handpicked selection of ${selectedCategory.toLowerCase()}`
              : 'Discover our most popular properties'}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProperties;
