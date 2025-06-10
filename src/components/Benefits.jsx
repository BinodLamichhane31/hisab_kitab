import React from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';

import benefit1 from '../assets/benefit1.json';
import benefit2 from '../assets/benefit2.json';
import benefit3 from '../assets/benefit3.json';
import benefit4 from '../assets/benefit4.json';
import benefit5 from '../assets/benefit5.json';
import benefit6 from '../assets/benefit6.json';
import { fadeInUp } from '../animations/motions';

const benefits = [
  { title: "Built for Nepali Shop Owners", anim: benefit1 },
  { title: "Works on Mobile & Web", anim: benefit2 },
  { title: "Saves Time, Reduces Error", anim: benefit3 },
  { title: "Clean, Easy to Use Interface", anim: benefit4 },
  { title: "Insightful Reports", anim: benefit5 },
  { title: "Automated Remaind", anim: benefit6 },
];


const Benefits = () => (
  <section id="benefits" className="px-8 py-16 bg-gray-50">
    <h2 className="mb-8 text-2xl font-bold text-center text-black">
      Why Hisab<span className="text-orange-500">Kitab?</span>
    </h2>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
      {benefits.map((b, i) => (
        <motion.div
          key={i}
          className="overflow-hidden text-center text-black"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <Lottie animationData={b.anim} className="w-full h-40" loop={true} />
          <p className="p-4 font-semibold">{b.title}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Benefits;
