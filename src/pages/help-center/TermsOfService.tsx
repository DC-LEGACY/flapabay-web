import DefaultHeader from "@/components/common/DefaultHeader";
import { FileText } from 'lucide-react';
import Footer from "@/components/common/default-footer";
import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DefaultHeader />
      
      <main className="flex-1 pt-20">
        {/* Header */}
        <section className="py-16 text-white bg-black">
          <div className="flapabay-container">
            <div className="flex items-center justify-center mb-6">
              <FileText className="w-12 h-12 mr-4 text-flapabay-yellow" />
              <h1 className="text-4xl font-bold md:text-5xl">Terms of Service</h1>
            </div>
            <p className="max-w-3xl mx-auto text-lg text-center text-gray-300">
              Last updated: June 1, 2023
            </p>
          </div>
        </section>
        
        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl flapabay-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <h2>Acceptance of Terms</h2>
              <p>
                These Terms of Service ("Terms") govern your access to and use of the FlapaBay website, mobile applications, and services (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
              </p>
              
              <h2>Eligibility</h2>
              <p>
                You must be at least 18 years old to use the Services. By agreeing to these Terms, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into a binding agreement.
              </p>
              
              <h2>Account Registration</h2>
              <p>
                To access certain features of the Services, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your account credentials and for all activities that occur under your account.
              </p>
              
              <h2>User Conduct</h2>
              <p>
                You agree not to:
              </p>
              <ul>
                <li>Use the Services for any illegal purpose or in violation of any local, state, national, or international law.</li>
                <li>Violate or infringe other people's intellectual property, privacy, publicity, or other legal rights.</li>
                <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
                <li>Interfere with or disrupt the Services or servers or networks connected to the Services.</li>
                <li>Attempt to gain unauthorized access to any portion of the Services or any other accounts, computer systems, or networks connected to the Services.</li>
                <li>Use any robot, spider, site search/retrieval application, or other automated device, process, or means to access, retrieve, scrape, or index any portion of the Services.</li>
                <li>Use the Services to harvest or collect email addresses or other contact information of other users from the Services by electronic or other means.</li>
              </ul>
              
              <h2>Bookings and Reservations</h2>
              <p>
                When you book a property or experience through the Services:
              </p>
              <ul>
                <li>You agree to pay all fees and applicable taxes associated with your booking.</li>
                <li>You agree to comply with all rules and restrictions imposed by the host or service provider.</li>
                <li>You understand that FlapaBay does not own, operate, or control any properties or experiences listed on the platform.</li>
                <li>You acknowledge that FlapaBay is not responsible for the accuracy of listings, the condition of properties, or the quality of experiences.</li>
              </ul>
              
              <h2>Cancellation and Refunds</h2>
              <p>
                Cancellation policies vary depending on the property or experience. The applicable cancellation policy will be displayed before you complete your booking. By completing your booking, you agree to the cancellation policy for that property or experience.
              </p>
              
              <h2>Intellectual Property</h2>
              <p>
                The Services and all content and materials included on the Services, including text, graphics, logos, images, and software, are the property of FlapaBay or its licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              
              <h2>Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, in no event shall FlapaBay, its affiliates, officers, directors, employees, agents, or licensors be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data, or other intangible losses, arising out of or relating to the use of, or inability to use, the Services.
              </p>
              
              <h2>Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless FlapaBay, its affiliates, officers, directors, employees, agents, and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) that such parties may incur as a result of or arising from your violation of these Terms.
              </p>
              
              <h2>Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. If we make material changes to these Terms, we will notify you by email or by posting a notice on our website. Your continued use of the Services after such notification constitutes your acceptance of the modified Terms.
              </p>
              
              <h2>Termination</h2>
              <p>
                We may terminate or suspend your access to the Services at any time, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use the Services will immediately cease.
              </p>
              
              <h2>Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of South Africa, without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located in Johannesburg, South Africa.
              </p>
              
              <h2>Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="font-medium">
                legal@flapabay.com<br />
                +27 10 123 4567<br />
                123 FlapaBay Tower, Sandton City, Johannesburg, South Africa
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
