
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutJoin = () => {
  const options = [
    {
      title: "Become a Host",
      description: "Share your space, earn income, and help travelers experience Africa authentically.",
      icon: <HomeIcon className="h-10 w-10 text-flapabay-yellow" />,
      link: "/host",
      buttonText: "Start Hosting"
    },
    {
      title: "Travel with Us",
      description: "Discover unique stays and experiences across Africa's most beautiful destinations.",
      icon: <Users className="h-10 w-10 text-flapabay-yellow" />,
      link: "/",
      buttonText: "Find Places"
    },
    {
      title: "Join Our Team",
      description: "Passionate about travel? Join our growing team and help shape the future of African hospitality.",
      icon: <Briefcase className="h-10 w-10 text-flapabay-yellow" />,
      link: "/careers",
      buttonText: "See Openings"
    }
  ];

  return (
    <section className="py-20 bg-flapabay-black text-white">
      <div className="flapabay-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
          <div className="w-16 h-1 bg-flapabay-yellow mx-auto mb-6"></div>
          <p className="text-lg text-gray-300">
            There are many ways to be part of the FlapaBay journey. Whether you're hosting, traveling, or looking to join our team, we'd love to welcome you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {options.map((option, index) => (
            <motion.div
              key={index}
              whileHover={{ translateY: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 rounded-lg p-8 text-center"
            >
              <div className="flex justify-center mb-6">
                {option.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{option.title}</h3>
              <p className="text-gray-300 mb-6">{option.description}</p>
              <Button asChild variant="default" className="w-full">
                <Link to={option.link}>{option.buttonText}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-lg text-gray-300 mb-6">
            Have questions? We'd love to hear from you!
          </p>
          <Button asChild variant="outline" className="border-flapabay-yellow text-flapabay-yellow hover:bg-flapabay-yellow hover:text-black">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutJoin;
