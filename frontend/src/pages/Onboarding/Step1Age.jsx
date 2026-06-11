import React from 'react';

export default function Step1Age({ age, setAge, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(age) > 0) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 flex items-center justify-center font-bold">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">How old are you?</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">This helps us calculate your baseline metabolic targets.</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400">
          Age <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={age} // Directly binds the empty state
          onChange={(e) => {
            const val = e.target.value;
            // Allows blank inputs, otherwise validates positive integers
            setAge(val === '' ? '' : Math.max(1, Number(val)));
          }}
          min="1"
          max="120"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-lg font-medium"
          placeholder="Enter age"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-semibold transition-colors shadow-lg shadow-emerald-500/10 text-sm"
      >
        Continue
      </button>
    </form>
  );
}