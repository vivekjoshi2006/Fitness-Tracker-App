import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFetch } from '../hooks/useFetch';
import { getTodayDateString, calculateBMI } from '../utils/helpers';
import ProgressBar from '../components/ProgressBar';
import BMIScale from '../components/BMIScale';
import WeeklyChart from '../components/WeeklyChart';

export default function Dashboard() {
  const { user } = useAuth();
  const today = getTodayDateString();

  // Load food and activities logged today
  const { data: foodLogs, loading: foodLoading } = useFetch(`/logs/food/${today}`);
  const { data: activityLogs, loading: actLoading } = useFetch(`/activities/${today}`);

  const [weeklyData, setWeeklyData] = useState([]);

  // Aggregate current calories
  const caloriesConsumed = foodLogs ? foodLogs.reduce((sum, item) => sum + item.calories, 0) : 0;
  const caloriesBurned = activityLogs ? activityLogs.reduce((sum, item) => sum + item.caloriesBurned, 0) : 0;
  const activeTime = activityLogs ? activityLogs.reduce((sum, item) => sum + item.duration, 0) : 0;

  const calorieLimit = user?.dailyCalorieIntakeGoal || 2000;
  const burnTarget = user?.dailyCalorieBurnGoal || 400;

  // Compute live BMI index
  const bmiScore = calculateBMI(user?.weight, user?.height);

  // Fallback visual mock weekly data if db logs are currently empty
useEffect(() => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayName = weekdays[new Date().getDay()]; // e.g., 'Mon' on Monday

  const cleanWeek = [
    { day: 'Mon', intake: 0, burn: 0 },
    { day: 'Tue', intake: 0, burn: 0 },
    { day: 'Wed', intake: 0, burn: 0 },
    { day: 'Thu', intake: 0, burn: 0 },
    { day: 'Fri', intake: 0, burn: 0 },
    { day: 'Sat', intake: 0, burn: 0 },
    { day: 'Sun', intake: 0, burn: 0 },
  ];

  // Map over the clean week and only insert today's real logged progress
  const updatedWeekData = cleanWeek.map((d) => {
    if (d.day === todayName) {
      return {
        ...d,
        intake: caloriesConsumed,
        burn: caloriesBurned
      };
    }
    return d; 
  });

  setWeeklyData(updatedWeekData);
}, [caloriesConsumed, caloriesBurned]);

  const loading = foodLoading || actLoading;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex justify-between items-center p-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white shadow-md shadow-emerald-500/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">Welcome Back</span>
          <h2 className="text-2xl font-extrabold mt-1">Hi, {user?.name || 'User'}!</h2>
          <p className="text-sm text-emerald-50 mt-1">Ready to stay focused and track your habits today?</p>
        </div>
        <div className="text-4xl">💪</div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400">Loading progress data...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Indicators Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Double trackers progress card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm">
              <ProgressBar
                type="circular"
                value={caloriesConsumed}
                max={calorieLimit}
                label="Calorie Intake"
                subLabel={`${caloriesConsumed} / ${calorieLimit} kcal`}
                color="emerald"
              />
              <ProgressBar
                type="circular"
                value={caloriesBurned}
                max={burnTarget}
                label="Calories Burned"
                subLabel={`${caloriesBurned} / ${burnTarget} kcal`}
                color="amber"
              />
            </div>

            {/* Weekly analytical bar graph */}
            <WeeklyChart data={weeklyData} />
          </div>

          {/* Body Metrics Column */}
          <div className="space-y-6">
            <BMIScale bmi={bmiScore} />

            {/* Today's Stats List Card */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 dark:text-white">Today's Summary</h3>
              <div className="divide-y divide-slate-50 dark:divide-slate-800/60">
                <div className="flex justify-between py-3">
                  <span className="text-sm font-semibold text-slate-400">Meals Logged</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-white">
                    {foodLogs ? foodLogs.length : 0}
                  </span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-sm font-semibold text-slate-400">Active Time</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-white">{activeTime} mins</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-sm font-semibold text-slate-400">Net Calories</span>
                  <span className="text-sm font-bold text-emerald-500">
                    {caloriesConsumed - caloriesBurned} kcal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}