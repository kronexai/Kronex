import React from 'react';
import { TrendingUp } from 'lucide-react';

interface DailyData {
  day: string;
  usage: number;
}

const evolutionData: DailyData[] = [
  { day: 'Mon', usage: 45 },
  { day: 'Tue', usage: 52 },
  { day: 'Wed', usage: 48 },
  { day: 'Thu', usage: 61 },
  { day: 'Fri', usage: 55 },
  { day: 'Sat', usage: 67 },
  { day: 'Sun', usage: 72 },
];

export const DailyEvolution: React.FC = () => {
  const maxUsage = Math.max(...evolutionData.map(d => d.usage));

  return (
    <div className="bg-[#111111] border border-[#222222] p-6 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand" />
            Daily Evolution
          </h3>
          <p className="text-sm text-gray-500 mt-1">GPU usage trends over the last 7 days</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-brand">+27%</div>
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Weekly Growth</div>
        </div>
      </div>

      <div className="flex items-end justify-between gap-2 h-48">
        {evolutionData.map((data) => (
          <div key={data.day} className="flex-1 flex flex-col items-center gap-3 group">
            <div className="relative w-full flex justify-center">
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brand text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {data.usage}% Usage
              </div>

              {/* Bar */}
              <div
                className="w-full max-w-[40px] bg-brand/20 border border-brand/30 rounded-t-md transition-all duration-500 group-hover:bg-brand/40 group-hover:border-brand/50"
                style={{ height: `${(data.usage / maxUsage) * 160}px` }}
              >
                <div
                  className="w-full h-1.5 bg-brand rounded-t-full shadow-[0_-4px_12px_rgba(59,130,246,0.5)]"
                />
              </div>
            </div>
            <span className="text-xs font-medium text-gray-500 group-hover:text-white transition-colors">
              {data.day}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-[#222222] grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Peak Demand</div>
          <div className="text-sm font-semibold">Sunday @ 72%</div>
        </div>
        <div className="text-right space-y-1">
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Avg. Efficiency</div>
          <div className="text-sm font-semibold">57.1%</div>
        </div>
      </div>
    </div>
  );
};
