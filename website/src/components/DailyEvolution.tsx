import React, { useMemo } from 'react';
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

const DAY_NAMES: Record<string, string> = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday',
};

export const DailyEvolution: React.FC = () => {
  const { maxUsage, peakDay, avgEfficiency, weeklyGrowth } = useMemo(() => {
    if (!evolutionData || evolutionData.length === 0) {
      return { maxUsage: 100, peakDay: null, avgEfficiency: '0', weeklyGrowth: 0 };
    }

    const usages = evolutionData.map(d => d.usage);
    const max = Math.max(...usages);
    const peak = evolutionData.find(d => d.usage === max);
    const total = usages.reduce((acc, curr) => acc + curr, 0);
    const avg = (total / evolutionData.length).toFixed(1);

    const growth = evolutionData.length > 1
      ? Math.round(((evolutionData[evolutionData.length - 1].usage - evolutionData[0].usage) / evolutionData[0].usage) * 100)
      : 0;

    return { maxUsage: max || 100, peakDay: peak, avgEfficiency: avg, weeklyGrowth: growth };
  }, []);

  return (
    <div className="bg-[#111111] border border-[#222222] p-6 rounded-xl overflow-hidden h-full flex flex-col text-white group/container">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand" />
            Daily Evolution
          </h3>
          <p className="text-sm text-gray-500 mt-1">GPU usage trends over the last 7 days</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-brand">
            {weeklyGrowth >= 0 ? '+' : ''}{weeklyGrowth}%
          </div>
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Weekly Growth</div>
        </div>
      </div>

      <div className="flex items-stretch justify-between gap-2 h-48 mb-2 flex-grow">
        {evolutionData.map((data, index) => (
          <div key={data.day} className="flex-1 flex flex-col items-center gap-3 group">
            <div className="w-full flex-1 flex justify-center items-end h-full">
              {/* Bar */}
              <div
                className="w-full max-w-[32px] bg-brand/10 border border-brand/20 rounded-t-md transition-all duration-700 group-hover:bg-brand/30 group-hover:border-brand/40 relative"
                style={{
                  height: `${(data.usage / maxUsage) * 100}%`,
                  transitionDelay: `${index * 50}ms`
                }}
              >
                {/* Tooltip nested within bar's relative container */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand text-white text-[10px] font-bold py-1.5 px-2.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none transform translate-y-2 group-hover:translate-y-0 z-10 whitespace-nowrap">
                  {data.usage}% Usage
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand rotate-45" />
                </div>

                <div
                  className="w-full h-1 bg-brand rounded-t-full shadow-[0_-4px_12px_rgba(59,130,246,0.6)]"
                />
              </div>
            </div>
            <span className="text-[10px] font-bold text-gray-500 group-hover:text-white transition-colors uppercase tracking-tight">
              {data.day}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-[#222222] grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Peak Demand</div>
          <div className="text-sm font-semibold truncate">
            {peakDay ? `${DAY_NAMES[peakDay.day] || peakDay.day} @ ${peakDay.usage}%` : 'N/A'}
          </div>
        </div>
        <div className="text-right space-y-1">
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Avg. Efficiency</div>
          <div className="text-sm font-semibold">{avgEfficiency}%</div>
        </div>
      </div>
    </div>
  );
};
