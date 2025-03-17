const express = require('express');
const router = express.Router();
const alarmController = require('../controllers/alarmController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/alarms', alarmController.getAlarms);
router.post('/upload', upload.single('file'), alarmController.uploadAlarm);

module.exports = router;