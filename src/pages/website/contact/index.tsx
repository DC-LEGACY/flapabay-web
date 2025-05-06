import {
  Call,
  Check,
  Facebook,
  Instagram,
  
  Location,
  Send2,
  Sms,
  Timer,
 
} from "iconsax-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Location size="24" color="#FACC15" />,
      title: "Our Headquarters",
      details: [
        "123 FlapaBay Tower",
        "Sandton City",
        "Johannesburg, South Africa",
      ],
    },
    {
      icon: <Call size="24" color="#FACC15" />,
      title: "Call Us",
      details: ["+27 10 123 4567", "+27 11 987 6543"],
    },
    {
      icon: <Sms size="24" color="#FACC15" />,
      title: "Email Us",
      details: ["support@flapabay.com", "partners@flapabay.com"],
    },
    {
      icon: <Timer size="24" color="#FACC15" />,
      title: "Working Hours",
      details: [
        "Monday - Friday: 8:00 AM - 8:00 PM",
        "Saturday: 9:00 AM - 5:00 PM",
        "Sunday: Closed",
      ],
    },
  ];

  return (
    <>
        {/* Hero Section */}
        <section className="px-6 py-20 pb-10 lg:pt-36 md:pt-16 bg-flapabay-yellow">
          <div className="flapabay-container">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h1
                className="text-4xl text-white md:text-5xl font-bold pb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Get in Touch
              </motion.h1>
              <motion.p
                className="text-lg pb-8 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                We'd love to hear from you. Our friendly team is always here to
                help.
              </motion.p>
              <motion.div
                className="w-24 h-1 bg-flapabay-yellow mx-auto"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 96 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-white">
          <div className="flapabay-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="bg-flapabay-yellow/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                    <div className="text-flapabay-yellow">{info.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold pb-3 pt-2">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-gray-50">
          <div className="flapabay-container">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold pb-6">Send Us a Message</h2>
                  <p className="text-gray-600 pb-8">
                    Whether you have a question about our platform, properties,
                    or anything else, our team is ready to answer all your
                    questions.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-black pb-1"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-flapabay-yellow"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-black pb-1"
                        >
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-flapabay-yellow"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-black pb-1"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-flapabay-yellow"
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Booking Issue">Booking Issue</option>
                        <option value="Partner with Us">Partner with Us</option>
                        <option value="Technical Support">
                          Technical Support
                        </option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-black pb-1"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-flapabay-yellow resize-none"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || isSubmitted}
                      className={`flex items-center justify-center space-x-2 w-full md:w-auto px-8 py-3 rounded-lg font-medium transition-all ${
                        isSubmitted
                          ? "bg-flapabay-black text-white"
                          : "bg-flapabay-yellow text-white hover:bg-opacity-90"
                      }`}
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : isSubmitted ? (
                        <>
                          <Check className="h-5 w-5" />
                          <span>Message Sent!</span>
                        </>
                      ) : (
                        <>
                          <Send2 className="h-5 w-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </Button>
                  </form>
                </motion.div>
              </div>

              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <div className="h-full rounded-xl overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.668461330577!2d28.0462114!3d-26.1071236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e957359fa6143ed%3A0xb8a1e599f75a60be!2sSandton%20City!5e0!3m2!1sen!2sus!4v1655961234567!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: "500px" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="FlapaBay Location"
                    ></iframe>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-flapabay-white">
          <div className="flapabay-container text-center">
            <motion.h2
              className="text-3xl font-bold pb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Connect with Us on Social Media
            </motion.h2>
            <motion.p
              className="text-lg pb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Follow us to stay updated with the latest properties, travel tips,
              and exclusive offers
            </motion.p>
            <motion.div
              className="flex justify-center space-x-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {[
                { platform: "facebook", icon: "fab fa-facebook-f" },
                { platform: "twitter", icon: "fab fa-twitter" },
                { platform: "instagram", icon: "fab fa-instagram" },
                { platform: "linkedin", icon: "fab fa-linkedin-in" },
              ].map((social, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer"
                >
                  <a href="#">
                    <i className={social.icon + " list-inline-item"} />
                  </a>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
    </>
  );
};

export default Contact;
