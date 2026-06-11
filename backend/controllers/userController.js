const mockDb = require('../mockDb');

const onboardUser = async (req, res) => {
  try {
    const userIndex = mockDb.users.findIndex(u => u._id === req.user._id);
    if (userIndex !== -1) {
      const user = mockDb.users[userIndex];
      user.age = req.body.age || user.age;
      user.weight = req.body.weight || user.weight;
      user.height = req.body.height || user.height;
      user.goal = req.body.goal || user.goal;
      user.dailyCalorieIntakeGoal = req.body.dailyCalorieIntakeGoal || user.dailyCalorieIntakeGoal;
      user.dailyCalorieBurnGoal = req.body.dailyCalorieBurnGoal || user.dailyCalorieBurnGoal;
      user.isOnboarded = true;

      mockDb.users[userIndex] = user;
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userIndex = mockDb.users.findIndex(u => u._id === req.user._id);
    if (userIndex !== -1) {
      const user = mockDb.users[userIndex];
      user.name = req.body.name || user.name;
      user.age = req.body.age !== undefined ? req.body.age : user.age;
      user.weight = req.body.weight !== undefined ? req.body.weight : user.weight;
      user.height = req.body.height !== undefined ? req.body.height : user.height;
      user.goal = req.body.goal || user.goal;
      user.dailyCalorieIntakeGoal = req.body.dailyCalorieIntakeGoal || user.dailyCalorieIntakeGoal;
      user.dailyCalorieBurnGoal = req.body.dailyCalorieBurnGoal || user.dailyCalorieBurnGoal;

      mockDb.users[userIndex] = user;
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { onboardUser, updateUserProfile };