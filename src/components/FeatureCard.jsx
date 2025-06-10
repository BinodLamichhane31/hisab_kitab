import React from 'react';

const FeatureCard = ({ title, description, icon }) => (
  <div
    className="group w-full max-w-sm p-6 border rounded shadow-md transition-colors duration-300 text-black flex flex-col items-center justify-center text-center
      min-h-[150px] sm:min-h-[150px] md:min-h-[180px] lg:min-h-[250px]
      hover:bg-orange-500 hover:text-white"
  >
    <div className="text-4xl mb-4 text-orange-500 group-hover:text-white">
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-sm">{description}</p>
  </div>
);


export default FeatureCard;
