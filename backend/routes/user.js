const express = require('express');
const router = express.Router();
const { onboardUser, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.put('/onboard', protect, onboardUser);
router.put('/profile', protect, updateUserProfile);

module.exports = router;