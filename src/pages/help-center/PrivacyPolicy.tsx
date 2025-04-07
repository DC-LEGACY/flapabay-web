import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import React from 'react';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <DefaultHeader />
      
      <main className="flex-1 pt-20">
        {/* Header */}
        <section className="bg-black text-white py-16">
          <div className="flapabay-container">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-12 w-12 text-flapabay-yellow mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-lg text-center text-gray-300 max-w-3xl mx-auto">
              Last updated: June 1, 2023
            </p>
          </div>
        </section>
        
        {/* Content */}
        <section className="py-16">
          <div className="flapabay-container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <h2>Introduction</h2>
              <p>
                FlapaBay ("we," "our," or "us") respects your privacy and is committed to protecting it through our compliance with this policy. This Privacy Policy describes the types of information we may collect from you or that you may provide when you visit our website and use our services, and our practices for collecting, using, maintaining, protecting, and disclosing that information.
              </p>
              
              <h2>Information We Collect</h2>
              <p>
                We collect several types of information from and about users of our website, including:
              </p>
              <ul>
                <li>Personal information such as name, email address, postal address, telephone number, and payment information.</li>
                <li>Information about your internet connection, the equipment you use to access our website, and usage details.</li>
                <li>Information you provide when creating an account, making a booking, or communicating with hosts or our customer service team.</li>
                <li>Transaction information, including details about payments to and from you, and details of services you have purchased from us.</li>
                <li>Your preferences and settings, such as preferred currency, language, and search history.</li>
              </ul>
              
              <h2>How We Collect Your Information</h2>
              <p>
                We collect information:
              </p>
              <ul>
                <li>Directly from you when you provide it to us.</li>
                <li>Automatically as you navigate through the site, including through cookies and similar technologies.</li>
                <li>From third parties, such as our business partners and other third parties that provide us or you with certain services.</li>
              </ul>
              
              <h2>How We Use Your Information</h2>
              <p>
                We use information that we collect about you or that you provide to us:
              </p>
              <ul>
                <li>To present our website and its contents to you.</li>
                <li>To provide you with information, products, or services that you request from us.</li>
                <li>To fulfill any other purpose for which you provide it.</li>
                <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us.</li>
                <li>To notify you about changes to our website or any products or services we offer or provide.</li>
                <li>For analytical purposes to improve our website and services.</li>
                <li>For marketing purposes, with your consent where required by law.</li>
              </ul>
              
              <h2>Disclosure of Your Information</h2>
              <p>
                We may disclose personal information that we collect or you provide as described in this privacy policy:
              </p>
              <ul>
                <li>To contractors, service providers, and other third parties we use to support our business.</li>
                <li>To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of FlapaBay's assets.</li>
                <li>To fulfill the purpose for which you provide it.</li>
                <li>For any other purpose disclosed by us when you provide the information.</li>
                <li>With your consent.</li>
                <li>To comply with any court order, law, or legal process, including to respond to any government or regulatory request.</li>
              </ul>
              
              <h2>Your Choices About Our Collection, Use, and Disclosure</h2>
              <p>
                We strive to provide you with choices regarding the personal information you provide to us. You can:
              </p>
              <ul>
                <li>Update your account information at any time by logging into your account.</li>
                <li>Opt-out of marketing communications by following the unsubscribe link in any marketing email we send.</li>
                <li>Configure your browser to refuse cookies or alert you when cookies are being sent.</li>
                <li>Request access to, correction of, or deletion of your personal information by contacting us.</li>
              </ul>
              
              <h2>Data Security</h2>
              <p>
                We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. However, the transmission of information via the internet is not completely secure, and we cannot guarantee the security of your personal information transmitted to our website.
              </p>
              
              <h2>Children's Privacy</h2>
              <p>
                Our website is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you are under 18, do not use or provide any information on this website.
              </p>
              
              <h2>Changes to Our Privacy Policy</h2>
              <p>
                We may update our privacy policy from time to time. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the website home page or via email.
              </p>
              
              <h2>Contact Information</h2>
              <p>
                To ask questions or comment about this privacy policy and our privacy practices, contact us at:
              </p>
              <p className="font-medium">
                support@flapabay.com<br />
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

export default PrivacyPolicy;
