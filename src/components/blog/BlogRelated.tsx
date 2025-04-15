
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface BlogRelatedProps {
  relatedPosts: any[];
}

const BlogRelated: React.FC<BlogRelatedProps> = ({ relatedPosts }) => {
  if (!relatedPosts.length) return null;
  
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Related Articles</h3>
      
      <div className="space-y-4">
        {relatedPosts.map((post) => (
          <Link to={`/blog/${post.slug}`} key={post.id}>
            <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="grid grid-cols-3 gap-3">
                <div className="h-20 col-span-1">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover rounded-l"
                  />
                </div>
                <CardContent className="col-span-2 p-3">
                  <h4 className="font-medium text-sm line-clamp-2">{post.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogRelated;
