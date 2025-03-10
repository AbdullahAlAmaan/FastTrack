// backend/src/routes/alarmRoutes.js
const express = require('express');
const router = express.Router();
const alarmController = require('../controllers/alarmController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware

// Define routes for alarms
router.post('/', authMiddleware, alarmController.createAlarm); // Protect this route
router.get('/', alarmController.getAlarms); // Get all alarms
router.put('/:id', authMiddleware, alarmController.updateAlarm); // Protect this route
router.delete('/:id', authMiddleware, alarmController.deleteAlarm); // Protect this route

module.exports = router;