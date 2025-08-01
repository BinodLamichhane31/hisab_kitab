// src/components/dashboard/StatCard.jsx

import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, title, value, isLoading, formatAsCurrency = false }) => {
  const displayValue = () => {
    if (isLoading) {
      return <div className="w-24 h-8 bg-gray-200 rounded-md animate-pulse"></div>;
    }
    if (value === null || value === undefined) {
      return <span className="text-3xl font-bold text-gray-400">0</span>;
    }
    const formattedValue = formatAsCurrency 
      ? `Rs. ${value.toLocaleString()}`
      : value.toLocaleString();
      
    return <span className="text-xl font-bold text-gray-800">{formattedValue}</span>;
  };

  return (
    <motion.div className="p-5 overflow-hidden bg-white shadow-lg rounded-xl ring-1 ring-black ring-opacity-5">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center text-orange-600 bg-orange-100 rounded-full w-14 h-14">
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="mt-1">
            {displayValue()}
          </div>
        </div>
      </div>
    </motion.div>
  );     
};

export default StatCard;