import React from 'react';
import { PlantData } from '../types';
import { Droplets, Sun, Thermometer, Sprout, ShieldAlert, Info } from 'lucide-react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';

interface PlantCardProps {
  data: PlantData;
}

const PlantCard: React.FC<PlantCardProps> = ({ data }) => {
  const chartData = [
    { name: 'Water', value: data.waterNeeds * 10, fill: '#3b82f6' },
    { name: 'Sunlight', value: data.sunlightNeeds * 10, fill: '#eab308' },
    { name: 'Difficulty', value: data.difficulty * 10, fill: '#ef4444' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-leaf-50 to-sky-50 p-6 md:p-10 border-b border-leaf-100">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <h2 className="text-4xl font-display font-bold text-gray-900 tracking-tight">{data.name}</h2>
            <p className="text-xl text-leaf-600 italic font-medium mt-2">{data.scientificName}</p>
            <p className="mt-6 text-gray-600 leading-relaxed max-w-2xl text-lg">{data.description}</p>
          </div>
          
          {/* Vital Stats Chart */}
          <div className="w-full md:w-64 h-48 flex-shrink-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-4 border border-white">
             <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="100%" barSize={10} data={chartData}>
                <RadialBar
                  label={{ position: 'insideStart', fill: '#fff' }}
                  background
                  dataKey="value"
                />
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ fontSize: '12px', fontFamily: 'Inter', fontWeight: 600 }} />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Care Instructions Grid */}
      <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3 text-sky-600">
            <div className="p-2 bg-sky-100 rounded-lg">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-gray-900">Watering</h3>
          </div>
          <p className="text-gray-600 leading-relaxed font-medium">{data.care.water}</p>
        </div>

        <div className="bg-sun-50 rounded-2xl p-6 border border-sun-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3 text-sun-600">
            <div className="p-2 bg-sun-100 rounded-lg">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-gray-900">Light</h3>
          </div>
          <p className="text-gray-600 leading-relaxed font-medium">{data.care.light}</p>
        </div>

        <div className="bg-leaf-50 rounded-2xl p-6 border border-leaf-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3 text-leaf-600">
            <div className="p-2 bg-leaf-100 rounded-lg">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-gray-900">Soil</h3>
          </div>
          <p className="text-gray-600 leading-relaxed font-medium">{data.care.soil}</p>
        </div>

        <div className="bg-bloom-50 rounded-2xl p-6 border border-bloom-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3 text-bloom-600">
            <div className="p-2 bg-bloom-100 rounded-lg">
              <Thermometer className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-gray-900">Temperature</h3>
          </div>
          <p className="text-gray-600 leading-relaxed font-medium">{data.care.temperature}</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="px-6 md:px-10 pb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="border-2 border-red-100 bg-red-50/50 rounded-2xl p-5 flex items-start gap-4">
            <div className="p-2 bg-red-100 rounded-lg text-red-500 mt-1">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-red-900 text-sm uppercase tracking-wider mb-2">Toxicity</h4>
              <p className="text-gray-700 text-sm leading-relaxed font-medium">{data.toxicity}</p>
            </div>
         </div>

         <div className="border-2 border-sky-100 bg-sky-50/50 rounded-2xl p-5 flex items-start gap-4">
            <div className="p-2 bg-sky-100 rounded-lg text-sky-500 mt-1">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sky-900 text-sm uppercase tracking-wider mb-2">Fun Fact</h4>
              <p className="text-gray-700 text-sm leading-relaxed font-medium">{data.funFact}</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default PlantCard;
