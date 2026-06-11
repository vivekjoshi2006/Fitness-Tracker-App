const mockDb = require('../mockDb');

const addActivityLog = async (req, res) => {
  const { name, duration, caloriesBurned, date } = req.body;
  try {
    const log = {
      _id: Date.now().toString(),
      user: req.user._id,
      name,
      duration: Number(duration),
      caloriesBurned: Number(caloriesBurned),
      date,
      createdAt: new Date().toISOString()
    };
    mockDb.activityLogs.push(log);
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDailyActivityLogs = async (req, res) => {
  const { date } = req.params;
  try {
    const logs = mockDb.activityLogs.filter(log => log.user === req.user._id && log.date === date);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteActivityLog = async (req, res) => {
  try {
    const index = mockDb.activityLogs.findIndex(log => log._id === req.params.id && log.user === req.user._id);
    if (index !== -1) {
      mockDb.activityLogs.splice(index, 1);
      res.json({ message: 'Activity deleted successfully' });
    } else {
      res.status(404).json({ message: 'Entry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addActivityLog, getDailyActivityLogs, deleteActivityLog };