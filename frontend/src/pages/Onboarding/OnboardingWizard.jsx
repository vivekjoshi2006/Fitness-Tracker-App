import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { calculateCalorieTargets } from '../../utils/helpers';
import Step1Age from './Step1Age';
import Step2Metrics from './Step2Metrics';
import Step3Goals from './Step3Goals';

export default function OnboardingWizard() {
  const { onboard } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
const [age, setAge] = useState('');
const [weight, setWeight] = useState('');
const [height, setHeight] = useState('');
const [goal, setGoal] = useState('Maintain Weight');

  // Calculated Slider Target Recommendations
  const [dailyCalorieIntakeGoal, setDailyCalorieIntakeGoal] = useState(2000);
  const [dailyCalorieBurnGoal, setDailyCalorieBurnGoal] = useState(400);

  // Recalculates recommeded targets whenever metric values or goals shift
  useEffect(() => {
    const { dailyCalorieIntakeGoal: intake, dailyCalorieBurnGoal: burn } = 
      calculateCalorieTargets(age, weight, height, goal);
    
    setDailyCalorieIntakeGoal(intake);
    setDailyCalorieBurnGoal(burn);
  }, [age, weight, height, goal]);

  const handleFinish = async () => {
    setLoading(true);
    setError('');
    try {
      await onboard({
        age,
        weight,
        height,
        goal,
        dailyCalorieIntakeGoal,
        dailyCalorieBurnGoal
      });
      // Redirect is handled automatically by the App.jsx ProtectedRoute layout guards
    } catch (err) {
      setError(err.message || 'Onboarding failed, please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step Indicators Progress Percentage
  const progressPercent = step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full';

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 p-4 transition-colors">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-8 space-y-6">
        {/* Header Branding */}
        <div className="flex items-center gap-3 justify-center mb-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-lg">
            F
          </div>
          <span className="font-bold text-lg text-slate-800 dark:text-white">FitTrack</span>
        </div>

        {/* Global Progress Header */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline text-xs font-semibold text-slate-400">
            <span>Let's personalize your experience</span>
            <span>Step {step} of 3</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full bg-emerald-500 transition-all duration-300 ${progressPercent}`}></div>
          </div>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 rounded-lg">
            {error}
          </div>
        )}

        {/* Steps Rendering Logic */}
        {step === 1 && (
          <Step1Age 
            age={age} 
            setAge={setAge} 
            onNext={() => setStep(2)} 
          />
        )}
        {step === 2 && (
          <Step2Metrics 
            weight={weight} 
            setWeight={setWeight} 
            height={height} 
            setHeight={setHeight} 
            onNext={() => setStep(3)} 
            onBack={() => setStep(1)} 
          />
        )}
        {step === 3 && (
          <Step3Goals 
            goal={goal} 
            setGoal={setGoal}
            dailyCalorieIntakeGoal={dailyCalorieIntakeGoal}
            setDailyCalorieIntakeGoal={setDailyCalorieIntakeGoal}
            dailyCalorieBurnGoal={dailyCalorieBurnGoal}
            setDailyCalorieBurnGoal={setDailyCalorieBurnGoal}
            onBack={() => setStep(2)}
            onSubmit={handleFinish}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}