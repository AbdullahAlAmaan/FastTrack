// backend/src/models/alarmModel.js
const mongoose = require('mongoose');

// Define the Alarm schema
const alarmSchema = new mongoose.Schema({
    suhoor: {
        type: String,
        required: true,
    },
    iftar: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the Alarm model
const Alarm = mongoose.model('Alarm', alarmSchema);

module.exports = Alarm;