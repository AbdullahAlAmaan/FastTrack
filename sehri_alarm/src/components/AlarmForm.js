// src/components/AlarmForm.js
import { useState } from 'react';
import axios from 'axios';

const AlarmForm = ({ addAlarm }) => {
    const [file, setFile] = useState(null);
    const [suhoorTime, setSuhoorTime] = useState('');
    const [alarmTime, setAlarmTime] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Here you would typically send the file to your backend for processing
        // For now, let's just set a dummy time
        const parsedSuhoorTime = '05:00'; // This will be replaced with actual parsing logic
        setSuhoorTime(parsedSuhoorTime);
        
        // Calculate the alarm time (20 minutes before suhoor time)
        const alarm = new Date();
        alarm.setHours(5, 0 - 20, 0); // 20 minutes before
        setAlarmTime(alarm.toLocaleTimeString());
        
        // Add the alarm to the list
        addAlarm(alarm.toLocaleTimeString());
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} accept="image/*" required />
            <button type="submit">Set Alarm</button>
            <div>
                <p>Suhoor Time: {suhoorTime}</p>
                <p>Alarm Time: {alarmTime}</p>
            </div>
        </form>
    );
};

export default AlarmForm;