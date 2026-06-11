const express = require('express');
const router = express.Router();
const { addFoodLog, getDailyFoodLogs, deleteFoodLog, addWaterLog, getDailyWaterLog } = require('../controllers/foodController');
const { protect } = require('../middleware/authMiddleware');

router.post('/food', protect, addFoodLog);
router.get('/food/:date', protect, getDailyFoodLogs);
router.delete('/food/:id', protect, deleteFoodLog);

router.post('/water', protect, addWaterLog);
router.get('/water/:date', protect, getDailyWaterLog);

module.exports = router;