import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const CustomXAxisTick = ({ x, y, payload }) => {
  if (!payload || !payload.value) return null;

  const [month, year] = payload.value.split(' ');
  const currentYear = new Date().getFullYear().toString();

  const tickColor = year === currentYear ? '#374151' : '#9ca3af';

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill={tickColor} transform="rotate(-35)" fontSize={12}>
        {month}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3 border shadow-2xl bg-white/80 backdrop-blur-sm border-gray-200/50 rounded-xl"
      >
        <p className="font-bold text-gray-800 text-md">{label}</p>
        <div className="mt-2 space-y-1">
          <p className="text-sm font-medium text-blue-500">{`Sales: Rs. ${payload[0].value.toLocaleString()}`}</p>
          <p className="text-sm font-medium text-purple-500">{`Purchases: Rs. ${payload[1].value.toLocaleString()}`}</p>
        </div>
      </motion.div>
    );
  }
  return null;
};

const formatYAxis = (tick) => {
  if (tick >= 1000) {
    return `${tick / 1000}k`;
  }
  return tick;
};

const DashboardChart = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-96 bg-gray-50 rounded-xl">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
      </div>
    );
  }

  const hasData = data && data.some(d => d.sales > 0 || d.purchases > 0);

  if (!hasData) {
    return (
      <div className="flex items-center justify-center w-full h-96 bg-gray-50 rounded-xl">
        <p className="text-gray-500">Not enough data to display chart.</p>
      </div>
    );
  }
  
  const currentYear = new Date().getFullYear().toString();
  const yearChangeIndex = data.findIndex(d => d.name.includes(currentYear));
  const referenceLineX = yearChangeIndex > 0 ? data[yearChangeIndex].name : null;

  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 30 }}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPurchases" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
          
          <XAxis 
            dataKey="name" 
            tick={<CustomXAxisTick />}
            axisLine={false} 
            tickLine={false} 
            interval={0}
            height={50}
          />
          
          <YAxis 
            tickFormatter={formatYAxis} 
            tick={{ fill: '#6b7280', fontSize: 12 }} 
            axisLine={false} 
            tickLine={false} 
          />
          
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(156, 163, 175, 0.3)', strokeWidth: 1, strokeDasharray: '3 3' }} />
          <Legend wrapperStyle={{ paddingTop: '40px' }} />

          {referenceLineX && (
            <ReferenceLine x={referenceLineX} stroke="#6b7280" strokeDasharray="4 4">
              <Label 
                value={currentYear} 
                position="top" 
                fill="#6b7280" 
                fontSize={12} 
                fontWeight="bold" 
                dy={-10} 
              />
            </ReferenceLine>
          )}

          <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" activeDot={{ r: 7, strokeWidth: 2, fill: 'white' }} />
          <Area type="monotone" dataKey="purchases" stroke="#8b5cf6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPurchases)" activeDot={{ r: 7, strokeWidth: 2, fill: 'white' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;