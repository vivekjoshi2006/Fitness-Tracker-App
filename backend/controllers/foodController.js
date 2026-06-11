const mockDb = require('../mockDb');

const addFoodLog = async (req, res) => {
  const { name, calories, category, date } = req.body;
  try {
    const log = {
      _id: Date.now().toString(),
      user: req.user._id,
      name,
      calories: Number(calories),
      category,
      date,
      createdAt: new Date().toISOString()
    };
    mockDb.foodLogs.push(log);
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDailyFoodLogs = async (req, res) => {
  const { date } = req.params;
  try {
    const logs = mockDb.foodLogs.filter(log => log.user === req.user._id && log.date === date);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFoodLog = async (req, res) => {
  try {
    const index = mockDb.foodLogs.findIndex(log => log._id === req.params.id && log.user === req.user._id);
    if (index !== -1) {
      mockDb.foodLogs.splice(index, 1);
      res.json({ message: 'Food entry deleted successfully' });
    } else {
      res.status(404).json({ message: 'Log entry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addWaterLog = async (req, res) => {
  const { amount, date } = req.body;
  try {
    let log = mockDb.waterLogs.find(l => l.user === req.user._id && l.date === date);
    if (log) {
      log.amount += Number(amount);
    } else {
      log = {
        _id: Date.now().toString(),
        user: req.user._id,
        amount: Number(amount),
        date,
        createdAt: new Date().toISOString()
      };
      mockDb.waterLogs.push(log);
    }
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDailyWaterLog = async (req, res) => {
  const { date } = req.params;
  try {
    const log = mockDb.waterLogs.find(l => l.user === req.user._id && l.date === date);
    if (log) {
      res.json(log);
    } else {
      res.json({ amount: 0, date });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addFoodLog, getDailyFoodLogs, deleteFoodLog, addWaterLog, getDailyWaterLog };