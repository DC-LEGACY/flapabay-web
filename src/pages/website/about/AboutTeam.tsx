import React from 'react';
import { motion } from 'framer-motion';

const AboutTeam = () => {
  const team = [
    {
      name: "Mbolela Pule",
      role: "Founder & CEO",
      bio: "Visionary leader with a passion for African hospitality and connecting global travelers with authentic experiences.",
      image: "/images/about/40f111f4-2fe2-4988-8952-4a9573620263.png"
    },
    {
      name: "David Okafor",
      role: "Co-Founder & CTO",
      bio: "David oversees our technical infrastructure, ensuring a seamless experience for hosts and travelers.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop"
    },
    {
      name: "Amina Diallo",
      role: "Chief Experience Officer",
      bio: "Amina works closely with hosts to curate exceptional experiences across the continent.",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&h=500&fit=crop"
    },
    {
      name: "Michael Kiprotich",
      role: "Head of Operations",
      bio: "Michael ensures smooth operations across all 15 countries where FlapaBay operates.",
      image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=500&h=500&fit=crop"
    },
    {
      name: "Grace Lwanga",
      role: "Community Manager",
      bio: "Grace builds and nurtures our vibrant community of hosts and travelers.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop"
    },
    {
      name: "Thomas Mensah",
      role: "Marketing Director",
      bio: "Thomas leads our efforts to showcase African hospitality to the world.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-flapabay-yellow">
      <div className="flapabay-container">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold text-black md:text-4xl">Meet Our Team</h2>
        
          <p className="text-lg text-gray-800">
            The passionate individuals behind FlapaBay, working to connect you with unforgettable African experiences.
          </p>
        </div>
        
        <div className="flex gap-6 px-4 pb-8 -mx-4 overflow-x-auto flex-nowrap">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover-lift flex-shrink-0 w-[280px]"
              style={{
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="object-cover object-center w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
                <p className="mb-3 font-medium text-flapabay-yellow">{member.role}</p>
                <p className="text-black">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
