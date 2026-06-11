import React, { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { apiRequest } from '../services/api';
import { getTodayDateString } from '../utils/helpers';
import FoodModal from '../components/Modals/FoodModal';

export default function FoodLog() {
  const today = getTodayDateString();
  const { data: logs, loading, refetch } = useFetch(`/logs/food/${today}`);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this food entry?')) {
      try {
        await apiRequest(`/logs/food/${id}`, 'DELETE');
        refetch();
      } catch (err) {
        alert(err.message || 'Could not delete entry.');
      }
    }
  };

  const handleQuickAdd = async (name, calories, category) => {
    try {
      await apiRequest('/logs/food', 'POST', { name, calories, category, date: today });
      refetch();
    } catch (err) {
      alert(err.message || 'Quick add failed.');
    }
  };

  const totals = logs ? logs.reduce((sum, log) => sum + log.calories, 0) : 0;

  const quickAddPresets = [
    { name: 'Apple', calories: 95, category: 'snack' },
    { name: 'Oatmeal', calories: 150, category: 'breakfast' },
    { name: 'Chicken & Rice', calories: 550, category: 'lunch' },
    { name: 'Protein Shake', calories: 200, category: 'snack' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Nutrition Log</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Track and view your meals logged today</p>
        </div>
        <div className="text-right">
          <span className="block text-xs font-semibold text-slate-400 uppercase">Today's Intake</span>
          <span className="text-2xl font-extrabold text-emerald-500">{totals} kcal</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core Logs Window */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-700 dark:text-slate-300">Logged Meals</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors"
            >
              + Add Food Entry
            </button>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-400">Loading meals...</div>
          ) : !logs || logs.length === 0 ? (
            <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 font-medium">
              No food logged for today. Let's start eating healthy!
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
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                      {log.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-slate-700 dark:text-slate-200">{log.calories} kcal</span>
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

        {/* Quick Add Sidebar */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm h-fit space-y-4">
          <h3 className="font-bold text-slate-800 dark:text-white">Quick Add Presets</h3>
          <div className="grid grid-cols-1 gap-2">
            {quickAddPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handleQuickAdd(preset.name, preset.calories, preset.category)}
                className="flex justify-between items-center p-3 text-left border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm"
              >
                <div>
                  <span className="font-medium text-slate-700 dark:text-slate-200">{preset.name}</span>
                  <span className="block text-[10px] text-slate-400 capitalize">{preset.category}</span>
                </div>
                <span className="text-xs font-bold text-emerald-500">+{preset.calories} kcal</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <FoodModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={refetch} 
        date={today} 
      />
    </div>
  );
}