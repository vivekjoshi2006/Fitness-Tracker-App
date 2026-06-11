import React from 'react';

export default function Step3Goals({
  goal,
  setGoal,
  dailyCalorieIntakeGoal,
  setDailyCalorieIntakeGoal,
  dailyCalorieBurnGoal,
  setDailyCalorieBurnGoal,
  onBack,
  onSubmit,
  loading
}) {
  const goals = ['Lose Weight', 'Maintain Weight', 'Gain Muscle'];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 flex items-center justify-center font-bold">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">What's your goal?</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">This configures your target metric thresholds.</p>
        </div>
      </div>

      {/* Select Goal Cards */}
      <div className="grid grid-cols-3 gap-3">
        {goals.map((g) => {
          const isSelected = goal === g;
          return (
            <button
              key={g}
              type="button"
              onClick={() => setGoal(g)}
              className={`p-4 rounded-xl border text-center transition-all ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-500 dark:text-slate-400 text-sm'
              }`}
            >
              {g}
            </button>
          );
        })}
      </div>

      {/* Daily Targets Configuration */}
      <div className="p-5 bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/60 rounded-xl space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Daily Targets</h4>

        {/* Intake slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
            <span>Daily Calorie Intake</span>
            <span className="text-emerald-500">{dailyCalorieIntakeGoal} kcal</span>
          </div>
          <input
            type="range"
            min="1000"
            max="4000"
            step="50"
            value={dailyCalorieIntakeGoal}
            onChange={(e) => setDailyCalorieIntakeGoal(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        {/* Burn slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
            <span>Daily Calorie Burn</span>
            <span className="text-emerald-500">{dailyCalorieBurnGoal} kcal</span>
          </div>
          <input
            type="range"
            min="100"
            max="1500"
            step="50"
            value={dailyCalorieBurnGoal}
            onChange={(e) => setDailyCalorieBurnGoal(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
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
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="w-1/2 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-semibold transition-colors shadow-lg shadow-emerald-500/10 text-sm disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Finish Setup'}
        </button>
      </div>
    </div>
  );
}