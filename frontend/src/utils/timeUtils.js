// src/utils/timeUtils.js

// Function to calculate alarm time (20 minutes before the given time)
export const calculateAlarmTime = (suhoorTime) => {
    const [hours, minutes] = suhoorTime.split(':').map(Number);
    const alarmDate = new Date();
    alarmDate.setHours(hours, minutes - 20, 0); // Set alarm 20 minutes before suhoor time
    return alarmDate.toLocaleTimeString(); // Return the alarm time in a readable format
};

// Function to format time (optional)
export const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};