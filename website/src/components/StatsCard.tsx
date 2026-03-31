import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  unit?: string;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, unit, icon: Icon, trend, trendType }) => {
  return (
    <div className="bg-[#111111] border border-[#222222] p-6 rounded-xl hover:border-brand/50 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400 text-sm font-medium">{title}</span>
        <div className="bg-brand/10 p-2 rounded-lg">
          <Icon className="w-5 h-5 text-brand" />
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold">{value}</span>
        {unit && <span className="text-gray-500 text-sm">{unit}</span>}
      </div>
      {trend && (
        <div className={`mt-2 text-xs font-medium ${
          trendType === 'positive' ? 'text-green-500' :
          trendType === 'negative' ? 'text-red-500' : 'text-gray-500'
        }`}>
          {trend}
        </div>
      )}
    </div>
  );
};
