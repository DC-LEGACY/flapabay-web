import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import React from 'react';

interface BlogHeroProps {
  featuredPosts: any[];
}

const BlogHero: React.FC<BlogHeroProps> = ({ featuredPosts }) => {
  if (!featuredPosts.length) return null;
  
  const mainFeatured = featuredPosts[0];
  const secondaryFeatured = featuredPosts.slice(1);
  
  return (
    <div className="bg-white py-20 pb-10 lg:pt-30 md:pt-14">
      <div className="flapabay-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main featured post */}
          <div className="lg:col-span-2 relative group rounded-2xl overflow-hidden shadow-lg hover-lift">
            <div className="relative h-[500px]">
              <img 
                src={mainFeatured.image} 
                alt={mainFeatured.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center mb-2">
                  <span className="bg-flapabay-yellow text-white px-2 py-1 rounded-2xl text-sm mr-3">{mainFeatured.category}</span>
                  <span className="text-sm">{mainFeatured.date}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">{mainFeatured.title}</h2>
                <p className="text-white mb-4 line-clamp-2">{mainFeatured.excerpt}</p>
                <Button asChild variant="secondary">
                  <Link to={`/blog/${mainFeatured.slug}`}>
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Secondary featured posts */}
          <div className="lg:col-span-1 flex flex-col space-y-6">
            {secondaryFeatured.map((post) => (
              <div key={post.id} className="relative group rounded-2xl overflow-hidden shadow-lg hover-lift">
                <div className="relative h-[240px]">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full text-white h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute h-full inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center mb-2">
                      <span className="bg-flapabay-yellow text-white px-2 py-1 rounded-2xl text-xs mr-3">{post.category}</span>
                      <span className="text-xs">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                    <Button asChild variant="secondary" size="sm">
                      <Link to={`/blog/${post.slug}`}>
                        Read Article
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHero;
