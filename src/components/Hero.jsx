import React, { useState, useCallback } from 'react'; 
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { Award } from 'lucide-react'; 
import heroAnimation from '../assets/shop_owner.json';
import Modal from './Modal'; 
import RegisterForm from './RegisterForm'; 

const Hero = () => {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const openRegister = useCallback(() => setRegisterOpen(true), []);
  const closeRegister = useCallback(() => setRegisterOpen(false), []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
        ease: "easeOut"
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    // Use a React fragment to allow the Modal to be a sibling
    <> 
      <section id="home" className="relative w-full overflow-hidden bg-white">
        <div className="max-w-screen-xl px-8 py-20 mx-auto lg:py-28 md:px-16">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Badge */}
              <motion.div 
                variants={itemVariants}
                className="relative inline-flex items-center gap-2 px-4 py-2 mb-6 overflow-hidden text-sm font-bold rounded-full shadow-lg text-amber-900 bg-gradient-to-r from-amber-200 to-orange-300 shadow-amber-500/20"
              >
                <motion.span
                  className="absolute inset-0 w-full h-full"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
                />
                <Award className="relative w-4 h-4 text-amber-700" />
                <span className="relative">Trusted by 1,000+ Shop Owners</span>
              </motion.div>

              {/* Heading */}
              <motion.h1 
                variants={itemVariants}
                className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl lg:text-6xl"
              >
                Simplify Your Business,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                  Amplify Your Growth.
                </span>
              </motion.h1>
              
              {/* Paragraph */}
              <motion.p 
                variants={itemVariants}
                className="mt-6 text-lg text-slate-600"
              >
                HisabKitab is the all-in-one solution designed for Nepali shop owners. Track sales, manage inventory, and understand your customers—all in one easy-to-use app.
              </motion.p>
              
              {/* Buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4 mt-8"
              >
                {/* MODIFIED: This button now opens the register modal */}
                <a 
                  href="#" 
                  onClick={openRegister}
                  className="px-6 py-3 font-semibold text-white transition duration-300 transform bg-orange-500 rounded-full shadow-lg cursor-pointer hover:scale-105 hover:bg-orange-600"
                >
                  Get Started
                </a>
                <a href="#features" className="px-6 py-3 font-semibold transition duration-300 transform rounded-full text-slate-700 bg-slate-200 hover:bg-slate-300 hover:scale-105">
                  Learn More
                </a>
              </motion.div>
            </motion.div>

            {/* Animation */}
            <motion.div
              className="w-full max-w-md mx-auto md:max-w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <Lottie animationData={heroAnimation} loop={true} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* RENDER THE MODAL: It will only be visible when isRegisterOpen is true */}
      <Modal isOpen={isRegisterOpen} onClose={closeRegister}>
        <RegisterForm />
      </Modal>
    </>
  );
};

export default Hero;