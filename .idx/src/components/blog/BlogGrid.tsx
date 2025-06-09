import { Calendar, Clock } from 'iconsax-react';
import { Card, CardContent, CardFooter } from '@/components/ui/layout/card';

import { Link } from 'react-router-dom';
import React from 'react';
import { motion } from 'framer-motion';

interface BlogGridProps {
  posts: any[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold mb-2">No articles found</h3>
        <p className="text-gray-600">Try adjusting your search or filter to find what you're looking for.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Link to={`/blog/${post.slug}`}>
            <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl shadow-lg transform hover:-translate-y-2 border-gray-200">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#ffc500] text-black px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">{post.excerpt}</p>
              </CardContent>
              
              <CardFooter className="border-t pt-4 text-sm text-gray-500 flex justify-between">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {post.readingTime} min read
                </div>
              </CardFooter>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default BlogGrid;
