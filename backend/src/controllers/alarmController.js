// backend/src/controllers/alarmController.js
const Alarm = require('../models/alarmModel'); // Import the Alarm model

// Create a new alarm
exports.createAlarm = async (req, res) => {
    try {
        const { suhoor, iftar } = req.body;
        const newAlarm = new Alarm({ suhoor, iftar });
        await newAlarm.save();
        res.status(201).json(newAlarm);
    } catch (error) {
        res.status(500).json({ message: 'Error creating alarm', error });
    }
};

// Get all alarms
exports.getAlarms = async (req, res) => {
    try {
        const alarms = await Alarm.find();
        res.status(200).json(alarms);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching alarms', error });
    }
};

// Update an alarm
exports.updateAlarm = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAlarm = await Alarm.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAlarm) {
            return res.status(404).json({ message: 'Alarm not found' });
        }
        res.status(200).json(updatedAlarm);
    } catch (error) {
        res.status(500).json({ message: 'Error updating alarm', error });
    }
};

// Delete an alarm
exports.deleteAlarm = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAlarm = await Alarm.findByIdAndDelete(id);
        if (!deletedAlarm) {
            return res.status(404).json({ message: 'Alarm not found' });
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: 'Error deleting alarm', error });
    }
};