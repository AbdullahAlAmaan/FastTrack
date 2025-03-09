// src/pages/index.js
import { useState } from 'react';
import Header from '../components/Header';
import AlarmForm from '../components/AlarmForm';
import AlarmList from '../components/AlarmList';
import '../styles/globals.css';

const Home = () => {
    const [alarms, setAlarms] = useState([]);

    const addAlarm = (alarm) => {
        setAlarms([...alarms, alarm]);
    };

    return (
        <div>
            <Header />
            <AlarmForm addAlarm={addAlarm} />
            <AlarmList alarms={alarms} />
        </div>
    );
};

export default Home;