import React, { useState } from 'react';

export default function WeeklyChart({ data = [] }) {
  const [activeBar, setActiveBar] = useState(null);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const chartData = daysOfWeek.map((day) => {
    const found = data.find(d => d.day.substring(0, 3) === day);
    return {
      day,
      intake: found ? found.intake : 0,
      burn: found ? found.burn : 0
    };
  });

  const maxVal = Math.max(
    ...chartData.map(d => Math.max(d.intake, d.burn)),
    2000
  );

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="text-base font-bold text-slate-800 dark:text-white">This Week's Progress</h4>
        
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-slate-500 dark:text-slate-400">Intake</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="text-slate-500 dark:text-slate-400">Burn</span>
          </div>
        </div>
      </div>

      <div className="relative h-60 flex items-end justify-between pt-6">
        {/* Horizontal Gridlines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none border-b border-slate-100 dark:border-slate-800/40">
          <div className="w-full border-t border-slate-100 dark:border-slate-800/40"></div>
          <div className="w-full border-t border-slate-100 dark:border-slate-800/40"></div>
          <div className="w-full border-t border-slate-100 dark:border-slate-800/40"></div>
        </div>

        {chartData.map((d, index) => {
          const intakeHeight = (d.intake / maxVal) * 100;
          const burnHeight = (d.burn / maxVal) * 100;

          return (
            <div 
              key={d.day} 
              className="flex flex-col items-center flex-1 h-full relative"
              onMouseEnter={() => setActiveBar(index)}
              onMouseLeave={() => setActiveBar(null)}
            >
              {/* Interactive Tooltip Overlay */}
              {activeBar === index && (
                <div className="absolute -top-10 z-10 bg-slate-800 dark:bg-white text-white dark:text-slate-900 px-3 py-1.5 rounded-lg shadow-lg text-[10px] font-bold flex flex-col gap-0.5 whitespace-nowrap pointer-events-none transition-all">
                  <span className="text-slate-300 dark:text-slate-500 text-[8px] uppercase">{d.day} stats</span>
                  <span>Intake: {d.intake} kcal</span>
                  <span>Burn: {d.burn} kcal</span>
                </div>
              )}

              {/* Comparative Pillars */}
              <div className="flex items-end gap-1.5 h-[85%] w-full justify-center pb-2 z-0">
                <div 
                  className="w-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-all duration-500 ease-out"
                  style={{ height: `${intakeHeight}%` }}
                ></div>
                <div 
                  className="w-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-all duration-500 ease-out"
                  style={{ height: `${burnHeight}%` }}
                ></div>
              </div>

              <span className="text-xs font-semibold text-slate-400 h-[15%] flex items-center">
                {d.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}