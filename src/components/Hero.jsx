import React, { useState, useCallback, Fragment } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import FeatureCard from '../components/FeatureCard';



import heroAnimation from '../assets/shop_owner.json';
import Modal from './Modal';
import { fadeInUp } from '../animations/motions';
import { slideLeft } from '../animations/motions';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';


const Hero = () => {
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const openSignup = useCallback(() => setSignupOpen(true), []);
  const closeSignup = useCallback(() => setSignupOpen(false), []);
  const openLogin = useCallback(() => setLoginOpen(true), []);
  const closeLogin = useCallback(() => setLoginOpen(false), []);

  return (
    <section id="home" className="bg-gray-50">
      <div className="grid max-w-screen-xl min-h-screen px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        {/* Text Block */}
        <motion.div
          className="mr-auto place-self-center justify-items-start lg:col-span-7"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl xl:text-6xl" style={{textAlign:'left'}}>
            Simplify Your Shop's Hisab<span className="text-orange-500">Kitab</span>
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
            Let HisabKitab handle the numbers while you focus on growing your shop.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={openSignup}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-orange-500 rounded-lg "
            >
              Get Started
            </button>
            <button
              onClick={openLogin}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-orange-500 border border-orange-500 rounded-lg"
            >
              Login
            </button>
          </div>
        </motion.div>

        {/* Animation Block */}
        <motion.div
          className="lg:col-span-5"
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Lottie animationData={heroAnimation} />
        </motion.div>
      </div>

      {/* Modals */}
      <Modal isOpen={isSignupOpen} onClose={closeSignup}>
        <RegisterForm/>
      </Modal>
      <Modal isOpen={isLoginOpen} onClose={closeLogin}>
        <LoginForm/>
      </Modal>
    </section>
  );
};

export default Hero;
