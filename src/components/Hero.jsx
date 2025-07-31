import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';

import heroAnimation from '../assets/shop_owner.json';
import Modal from './Modal';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { ArrowRight, LogIn, Award } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const lottieVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.8 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: 'backOut',
            delay: 0.4
        }
    }
}

const Hero = () => {
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const openSignup = useCallback(() => setSignupOpen(true), []);
  const closeSignup = useCallback(() => setSignupOpen(false), []);
  const openLogin = useCallback(() => setLoginOpen(true), []);
  const closeLogin = useCallback(() => setLoginOpen(false), []);

  return (
    <>
      <section id="home" className="relative w-full overflow-hidden bg-gradient-to-br from-white to-gray-100">
        <div className="absolute inset-0 opacity-50 -z-0">
            <div className="absolute w-64 h-64 rounded-full -top-10 -right-10 bg-orange-200/50 blur-3xl"></div>
            <div className="absolute rounded-full w-80 h-80 -bottom-20 -left-20 bg-blue-200/40 blur-3xl"></div>
        </div>

        <div className="relative z-10 grid items-center max-w-screen-xl px-4 py-20 mx-auto lg:gap-8 xl:gap-0 lg:py-28 lg:grid-cols-12">
          
          <motion.div
            className="mr-auto place-self-center lg:col-span-7"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={itemVariants}
              className="relative inline-flex items-center gap-2 px-4 py-2 mb-6 overflow-hidden text-sm font-bold rounded-full shadow-lg text-amber-900 bg-gradient-to-r from-amber-200 to-orange-300 shadow-amber-500/20"
            >
              <motion.span
                className="absolute inset-0 w-full h-full"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
                }}
              />
              <Award className="relative w-4 h-4 text-amber-700" />
              <span className="relative">Trusted by 1,000+ Shop Owners</span>
            </motion.div>
            
            <motion.h1 
                variants={itemVariants}
                className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl xl:text-6xl" 
                style={{textAlign:'left'}}
            >
              Simplify Your Shop's Hisab
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-500">
                Kitab
                <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 1.2 }}
                    style={{ transformOrigin: 'left' }}
                />
              </span>
            </motion.h1>

            <motion.p 
                variants={itemVariants}
                className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl"
            >
              Let HisabKitab handle the numbers while you focus on growing your shop.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <motion.button
                onClick={openSignup}
                whileHover={{ scale: 1.05, y: -2, transition: { type: 'spring', stiffness: 300 } }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-bold text-white transition-all duration-300 bg-orange-500 rounded-lg shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={openLogin}
                whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-base font-medium text-gray-700 transition-colors duration-300 rounded-lg group hover:text-orange-600"
              >
                <LogIn className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                <span>Already have an account?</span>
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden lg:mt-0 lg:col-span-5 lg:flex"
            variants={lottieVariants}
            initial="hidden"
            animate="visible"
          >
            <Lottie animationData={heroAnimation} loop={true} />
          </motion.div>
        </div>

        <AnimatePresence>
            {isSignupOpen && (
                <Modal isOpen={isSignupOpen} onClose={closeSignup}>
                    <RegisterForm />
                </Modal>
            )}
            {isLoginOpen && (
                <Modal isOpen={isLoginOpen} onClose={closeLogin}>
                    <LoginForm />
                </Modal>
            )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default Hero;