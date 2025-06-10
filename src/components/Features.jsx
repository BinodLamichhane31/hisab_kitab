import React from 'react';
import FeatureCard from './FeatureCard';
import { motion } from 'framer-motion';
import {
  HiOutlineTrendingUp,
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiOutlineChartBar,
  HiOutlineBell,
} from 'react-icons/hi';
import { MdOutlineSmartToy } from 'react-icons/md';
import { fadeInUp } from '../animations/motions';



const featureList = [
  { title: "Transaction Tracking", description: "Easily record all money in and out", icon: <HiOutlineTrendingUp size={32}/> },
  { title: "Stock & Shop Management", description: "Manage products and multiple shops easily", icon: <HiOutlineShoppingBag size={32} /> },
  { title: "Customer Management", description: "Monitor customer info and balances", icon: <HiOutlineUsers size={32} /> },
  { title: "Reports", description: "Generate all transaction reports", icon: <HiOutlineChartBar size={32} /> },
  { title: "Reminders", description: "Get due and payment reminders", icon: <HiOutlineBell size={32} /> },
  { title: "Hisab Assistant Bot", description: "Smart chatbot for help", icon: <MdOutlineSmartToy size={32} /> },
];


const Features = () => (
  <section id="features" className="px-16 py-12 bg-white sm:px-16 lg:px-20">
    <h2 className="mb-10 text-3xl font-bold text-center text-black">
      Explore <span className="text-orange-500">Key Features</span>
    </h2>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featureList.map((f, i) => (
        <motion.div
          key={i}
          className="overflow-hidden text-center text-black"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
            <FeatureCard key={i} {...f} />
        </motion.div>
      ))}
    </div>
  </section>
);

export default Features;
