
import React from 'react';
import PropertyCard, { PropertyProps } from './PropertyCard';
import { motion } from 'framer-motion';

// Sample property data
const properties: PropertyProps[] = [
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
    id: 45,
    title: "Elegant Penthouse with City Skyline",
    location: "Chicago, Illinois",
    price: 300,
    rating: 4.9,
    reviewCount: 96,
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f3?q=80&w=2069&auto=format&fit=crop"
    ],
    tags: ["Penthouse", "Rooftop"],
    isSuperhost: true
  },
  {
    id: 46,
    title: "Historic Downtown Loft",
    location: "Boston, Massachusetts",
    price: 170,
    rating: 4.7,
    reviewCount: 88,
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?q=80&w=2067&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop"
    ],
    tags: ["Historic", "Downtown"]
  },
  {
    id: 47,
    title: "Tropical Villa with Private Pool",
    location: "Honolulu, Hawaii",
    price: 280,
    rating: 4.8,
    reviewCount: 115,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2080&auto=format&fit=crop"
    ],
    tags: ["Tropical", "Pool"],
    isSuperhost: true
  },
  {
    id: 48,
    title: "Desert Oasis with Mountain Views",
    location: "Phoenix, Arizona",
    price: 220,
    rating: 4.6,
    reviewCount: 72,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573611030146-ff6916c398fa?q=80&w=2070&auto=format&fit=crop"
    ],
    tags: ["Desert View", "Hot Tub"]
  }
];

const PropertyGrid: React.FC = () => {
  return (
    <section className="py-20">
      <div className="flapabay-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Popular Properties</h2>
          <p className="section-subtitle">
            Discover our handpicked selection of the most sought-after vacation rentals
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <PropertyCard 
              key={property.id} 
              {...property} 
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <motion.button
            className="primary-button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Properties
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;
