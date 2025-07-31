import benefit1 from '../assets/benefit1.json';
import benefit2 from '../assets/benefit2.json';
import benefit3 from '../assets/benefit3.json';
import benefit4 from '../assets/benefit4.json';
import benefit5 from '../assets/benefit5.json';
import benefit6 from '../assets/benefit6.json';
import { fadeInUp } from '../animations/motions';



import React from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';

const benefits = [
  { title: "Built for Nepali Shop Owners", anim: benefit1 },
  { title: "Works on Mobile & Web", anim: benefit2 },
  { title: "Saves Time, Reduces Error", anim: benefit3 },
  { title: "Clean, Easy to Use Interface", anim: benefit4 },
  { title: "Insightful Reports", anim: benefit5 },
  { title: "Automated Remaind", anim: benefit6 },
];

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


const Benefits = () => (
  <section id="benefits" className="px-8 py-20 bg-slate-50">
    <div className="max-w-screen-xl mx-auto text-center">
      <h2 className="text-3xl font-bold md:text-4xl text-slate-900">
        Why Shop Owners Love <span className="text-orange-500">HisabKitab</span>
      </h2>
      <p className="max-w-2xl mx-auto mt-4 text-slate-600">
        We built HisabKitab from the ground up with the unique needs of Nepali businesses in mind.
      </p>
    </div>

    <motion.div
      className="grid max-w-screen-xl grid-cols-1 gap-8 mx-auto mt-12 sm:grid-cols-2 md:grid-cols-3 justify-items-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {benefits.map((benefit, i) => (
        <motion.div
          key={i}
          className="w-full p-4 text-center bg-white rounded-lg shadow-lg"
          variants={itemVariants}
        >
          <Lottie animationData={benefit.anim} className="w-full h-48" loop={true} />
          <p className="p-4 mt-2 font-semibold text-slate-700">{benefit.title}</p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default Benefits;