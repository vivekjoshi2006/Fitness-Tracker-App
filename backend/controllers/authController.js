const mockDb = require('../mockDb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'presentation_secret_key', { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    
    // If the email already exists in RAM, remove the old user's

    const existingUserIndex = mockDb.users.findIndex(u => u.email === email);
    if (existingUserIndex !== -1) {
      const existingUser = mockDb.users[existingUserIndex];
      
      // Delete old user
      mockDb.users.splice(existingUserIndex, 1);
      
      // Clear their logged history
      mockDb.foodLogs = mockDb.foodLogs.filter(log => log.user !== existingUser._id);
      mockDb.activityLogs = mockDb.activityLogs.filter(log => log.user !== existingUser._id);
      mockDb.waterLogs = mockDb.waterLogs.filter(log => log.user !== existingUser._id);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      _id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      isOnboarded: false,
      age: null,
      weight: null,
      height: null,
      goal: 'Maintain Weight',
      dailyCalorieIntakeGoal: 2000,
      dailyCalorieBurnGoal: 400
    };

    mockDb.users.push(newUser);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isOnboarded: newUser.isOnboarded,
      token: generateToken(newUser._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = mockDb.users.find(u => u.email === email);
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isOnboarded: user.isOnboarded,
        age: user.age,
        weight: user.weight,
        height: user.height,
        goal: user.goal,
        dailyCalorieIntakeGoal: user.dailyCalorieIntakeGoal,
        dailyCalorieBurnGoal: user.dailyCalorieBurnGoal,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const validateToken = async (req, res) => {
  try {
    const user = mockDb.users.find(u => u._id === req.user._id);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ message: 'User profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, validateToken };