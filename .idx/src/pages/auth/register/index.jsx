import React from "react";
import { Link, Navigate } from "react-router-dom";
import MetaData from "@/components/common/MetaData";
import SignupModal from "@/components/auth/SignupModal";
import { motion } from "framer-motion";
import { useAuth } from '@/contexts/AuthContext';
import Preloader from '@/components/common/Preloader';

const metaInformation = {
  title: "Register  || Flapabay- Apartment Rental, Experiences and More!",
};

const Register = () => {
  const { user, loading } = useAuth();
  if (loading) return <Preloader />;
  if (user) {
    if (user.role === 'host') {
      return <Navigate to="/dashboard/host" replace />;
    } else {
      // Default to guest if role is missing or unknown
      return <Navigate to="/dashboard/guest" replace />;
    }
  }
  return (
    <>
      <MetaData meta={metaInformation} />
      <section className="min-h-screen  px-4 ">
      
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-xl">
              <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                <div className="text-center mb-10">
                  
                  <h2 className="text-3xl font-bold mb-2">Create account</h2>
                  <p className="text-gray-60 mb-4">
                    Sign in with this account across the following sites.
                  </p>
                </div>
                <SignupModal />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Register;
