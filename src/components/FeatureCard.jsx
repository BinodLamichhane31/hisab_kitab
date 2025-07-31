import React from 'react';

const FeatureCard = ({ title, description, icon }) => (
  <div className="relative w-full h-full p-8 text-center transition-transform duration-300 transform bg-slate-50 rounded-xl group hover:-translate-y-2">
    <div className="absolute inset-0 transition-all duration-300 border-2 border-transparent rounded-xl group-hover:border-orange-400 group-hover:shadow-2xl group-hover:shadow-orange-500/20"></div>
    
    <div className="relative flex flex-col items-center justify-start h-full">
      <div className="flex items-center justify-center w-16 h-16 mb-6 text-orange-500 transition-all duration-300 bg-white rounded-lg shadow-md group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110">
        {React.cloneElement(icon, { size: 32 })}
      </div>
      <h3 className="mb-2 text-lg font-bold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  </div>
);

export default FeatureCard;