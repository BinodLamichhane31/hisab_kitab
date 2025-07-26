import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-white border rounded-lg shadow-lg">
        <p className="font-bold text-gray-800">{label}</p>
        <p className="text-blue-500">{`Sales: Rs. ${payload[0].value.toLocaleString()}`}</p>
        <p className="text-purple-500">{`Purchases: Rs. ${payload[1].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const DashboardChart = ({ data, isLoading }) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-80">
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="w-full h-80">
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="purchases" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DashboardChart;