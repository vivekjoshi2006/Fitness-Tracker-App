import React from 'react';

export default function ProgressBar({ 
  value = 0, 
  max = 100, 
  label, 
  subLabel, 
  color = 'emerald', // emerald, amber, red, blue
  type = 'linear' // linear, circular
}) {
  const percentage = max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0;

  const colorMap = {
    emerald: {
      bg: 'bg-emerald-500',
      track: 'bg-emerald-100 dark:bg-emerald-950/20',
      text: 'text-emerald-500',
      stroke: 'stroke-emerald-500'
    },
    amber: {
      bg: 'bg-amber-500',
      track: 'bg-amber-100 dark:bg-amber-950/20',
      text: 'text-amber-500',
      stroke: 'stroke-amber-500'
    },
    red: {
      bg: 'bg-red-500',
      track: 'bg-red-100 dark:bg-red-950/20',
      text: 'text-red-500',
      stroke: 'stroke-red-500'
    },
    blue: {
      bg: 'bg-blue-500',
      track: 'bg-blue-100 dark:bg-blue-950/20',
      text: 'text-blue-500',
      stroke: 'stroke-blue-500'
    }
  };

  const classes = colorMap[color] || colorMap.emerald;

  if (type === 'circular') {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-slate-100 dark:text-slate-800"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
            <circle
              className={`${classes.stroke} transition-all duration-500 ease-out`}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-xl font-extrabold text-slate-800 dark:text-white">
              {Math.round(percentage)}%
            </span>
            {subLabel && <span className="text-[10px] text-slate-400">{subLabel}</span>}
          </div>
        </div>
        {label && <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</span>}
      </div>
    );
  }

  return (
    <div className="space-y-1.5 w-full">
      {(label || subLabel) && (
        <div className="flex justify-between items-baseline text-xs font-semibold">
          <span className="text-slate-500 dark:text-slate-400">{label}</span>
          <span className={`${classes.text}`}>{subLabel || `${Math.round(percentage)}%`}</span>
        </div>
      )}
      <div className="h-2.5 w-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <div 
          className={`h-full ${classes.bg} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}