// import { useState, useEffect } from 'react';

// const AlarmSound = ({ offset, sehriTime }) => {
//   const [alarmTime, setAlarmTime] = useState(null);

//   // Function to play the alarm sound
//   const playAlarm = () => {
//     const sound = new Audio('https://storage.googleapis.com/suhoor/mixkit-warning-alarm-buzzer-991.wav');
//     sound.play();
//   };

//   const convertTimeToDate = (timeString) => {
//     const [hour, minute] = timeString.split(":");
//     const date = new Date();
//     date.setHours(parseInt(hour), parseInt(minute), 0, 0);
//     return date;
//   };

//   // Function to calculate the alarm time based on Sehri time and user offset
//   const calculateAlarmTime = () => {
//     if (sehriTime) {
//       const sehriDate = convertTimeToDate(sehriTime);  // Convert Sehri time to a Date object
//       const alarmTime = new Date(sehriDate.getTime() - offset * 60000);  
//       setAlarmTime(alarmTime);
//     }
//   };

//   useEffect(() => {
//     if (sehriTime && offset !== null) {
//       calculateAlarmTime();  // Only calculate if Sehri time and offset are valid
//     }

//     // Set an interval to check every minute
//     const intervalId = setInterval(() => {
//       if (alarmTime) {
//         const currentTime = new Date();
//         // If the current time matches the alarm time, play the alarm
//         if (currentTime >= alarmTime && currentTime < new Date(alarmTime.getTime() + 60000)) {
//           playAlarm();
//           clearInterval(intervalId);  // Clear the interval after alarm is played
//         }
//       }
//     }, 60000);  // Check every minute

//     return () => clearInterval(intervalId);  // Clean up on component unmount or re-render
//   }, [offset, sehriTime]);  // Recalculate alarm time whenever offset or Sehri time changes

//   return (
//     <div>
//       {/* Test alarm button for immediate testing */}
//       <button className='test-button' onClick={playAlarm}>Test Alarm</button>
//     </div>
//   );
// };

// export default AlarmSound;
import { useState, useEffect } from 'react';

const AlarmSound = () => {
  const [alarmTime, setAlarmTime] = useState(null);
  
  // Manually set time and offset for testing purposes
  const manualTime = '14:38'; // 2:30 PM (24-hour format)
  const offset = 2; // 5 minutes before the manual time (should trigger at 2:25 PM)

  // Function to play the alarm sound
  const playAlarm = () => {
    const sound = new Audio('https://storage.googleapis.com/suhoor/mixkit-warning-alarm-buzzer-991.wav');
    sound.play();
  };

  // Convert the time string (HH:mm) into a Date object with today's date
  const convertTimeToDate = (timeString) => {
    const [hour, minute] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hour), parseInt(minute), 0, 0); // Set hour, minute, seconds, and milliseconds
    return date;
  };

  // Function to calculate the alarm time based on manual time and offset
  const calculateAlarmTime = () => {
    const manualDate = convertTimeToDate(manualTime);  // Convert manual time to Date object
    const calculatedAlarmTime = new Date(manualDate.getTime() - offset * 60000);  // Subtract offset in minutes
    setAlarmTime(calculatedAlarmTime);
  };

  useEffect(() => {
    calculateAlarmTime();  // Calculate alarm time based on manual time and offset

    // Set an interval to check every second
    const intervalId = setInterval(() => {
      if (alarmTime) {
        const currentTime = new Date();
        // Allow a tolerance of 5 seconds for the alarm to trigger
        if (currentTime >= alarmTime && currentTime < new Date(alarmTime.getTime() + 5000)) {
          playAlarm();
          clearInterval(intervalId);  // Clear the interval after the alarm is played
        }
      }
    }, 1000);  // Check every second

    return () => clearInterval(intervalId);  // Clean up on component unmount
  }, [alarmTime]);  // Recalculate alarm time whenever alarmTime changes

  return (
    <div>
      <p>Manual time set to: {manualTime}</p>
      <p>Offset: {offset} minutes</p>
      <p>Alarm will trigger at: {alarmTime ? alarmTime.toLocaleTimeString() : 'Not set yet'}</p>
      <button className="test-button" onClick={playAlarm}>Test Alarm</button>
    </div>
  );
};

export default AlarmSound;
