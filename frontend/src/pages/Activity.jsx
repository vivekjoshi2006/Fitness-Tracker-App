import React, { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { apiRequest } from '../services/api';
import { getTodayDateString } from '../utils/helpers';
import ActivityModal from '../components/Modals/ActivityModal';

export default function Activity() {
  const today = getTodayDateString();
  const { data: logs, loading, refetch } = useFetch(`/activities/${today}`);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this workout entry?')) {
      try {
        await apiRequest(`/activities/${id}`, 'DELETE');
        refetch();
      } catch (err) {
        alert(err.message || 'Could not delete entry.');
      }
    }
  };

  const handleQuickAdd = async (name, duration, caloriesBurned) => {
    try {
      await apiRequest('/activities', 'POST', { name, duration, caloriesBurned, date: today });
      refetch();
    } catch (err) {
      alert(err.message || 'Quick add failed.');
    }
  };

  const totals = logs ? logs.reduce((sum, log) => sum + log.caloriesBurned, 0) : 0;

  const quickActivityPresets = [
    { name: 'Walking', duration: 30, caloriesBurned: 120 },
    { name: 'Running', duration: 20, caloriesBurned: 240 },
    { name: 'Cycling', duration: 30, caloriesBurned: 200 },
    { name: 'Yoga', duration: 45, caloriesBurned: 150 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Activity Log</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Log and manage your daily fitness workouts</p>
        </div>
        <div className="text-right">
          <span className="block text-xs font-semibold text-slate-400 uppercase">Today's Burn</span>
          <span className="text-2xl font-extrabold text-emerald-500">{totals} kcal</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core Activity Window */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-700 dark:text-slate-300">Today's Workouts</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors"
            >
              + Log Activity
            </button>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-400">Loading activities...</div>
          ) : !logs || logs.length === 0 ? (
            <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 font-medium">
              No workouts logged for today. Time to get moving!
            </div>
          ) : (
            <div className="space-y-2">
              {logs.map((log) => (
                <div 
                  key={log._id} 
                  className="flex justify-between items-center p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-xl hover:shadow-sm transition-shadow"
                >
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">{log.name}</h4>
                    <span className="text-[10px] font-bold text-slate-400">
                      Duration: {log.duration} minutes
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-amber-500">-{log.caloriesBurned} kcal</span>
                    <button 
                      onClick={() => handleDelete(log._id)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-1"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Activity Presets */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm h-fit space-y-4">
          <h3 className="font-bold text-slate-800 dark:text-white">Quick Exercise Presets</h3>
          <div className="grid grid-cols-1 gap-2">
            {quickActivityPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handleQuickAdd(preset.name, preset.duration, preset.caloriesBurned)}
                className="flex justify-between items-center p-3 text-left border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm"
              >
                <div>
                  <span className="font-medium text-slate-700 dark:text-slate-200">{preset.name}</span>
                  <span className="block text-[10px] text-slate-400">{preset.duration} mins</span>
                </div>
                <span className="text-xs font-bold text-amber-500">-{preset.caloriesBurned} kcal</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <ActivityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={refetch} 
        date={today} 
      />
    </div>
  );
}