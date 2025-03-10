// backend/src/utils/timeUtils.js

// Function to format time in HH:MM AM/PM format
const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString([], options);
};

// Function to calculate alarm time (20 minutes before the given time)
const calculateAlarmTime = (suhoorTime) => {
    const [hours, minutes] = suhoorTime.split(':').map(Number);
    const alarmDate = new Date();
    alarmDate.setHours(hours, minutes - 20, 0); // Set alarm 20 minutes before
    return formatTime(alarmDate); // Return the alarm time in a readable format
};

module.exports = {
    formatTime,
    calculateAlarmTime,
};