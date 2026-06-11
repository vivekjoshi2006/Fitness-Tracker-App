export const calculateBMI = (weight, heightCm) => {
  if (!weight || !heightCm || heightCm <= 0 || weight <= 0) {
    return null;
  }
  const heightMeters = heightCm / 100;
  return Number((weight / (heightMeters * heightMeters)).toFixed(1));
};

export const getTodayDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const calculateCalorieTargets = (age, weight, height, goal) => {
  const parsedAge = Number(age) || 20;
  const parsedWeight = Number(weight) || 60;
  const parsedHeight = Number(height) || 160;

  const bmr = (10 * parsedWeight) + (6.25 * parsedHeight) - (5 * parsedAge) + 5;
  const maintenance = Math.round(bmr * 1.375);

  let dailyCalorieIntakeGoal = maintenance;
  let dailyCalorieBurnGoal = 400;

  if (goal === 'Lose Weight') {
    dailyCalorieIntakeGoal = Math.max(1200, maintenance - 500);
    dailyCalorieBurnGoal = 500;
  } else if (goal === 'Gain Muscle') {
    dailyCalorieIntakeGoal = maintenance + 300;
    dailyCalorieBurnGoal = 350;
  }

  return { dailyCalorieIntakeGoal, dailyCalorieBurnGoal };
};