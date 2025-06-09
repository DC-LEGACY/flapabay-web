import React, { useState, useEffect } from "react";
import { useBottomNav } from '@/contexts/BottomNavContext';

import BlogCategories from "@/components/blog/BlogCategories";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogHero from "@/components/blog/BlogHero";
import NewsletterSubscription from "@/components/blog/NewsletterSubscription";
import { blogPosts } from "@/data/blog";
import { motion } from "framer-motion";

const Blog = () => {
  const { setShowBottomNav } = useBottomNav();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    // Show BottomNav for this page
    setShowBottomNav(true);

    // Cleanup: hide BottomNav when leaving the page
    return () => setShowBottomNav(false);
  }, [setShowBottomNav]);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "all" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured).slice(0, 3);

  return (
    <>
        <BlogHero featuredPosts={featuredPosts} />

        <div className="flapabay-container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold pb-4 text-black">
              Media Room & Blog
            </h1>
            <p className="text-lg text-black max-w-3xl mx-auto">
              Discover the latest company news, travel insights, and industry
              trends from FlapaBay.
            </p>
          </motion.div>

          <BlogCategories
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <div className="py-10 px-4 md:px-0 bg-[#ffc500]/10 rounded-3xl my-4 shadow-lg">
            <BlogGrid posts={filteredPosts} />
          </div>

          <section className="p-8 md:p-12 rounded-2xl mt-16 shadow-xl">
            <NewsletterSubscription />
          </section>

          <section className="pt-8">
            <div className="pb-10 text-center">
              <h2 className="text-3xl text-black font-bold pb-4">Latest Press Releases</h2>
              <p className="text-black">
                Get the latest news about FlapaBay's growth and innovations
              </p>
            </div>

            <div className="bg-black text-white p-8 md:p-12 rounded-2xl shadow-xl">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 p-6 rounded-xl backdrop-blur-sm shadow-lg"
                  >
                    <p className="text-xs text-[#ffc500] font-medium pb-2">
                      March {item * 5}, 2023
                    </p>
                    <h3 className="text-xl text-white font-bold pb-2">
                      FlapaBay Expands to {item * 10} New Markets Across Europe
                    </h3>
                    <p className="text-sm text-gray-300 pb-4">
                      The popular vacation rental platform announces significant
                      expansion as part of its global growth strategy.
                    </p>
                    <button className="text-[#ffc500] text-sm font-medium hover:underline">
                      Read full release →
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="pt-8">
            <div className="pb-10 text-center">
              <h2 className="text-3xl font-bold pb-4">Media Resources</h2>
              <p className="text-black">
                Download brand assets and media kits
              </p>
            </div>

            <div className="bg-[#ffc500] p-8 md:p-12 rounded-2xl shadow-xl">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "Brand Guidelines",
                  "Press Kit",
                  "Executive Bios",
                  "Fact Sheet",
                  "High-Res Logos",
                  "Product Images",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white/90 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-bold pb-2">{item}</h3>
                    <p className="text-sm text-black pb-4">
                      Official FlapaBay {item.toLowerCase()} for media use.
                    </p>
                    <button className="text-[#333] text-sm font-medium hover:underline flex items-center">
                      Download
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="pt-4">
            <div className="pb-10 text-center">
              <h2 className="text-3xl font-bold pb-4 ">FlapaBay In The News</h2>
              <p className="text-black">
                Recent coverage from around the world
              </p>
            </div>

            <div className="bg-black text-white p-8 md:p-12 rounded-2xl shadow-xl">
              <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3">
                {[
                  {
                    source: "TechCrunch",
                    title:
                      "FlapaBay Raises $200M to Expand Innovative Home-Sharing Platform",
                    image:
                      "https://images.unsplash.com/photo-1586880244406-556ebe35f282?q=80&w=2787&auto=format&fit=crop",
                  },
                  {
                    source: "Forbes",
                    title:
                      "How FlapaBay Is Transforming the Travel Industry Post-Pandemic",
                    image:
                      "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?q=80&w=2787&auto=format&fit=crop",
                  },
                  {
                    source: "Bloomberg",
                    title:
                      "The Rise of FlapaBay: A New Contender in the Vacation Rental Market",
                    image:
                      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop",
                  },
                ].map((article, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="overflow-hidden rounded-xl group relative shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent "></div>
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 p-6 ">
                      <span className="bg-[#ffc500] text-white text-xs font-bold px-3 py-1 rounded-full">
                        {article.source}
                      </span>
                      <h3 className="text-lg text-white font-bold mt-3 pb-2">
                        {article.title}
                      </h3>
                      <button className="text-[#ffc500] text-sm font-medium hover:underline">
                        Read article →
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
    </>
  );
};

export default Blog;
