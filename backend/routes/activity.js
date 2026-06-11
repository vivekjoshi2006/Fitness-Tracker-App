const express = require('express');
const router = express.Router();
const { addActivityLog, getDailyActivityLogs, deleteActivityLog } = require('../controllers/activityController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addActivityLog);
router.get('/:date', protect, getDailyActivityLogs);
router.delete('/:id', protect, deleteActivityLog);

module.exports = router;