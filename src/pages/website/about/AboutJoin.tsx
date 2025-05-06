import { Briefcase, Home2, People } from "iconsax-react";

import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import React from 'react';
import { motion } from 'framer-motion';

const AboutJoin = () => {
 
  const options = [
    {
      title: "Become a Host",
      description: "Share your space, earn income, and help travelers experience Africa authentically.",
      icon: <Home2 size="40" color="white"/>,
      link: "/host",
      buttonText: "Start Hosting"
    },
    {
      title: "Travel with Us",
      description: "Discover unique stays and experiences across Africa's most beautiful destinations.",
      icon: <People size="40" color="white"/>,
      link: "/",
      buttonText: "Find Places"
    },
    {
      title: "Join Our Team",
      description: "Passionate about travel? Join our growing team and help shape the future of African hospitality.",
      icon: <Briefcase size="40" color="white"/>,
      link: "/careers",
      buttonText: "See Openings"
    }
  ];
  
  return (
    <section className="py-20 text-white bg-white">
      <div className="flapabay-container">
        <div className="max-w-3xl mx-auto pt-16 text-center">
          <h2 className="pt-6 text-3xl font-bold md:text-4xl">Join Our Community</h2>
       
          <p className="text-lg text-dark">
            There are many ways to be part of the FlapaBay journey. Whether you're hosting, traveling, or looking to join our team, we'd love to welcome you.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {options.map((option, index) => (
            <motion.div
              key={index}
              whileHover={{ translateY: -10 }}
              transition={{ duration: 0.3 }}
              className="p-8 text-center rounded-lg bg-flapabay-yellow"
            >
              <div className="flex justify-center pt-6">
                {option.icon}
              </div>
              <h3 className="pt-3 text-xl font-bold text-white">{option.title}</h3>
              <p className="pt-6 text-white">{option.description}</p>
              <Button asChild variant="default" className="w-full text-black bg-white hover:bg-flapabay-yellow/30 hover:text-black">
                <Link to={option.link}>{option.buttonText}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
        
        <div className="pt-16 text-center">
          <p className="pt-6 text-lg text-dark">
            Have questions? We'd love to hear from you!
          </p>
          <Button asChild variant="outline" className="border-flapabay-yellow bg-flapabay-yellow hover:bg-flapabay-yellow/100 hover:text-black">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutJoin;
