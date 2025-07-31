import React from 'react';
import FeatureCard from './FeatureCard';
import { motion } from 'framer-motion';
import {
  HiOutlineTrendingUp, HiOutlineShoppingBag, HiOutlineUsers,
  HiOutlineChartBar, HiOutlineBell,
} from 'react-icons/hi';
import { MdOutlineSmartToy } from 'react-icons/md';


const featureList = [
  { title: "Transaction Tracking", description: "Easily record all money in and out", icon: <HiOutlineTrendingUp size={32}/> },
  { title: "Stock & Shop Management", description: "Manage products and multiple shops easily", icon: <HiOutlineShoppingBag size={32} /> },
  { title: "Customer Management", description: "Monitor customer info and balances", icon: <HiOutlineUsers size={32} /> },
  { title: "Reports", description: "Generate all transaction reports", icon: <HiOutlineChartBar size={32} /> },
  { title: "Reminders", description: "Get due and payment reminders", icon: <HiOutlineBell size={32} /> },
  { title: "Hisab Assistant Bot", description: "Smart chatbot for help", icon: <MdOutlineSmartToy size={32} /> },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // COOL DESIGN: Staggered animation for cards
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Features = () => (
  <section id="features" className="px-8 py-20 bg-white sm:px-16 lg:px-20">
    <div className="max-w-screen-xl mx-auto text-center">
      <h2 className="text-3xl font-bold md:text-4xl text-slate-900">
        Everything You Need, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">All In One Place</span>
      </h2>
      <p className="max-w-2xl mx-auto mt-4 text-slate-600">
        From daily transactions to insightful reports, HisabKitab provides powerful tools to streamline your business operations.
      </p>
    </div>
    <motion.div
      className="grid max-w-screen-xl grid-cols-1 gap-8 mx-auto mt-12 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {featureList.map((feature, i) => (
        <motion.div key={i} variants={itemVariants}>
          <FeatureCard {...feature} />
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default Features;