import { Input } from '@/components/ui/input';
import React from 'react';
import { Search } from 'lucide-react';

interface BlogCategoriesProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const categories = [
  { id: 'all', name: 'All' },
  { id: 'travel-tips', name: 'Travel Tips' },
  { id: 'host-guides', name: 'Host Guides' },
  { id: 'guest-stories', name: 'Guest Stories' },
  { id: 'company-news', name: 'Company News' },
  { id: 'industry-trends', name: 'Industry Trends' }
];

const BlogCategories: React.FC<BlogCategoriesProps> = ({ 
  activeCategory, 
  setActiveCategory,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center justify-start overflow-x-auto py-2 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium mr-3 whitespace-nowrap transition-colors
                ${activeCategory === category.id 
                  ? 'bg-flapabay-yellow text-white' 
                  : 'bg-gray-100 text-black hover:bg-gray-200'}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="h-px bg-gray-200 w-full"></div>
    </div>
  );
};

export default BlogCategories;
