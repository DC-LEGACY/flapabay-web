
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Calendar, Clock, Share2, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BlogComments from '@/components/blog/BlogComments';
import BlogRelated from '@/components/blog/BlogRelated';
import { blogPosts } from '@/data/blog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [likes, setLikes] = useState<number>(0);
  
  useEffect(() => {
    if (slug) {
      // Find the post with the matching slug
      const foundPost = blogPosts.find(post => post.slug === slug);
      
      if (foundPost) {
        setPost(foundPost);
        setLikes(foundPost.likes || 0);
        
        // Find related posts in the same category
        const related = blogPosts
          .filter(p => p.category === foundPost.category && p.id !== foundPost.id)
          .slice(0, 3);
        
        setRelatedPosts(related);
      }
      
      setIsLoading(false);
    }
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleLike = () => {
    setLikes(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce loading-dot"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce loading-dot"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce loading-dot"></div>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="w-full h-[50vh] relative">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="flapabay-container py-12 text-white">
              <div className="flex items-center text-sm mb-3 text-gray-200">
                <span className="bg-primary text-black px-2 py-1 rounded mr-4">
                  {post.category}
                </span>
                <div className="flex items-center mr-4">
                  <Calendar className="w-4 h-4 mr-1" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readingTime} min read
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
              <p className="text-lg text-gray-100 max-w-3xl">{post.excerpt}</p>
            </div>
          </div>
        </div>
        
        <div className="flapabay-container py-12">
          <Button variant="ghost" asChild className="mb-8">
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div 
                className="prose prose-lg max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              <div className="flex items-center justify-between mb-8 pt-4 border-t">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleLike}>
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Like ({likes})
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
                <div className="text-sm text-gray-500">
                  By {post.author.name} • {post.date}
                </div>
              </div>
              
              <BlogComments comments={post.comments || []} />
            </div>
            
            <div className="lg:w-1/3">
              <div className="sticky top-24">
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-bold mb-4">About the Author</h3>
                  <div className="flex items-center mb-4">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name} 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold">{post.author.name}</h4>
                      <p className="text-sm text-gray-600">{post.author.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{post.author.bio}</p>
                </div>
                
                <Tabs defaultValue="toc" className="w-full mb-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="toc">Table of Contents</TabsTrigger>
                    <TabsTrigger value="tags">Tags</TabsTrigger>
                  </TabsList>
                  <TabsContent value="toc" className="bg-gray-50 p-4 rounded-lg">
                    <ul className="space-y-2 text-sm">
                      {post.tableOfContents?.map((item, index) => (
                        <li key={index} className="hover:text-flapabay-yellow cursor-pointer">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="tags" className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      {post.tags?.map((tag, index) => (
                        <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
                
                <BlogRelated relatedPosts={relatedPosts} />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
