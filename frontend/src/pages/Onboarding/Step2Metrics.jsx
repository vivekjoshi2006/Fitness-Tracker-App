import React from 'react';

export default function Step2Metrics({ weight, setWeight, height, setHeight, onNext, onBack }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(weight) > 0) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 flex items-center justify-center font-bold">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Your measurements</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">These values are used to compute your BMI scale.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400">
            Weight (kg) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => {
              const val = e.target.value;
              setWeight(val === '' ? '' : Math.max(1, Number(val)));
            }}
            min="10"
            max="300"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
            placeholder="e.g. 70"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400">
            Height (cm) - Optional
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => {
              const val = e.target.value;
              setHeight(val === '' ? '' : Math.max(0, Number(val)));
            }}
            min="0"
            max="250"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
            placeholder="e.g. 175"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="w-1/2 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-colors text-sm"
        >
          Back
        </button>
        <button
          type="submit"
          className="w-1/2 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-semibold transition-colors shadow-lg shadow-emerald-500/10 text-sm"
        >
          Continue
        </button>
      </div>
    </form>
  );
}