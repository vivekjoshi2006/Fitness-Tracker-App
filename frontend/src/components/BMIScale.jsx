import React from 'react';

export default function BMIScale({ bmi }) {
  const bmiValue = parseFloat(bmi);
  
  let category = 'Unknown';
  let colorClass = 'text-slate-500';
  
  if (bmiValue < 18.5) {
    category = 'Underweight';
    colorClass = 'text-blue-500';
  } else if (bmiValue >= 18.5 && bmiValue < 25) {
    category = 'Normal';
    colorClass = 'text-emerald-500';
  } else if (bmiValue >= 25 && bmiValue < 30) {
    category = 'Overweight';
    colorClass = 'text-amber-500';
  } else if (bmiValue >= 30) {
    category = 'Obese';
    colorClass = 'text-red-500';
  }

  // Maps BMI value (ranging from 15 to 35) to 0% - 100% boundary positions
  const minScale = 15;
  const maxScale = 35;
  const percentage = isNaN(bmiValue) 
    ? 0 
    : Math.min(Math.max(((bmiValue - minScale) / (maxScale - minScale)) * 100, 0), 100);

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400">BMI Indicator</h4>
        <span className={`text-sm font-bold ${colorClass}`}>{category}</span>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-extrabold text-slate-800 dark:text-white">
          {isNaN(bmiValue) ? '--' : bmiValue.toFixed(1)}
        </span>
        <span className="text-xs text-slate-400">kg/m²</span>
      </div>

      {/* Colored Range Bar */}
      <div className="relative pt-4">
        <div className="h-2 w-full rounded-full flex overflow-hidden bg-slate-100 dark:bg-slate-800">
          <div className="bg-blue-400 h-full" style={{ width: '17.5%' }}></div>
          <div className="bg-emerald-400 h-full" style={{ width: '32.5%' }}></div>
          <div className="bg-amber-400 h-full" style={{ width: '25%' }}></div>
          <div className="bg-red-400 h-full" style={{ width: '25%' }}></div>
        </div>

        {/* Dynamic Pointer Indicator */}
        {!isNaN(bmiValue) && (
          <div 
            className="absolute top-3 transition-all duration-500 ease-out flex flex-col items-center -translate-x-1/2"
            style={{ left: `${percentage}%` }}
          >
            <div className="w-3 h-3 bg-slate-800 dark:bg-white rounded-full border-2 border-white dark:border-slate-900 shadow"></div>
            <div className="w-1 h-2 bg-slate-800 dark:bg-white"></div>
          </div>
        )}
      </div>

      {/* Metric Labels */}
      <div className="flex justify-between text-[10px] font-semibold text-slate-400 px-1">
        <span>15.0</span>
        <span>18.5</span>
        <span>25.0</span>
        <span>30.0</span>
        <span>35.0</span>
      </div>
    </div>
  );
}